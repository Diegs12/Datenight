const { beginRequest, getClientIp, readJsonBody, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { recordAuditEvent } = require("./_audit");
const { encryptValue, getEncryptionKey } = require("./_crypto");
const { getPlaidConfig, plaidRequest } = require("./_plaid");
const { getSupabaseAdminClient } = require("./_supabase");
const { getActorProfile, verifyClientAccess, syncAccountsForItem } = require("./_pcc-helpers");

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["POST"]);
  if (started.preflight || started.rejected) return;

  const auth = await requireAuthenticatedUser(req, res);
  if (auth.error) return;

  if (!getEncryptionKey()) {
    return sendError(res, req.requestId, 503, "encryption_not_configured", "Encryption key is not configured");
  }

  const plaid = getPlaidConfig();
  if (!plaid.configured) {
    return sendError(res, req.requestId, 503, "plaid_not_configured", "Plaid is not configured");
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return sendError(res, req.requestId, 503, "supabase_not_configured", "Supabase is not configured");
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendError(res, req.requestId, 400, "invalid_json", "Invalid request body");
  }

  if (!body.public_token || typeof body.public_token !== "string") {
    return sendError(res, req.requestId, 400, "missing_public_token", "public_token is required");
  }

  const clientId = parseInt(body.client_id, 10);
  if (!clientId) {
    return sendError(res, req.requestId, 400, "missing_client_id", "client_id is required");
  }

  let actor;
  try {
    actor = await getActorProfile(supabase, auth);
  } catch {
    return sendError(res, req.requestId, 500, "actor_profile_failed", "Failed to load actor profile");
  }

  const client = await verifyClientAccess(supabase, clientId, actor);
  if (!client) {
    return sendError(res, req.requestId, 404, "client_not_found", "Client not found or access denied");
  }

  try {
    const response = await plaidRequest("/item/public_token/exchange", {
      public_token: body.public_token,
    });

    const institutionName = body.institution_name || null;

    const record = {
      user_id: auth.user.id,
      tenant_slug: actor.tenant_slug,
      client_id: clientId,
      plaid_item_id: response.item_id,
      access_token_encrypted: encryptValue(response.access_token),
      institution_id: body.institution_id || null,
      institution_name: institutionName,
      available_products: body.available_products || [],
      accounts: body.accounts || [],
      status: "active",
      health: "healthy",
      consented_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("pcc_plaid_items")
      .upsert(record, { onConflict: "plaid_item_id" });

    if (error) {
      return sendError(res, req.requestId, 500, "plaid_item_store_failed", "Failed to store Plaid item");
    }

    // Initial account sync -- pull real account data from Plaid immediately
    let accountsSynced = 0;
    try {
      accountsSynced = await syncAccountsForItem(supabase, response.access_token, response.item_id, clientId, actor.tenant_slug, institutionName);

      // Initialize sync cursor for this item
      await supabase
        .from("pcc_sync_cursors")
        .upsert({
          tenant_slug: actor.tenant_slug,
          client_id: clientId,
          plaid_item_id: response.item_id,
          sync_cursor: "",
          last_attempt_at: new Date().toISOString(),
        }, { onConflict: "plaid_item_id" });
    } catch {
      // Initial sync failure is non-fatal -- sync endpoint will retry
    }

    await recordAuditEvent({
      actorUserId: auth.user.id, tenantSlug: actor.tenant_slug,
      action: "plaid.item.exchange", targetType: "plaid_item", targetId: response.item_id,
      requestId: req.requestId, ipAddress: getClientIp(req), userAgent: req.headers["user-agent"] || null,
      metadata: { client_id: clientId, institution_name: institutionName, accounts_synced: accountsSynced },
    });

    return res.status(200).json({
      success: true, item_id: response.item_id, client_id: clientId,
      accounts_synced: accountsSynced, request_id: req.requestId,
    });
  } catch (error) {
    return sendError(res, req.requestId, 502, "plaid_exchange_failed", error.message);
  }
};
