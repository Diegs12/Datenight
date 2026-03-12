import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const themes = {
  vela: {
    bg: "#141414", surface: "#1C1C1E", border: "#2E2A26",
    primary: "#D68853", primaryGradient: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
    text: "#F5F0EB", textDim: "#A39E98", textFaint: "#6B6560",
    name: "Vela", backLink: "/vela", demoLink: "/vela/demo",
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <path d="M20 6C20 6 13 16 13 23C13 26.9 16.1 30 20 30C23.9 30 27 26.9 27 23C27 16 20 6 20 6Z" fill="#D68853" fillOpacity="0.8" />
        <path d="M20 14C20 14 17 19.5 17 23C17 24.7 18.3 26 20 26C21.7 26 23 24.7 23 23C23 19.5 20 14 20 14Z" fill="#FFD0A1" fillOpacity="0.6" />
      </svg>
    ),
  },
  tracker: {
    bg: "#0A0A0B", surface: "#141416", border: "#2A2A2E",
    primary: "#10B981", primaryGradient: "linear-gradient(180deg, #6EE7B7 0%, #10B981 40%, #065F46 100%)",
    text: "#F5F0EB", textDim: "#A39E98", textFaint: "#6B6560",
    name: "Life Tracker", backLink: "/tracker", demoLink: "/tracker/app",
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="10" width="8" height="8" rx="2" fill="#10B981" />
        <rect x="22" y="10" width="8" height="8" rx="2" fill="#10B981" fillOpacity="0.5" />
        <rect x="10" y="22" width="8" height="8" rx="2" fill="#10B981" fillOpacity="0.5" />
        <rect x="22" y="22" width="8" height="8" rx="2" fill="#10B981" fillOpacity="0.3" />
      </svg>
    ),
  },
  trading: {
    bg: "#0a0e17", surface: "#111827", border: "#1e293b",
    primary: "#00d4ff", primaryGradient: "linear-gradient(180deg, #67e8f9 0%, #00d4ff 40%, #0284c7 100%)",
    text: "#f0f4f8", textDim: "#94a3b8", textFaint: "#64748b",
    name: "Vallota Trading", backLink: "/trading", demoLink: "/trading/dashboard",
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <path d="M10 28L16 21L21 25L30 14" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 14H30V18" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export default function LoginPage({ product = "vela" }) {
  const T = themes[product] || themes.vela;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) { setError("Enter a valid email."); return; }
    if (!password || password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    // TODO: Wire to Supabase auth when ready
    // For now, show a message that the account system is coming
    setTimeout(() => {
      setLoading(false);
      setError("Account login is coming soon. Try the demo in the meantime!");
    }, 800);
  };

  return (
    <div style={{
      background: T.bg, color: T.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ maxWidth: 400, width: "100%" }}>
        {/* Logo + name */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
            background: `${T.primary}15`, border: `1px solid ${T.primary}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {T.icon}
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>{T.name}</h1>
          <p style={{ fontSize: 14, color: T.textDim, margin: 0 }}>Log in to your account</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} style={{
          background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
          padding: 32,
        }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.textDim, display: "block", marginBottom: 8 }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com" autoComplete="email"
              style={{
                width: "100%", boxSizing: "border-box", padding: "12px 16px",
                borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg,
                color: T.text, fontSize: 15, outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.textDim, display: "block", marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password" autoComplete="current-password"
              style={{
                width: "100%", boxSizing: "border-box", padding: "12px 16px",
                borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg,
                color: T.text, fontSize: 15, outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          {error && (
            <div style={{
              fontSize: 14, padding: "12px 16px", borderRadius: 8, marginBottom: 20,
              background: error.includes("coming soon") ? `${T.primary}15` : "rgba(239,68,68,0.1)",
              color: error.includes("coming soon") ? T.primary : "#ef4444",
              border: `1px solid ${error.includes("coming soon") ? `${T.primary}30` : "rgba(239,68,68,0.2)"}`,
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "14px 0", borderRadius: 8, border: "none",
            background: T.primaryGradient, color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: loading ? "wait" : "pointer", opacity: loading ? 0.6 : 1,
            transition: "opacity 0.2s",
            fontFamily: "inherit",
          }}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Links */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 20, flexWrap: "wrap", gap: 12,
        }}>
          <Link to={T.demoLink} style={{
            fontSize: 14, color: T.primary, textDecoration: "none", fontWeight: 500,
          }}>
            Try the demo instead
          </Link>
          <Link to={T.backLink} style={{
            fontSize: 14, color: T.textFaint, textDecoration: "none",
          }}>
            &larr; Back
          </Link>
        </div>
      </div>
    </div>
  );
}
