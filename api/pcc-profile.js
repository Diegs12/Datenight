const { beginRequest, readJsonBody, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { getSupabaseAdminClient } = require("./_supabase");
const { recordAuditEvent } = require("./_audit");

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["GET", "POST"]);
  if (started.preflight || started.rejected) return;

  const auth = await requireAuthenticatedUser(req, res);
  if (auth.error) return;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return sendError(res, req.requestId, 503, "supabase_not_configured", "Supabase is not configured");
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("pcc_users")
      .select("user_id, email, full_name, tenant_slug, tenant_name, role, created_at, updated_at")
      .eq("user_id", auth.user.id)
      .maybeSingle();

    if (error) {
      return sendError(res, req.requestId, 500, "profile_read_failed", "Failed to load profile");
    }

    return res.status(200).json({
      profile: data || {
        user_id: auth.user.id,
        email: auth.user.email,
        full_name: auth.user.user_metadata?.full_name || "",
        tenant_slug: auth.tenantSlug,
        tenant_name: auth.tenantName,
        role: auth.role,
      },
      request_id: req.requestId,
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendError(res, req.requestId, 400, "invalid_json", "Invalid request body");
  }

  const profile = {
    user_id: auth.user.id,
    email: auth.user.email,
    full_name: String(body.full_name || auth.user.user_metadata?.full_name || "").slice(0, 120),
    tenant_slug: String(body.tenant_slug || auth.tenantSlug).slice(0, 64),
    tenant_name: String(body.tenant_name || auth.tenantName).slice(0, 120),
    role: String(auth.role || "member").slice(0, 32),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("pcc_users").upsert(profile, { onConflict: "user_id" });
  if (error) {
    return sendError(res, req.requestId, 500, "profile_write_failed", "Failed to save profile");
  }

  await recordAuditEvent({
    actorUserId: auth.user.id,
    tenantSlug: profile.tenant_slug,
    action: "pcc.profile.upsert",
    targetType: "profile",
    targetId: auth.user.id,
    requestId: req.requestId,
    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
    userAgent: req.headers["user-agent"] || null,
    metadata: { role: profile.role },
  });

  return res.status(200).json({
    success: true,
    profile,
    request_id: req.requestId,
  });
};
