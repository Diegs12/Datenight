import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#141414", surface: "#1C1C1E", surfaceAlt: "#242420", border: "#2E2A26",
  primary: "#D68853", text: "#F5F0EB", textDim: "#A39E98", textFaint: "#6B6560",
  font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const features = [
  {
    title: "2-Minute Personality Quiz",
    desc: "Answer a few questions about your partner — their energy, how they like to eat, what kind of adventure they're into. Vela builds a profile from there.",
    icon: "💡",
  },
  {
    title: "154+ Date Ideas, Ranked",
    desc: "Every idea is scored against your partner's personality. The best matches float to the top — no more scrolling through generic lists.",
    icon: "🎯",
  },
  {
    title: "Full Plans, Not Just Ideas",
    desc: "Step-by-step instructions, shopping lists, budget estimates, and timing. Pick a date and everything is planned for you.",
    icon: "📋",
  },
  {
    title: "Calendar Invite Sent",
    desc: "Vela sends your partner a beautiful invite with the date, time, and a hint about what's coming. Straight to their inbox.",
    icon: "💌",
  },
];

export default function VelaLanding() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const hasAccount = (() => {
    try { return !!localStorage.getItem("vela_quiz"); } catch { return false; }
  })();

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(20,20,20,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${T.border}`,
        padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{
          textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: T.textFaint }}>
            Vallota Ventures
          </span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to={hasAccount ? "/vela/app" : "/vela/login"} style={{
            fontSize: 14, fontWeight: 500, color: T.textDim, textDecoration: "none",
          }}>
            {hasAccount ? "My Account" : "Log In"}
          </Link>
          <Link
            to="/vela/demo"
            style={{
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              padding: "8px 20px", borderRadius: 8,
              background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
              color: T.bg,
              boxShadow: "0 0 10px rgba(214,136,83,0.15)",
            }}
          >
            Try Demo
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: 140, paddingBottom: 80,
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214,136,83,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
          {/* Candle icon */}
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: "0 auto 28px",
            background: "rgba(214,136,83,0.1)", border: "1px solid rgba(214,136,83,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path d="M20 6C20 6 13 16 13 23C13 26.9 16.1 30 20 30C23.9 30 27 26.9 27 23C27 16 20 6 20 6Z" fill={T.primary} fillOpacity="0.8" />
              <path d="M20 14C20 14 17 19.5 17 23C17 24.7 18.3 26 20 26C21.7 26 23 24.7 23 23C23 19.5 20 14 20 14Z" fill="#FFD0A1" fillOpacity="0.6" />
            </svg>
          </div>

          <h1 style={{
            fontFamily: T.display, fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 700, lineHeight: 1.05, margin: "0 0 8px", color: T.text,
            letterSpacing: -0.5,
          }}>
            Vela
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 500,
            color: T.primary, margin: "0 0 28px",
          }}>
            Date Night, Figured Out
          </p>
          <p style={{
            fontSize: 17, color: T.textDim, lineHeight: 1.8,
            margin: "0 auto 40px", maxWidth: 520,
          }}>
            Take a 2-minute quiz about your partner. Vela scores 154+ date ideas
            to their personality, plans every detail, and sends a beautiful invite —
            all for free.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/vela/demo"
              onMouseEnter={() => setHoveredBtn("demo")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontSize: 15, fontWeight: 700, textDecoration: "none",
                padding: "14px 36px", borderRadius: 8,
                background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
                color: T.bg,
                boxShadow: hoveredBtn === "demo"
                  ? "0 0 24px rgba(214,136,83,0.4), 0 4px 12px rgba(139,74,40,0.2)"
                  : "0 0 10px rgba(214,136,83,0.15), 0 4px 10px rgba(139,74,40,0.1)",
                transition: "all 0.2s ease",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              Try the Demo
            </Link>
            <Link
              to={hasAccount ? "/vela/app" : "/vela/login"}
              onMouseEnter={() => setHoveredBtn("login")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontSize: 15, fontWeight: 600, textDecoration: "none",
                padding: "14px 36px", borderRadius: 8,
                background: "transparent",
                border: `1px solid ${T.border}`,
                transition: "all 0.2s ease",
                borderColor: hoveredBtn === "login" ? T.primary : T.border,
                color: hoveredBtn === "login" ? T.primary : T.textDim,
              }}
            >
              {hasAccount ? "Go to My Account" : "Log In"}
            </Link>
          </div>

          {hasAccount && (
            <p style={{
              fontSize: 13, color: T.primary, marginTop: 16, fontWeight: 500,
            }}>
              Welcome back — your account is ready.
            </p>
          )}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16,
          }}>
            {features.map((f, i) => {
              const hovered = hoveredFeature === i;
              return (
                <div
                  key={f.title}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    background: hovered ? T.surfaceAlt : T.surface,
                    borderRadius: 16, padding: "28px 24px",
                    border: `1px solid ${hovered ? "rgba(214,136,83,0.25)" : T.border}`,
                    transition: "all 0.2s ease",
                    transform: hovered ? "translateY(-4px)" : "none",
                    boxShadow: hovered ? "0 12px 40px rgba(214,136,83,0.08)" : "none",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, margin: "0 0 8px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 700, margin: "0 0 32px", textAlign: "center",
          }}>
            How It Works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { step: "01", title: "Take the Quiz", desc: "2 minutes. Answer a few questions about your partner's personality, interests, and energy level." },
              { step: "02", title: "Get Ranked Ideas", desc: "Vela scores 154+ date ideas and surfaces the best matches. Every suggestion is tailored." },
              { step: "03", title: "Pick & Plan", desc: "Choose a date and Vela builds the full plan — instructions, shopping list, budget, and timing." },
              { step: "04", title: "Send the Invite", desc: "Your partner gets a beautiful calendar invite with a hint about what's coming." },
            ].map((item) => (
              <div key={item.step} style={{
                display: "flex", gap: 20, padding: "24px 0",
                borderBottom: `1px solid ${T.border}`,
              }}>
                <span style={{
                  fontFamily: T.display, fontSize: 28, fontWeight: 700,
                  color: T.primary, opacity: 0.5, flexShrink: 0, width: 40,
                }}>
                  {item.step}
                </span>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 6px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "0 24px 100px", textAlign: "center" }}>
        <div style={{
          background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`,
          padding: "48px 36px", maxWidth: 560, margin: "0 auto",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, #8B4A28, #D68853, #FFD0A1, #D68853, #8B4A28)",
          }} />
          <h3 style={{
            fontFamily: T.display, fontSize: 28, fontWeight: 700,
            color: T.text, margin: "0 0 12px",
          }}>
            Stop debating. Start dating.
          </h3>
          <p style={{
            fontSize: 15, color: T.textDim, lineHeight: 1.7,
            margin: "0 0 28px",
          }}>
            Try the demo to see how it works, or log in to your personalized account.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/vela/demo" style={{
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              padding: "14px 32px", borderRadius: 8,
              background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
              color: T.bg,
              boxShadow: "0 0 10px rgba(214,136,83,0.15)",
            }}>
              Try Demo
            </Link>
            <Link to="/vela/login" style={{
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              padding: "14px 32px", borderRadius: 8,
              border: `1px solid ${T.border}`, color: T.textDim,
            }}>
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${T.border}`, padding: "32px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, maxWidth: 800, margin: "0 auto",
      }}>
        <Link to="/" style={{
          fontSize: 13, color: T.textFaint, textDecoration: "none",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Vallota Ventures
        </Link>
        <span style={{ fontSize: 13, color: T.textFaint }}>
          &copy; 2026 Vallota Ventures
        </span>
      </footer>

      {/* Responsive */}
      <style>{`
        @media (max-width: 600px) {
          section > div { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </div>
  );
}
