import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#FAF7F2", surface: "#FFFFFF", surfaceAlt: "#F0EDE6", border: "#E2DDD4",
  navy: "#1B2A4A", gold: "#B8963E", text: "#1B2A4A", textDim: "#4A5876",
  textFaint: "#8B95A5", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const SIDEBAR_W = 240;

const frameworkSteps = [
  {
    num: "01",
    title: "Find Where You're Slow or Expensive",
    body: "Every business has bottlenecks. Lead follow-up that takes hours. Content production that takes a week. Proposal generation that needs a senior person. Those are the targets.",
  },
  {
    num: "02",
    title: "Find Every Decision in the Process",
    body: "Inside each bottleneck, map out every individual decision being made. Who decides what to say to this lead? Who decides which content to produce? Who decides the pricing? Each decision is a separate question.",
  },
  {
    num: "03",
    title: "Ask: Can We Train a Machine to Make This Decision?",
    body: "For each decision, ask: can an AI agent do this in seconds for pennies? Most businesses are shocked at how many workflows pass this test.",
  },
  {
    num: "04",
    title: "Keep Your Prices, Pocket the Savings",
    body: "The cost of delivery dropped. The value to the client stayed the same. That gap is pure margin. Do not lower your prices just because your costs went down.",
  },
];

const audiences = [
  {
    label: "Service Agencies",
    accent: T.gold,
    text: "You sell time. AI lets you fulfill 10x more clients without hiring 10x more people. Your team becomes the quality layer, not the production layer.",
  },
  {
    label: "Local Businesses",
    accent: "#10B981",
    text: "Plumbers, HVAC, dentists. You are leaking leads because you cannot follow up fast enough. AI handles speed-to-lead in seconds, not hours. These are the companies with the biggest returns: great at what they do in person, but the backend drags them down.",
  },
  {
    label: "Content Creators",
    accent: "#00D4FF",
    text: "AI collapses the time from idea to published. Research, drafts, editing, distribution. What took a week takes a day. What took a day takes an hour.",
  },
  {
    label: "SaaS with Proprietary Data",
    accent: "#3dd98a",
    text: "If you have unique data that OpenAI does not have, AI trained on that data creates a moat nobody else can replicate. Your data is the advantage. AI is how you activate it.",
  },
];

