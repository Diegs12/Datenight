import { useState } from "react";
import { Link } from "react-router-dom";

const T = {
  bg: "#141414", surface: "#1C1C1E", surfaceAlt: "#242420", border: "#2E2A26",
  primary: "#D68853", accent: "#D68853", text: "#F5F0EB", textDim: "#A39E98",
  textFaint: "#6B6560", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const section = { padding: "80px 24px", maxWidth: 1040, margin: "0 auto" };
const heading = {
  fontFamily: T.display, fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
};

export default function LandingPage() {
  const [landingEmail, setLandingEmail] = useState("");
  const [landingEmailLoading, setLandingEmailLoading] = useState(false);
  const [landingEmailSuccess, setLandingEmailSuccess] = useState(false);
  const [landingEmailDone] = useState(() => { try { return !!localStorage.getItem("vela_landing_email"); } catch { return false; } });

  const handleLandingEmail = async () => {
    const trimmed = landingEmail.trim();
    if (!trimmed || landingEmailLoading || landingEmailDone) return;
    setLandingEmailLoading(true);
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "landing_page" }),
      });
      try { localStorage.setItem("vela_landing_email", trimmed); } catch {}
    } catch {}
    setLandingEmailSuccess(true);
    setLandingEmailLoading(false);
  };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "20px 24px", maxWidth: 1040, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: T.display, fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: 0.5 }}>
          Vela
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#features" style={{ fontFamily: T.font, fontSize: 14, fontWeight: 500, color: T.textDim, textDecoration: "none" }}>Features</a>
          <a href="#how-it-works" style={{ fontFamily: T.font, fontSize: 14, fontWeight: 500, color: T.textDim, textDecoration: "none" }}>How It Works</a>
          <Link to="/vela" style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 600, textDecoration: "none",
            padding: "8px 20px", borderRadius: 6,
            background: T.primary, color: "#141414",
          }}>
            Try Vela Free
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ ...section, paddingTop: 80, paddingBottom: 100, textAlign: "center" }}>
        <div style={{
          display: "inline-block", marginBottom: 24,
          padding: "6px 14px", borderRadius: 20,
          background: "rgba(214,136,83,0.1)", border: "1px solid rgba(214,136,83,0.15)",
          fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: 1,
          color: T.primary, textTransform: "uppercase",
        }}>
          Now Live
        </div>

        <h1 style={{ ...heading, fontSize: "clamp(36px, 7vw, 64px)", maxWidth: 720, margin: "0 auto 20px" }}>
          She has no idea{" "}
          <span style={{
            background: "linear-gradient(90deg, #FFD0A1, #D68853)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>what you planned.</span>
        </h1>

        <p style={{
          fontFamily: T.font, fontSize: 18, color: T.textDim, lineHeight: 1.7,
          maxWidth: 560, margin: "0 auto 40px",
        }}>
          Answer 13 questions about her. Vela scores 154+ date night ideas to her personality
          and builds the whole plan — shopping list, steps, budget, everything.
          You show up looking like you thought of it yourself.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link to="/vela" style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 700, textDecoration: "none",
            padding: "14px 36px", borderRadius: 8,
            background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
            color: "#141414",
            boxShadow: "0 4px 12px rgba(139,74,40,0.25), inset 0 1px 0 rgba(255,208,161,0.3)",
          }}>
            Plan Her Perfect Date — It's Free
          </Link>
          <a href="#how-it-works" style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 600, textDecoration: "none",
            padding: "14px 36px", borderRadius: 8,
            border: `1px solid ${T.border}`, color: T.textDim, background: "transparent",
          }}>
            See How It Works
          </a>
        </div>

        {/* ─── EMAIL CAPTURE ─── */}
        {!landingEmailDone && (
          <div style={{ marginTop: 40, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
            <p style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 4px" }}>
              Get your first 5 date plans free
            </p>
            <p style={{ fontFamily: T.font, fontSize: 13, color: T.textDim, margin: "0 0 14px", lineHeight: 1.5 }}>
              Enter your email and we'll save your personalized matches.
            </p>
            {landingEmailSuccess ? (
              <p style={{ color: T.primary, fontSize: 14, fontWeight: 600, margin: 0 }}>
                You're in — start your quiz to see your matches.
              </p>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={landingEmail}
                  onChange={e => setLandingEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLandingEmail()}
                  style={{
                    fontFamily: T.font, fontSize: 14, padding: "12px 16px",
                    borderRadius: 8, border: `1px solid ${T.border}`,
                    background: T.surface, color: T.text, outline: "none",
                    flex: 1, minWidth: 200, boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={handleLandingEmail}
                  disabled={landingEmailLoading}
                  style={{
                    fontFamily: T.font, fontSize: 14, fontWeight: 700,
                    border: "none", borderRadius: 8, cursor: "pointer",
                    padding: "12px 20px", background: T.primary, color: "#141414",
                    opacity: landingEmailLoading ? 0.6 : 1, whiteSpace: "nowrap",
                  }}
                >
                  {landingEmailLoading ? "Saving..." : "Get Free Dates"}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── GIRLFRIEND CTA ─── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "16px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: T.font, fontSize: 14, color: T.textDim, margin: "0 0 10px" }}>
          Is his date planning stuck on repeat?{" "}
          <button onClick={() => {
            const url = "https://vallotaventures.com/vela";
            const text = "My boyfriend needs this 😂 — it plans the whole date based on what I actually like. Send him this: " + url;
            if (navigator.share) { navigator.share({ title: "Vela — Date Night Planner", text }); }
            else { navigator.clipboard && navigator.clipboard.writeText(url); alert("Link copied!"); }
          }} style={{ background: "none", border: "none", color: T.primary, fontFamily: T.font, fontSize: 14, fontWeight: 700, cursor: "pointer", padding: 0, textDecoration: "underline" }}>
            Send him this →
          </button>
        </p>
      </div>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <div style={{
        borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
        padding: "24px 24px", background: T.surface,
      }}>
        <div style={{
          maxWidth: 800, margin: "0 auto",
          display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
        }}>
          {[
            { val: "154+", label: "Date Night Ideas" },
            { val: "13", label: "Questions" },
            { val: "$0", label: "To Start" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: T.display, fontSize: 24, fontWeight: 700, color: T.primary }}>{s.val}</div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.textFaint, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ ...heading, fontSize: "clamp(28px, 5vw, 40px)" }}>
            Everything figured out before you leave the house.
          </h2>
          <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            No more "I don't know, you pick." You already know.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              icon: "🎯", title: "Scored to Her Personality",
              desc: "She's more outdoorsy than fancy-restaurant. Or the opposite. The quiz figures that out — and every date idea gets ranked accordingly. You're not guessing anymore.",
            },
            {
              icon: "📋", title: "The Whole Plan, Built",
              desc: "Materials list. Step-by-step instructions. Budget estimate. Shopping links. Everything you need is in one place before you even start.",
            },
            {
              icon: "💌", title: "Send a Real Invite",
              desc: "Pick a time, add a note, and send her an invite that looks like you put real effort in. Calendar attachment included.",
            },
            {
              icon: "📅", title: "Track What's Worked",
              desc: "See upcoming dates and look back at what landed. Rate them and the next suggestions get sharper.",
            },
            {
              icon: "🔀", title: "Not Sure? Just Swipe",
              desc: "Browse your top date ideas Tinder-style until something clicks. Takes 30 seconds.",
            },
            {
              icon: "⚡", title: "Set Up in 2 Minutes",
              desc: "Take the quiz once. Your results save. Next time you need a date idea, it's already there.",
            },
          ].map((f, i) => (
            <div key={i} style={{
              background: T.surface, borderRadius: 12, padding: "28px 24px",
              border: `1px solid ${T.border}`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 8px" }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: T.font, fontSize: 14, color: T.textDim, lineHeight: 1.6, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ ...heading, fontSize: "clamp(28px, 5vw, 40px)" }}>
            How It Works
          </h2>
          <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Quiz to invite in under 5 minutes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {[
            { step: "1", title: "Answer the Quiz", desc: "13 questions about her — adventure level, budget, food, energy. Takes 2 minutes." },
            { step: "2", title: "See Your Matches", desc: "154+ date night ideas ranked by how well they fit her. The best ones are at the top." },
            { step: "3", title: "Get the Full Plan", desc: "Tap any date — you get the shopping list, steps, cost estimate, and links. Nothing left to figure out." },
            { step: "4", title: "Send the Invite", desc: "Add a time and a note. Send it. She finds out when you want her to." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(214,136,83,0.12)", border: "1px solid rgba(214,136,83,0.2)",
                fontFamily: T.display, fontSize: 20, fontWeight: 700, color: T.primary,
              }}>
                {s.step}
              </div>
              <h3 style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 8px" }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: T.font, fontSize: 14, color: T.textDim, lineHeight: 1.6, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DETAIL SECTION ─── */}
      <section style={{ ...section, paddingTop: 100 }}>
        <div style={{
          background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
          padding: "48px 32px", maxWidth: 720, margin: "0 auto",
        }}>
          <h2 style={{ ...heading, fontSize: "clamp(24px, 4vw, 32px)", textAlign: "center", marginBottom: 24 }}>
            154+ date night ideas. Scored to her.
          </h2>
          <p style={{ fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, textAlign: "center", margin: "0 0 32px", maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Not a list some blogger wrote. Every date in Vela is scored against her quiz results —
            how adventurous she is, what kind of food she likes, whether she wants to stay in or go out,
            how much to spend. The ones that fit her best come up first.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {[
              "Outdoor Adventures", "Cozy Nights In", "Foodie Experiences",
              "Creative & DIY", "Active & Sporty", "Cultural Outings",
            ].map((cat, i) => (
              <div key={i} style={{
                padding: "12px 16px", borderRadius: 8, textAlign: "center",
                background: T.surfaceAlt, border: `1px solid ${T.border}`,
                fontFamily: T.font, fontSize: 13, fontWeight: 500, color: T.textDim,
              }}>
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ ...section, paddingTop: 100, paddingBottom: 100, textAlign: "center" }}>
        <h2 style={{ ...heading, fontSize: "clamp(28px, 5vw, 40px)", marginBottom: 16 }}>
          Stop ending up on the couch.
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Free to use. 5 dates on us. Takes 2 minutes to get your first personalized date plan.
        </p>
        <Link to="/vela" style={{
          display: "inline-block", textDecoration: "none",
          fontFamily: T.font, fontSize: 18, fontWeight: 700,
          padding: "16px 44px", borderRadius: 8,
          background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
          color: "#141414",
          boxShadow: "0 4px 12px rgba(139,74,40,0.25), inset 0 1px 0 rgba(255,208,161,0.3)",
        }}>
          Find Her Perfect Date — It's Free
        </Link>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${T.border}`, padding: "32px 24px",
        maxWidth: 1040, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.textFaint }}>
          &copy; 2026 Vallota Ventures
        </span>
        <a href="mailto:dvallota10@gmail.com" style={{
          fontFamily: T.font, fontSize: 13, color: T.textFaint, textDecoration: "none",
        }}>
          dvallota10@gmail.com
        </a>
      </footer>
    </div>
  );
}
