import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export function isPccAuthConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getPccSupabaseClient() {
  if (!isPccAuthConfigured()) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseClient;
}

export function toTenantSlug(value) {
  const base = String(value || "personal").trim().toLowerCase();
  return base
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "personal";
}
