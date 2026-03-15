import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#FAF7F2", surface: "#FFFFFF", surfaceAlt: "#F0EDE6", border: "#E2DDD4",
  navy: "#1B2A4A", gold: "#B8963E", text: "#1B2A4A", textDim: "#4A5876",
  textFaint: "#8B95A5", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const SIDEBAR_W = 240;

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link to="/" style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%", textDecoration: "none",
        display: "block",
      }}>
        &larr; Back to Home
      </Link>
      <div style={{ height: 1, background: T.border, margin: "8px 0" }} />
      <a href="https://substack.com/@diegovallota" target="_blank" rel="noopener noreferrer" style={{
        fontFamily: T.font, fontSize: 13, fontWeight: 500, textDecoration: "none",
        color: T.textFaint, padding: "6px 0",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
        </svg>
        Substack
      </a>
      <a href="https://www.instagram.com/diegovallota/" target="_blank" rel="noopener noreferrer" style={{
        fontFamily: T.font, fontSize: 13, fontWeight: 500, textDecoration: "none",
        color: T.textFaint, padding: "6px 0",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
        Instagram
      </a>
      <a href="https://www.linkedin.com/in/diego-vallota/" target="_blank" rel="noopener noreferrer" style={{
        fontFamily: T.font, fontSize: 13, fontWeight: 500, textDecoration: "none",
        color: T.textFaint, padding: "6px 0",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
      <a href="mailto:diego@vallotaventures.com" style={{
        fontFamily: T.font, fontSize: 13, fontWeight: 500, textDecoration: "none",
        color: T.textFaint, padding: "6px 0",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13 2 4" />
        </svg>
        Contact
      </a>
    </>
  );

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* SIDEBAR (desktop) */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: SIDEBAR_W, height: "100vh",
        background: T.surface, borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column", padding: "32px 28px",
        zIndex: 100, boxSizing: "border-box",
      }}
        className="vv-sidebar"
      >
        <Link to="/" style={{ marginBottom: 40, display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/vv-logo.png"
            alt="Vallota Ventures"
            style={{ width: 64, height: "auto", marginBottom: 10 }}
          />
          <span style={{
            fontFamily: T.display, fontSize: 16, fontWeight: 700,
            color: T.navy, letterSpacing: 3,
          }}>
            VALLOTA
          </span>
          <span style={{
            fontFamily: T.font, fontSize: 8.5, fontWeight: 500,
            color: T.textDim, letterSpacing: 5.5, textTransform: "uppercase",
          }}>
            VENTURES
          </span>
        </Link>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {navLinks}
        </div>

        <div style={{
          paddingTop: 20, borderTop: `1px solid ${T.border}`, marginTop: 20,
        }}>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textFaint }}>
            &copy; 2026 Vallota Ventures
          </span>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <div className="vv-mobile-header" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 60,
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        display: "none", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", zIndex: 100,
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/vv-logo.png" alt="Vallota Ventures" style={{ height: 36, width: "auto" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{
              fontFamily: T.display, fontSize: 15, fontWeight: 700, color: T.navy,
            }}>
              VALLOTA
            </span>
            <span style={{
              fontFamily: T.font, fontSize: 8, fontWeight: 500,
              color: T.textDim, letterSpacing: 3, textTransform: "uppercase",
            }}>
              VENTURES
            </span>
          </div>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 4,
          color: T.navy,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileMenuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="vv-mobile-menu" style={{
          position: "fixed", top: 60, left: 0, right: 0, bottom: 0,
          background: T.surface, zIndex: 99, padding: "24px 20px",
          display: "flex", flexDirection: "column", gap: 4,
          overflowY: "auto",
        }}>
          {navLinks}
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="vv-main" style={{ marginLeft: SIDEBAR_W }}>

        {/* INTRO CARD */}
        <section style={{ padding: "100px 48px 0", maxWidth: 960 }}>
          <div style={{
            background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "48px 40px", marginBottom: 28,
            display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap",
          }}>
            <div style={{
              flex: "0 0 auto", width: 200, height: 260,
              borderRadius: 14, overflow: "hidden",
              border: `1px solid ${T.border}`,
              margin: "0 auto",
            }}>
              <img
                src="/diego.jpg"
                alt="Diego Vallota"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{
                fontFamily: T.display, fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", color: T.navy,
              }}>
                About Me
              </h2>
              <p style={{
                fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, margin: "0 0 20px",
              }}>
                I'm Diego, a UNC Chapel Hill economics and cognitive science grad, Revenue
                and Growth Analyst at a sports marketing agency in Cincinnati, and the founder
                of Vallota Ventures. My day job sits at the intersection of marketing, finance,
                and operations. My nights and weekends go into training for the Chicago and NYC
                marathons this fall (donate{" "}
                <a href="mailto:diego@vallotaventures.com" style={{ color: T.gold, textDecoration: "underline" }}>here</a>{" "}
                if you're looking to support a good cause and grab a tax writeoff. Shameless
                plugs are always allowed on personal websites, right?).
              </p>
              <p style={{
                fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, margin: 0,
              }}>
                At work, I'm implementing new AI tools on a weekly basis: automating estimate
                creation, streamlining our script writing and storyboarding process, and building
                out databases to manage the contractors we work with. I like breaking down complex
                problems into manageable parts and tackling them in a sequence where each step
                makes the next one easier. Every project on this site started the same way: a real
                problem I watched someone waste time or money on, turned into something that
                actually works.
              </p>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* WHAT I'VE BUILT */}
        <section style={{ padding: "80px 48px", maxWidth: 960 }}>
          <div style={{
            background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "40px 40px 44px", marginBottom: 28,
          }}>
            <h3 style={{
              fontFamily: T.display, fontSize: 22, fontWeight: 700,
              color: T.navy, margin: "0 0 8px",
            }}>
              What I've Built and Why It Matters
            </h3>
            <p style={{
              fontFamily: T.font, fontSize: 14, color: T.textFaint, margin: "0 0 28px", lineHeight: 1.7,
            }}>
              Each project solves a specific operational problem. Here's the work behind the cards.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  label: "Vela",
                  accent: T.gold,
                  text: "Most couples spend 30+ minutes debating where to go on date night, then default to the same three places. Vela replaces that entire decision loop. A 2-minute personality quiz generates a ranked list of 154+ date ideas tailored to your partner, then builds the full plan: step-by-step instructions, shopping lists, budget, and a calendar invite sent directly to their inbox. It's live, free, and people are using it.",
                },
                {
                  label: "Vallota Trading",
                  accent: "#00D4FF",
                  text: "A fully autonomous crypto trading bot running 24/7 on Railway. It pairs Claude for trade decisions with Grok for real-time sentiment analysis, layered on top of computed technical indicators (RSI, MACD, Bollinger Bands) across multiple timeframes. The bot reviews its own trades, learns from mistakes through a self-review loop, and syncs shared lessons to a knowledge base. This isn't a demo. It's executing paper trades on Coinbase Base L2 right now.",
                },
                {
                  label: "Personal Command Center",
                  accent: "#10B981",
                  text: "A full-stack personal command center for tracking finances, tasks, habits, workouts, and goals in one place. The real differentiator: an AI-integrated API that lets any LLM create tasks, log habits, and update progress on your behalf. It turns your personal dashboard into something your AI tools can actually write to.",
                },
                {
                  label: "UNCHARTED",
                  accent: "#F59E0B",
                  text: "A concept app I built for Sea-Doo's experiential marketing events: gamified scavenger hunts, crew leaderboards, and live photo feeds designed to solve the data collection problem that plagues experiential campaigns. I pitched it, and it got funded.",
                },
              ].map((item) => (
                <div key={item.label} style={{
                  padding: "20px 24px", borderRadius: 12,
                  background: T.bg, border: `1px solid ${T.border}`,
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: item.accent,
                      boxShadow: `0 0 8px ${item.accent}66`,
                    }} />
                    <span style={{
                      fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.navy,
                    }}>
                      {item.label}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: T.font, fontSize: 14, color: T.textDim,
                    lineHeight: 1.75, margin: 0,
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PERSONAL + CTA */}
          <div style={{
            background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "36px 40px",
          }}>
            <p style={{
              fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, margin: "0 0 8px",
            }}>
              Outside of work, I've completed two Ironman 70.3 triathlons and I'm always
              training for the next thing. Same mindset applies to how I build: pick
              something hard, commit, and ship it.
            </p>
            <p style={{
              fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, margin: 0,
            }}>
              If you're a business owner tired of hearing about AI without seeing results,
              or a team that needs someone who can actually build and ship, let's talk.
            </p>
            <div style={{
              marginTop: 28, paddingTop: 24,
              borderTop: `1px solid ${T.border}`,
              display: "flex", gap: 20, flexWrap: "wrap",
            }}>
              <a href="mailto:diego@vallotaventures.com" style={{
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.navy, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                diego@vallotaventures.com
              </a>
              <a href="https://substack.com/@diegovallota" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.navy, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Substack
              </a>
              <a href="https://www.instagram.com/diegovallota/" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.navy, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/diego-vallota/" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.navy, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: `1px solid ${T.border}`, padding: "40px 48px",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 16,
        }}>
          <img
            src="/vv-logo-full.png"
            alt="Vallota Ventures"
            style={{ height: 48, width: "auto", opacity: 0.7 }}
          />
          <span style={{ fontFamily: T.font, fontSize: 13, color: T.textFaint }}>
            &copy; 2026 Vallota Ventures &middot; Built by Diego Vallota
          </span>
        </footer>
      </main>

      {/* RESPONSIVE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .vv-sidebar { display: none !important; }
          .vv-mobile-header { display: flex !important; }
          .vv-main { margin-left: 0 !important; padding-top: 60px; }
          .vv-main section, .vv-main footer, .vv-main > div { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (min-width: 769px) {
          .vv-mobile-header { display: none !important; }
          .vv-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
