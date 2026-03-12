import { Link } from "react-router-dom";
import { useState } from "react";

// Theme matched to the UNCHARTED app's actual design language
const T = {
  bg: "#0a0a0a", surface: "#141414", surfaceHover: "#1c1c1c",
  border: "rgba(255,255,255,0.06)", borderLight: "rgba(255,255,255,0.1)",
  teal: "#3dd98a", cyan: "#00bfb3", lime: "#b8e926", orange: "#ff8c42", coral: "#ff6b6b",
  text: "#ffffff", textDim: "#aaaaaa", textFaint: "#888888", textMuted: "#555555",
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  gradient: "linear-gradient(135deg, #b8e926, #3dd98a, #00bfb3)",
};

const features = [
  {
    emoji: "👥",
    title: "Crew Board",
    description: "Attendees scan in and instantly join a live board where they can browse profiles, connect social handles, and find other riders at the event.",
    color: T.teal,
  },
  {
    emoji: "🗺️",
    title: "Scavenger Hunt",
    description: "QR codes hidden around the venue each reveal a word in a secret phrase — a Survivor-style challenge that gives everyone a legit reason to download the app.",
    color: T.lime,
  },
  {
    emoji: "📸",
    title: "Moments Feed",
    description: "A shared real-time photo feed where riders upload and browse event photos from the digital cameras the brand distributed — a living gallery of the day.",
    color: T.cyan,
  },
  {
    emoji: "⚡",
    title: "Vibe Check",
    description: "A live sentiment pulse that lets organizers read the energy of the crowd in real time — instant feedback on how the event is landing.",
    color: T.orange,
  },
];

const stats = [
  { value: "1 File", label: "Zero Dependencies" },
  { value: "React 18", label: "Stack" },
  { value: "GitHub Pages", label: "Deploy" },
  { value: "Funded", label: "Status", highlight: true },
];

