const { getSupabaseAdminClient } = require("./_supabase");

async function recordAuditEvent(event) {
  const supabase = getSupabaseAdminClient();
  const payload = {
    actor_user_id: event.actorUserId || null,
    tenant_slug: event.tenantSlug || null,
    action: event.action,
    target_type: event.targetType || null,
    target_id: event.targetId || null,
    status: event.status || "success",
    ip_address: event.ipAddress || null,
    user_agent: event.userAgent || null,
    request_id: event.requestId || null,
    metadata: event.metadata || {},
    created_at: new Date().toISOString(),
  };

  if (!supabase) {
    console.log("pcc_audit_event", payload);
    return;
  }

  try {
    await supabase.from("pcc_audit_events").insert(payload);
  } catch (error) {
    console.error("audit_log_failed", error.message);
  }
}

module.exports = { recordAuditEvent };