export default function Thesis() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

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
      <button onClick={() => scrollTo("roles")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        The Problem
      </button>
      <button onClick={() => scrollTo("model")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        The New Model
      </button>
      <button onClick={() => scrollTo("framework")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        Framework
      </button>
      <button onClick={() => scrollTo("who")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        Who It's For
      </button>
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

        {/* HERO */}
        <section style={{ padding: "100px 48px 80px", maxWidth: 960 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{
              display: "inline-block", marginBottom: 24,
              padding: "6px 14px", borderRadius: 20,
              background: "rgba(184,150,62,0.08)", border: "1px solid rgba(184,150,62,0.18)",
              fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: 1.5,
              color: T.gold, textTransform: "uppercase",
            }}>
              AI Automation Thesis
            </div>

            <h1 style={{
              fontFamily: T.display, fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", color: T.navy,
            }}>
              How I Think About{" "}
              <span style={{ color: T.gold }}>AI and Business</span>
            </h1>

            <p style={{
              fontFamily: T.font, fontSize: 17, color: T.textDim, lineHeight: 1.85,
              margin: 0, maxWidth: 580,
            }}>
              This is the framework behind everything I build. If you want to understand how I break down operations and decide what AI should handle, start here.
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* BUSINESSES STILL HIRE BY ROLE */}
        <section id="roles" style={{ padding: "80px 48px", maxWidth: 960 }}>
          <div style={{ maxWidth: 680 }}>
            <h2 style={{
              fontFamily: T.display, fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 700, lineHeight: 1.15, margin: "0 0 28px", color: T.navy,
            }}>
              Businesses Still Hire by Role
            </h2>
            <p style={{
              fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.85,
              margin: 0,
            }}>
              Businesses hire a marketing person, a sales person, an account manager. When you break down what each of them actually does, it is just a series of workflows and decisions that have to be made. Nobody asks whether every one of those workflows actually requires a human.
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* THE NEW MODEL */}
        <section id="model" style={{ padding: "80px 48px", maxWidth: 960 }}>
          <div style={{ maxWidth: 680 }}>
            <h2 style={{
              fontFamily: T.display, fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 700, lineHeight: 1.15, margin: "0 0 28px", color: T.navy,
            }}>
              The New Model: Map the Workflows
            </h2>
            <p style={{
              fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.85,
              margin: "0 0 40px",
            }}>
              The companies who are going to win are the ones who can decompose every role into individual workflows and ask: is this a decision that a person needs to make, or can I train a machine to make it?
            </p>

            {/* Pull-quote card */}
            <div style={{
              background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`,
              borderLeft: `4px solid ${T.gold}`,
              padding: "28px 32px", marginBottom: 32,
            }}>
              <p style={{
                fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.85,
                margin: 0, fontStyle: "italic",
              }}>
                When a business hires someone, they put in one and try to get back more than one. That is the entire game. AI changes the math. Instead of getting 2 to 3x the output from a new hire, AI lets you get 10x the output for the same input, or less. Yes, it takes real work to train these models and increase their capacity. But it also takes real work to train humans. The difference is the ceiling. A trained person gives you 2 to 3x. A trained AI gives you 10x.
              </p>
            </div>

            <p style={{
              fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.85,
              margin: 0,
            }}>
              The biggest returns are going to the companies that are already great at what they do in person. They operate face to face, they serve clients directly, they do the work. But they supercharge the backend of their workflows so they can be even more efficient, help more people, and eliminate the operational drag that used to slow them down.
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* FRAMEWORK */}
        <section id="framework" style={{ padding: "80px 48px", maxWidth: 960 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 48px", color: T.navy,
          }}>
            Four Steps to Capture the Margin
          </h2>

          <div className="vv-framework-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}>
            {frameworkSteps.map((step) => (
              <div key={step.num} style={{
                background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
                padding: "32px 28px",
              }}>
                <span style={{
                  fontFamily: T.display, fontSize: 32, fontWeight: 700,
                  color: T.gold, display: "block", marginBottom: 12,
                }}>
                  {step.num}
                </span>
                <h3 style={{
                  fontFamily: T.font, fontSize: 17, fontWeight: 700,
                  color: T.navy, margin: "0 0 12px", lineHeight: 1.4,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: T.font, fontSize: 14, color: T.textDim,
                  lineHeight: 1.75, margin: 0,
                }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* WHO IT'S FOR */}
        <section id="who" style={{ padding: "80px 48px", maxWidth: 960 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 48px", color: T.navy,
          }}>
            Who This Works For
          </h2>

          <div className="vv-who-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}>
            {audiences.map((a) => (
              <div key={a.label} style={{
                background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
                padding: "28px 24px",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: a.accent,
                    boxShadow: `0 0 8px ${a.accent}66`,
                  }} />
                  <span style={{
                    fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.navy,
                  }}>
                    {a.label}
                  </span>
                </div>
                <p style={{
                  fontFamily: T.font, fontSize: 14, color: T.textDim,
                  lineHeight: 1.75, margin: 0,
                }}>
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* CTA */}
        <section style={{ padding: "80px 48px", maxWidth: 960 }}>
          <div style={{
            background: T.navy, borderRadius: 16,
            padding: "40px 40px", textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: T.display, fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700, lineHeight: 1.2, margin: "0 0 16px", color: "#FAF7F2",
            }}>
              Want to See This Applied to Your Business?
            </h3>
            <p style={{
              fontFamily: T.font, fontSize: 15, color: "rgba(250,247,242,0.7)", lineHeight: 1.8,
              margin: "0 0 28px", maxWidth: 480, marginLeft: "auto", marginRight: "auto",
            }}>
              I will walk through your operations and show you exactly which workflows AI can handle today. No pitch deck. Just an honest breakdown.
            </p>
            <a href="mailto:diego@vallotaventures.com" style={{
              display: "inline-block",
              fontFamily: T.font, fontSize: 15, fontWeight: 700,
              padding: "14px 32px", borderRadius: 8, border: "none",
              background: T.gold, color: "#FAF7F2",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(184,150,62,0.3)",
            }}>
              Get in Touch
            </a>
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
          .vv-framework-grid { grid-template-columns: 1fr !important; }
          .vv-who-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .vv-mobile-header { display: none !important; }
          .vv-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
