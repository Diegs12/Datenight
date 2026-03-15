const { getBearerToken, sendError } = require("./_security");
const { getSupabaseAdminClient } = require("./_supabase");

async function requireAuthenticatedUser(req, res) {
  const requestId = req.requestId;
  const accessToken = getBearerToken(req);
  if (!accessToken) {
    return {
      error: sendError(res, requestId, 401, "missing_token", "Authentication required"),
    };
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return {
      error: sendError(res, requestId, 503, "supabase_not_configured", "Supabase is not configured"),
    };
  }

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data?.user) {
    return {
      error: sendError(res, requestId, 401, "invalid_token", "Authentication failed"),
    };
  }

  const user = data.user;
  const tenantSlug = user.user_metadata?.tenant_slug || process.env.PCC_DEFAULT_TENANT || "personal";
  const tenantName = user.user_metadata?.tenant_name || tenantSlug;
  const role = user.user_metadata?.role || "member";

  return {
    accessToken,
    user,
    tenantSlug,
    tenantName,
    role,
  };
}

module.exports = { requireAuthenticatedUser };
