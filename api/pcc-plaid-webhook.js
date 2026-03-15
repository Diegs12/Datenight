const { beginRequest, readRawBody, sendError } = require("./_security");
const { recordAuditEvent } = require("./_audit");
const { getSupabaseAdminClient } = require("./_supabase");
const { decryptValue } = require("./_crypto");
const { verifyPlaidWebhookSignature } = require("./_plaid");
const { syncAccountsForItem, syncTransactionsForItem, classifyItemHealth } = require("./_pcc-helpers");

async function handleTransactionsWebhook(supabase, payload, item) {
  if (!item || !item.client_id) return;

  const syncCodes = ["SYNC_UPDATES_AVAILABLE", "INITIAL_UPDATE", "HISTORICAL_UPDATE", "DEFAULT_UPDATE"];
  if (!syncCodes.includes(payload.webhook_code)) return;

  let accessToken;
  try {
    accessToken = decryptValue(item.access_token_encrypted);
  } catch {
    await supabase.from("pcc_plaid_items").update({
      health: "error", last_error_code: "decryption_failed",
      last_error_message: "Webhook sync: failed to decrypt token", updated_at: new Date().toISOString(),
    }).eq("id", item.id);
    return;
  }

  const startedAt = new Date();
  const { data: syncRun } = await supabase
    .from("pcc_plaid_sync_runs")
    .insert({
      tenant_slug: item.tenant_slug, client_id: item.client_id,
      plaid_item_id: item.plaid_item_id, started_at: startedAt.toISOString(), status: "started",
    })
    .select("id").single();

  try {
    await syncAccountsForItem(supabase, accessToken, item.plaid_item_id, item.client_id, item.tenant_slug, item.institution_name);
    const txnResult = await syncTransactionsForItem(supabase, accessToken, item.plaid_item_id, item.client_id, item.tenant_slug);
    const finishedAt = new Date();

    if (syncRun) {
      await supabase.from("pcc_plaid_sync_runs").update({
        status: "completed", transactions_added: txnResult.totalAdded,
        transactions_modified: txnResult.totalModified, transactions_removed: txnResult.totalRemoved,
        finished_at: finishedAt.toISOString(), duration_ms: finishedAt - startedAt,
      }).eq("id", syncRun.id);
    }

    await supabase.from("pcc_plaid_items").update({
      health: "healthy", last_successful_sync_at: finishedAt.toISOString(),
      last_error_code: null, last_error_message: null, updated_at: finishedAt.toISOString(),
    }).eq("id", item.id);

    await supabase.from("pcc_clients").update({
      last_synced_at: finishedAt.toISOString(), updated_at: finishedAt.toISOString(),
    }).eq("id", item.client_id);
  } catch (err) {
    const finishedAt = new Date();
    const errorCode = err.details?.error_code || "webhook_sync_failed";

    if (syncRun) {
      await supabase.from("pcc_plaid_sync_runs").update({
        status: "failed", error_code: errorCode, error_message: err.message || "Webhook sync failed",
        finished_at: finishedAt.toISOString(), duration_ms: finishedAt - startedAt,
      }).eq("id", syncRun.id);
    }

    await supabase.from("pcc_plaid_items").update({
      health: classifyItemHealth(errorCode), last_error_code: errorCode,
      last_error_message: err.message, updated_at: finishedAt.toISOString(),
    }).eq("id", item.id);
  }
}

async function handleItemWebhook(supabase, payload) {
  if (!payload.item_id) return;

  if (payload.webhook_code === "ERROR" && payload.error) {
    const errorCode = payload.error.error_code || "unknown";
    await supabase.from("pcc_plaid_items").update({
      health: classifyItemHealth(errorCode),
      last_error_code: errorCode,
      last_error_message: payload.error.error_message || "Plaid item error",
      updated_at: new Date().toISOString(),
    }).eq("plaid_item_id", payload.item_id);
  }

  if (payload.webhook_code === "PENDING_EXPIRATION") {
    await supabase.from("pcc_plaid_items").update({
      health: "login_required", last_error_code: "PENDING_EXPIRATION",
      last_error_message: "Plaid consent is expiring soon. Client needs to re-authenticate.",
      updated_at: new Date().toISOString(),
    }).eq("plaid_item_id", payload.item_id);
  }
}

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["POST"]);
  if (started.preflight || started.rejected) return;

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch {
    return sendError(res, req.requestId, 400, "invalid_body", "Invalid webhook body");
  }

  const signature = req.headers["plaid-verification"];
  const verification = await verifyPlaidWebhookSignature(signature, rawBody);
  if (!verification.valid) {
    await recordAuditEvent({
      action: "plaid.webhook.reject", status: "failed", requestId: req.requestId,
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
      userAgent: req.headers["user-agent"] || null, metadata: { reason: verification.reason || "unknown" },
    });
    return sendError(res, req.requestId, 401, "invalid_webhook_signature", "Webhook verification failed");
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return sendError(res, req.requestId, 400, "invalid_json", "Invalid webhook payload");
  }

  const supabase = getSupabaseAdminClient();

  if (supabase && payload.item_id) {
    await supabase.from("pcc_plaid_items").update({
      last_webhook_code: payload.webhook_code || null, last_webhook_type: payload.webhook_type || null,
      last_webhook_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }).eq("plaid_item_id", payload.item_id);

    const { data: item } = await supabase
      .from("pcc_plaid_items")
      .select("id, plaid_item_id, access_token_encrypted, tenant_slug, client_id, institution_name")
      .eq("plaid_item_id", payload.item_id)
      .maybeSingle();

    if (payload.webhook_type === "TRANSACTIONS") {
      await handleTransactionsWebhook(supabase, payload, item);
    } else if (payload.webhook_type === "ITEM") {
      await handleItemWebhook(supabase, payload);
    }
  }

  await recordAuditEvent({
    action: "plaid.webhook.accept", targetType: "plaid_item", targetId: payload.item_id || null,
    requestId: req.requestId, ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
    userAgent: req.headers["user-agent"] || null,
    metadata: { webhook_type: payload.webhook_type || null, webhook_code: payload.webhook_code || null },
  });

  return res.status(200).json({ received: true, request_id: req.requestId });
};

module.exports.config = { api: { bodyParser: false } };
