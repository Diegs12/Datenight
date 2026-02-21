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
  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "20px 24px", maxWidth: 1040, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: T.display, fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: 0.5 }}>
          Vallota Ventures
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
          Date Night,{" "}
          <span style={{
            background: "linear-gradient(90deg, #FFD0A1, #D68853)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Figured Out</span>
        </h1>

        <p style={{
          fontFamily: T.font, fontSize: 18, color: T.textDim, lineHeight: 1.7,
          maxWidth: 560, margin: "0 auto 40px",
        }}>
          Take a 2-minute quiz about your partner. Vela scores 154+ date ideas
          to their personality, plans every detail, and sends a beautiful invite
          — all for free.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link to="/vela" style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 700, textDecoration: "none",
            padding: "14px 36px", borderRadius: 8,
            background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
            color: "#141414",
            boxShadow: "0 4px 12px rgba(139,74,40,0.25), inset 0 1px 0 rgba(255,208,161,0.3)",
          }}>
            Get Started — It's Free
          </Link>
          <a href="#how-it-works" style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 600, textDecoration: "none",
            padding: "14px 36px", borderRadius: 8,
            border: `1px solid ${T.border}`, color: T.textDim, background: "transparent",
          }}>
            See How It Works
          </a>
        </div>
      </section>

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
            { val: "154+", label: "Date Ideas" },
            { val: "2 min", label: "Quiz" },
            { val: "$0", label: "Cost" },
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
            Everything You Need for the Perfect Date
          </h2>
          <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Vela handles the planning so you can focus on the moment.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              icon: "🎯", title: "Personalized Matches",
              desc: "A quick quiz about your partner's vibe — adventurous or cozy, foodie or outdoorsy — and Vela scores every date to fit them.",
            },
            {
              icon: "📋", title: "Full Date Plans",
              desc: "Materials list, step-by-step instructions, estimated budget, and smart shopping links. Everything figured out before you start.",
            },
            {
              icon: "💌", title: "Beautiful Invites",
              desc: "Pick a date and time, add a personal note, and send your partner a gorgeous invite — complete with calendar attachment.",
            },
            {
              icon: "📅", title: "Calendar & History",
              desc: "See upcoming dates on a calendar view and track past dates. Rate them to improve future recommendations.",
            },
            {
              icon: "🔀", title: "Swipe Discovery",
              desc: "Not sure what you want? Swipe through your top matches to discover new ideas. Love it or skip it, Tinder-style.",
            },
            {
              icon: "⚡", title: "Quick Setup",
              desc: "Create an account in seconds and jump straight into personalized date planning. Your preferences save across sessions.",
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
            From quiz to invite in under five minutes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {[
            { step: "1", title: "Take the Quiz", desc: "Answer a few quick questions about your partner's personality and preferences." },
            { step: "2", title: "Get Your Matches", desc: "Vela scores 154+ dates and shows you the best ones, ranked by compatibility." },
            { step: "3", title: "Plan the Date", desc: "See everything you need — materials, cost, steps — with links to buy or find it all." },
            { step: "4", title: "Send the Invite", desc: "Pick a time, write a note, and send your partner a beautiful date invite." },
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
            154+ Dates. Scored to Your Partner.
          </h2>
          <p style={{ fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, textAlign: "center", margin: "0 0 32px", maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Not random suggestions from a blog. Every date in Vela is scored against
            your partner's quiz answers — adventure level, budget comfort, food preferences,
            creativity, and more. The best matches rise to the top.
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
          Ready to Plan Date Night?
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Free to use. Takes 2 minutes to get your first personalized date plan.
        </p>
        <Link to="/vela" style={{
          display: "inline-block", textDecoration: "none",
          fontFamily: T.font, fontSize: 18, fontWeight: 700,
          padding: "16px 44px", borderRadius: 8,
          background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
          color: "#141414",
          boxShadow: "0 4px 12px rgba(139,74,40,0.25), inset 0 1px 0 rgba(255,208,161,0.3)",
        }}>
          Get Started — It's Free
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
