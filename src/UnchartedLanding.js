import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#0A0E17", surface: "#111827", surfaceAlt: "#1F2937", border: "#2A3344",
  primary: "#F59E0B", accent: "#3B82F6", green: "#10B981", text: "#F9FAFB",
  textDim: "#9CA3AF", textFaint: "#6B7280",
  font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const features = [
  {
    title: "Crew Board",
    description: "Attendees scan in and instantly join a live board where they can browse profiles, connect social handles, and find other riders at the event.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Scavenger Hunt",
    description: "A location-based game using QR codes hidden around the venue. Each scan reveals a word in a secret phrase — turning the resort into a Survivor-style challenge that gives everyone a reason to explore, compete, and connect.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6" /><path d="M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Moments Feed",
    description: "A shared real-time photo feed where riders upload and browse event photos from the digital cameras the brand distributed — creating a living gallery of the day.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    title: "Vibe Check",
    description: "A live sentiment pulse that lets organizers read the energy of the crowd in real time — giving the brand instant feedback on how the event is landing.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const stats = [
  { label: "Zero Dependencies", value: "1 File" },
  { label: "Stack", value: "React 18" },
  { label: "Deploy", value: "GitHub Pages" },
  { label: "Status", value: "Funded" },
];

export default function UnchartedLanding() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,14,23,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${T.border}`,
        padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{
          textDecoration: "none", display: "flex", alignItems: "center", gap: 10,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span style={{ fontFamily: T.font, fontSize: 14, fontWeight: 500, color: T.textDim }}>
            Vallota Ventures
          </span>
        </Link>
        <a
          href="https://diegs12.github.io/UNCHARTED/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: T.font, fontSize: 13, fontWeight: 600, textDecoration: "none",
            padding: "8px 20px", borderRadius: 8,
            background: T.primary, color: T.bg,
          }}
        >
          Try the Prototype
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: 140, paddingBottom: 80,
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20, marginBottom: 28,
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.primary, boxShadow: `0 0 8px ${T.primary}` }} />
            <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 600, color: T.primary, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Concept App &middot; Funded
            </span>
          </div>

          <h1 style={{
            fontFamily: T.display, fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 700, lineHeight: 1.05, margin: "0 0 8px", color: T.text,
            letterSpacing: -1,
          }}>
            UNCHARTED
          </h1>
          <p style={{
            fontFamily: T.font, fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 500,
            color: T.primary, margin: "0 0 28px", letterSpacing: 0.5,
          }}>
            Sea-Doo Legendary Meetups 2026
          </p>
          <p style={{
            fontFamily: T.font, fontSize: 17, color: T.textDim, lineHeight: 1.8,
            margin: "0 0 40px", maxWidth: 600, marginLeft: "auto", marginRight: "auto",
          }}>
            A mobile-first digital companion app I built for Sea-Doo's experiential marketing events.
            Designed to solve a real problem — how do you collect attendee information, connect people,
            and gather content at a live event without being intrusive?
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://diegs12.github.io/UNCHARTED/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: T.font, fontSize: 15, fontWeight: 700, textDecoration: "none",
                padding: "14px 32px", borderRadius: 10,
                background: T.primary, color: T.bg,
                boxShadow: `0 4px 20px rgba(245,158,11,0.3)`,
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              Launch Prototype
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <Link to="/" style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 600, textDecoration: "none",
              padding: "14px 32px", borderRadius: 10,
              background: T.surfaceAlt, color: T.text,
              border: `1px solid ${T.border}`,
            }}>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ padding: "0 24px 60px" }}>
        <div style={{
          maxWidth: 800, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
          background: T.border, borderRadius: 16, overflow: "hidden",
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: T.surface, padding: "24px 16px", textAlign: "center",
            }}>
              <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.primary, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.textDim, letterSpacing: 0.5 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section style={{ padding: "60px 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700, margin: "0 0 20px", color: T.text, textAlign: "center",
          }}>
            The Problem
          </h2>
          <div style={{
            background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "32px 36px",
          }}>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px" }}>
              An experiential marketing client was running large-scale ride events for Sea-Doo but struggling
              with a fundamental challenge: how do you collect attendee information, help people connect with
              each other, and gather all the photos from the digital cameras distributed at the event — without
              it feeling forced or intrusive?
            </p>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: 0 }}>
              Traditional methods — clipboards, email sign-ups, post-event surveys — had low engagement.
              The brand needed a way to make data collection feel like part of the experience, not an interruption.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700, margin: "0 0 20px", color: T.text, textAlign: "center",
          }}>
            The Solution
          </h2>
          <div style={{
            background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "32px 36px",
          }}>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px" }}>
              I built a concept app that turns a one-day ride event into a connected, gamified experience.
              The key insight was the <strong style={{ color: T.primary }}>Scavenger Hunt</strong> — a Survivor-style
              challenge where QR codes hidden around the venue each reveal a word in a secret phrase. Whoever
              cracks it first wins prizes.
            </p>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px" }}>
              This gave us a <strong style={{ color: T.text }}>legitimate reason to have every attendee download the app</strong>.
              It wasn't a data grab — it was a game people actually wanted to play. And once they were in, they
              were sharing socials, uploading photos, and giving us real-time feedback on the event — all voluntarily.
            </p>
            <p style={{ fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.8, margin: 0 }}>
              The scavenger hunt is designed to make you have a good time in a group of people. It's competitive
              enough to be exciting but collaborative enough that strangers end up working together.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700, margin: "0 0 40px", color: T.text, textAlign: "center",
          }}>
            What's Inside
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20,
          }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  background: T.surface, borderRadius: 16,
                  border: `1px solid ${hoveredFeature === i ? "rgba(245,158,11,0.3)" : T.border}`,
                  padding: "28px 24px",
                  transition: "all 0.3s ease",
                  transform: hoveredFeature === i ? "translateY(-4px)" : "none",
                  boxShadow: hoveredFeature === i ? "0 12px 40px rgba(245,158,11,0.1)" : "none",
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: T.font, fontSize: 18, fontWeight: 700,
                  color: T.text, margin: "0 0 10px",
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: T.font, fontSize: 14, color: T.textDim, lineHeight: 1.7, margin: 0,
                }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical highlight */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(59,130,246,0.08) 100%)",
            borderRadius: 16, border: `1px solid rgba(245,158,11,0.15)`,
            padding: "36px 36px",
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: T.display, fontSize: 24, fontWeight: 700,
              color: T.text, margin: "0 0 16px",
            }}>
              One File. Zero Dependencies.
            </h3>
            <p style={{
              fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8,
              margin: "0 0 8px", maxWidth: 560, marginLeft: "auto", marginRight: "auto",
            }}>
              The entire prototype is a fully functional React app running as a single standalone HTML file —
              no backend, no build tools, no dependencies beyond React via CDN. Every screen is interactive,
              the scavenger hunt randomizes per user, social links open real profiles, and the whole thing
              deploys straight to GitHub Pages.
            </p>
            <p style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 600, color: T.primary, margin: 0,
            }}>
              It was designed to sell a concept to a real client — and it got funded.
            </p>
          </div>
        </div>
      </section>

      {/* Role / Credits */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20,
          }}>
            {[
              { label: "Role", value: "Sole Designer & Developer" },
              { label: "Client", value: "Sea-Doo (via Rooted Creative Agency)" },
              { label: "Stack", value: "React 18, Inline SVG, CSS-in-JS, GitHub Pages" },
            ].map((item) => (
              <div key={item.label} style={{
                background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`,
                padding: "20px 24px",
              }}>
                <div style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, color: T.textFaint, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 600, color: T.text }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 100px", textAlign: "center" }}>
        <a
          href="https://diegs12.github.io/UNCHARTED/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 700, textDecoration: "none",
            padding: "16px 40px", borderRadius: 12,
            background: T.primary, color: T.bg,
            boxShadow: `0 4px 20px rgba(245,158,11,0.3)`,
            display: "inline-flex", alignItems: "center", gap: 10,
          }}
        >
          Launch the Prototype
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${T.border}`, padding: "32px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, maxWidth: 800, margin: "0 auto",
      }}>
        <Link to="/" style={{
          fontFamily: T.font, fontSize: 13, color: T.textFaint, textDecoration: "none",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Vallota Ventures
        </Link>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.textFaint }}>
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
