const { createClient } = require("@supabase/supabase-js");

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return {
    configured: Boolean(url && anonKey),
    url,
    anonKey,
    serviceRoleKey,
  };
}

function getSupabaseAdminClient() {
  const { configured, url, anonKey, serviceRoleKey } = getSupabaseConfig();
  if (!configured) return null;
  return createClient(url, serviceRoleKey || anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getSupabaseUserClient(accessToken) {
  const { configured, url, anonKey } = getSupabaseConfig();
  if (!configured || !accessToken) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

module.exports = {
  getSupabaseAdminClient,
  getSupabaseConfig,
  getSupabaseUserClient,
};
