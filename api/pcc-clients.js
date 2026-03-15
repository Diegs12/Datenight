const crypto = require("crypto");
const { beginRequest, getClientIp, readJsonBody, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { getSupabaseAdminClient } = require("./_supabase");
const { recordAuditEvent } = require("./_audit");
const { isAdvisorRole, getActorProfile } = require("./_pcc-helpers");

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["GET", "POST"]);
  if (started.preflight || started.rejected) return;

  const auth = await requireAuthenticatedUser(req, res);
  if (auth.error) return;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return sendError(res, req.requestId, 503, "supabase_not_configured", "Supabase is not configured");
  }

  let actor;
  try {
    actor = await getActorProfile(supabase, auth);
  } catch {
    return sendError(res, req.requestId, 500, "actor_profile_failed", "Failed to load actor profile");
  }

  if (req.method === "GET") {
    const clientId = req.query.client_id ? parseInt(req.query.client_id, 10) : null;

    let clientQuery = supabase
      .from("pcc_clients")
      .select("id, tenant_slug, advisor_user_id, user_id, email, full_name, status, invited_at, accepted_at, last_synced_at, created_at, updated_at")
      .eq("tenant_slug", actor.tenant_slug)
      .order("created_at", { ascending: false });

    if (actor.role === "advisor") {
      clientQuery = clientQuery.eq("advisor_user_id", actor.user_id);
    } else if (actor.role === "client") {
      clientQuery = clientQuery.eq("user_id", actor.user_id);
    }

    if (clientId) clientQuery = clientQuery.eq("id", clientId).limit(1);

    const { data: clients, error: clientError } = await clientQuery;
    if (clientError) {
      return sendError(res, req.requestId, 500, "client_read_failed", "Failed to load clients");
    }

    const safeClients = clients || [];
    const clientIds = safeClients.map((client) => client.id);

    if (clientIds.length === 0) {
      return res.status(200).json({
        clients: [],
        request_id: req.requestId,
      });
    }

    let accounts;
    let transactions;
    let items;
    let syncRuns;
    try {
      [{ data: accounts }, { data: transactions }, { data: items }, { data: syncRuns }] = await Promise.all([
        supabase
          .from("pcc_accounts")
          .select("client_id, name, mask, type, subtype, institution_name, current_balance, available_balance, last_balance_update")
          .in("client_id", clientIds)
          .order("name", { ascending: true }),
        supabase
          .from("pcc_transactions")
          .select("client_id, plaid_transaction_id, amount, posted_date, merchant_name, description, pending")
          .in("client_id", clientIds)
          .eq("removed", false)
          .order("posted_date", { ascending: false })
          .limit(clientId ? 50 : 200),
        supabase
          .from("pcc_plaid_items")
          .select("client_id, institution_name, health, status, last_successful_sync_at, last_error_code, last_error_message")
          .in("client_id", clientIds),
        supabase
          .from("pcc_plaid_sync_runs")
          .select("client_id, started_at, finished_at, status, error_code")
          .in("client_id", clientIds)
          .order("started_at", { ascending: false }),
      ]);
    } catch {
      return sendError(res, req.requestId, 500, "client_related_reads_failed", "Failed to load client financial records");
    }

    const grouped = new Map();
    for (const client of safeClients) {
      grouped.set(client.id, {
        ...client,
        accounts: [],
        transactions: [],
        plaid_items: [],
        latest_sync_run: null,
        net_worth: 0,
      });
    }

    for (const account of accounts || []) {
      const client = grouped.get(account.client_id);
      if (!client) continue;
      client.accounts.push(account);
      client.net_worth += Number(account.current_balance || 0);
    }

    for (const transaction of transactions || []) {
      const client = grouped.get(transaction.client_id);
      if (!client) continue;
      if (clientId || client.transactions.length < 10) {
        client.transactions.push(transaction);
      }
    }

    for (const item of items || []) {
      const client = grouped.get(item.client_id);
      if (!client) continue;
      client.plaid_items.push(item);
    }

    for (const run of syncRuns || []) {
      const client = grouped.get(run.client_id);
      if (!client || client.latest_sync_run) continue;
      client.latest_sync_run = run;
    }

    return res.status(200).json({
      clients: Array.from(grouped.values()),
      request_id: req.requestId,
    });
  }

  if (!isAdvisorRole(actor.role)) {
    return sendError(res, req.requestId, 403, "forbidden", "Only advisors can create client records");
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendError(res, req.requestId, 400, "invalid_json", "Invalid request body");
  }

  const email = String(body.email || "").trim().toLowerCase();
  const fullName = String(body.full_name || "").trim();
  if (!email || !email.includes("@")) {
    return sendError(res, req.requestId, 400, "invalid_email", "A valid client email is required");
  }
  if (!fullName) {
    return sendError(res, req.requestId, 400, "invalid_name", "A client name is required");
  }

  const inviteToken = crypto.randomBytes(24).toString("hex");
  const now = new Date().toISOString();

  const payload = {
    tenant_slug: actor.tenant_slug,
    advisor_user_id: actor.role === "advisor" ? actor.user_id : (body.advisor_user_id || actor.user_id),
    email,
    full_name: fullName,
    status: "invited",
    invite_token: inviteToken,
    invited_at: now,
    updated_at: now,
  };

  const { data: created, error: createError } = await supabase
    .from("pcc_clients")
    .insert(payload)
    .select("id, tenant_slug, advisor_user_id, email, full_name, status, invite_token, invited_at, created_at")
    .single();

  if (createError) {
    if (createError.code === "23505") {
      return sendError(res, req.requestId, 409, "client_exists", "Client with this email already exists");
    }
    return sendError(res, req.requestId, 500, "client_create_failed", "Failed to create client invitation");
  }

  await recordAuditEvent({
    actorUserId: actor.user_id,
    tenantSlug: actor.tenant_slug,
    action: "pcc.client.invite",
    targetType: "client",
    targetId: String(created.id),
    requestId: req.requestId,
    ipAddress: getClientIp(req),
    userAgent: req.headers["user-agent"] || null,
    metadata: { email, advisor_user_id: payload.advisor_user_id },
  });

  return res.status(200).json({
    client: created,
    invite_url: `${process.env.PCC_APP_URL || "https://vallotaventures.com"}/pcc/login?invite=${inviteToken}`,
    request_id: req.requestId,
  });
};
