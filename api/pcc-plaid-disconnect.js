const { beginRequest, readJsonBody, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { recordAuditEvent } = require("./_audit");
const { decryptValue } = require("./_crypto");
const { getPlaidConfig, plaidRequest } = require("./_plaid");
const { getSupabaseAdminClient } = require("./_supabase");

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["POST"]);
  if (started.preflight || started.rejected) return;

  const auth = await requireAuthenticatedUser(req, res);
  if (auth.error) return;

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

  const plaidItemId = String(body.item_id || "").trim();
  if (!plaidItemId) {
    return sendError(res, req.requestId, 400, "missing_item_id", "item_id is required");
  }

  const { data: item, error: readError } = await supabase
    .from("pcc_plaid_items")
    .select("plaid_item_id, access_token_encrypted")
    .eq("plaid_item_id", plaidItemId)
    .eq("user_id", auth.user.id)
    .eq("tenant_slug", auth.tenantSlug)
    .maybeSingle();

  if (readError || !item) {
    return sendError(res, req.requestId, 404, "item_not_found", "Plaid item not found");
  }

  const plaid = getPlaidConfig();
  if (plaid.configured) {
    try {
      await plaidRequest("/item/remove", {
        access_token: decryptValue(item.access_token_encrypted),
      });
    } catch (error) {
      return sendError(res, req.requestId, 502, "plaid_remove_failed", error.message);
    }
  }

  const { error: updateError } = await supabase
    .from("pcc_plaid_items")
    .update({
      status: "revoked",
      disconnected_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("plaid_item_id", plaidItemId)
    .eq("user_id", auth.user.id)
    .eq("tenant_slug", auth.tenantSlug);

  if (updateError) {
    return sendError(res, req.requestId, 500, "plaid_item_update_failed", "Failed to revoke Plaid item");
  }

  await recordAuditEvent({
    actorUserId: auth.user.id,
    tenantSlug: auth.tenantSlug,
    action: "plaid.item.disconnect",
    targetType: "plaid_item",
    targetId: plaidItemId,
    requestId: req.requestId,
    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
    userAgent: req.headers["user-agent"] || null,
  });

  return res.status(200).json({
    success: true,
    item_id: plaidItemId,
    request_id: req.requestId,
  });
};
