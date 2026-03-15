const { beginRequest, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { getSupabaseAdminClient } = require("./_supabase");

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["GET"]);
  if (started.preflight || started.rejected) return;

  const auth = await requireAuthenticatedUser(req, res);
  if (auth.error) return;

  if (!["owner", "admin"].includes(auth.role)) {
    return sendError(res, req.requestId, 403, "forbidden", "Only tenant administrators can view audit events");
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return sendError(res, req.requestId, 503, "supabase_not_configured", "Supabase is not configured");
  }

  const { data, error } = await supabase
    .from("pcc_audit_events")
    .select("created_at, action, target_type, target_id, status, metadata, actor_user_id")
    .eq("tenant_slug", auth.tenantSlug)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return sendError(res, req.requestId, 500, "audit_read_failed", "Failed to load audit events");
  }

  return res.status(200).json({
    events: data || [],
    request_id: req.requestId,
  });
};