export default function UnchartedLanding() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,10,10,0.8)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
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
        <a
          href="https://diegs12.github.io/UNCHARTED/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn("nav")}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            padding: "8px 20px", borderRadius: 50,
            background: T.gradient, color: "#0a0a0a",
            boxShadow: hoveredBtn === "nav" ? `0 0 20px ${T.teal}66` : "none",
            transition: "all 0.2s ease",
          }}
        >
          Try the Prototype
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: 140, paddingBottom: 80,
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Gradient glow orbs */}
        <div style={{
          position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.teal}18 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 60, left: "20%",
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.lime}0d 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 50, marginBottom: 28,
            background: "rgba(61,217,138,0.08)",
            border: `1px solid rgba(61,217,138,0.2)`,
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: T.teal, boxShadow: `0 0 8px ${T.teal}`,
            }} />
            <span style={{
              fontSize: 11, fontWeight: 700, color: T.teal,
              letterSpacing: 2, textTransform: "uppercase",
            }}>
              Concept App &middot; Funded
            </span>
          </div>

          {/* Title with gradient text */}
          <h1 style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 800, lineHeight: 1, margin: "0 0 12px",
            letterSpacing: -2,
            background: T.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            UNCHARTED
          </h1>
          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 600,
            color: T.textFaint, margin: "0 0 32px", letterSpacing: 3, textTransform: "uppercase",
          }}>
            Sea-Doo Legendary Meetups 2026
          </p>
          <p style={{
            fontSize: 17, color: T.textDim, lineHeight: 1.8,
            margin: "0 auto 40px", maxWidth: 560,
          }}>
            A mobile-first digital companion app I built for Sea-Doo's experiential marketing events.
            Designed to solve a real problem — how do you collect attendee information, connect people,
            and gather content at a live event without being intrusive?
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://diegs12.github.io/UNCHARTED/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredBtn("hero")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontSize: 15, fontWeight: 700, textDecoration: "none",
                padding: "14px 36px", borderRadius: 50,
                background: T.gradient, color: "#0a0a0a",
                boxShadow: hoveredBtn === "hero" ? `0 0 30px ${T.teal}55` : `0 4px 20px ${T.teal}22`,
                transition: "all 0.2s ease",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              Launch Prototype
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <Link to="/" style={{
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              padding: "14px 36px", borderRadius: 50,
              background: "rgba(255,255,255,0.04)", color: T.textDim,
              border: `1px solid ${T.borderLight}`,
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            }}>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: "0 24px 70px" }}>
        <div style={{
          maxWidth: 720, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12,
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: T.surface, borderRadius: 16, padding: "20px 16px", textAlign: "center",
              border: `1px solid ${s.highlight ? "rgba(61,217,138,0.2)" : T.border}`,
            }}>
              <div style={{
                fontSize: 18, fontWeight: 800, marginBottom: 4,
                color: s.highlight ? T.teal : T.text,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: T.textFaint, letterSpacing: 0.5, textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: T.coral, letterSpacing: 3,
            textTransform: "uppercase", textAlign: "center", marginBottom: 12,
          }}>
            The Problem
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800, margin: "0 0 24px", color: T.text, textAlign: "center",
            lineHeight: 1.2,
          }}>
            Event data collection is broken
          </h2>
          <div style={{
            background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`,
            padding: "32px 32px",
          }}>
            <p style={{ fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px" }}>
              An experiential marketing client was running large-scale ride events for Sea-Doo but struggling
              with a fundamental challenge: how do you collect attendee information, help people connect with
              each other, and gather all the photos from the digital cameras distributed at the event — without
              it feeling forced or intrusive?
            </p>
            <p style={{ fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: 0 }}>
              Traditional methods — clipboards, email sign-ups, post-event surveys — had low engagement.
              The brand needed a way to make data collection feel like part of the experience, not an interruption.
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: T.teal, letterSpacing: 3,
            textTransform: "uppercase", textAlign: "center", marginBottom: 12,
          }}>
            The Solution
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800, margin: "0 0 24px", color: T.text, textAlign: "center",
            lineHeight: 1.2,
          }}>
            A game they actually want to play
          </h2>
          <div style={{
            background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`,
            padding: "32px 32px",
          }}>
            <p style={{ fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px" }}>
              I built a concept app that turns a one-day ride event into a connected, gamified experience.
              The key insight was the{" "}
              <strong style={{
                background: T.gradient,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Scavenger Hunt
              </strong>{" "}
              — a Survivor-style challenge where QR codes hidden around the venue each reveal a word
              in a secret phrase. Whoever cracks it first wins prizes.
            </p>
            <p style={{ fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px" }}>
              This gave us a <strong style={{ color: T.text }}>legitimate reason to have every attendee download the app</strong>.
              It wasn't a data grab — it was a game people actually wanted to play. And once they were in, they
              were sharing socials, uploading photos, and giving us real-time feedback on the event — all voluntarily.
            </p>
            <p style={{ fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: 0 }}>
              The scavenger hunt is designed to make you have a good time in a group of people. It's competitive
              enough to be exciting but collaborative enough that strangers end up working together.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: T.lime, letterSpacing: 3,
            textTransform: "uppercase", textAlign: "center", marginBottom: 12,
          }}>
            Features
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800, margin: "0 0 40px", color: T.text, textAlign: "center",
          }}>
            What's Inside
          </h2>
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
                    background: hovered ? T.surfaceHover : T.surface,
                    borderRadius: 20, padding: "28px 24px",
                    border: `1px solid ${hovered ? `${f.color}33` : T.border}`,
                    transition: "all 0.2s ease",
                    transform: hovered ? "translateY(-4px)" : "none",
                    boxShadow: hovered ? `0 12px 40px ${f.color}15` : "none",
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${f.color}12`,
                    border: `1px solid ${f.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20, fontSize: 26,
                  }}>
                    {f.emoji}
                  </div>
                  <h3 style={{
                    fontSize: 18, fontWeight: 700,
                    color: T.text, margin: "0 0 10px",
                  }}>
                    {f.title}
                  </h3>
                  <p style={{
                    fontSize: 14, color: T.textDim, lineHeight: 1.7, margin: 0,
                  }}>
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TECHNICAL HIGHLIGHT ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            background: T.surface,
            borderRadius: 20,
            border: `1px solid ${T.borderLight}`,
            padding: "40px 36px",
            textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* Gradient border glow */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: T.gradient,
              opacity: 0.6,
            }} />
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
            <h3 style={{
              fontSize: 26, fontWeight: 800,
              color: T.text, margin: "0 0 16px",
            }}>
              One File. Zero Dependencies.
            </h3>
            <p style={{
              fontSize: 15, color: T.textDim, lineHeight: 1.8,
              margin: "0 auto 12px", maxWidth: 520,
            }}>
              The entire prototype is a fully functional React app running as a single standalone HTML file —
              no backend, no build tools, no dependencies beyond React via CDN. Every screen is interactive,
              the scavenger hunt randomizes per user, social links open real profiles, and the whole thing
              deploys straight to GitHub Pages.
            </p>
            <p style={{
              fontSize: 16, fontWeight: 700, margin: 0,
              background: T.gradient,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              It was designed to sell a concept to a real client — and it got funded.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ROLE / CREDITS ─── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12,
          }}>
            {[
              { label: "Role", value: "Sole Designer & Developer", color: T.teal },
              { label: "Client", value: "Sea-Doo (via Rooted Creative)", color: T.cyan },
              { label: "Stack", value: "React 18, SVG, CSS-in-JS", color: T.lime },
            ].map((item) => (
              <div key={item.label} style={{
                background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
                padding: "20px 24px",
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 8,
                }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "0 24px 100px", textAlign: "center" }}>
        <a
          href="https://diegs12.github.io/UNCHARTED/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn("cta")}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            fontSize: 16, fontWeight: 700, textDecoration: "none",
            padding: "16px 44px", borderRadius: 50,
            background: T.gradient, color: "#0a0a0a",
            boxShadow: hoveredBtn === "cta" ? `0 0 30px ${T.teal}55` : `0 4px 20px ${T.teal}22`,
            transition: "all 0.2s ease",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}
        >
          Launch the Prototype
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${T.border}`, padding: "32px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, maxWidth: 800, margin: "0 auto",
      }}>
        <Link to="/" style={{
          fontSize: 13, color: T.textMuted, textDecoration: "none",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Vallota Ventures
        </Link>
        <span style={{ fontSize: 13, color: T.textMuted }}>
          &copy; 2026 Vallota Ventures
        </span>
      </footer>

      {/* ─── ANIMATIONS + RESPONSIVE ─── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          section > div { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 0 16px !important; }
        }
      `}</style>
    </div>
  );
}
