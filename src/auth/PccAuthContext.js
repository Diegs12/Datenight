import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getPccSupabaseClient, isPccAuthConfigured, toTenantSlug } from "../lib/pccAuth";

const PccAuthContext = createContext(null);

async function syncProfile(session, profile) {
  if (!session?.access_token) return;
  try {
    await fetch("/api/pcc-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(profile),
    });
  } catch {}
}

export function PccAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = getPccSupabaseClient();
    if (!client) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    client.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session || null);
      setUser(data.session?.user || null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession || null);
      setUser(nextSession?.user || null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    loading,
    session,
    user,
    configured: isPccAuthConfigured(),
    async signIn({ email, password }) {
      const client = getPccSupabaseClient();
      if (!client) throw new Error("PCC authentication is not configured.");

      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session || null);
      setUser(data.user || null);
      return data;
    },
    async signUp({ email, password, fullName, tenantName }) {
      const client = getPccSupabaseClient();
      if (!client) throw new Error("PCC authentication is not configured.");

      const tenantSlug = toTenantSlug(tenantName || email.split("@")[0]);
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            product: "pcc",
            full_name: fullName || "",
            tenant_slug: tenantSlug,
            tenant_name: tenantName || tenantSlug,
            role: "owner",
          },
        },
      });
      if (error) throw error;

      if (data.session) {
        await syncProfile(data.session, {
          full_name: fullName || "",
          tenant_slug: tenantSlug,
          tenant_name: tenantName || tenantSlug,
        });
      }

      setSession(data.session || null);
      setUser(data.user || null);
      return data;
    },
    async signOut() {
      const client = getPccSupabaseClient();
      if (!client) return;
      await client.auth.signOut();
      setSession(null);
      setUser(null);
    },
  }), [loading, session, user]);

  return <PccAuthContext.Provider value={value}>{children}</PccAuthContext.Provider>;
}

export function usePccAuth() {
  const context = useContext(PccAuthContext);
  if (!context) throw new Error("usePccAuth must be used inside PccAuthProvider");
  return context;
}
