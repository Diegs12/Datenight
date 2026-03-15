const { beginRequest, getClientIp, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { recordAuditEvent } = require("./_audit");
const { decryptValue, getEncryptionKey } = require("./_crypto");
const { getPlaidConfig } = require("./_plaid");
const { getSupabaseAdminClient } = require("./_supabase");
const { getActorProfile, verifyClientAccess, syncAccountsForItem, syncTransactionsForItem, classifyItemHealth } = require("./_pcc-helpers");

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

  let actor;
  try {
    actor = await getActorProfile(supabase, auth);
  } catch {
    return sendError(res, req.requestId, 500, "actor_profile_failed", "Failed to load actor profile");
  }

  const clientId = parseInt(req.query?.client_id || req.body?.client_id, 10);
  if (!clientId) {
    return sendError(res, req.requestId, 400, "missing_client_id", "client_id is required");
  }

  const client = await verifyClientAccess(supabase, clientId, actor);
  if (!client) {
    return sendError(res, req.requestId, 404, "client_not_found", "Client not found or access denied");
  }

  const { data: plaidItems, error: itemsError } = await supabase
    .from("pcc_plaid_items")
    .select("id, plaid_item_id, access_token_encrypted, institution_name, health")
    .eq("client_id", clientId)
    .eq("status", "active");

  if (itemsError) {
    return sendError(res, req.requestId, 500, "plaid_items_read_failed", "Failed to load Plaid items");
  }

  if (!plaidItems || plaidItems.length === 0) {
    return res.status(200).json({
      synced: false,
      message: "No active Plaid connections for this client",
      request_id: req.requestId,
    });
  }

  const results = [];

  for (const item of plaidItems) {
    const startedAt = new Date();

    const { data: syncRun } = await supabase
      .from("pcc_plaid_sync_runs")
      .insert({
        tenant_slug: actor.tenant_slug,
        client_id: clientId,
        plaid_item_id: item.plaid_item_id,
        started_at: startedAt.toISOString(),
        status: "started",
      })
      .select("id")
      .single();

    let accessToken;
    try {
      accessToken = decryptValue(item.access_token_encrypted);
    } catch {
      const finishedAt = new Date();
      if (syncRun) {
        await supabase.from("pcc_plaid_sync_runs").update({
          status: "failed", error_code: "decryption_failed", error_message: "Failed to decrypt access token",
          finished_at: finishedAt.toISOString(), duration_ms: finishedAt - startedAt,
        }).eq("id", syncRun.id);
      }
      await supabase.from("pcc_plaid_items").update({
        health: "error", last_error_code: "decryption_failed", last_error_message: "Failed to decrypt access token", updated_at: finishedAt.toISOString(),
      }).eq("id", item.id);
      results.push({ plaid_item_id: item.plaid_item_id, status: "failed", error: "decryption_failed" });
      continue;
    }

    try {
      const accountCount = await syncAccountsForItem(supabase, accessToken, item.plaid_item_id, clientId, actor.tenant_slug, item.institution_name);
      const txnResult = await syncTransactionsForItem(supabase, accessToken, item.plaid_item_id, clientId, actor.tenant_slug);
      const finishedAt = new Date();

      if (syncRun) {
        await supabase.from("pcc_plaid_sync_runs").update({
          status: "completed", transactions_added: txnResult.totalAdded, transactions_modified: txnResult.totalModified,
          transactions_removed: txnResult.totalRemoved, finished_at: finishedAt.toISOString(), duration_ms: finishedAt - startedAt,
        }).eq("id", syncRun.id);
      }

      await supabase.from("pcc_plaid_items").update({
        health: "healthy", last_successful_sync_at: finishedAt.toISOString(),
        last_error_code: null, last_error_message: null, updated_at: finishedAt.toISOString(),
      }).eq("id", item.id);

      await supabase.from("pcc_clients").update({
        last_synced_at: finishedAt.toISOString(), updated_at: finishedAt.toISOString(),
      }).eq("id", clientId);

      results.push({
        plaid_item_id: item.plaid_item_id, institution_name: item.institution_name,
        status: "completed", accounts_synced: accountCount,
        transactions_added: txnResult.totalAdded, transactions_modified: txnResult.totalModified,
        transactions_removed: txnResult.totalRemoved, duration_ms: finishedAt - startedAt,
      });
    } catch (err) {
      const finishedAt = new Date();
      const errorCode = err.details?.error_code || "sync_failed";
      const health = classifyItemHealth(errorCode);

      if (syncRun) {
        await supabase.from("pcc_plaid_sync_runs").update({
          status: "failed", error_code: errorCode, error_message: err.message || "Unknown sync error",
          finished_at: finishedAt.toISOString(), duration_ms: finishedAt - startedAt,
        }).eq("id", syncRun.id);
      }

      await supabase.from("pcc_plaid_items").update({
        health, last_error_code: errorCode, last_error_message: err.message, updated_at: finishedAt.toISOString(),
      }).eq("id", item.id);

      results.push({
        plaid_item_id: item.plaid_item_id, institution_name: item.institution_name,
        status: "failed", error: errorCode, message: err.message,
      });
    }
  }

  await recordAuditEvent({
    actorUserId: actor.user_id, tenantSlug: actor.tenant_slug,
    action: "pcc.plaid.sync", targetType: "client", targetId: String(clientId),
    requestId: req.requestId, ipAddress: getClientIp(req), userAgent: req.headers["user-agent"] || null,
    metadata: { items_synced: results.filter((r) => r.status === "completed").length, items_failed: results.filter((r) => r.status === "failed").length },
  });

  return res.status(200).json({ synced: true, client_id: clientId, results, request_id: req.requestId });
};
