import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#FAF7F2", surface: "#FFFFFF", surfaceAlt: "#F0EDE6", border: "#E2DDD4",
  navy: "#1B2A4A", gold: "#B8963E", text: "#1B2A4A", textDim: "#4A5876",
  textFaint: "#8B95A5", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const SIDEBAR_W = 240;

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <button onClick={() => scrollTo("problem")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        The Problem
      </button>
      <button onClick={() => scrollTo("how")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        How It Works
      </button>
      <button onClick={() => scrollTo("offer")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        The Offer
      </button>
      <button onClick={() => scrollTo("cta")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        Get Started
      </button>
      <div style={{ height: 1, background: T.border, margin: "8px 0" }} />
      <Link to="/thesis" onClick={() => setMobileMenuOpen(false)} style={{
        fontFamily: T.font, fontSize: 13, fontWeight: 500,
        color: T.textFaint, padding: "6px 0", width: "100%",
        textDecoration: "none", display: "block",
      }}>
        Read the Thesis
      </Link>
      <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{
        fontFamily: T.font, fontSize: 13, fontWeight: 500,
        color: T.textFaint, padding: "6px 0", width: "100%",
        textDecoration: "none", display: "block",
      }}>
        About
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
        <div style={{ marginBottom: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
        </div>

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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
        </div>
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

        {/* ─── HERO ─── */}
        <section style={{
          padding: "100px 48px 80px", maxWidth: 960,
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              display: "inline-block", marginBottom: 24,
              padding: "6px 14px", borderRadius: 20,
              background: "rgba(184,150,62,0.08)", border: "1px solid rgba(184,150,62,0.18)",
              fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: 1.5,
              color: T.gold, textTransform: "uppercase",
            }}>
              AI for Home Services
            </div>

            <h1 style={{
              fontFamily: T.display, fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", color: T.navy,
            }}>
              Never miss another after-hours job in{" "}
              <span style={{ color: T.gold }}>Cincinnati</span>.
            </h1>

            <p style={{
              fontFamily: T.font, fontSize: 18, color: T.textDim, lineHeight: 1.85,
              margin: "0 0 40px", maxWidth: 560,
            }}>
              AI receptionist that answers, qualifies, and books calls for your home service business while you're off the clock. No voicemail. No new hires.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("cta")} style={{
                fontFamily: T.font, fontSize: 15, fontWeight: 700, cursor: "pointer",
                padding: "14px 32px", borderRadius: 8, border: "none",
                background: T.navy,
                color: "#FAF7F2",
                boxShadow: "0 4px 12px rgba(27,42,74,0.2)",
              }}>
                Get Your Missed-Calls Audit
              </button>
              <button onClick={() => scrollTo("how")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.textDim, textDecoration: "underline", padding: 0,
              }}>
                See how it works
              </button>
            </div>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* ─── PAIN MATH ─── */}
        <section id="problem" style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 48px", color: T.navy,
          }}>
            You're Losing Jobs While You Sleep
          </h2>

          <div className="vv-pain-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 40,
          }}>
            {[
              { number: "87", label: "after-hours calls last month" },
              { number: "31", label: "went to voicemail" },
              { number: "0", label: "of those people left a message" },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
                padding: "32px 24px", textAlign: "center",
              }}>
                <span style={{
                  fontFamily: T.display, fontSize: 48, fontWeight: 700,
                  color: T.gold, display: "block", marginBottom: 8,
                }}>
                  {stat.number}
                </span>
                <span style={{
                  fontFamily: T.font, fontSize: 14, color: T.textDim,
                  lineHeight: 1.5,
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`,
            borderLeft: `4px solid ${T.gold}`,
            padding: "24px 28px",
          }}>
            <p style={{
              fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.85,
              margin: 0,
            }}>
              If even 3 of those were $1,500 jobs, that's <span style={{ color: T.navy, fontWeight: 700 }}>$4,500 gone</span>. Not because you did bad work. Because nobody picked up the phone.
            </p>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <button onClick={() => scrollTo("cta")} style={{
              fontFamily: T.font, fontSize: 14, fontWeight: 600, cursor: "pointer",
              padding: "12px 28px", borderRadius: 8, border: `1px solid ${T.border}`,
              background: T.surface, color: T.navy,
            }}>
              Find out how many calls you're missing
            </button>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how" style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.navy,
          }}>
            How It Works
          </h2>
          <p style={{
            fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.7,
            margin: "0 0 48px", maxWidth: 540,
          }}>
            Four steps. We handle most of it. You just keep doing what you do.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                num: "01",
                title: "Map your calls in one short session",
                body: "We sit down for 30 minutes and go through the types of calls you get, what questions people ask, your pricing ranges, and your booking rules. That's it.",
              },
              {
                num: "02",
                title: "We build and train your AI receptionist",
                body: "We create your custom AI agent with your scripts, FAQs, service areas, and scheduling logic. It sounds natural, handles objections, and knows when to escalate to you.",
              },
              {
                num: "03",
                title: "We plug it into your phone and calendar",
                body: "After hours, calls forward to your AI receptionist. It qualifies the lead, books the job if it fits your rules, and logs everything into your system.",
              },
              {
                num: "04",
                title: "You review call summaries every morning",
                body: "You wake up to a clean list of every call: who called, what they needed, whether they booked, and what was said. We tune the system weekly based on real results.",
              },
            ].map((step) => (
              <div key={step.num} style={{
                background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
                padding: "28px 32px",
                display: "flex", gap: 24, alignItems: "flex-start",
              }}>
                <span style={{
                  fontFamily: T.display, fontSize: 28, fontWeight: 700,
                  color: T.gold, flexShrink: 0, lineHeight: 1,
                  marginTop: 2,
                }}>
                  {step.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: T.font, fontSize: 17, fontWeight: 700,
                    color: T.navy, margin: "0 0 8px", lineHeight: 1.4,
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
              </div>
            ))}
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* ─── THE OFFER ─── */}
        <section id="offer" style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 48px", color: T.navy,
          }}>
            The Offer
          </h2>

          <div style={{
            background: T.surface, borderRadius: 20, border: `2px solid ${T.gold}`,
            padding: "48px 40px",
            boxShadow: "0 8px 32px rgba(184,150,62,0.08)",
          }}>
            <h3 style={{
              fontFamily: T.display, fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700, lineHeight: 1.2, margin: "0 0 32px", color: T.navy,
            }}>
              After-Hours AI Receptionist for Contractors
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                "We answer every call after 6 pm",
                "We qualify and book jobs based on your rules",
                "We log every call into your system with a summary",
                "Weekly tuning calls to improve accuracy",
              ].map((item) => (
                <div key={item} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke={T.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span style={{
                    fontFamily: T.font, fontSize: 16, color: T.navy, fontWeight: 500,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              background: T.bg, borderRadius: 12, padding: "20px 24px",
              border: `1px solid ${T.border}`, marginBottom: 32,
            }}>
              <p style={{
                fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8,
                margin: 0,
              }}>
                <span style={{ fontWeight: 700, color: T.navy }}>30-day money-back guarantee:</span> if you're not happy with the results after 30 days, you don't pay a dime.
              </p>
            </div>

            <p style={{
              fontFamily: T.font, fontSize: 14, color: T.textFaint, lineHeight: 1.7,
              margin: "0 0 28px",
            }}>
              Flat monthly fee, usually covered by 1 to 2 extra jobs per month.
            </p>

            <button onClick={() => scrollTo("cta")} style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 700, cursor: "pointer",
              padding: "14px 32px", borderRadius: 8, border: "none",
              background: T.navy,
              color: "#FAF7F2",
              boxShadow: "0 4px 12px rgba(27,42,74,0.2)",
            }}>
              Get Your Missed-Calls Audit
            </button>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* ─── PROOF ─── */}
        <section style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.navy,
          }}>
            This Is Live Right Now
          </h2>
          <p style={{
            fontFamily: T.font, fontSize: 16, color: T.textDim, lineHeight: 1.7,
            margin: "0 0 40px", maxWidth: 540,
          }}>
            I built a working AI lead qualifier that picks up calls, asks the right questions, and routes qualified leads. This is not a slide deck. It is running.
          </p>

          <div className="vv-proof-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            marginBottom: 40,
          }}>
            <div style={{
              background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
              padding: "28px 24px",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 8px rgba(16,185,129,0.5)",
                }} />
                <span style={{
                  fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.navy,
                }}>
                  Built, Not Outsourced
                </span>
              </div>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.75, margin: 0,
              }}>
                I build the AI systems myself. No white-label resellers, no third-party platforms you can't control. You get a custom system trained on your business.
              </p>
            </div>
            <div style={{
              background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
              padding: "28px 24px",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: T.gold,
                  boxShadow: `0 0 8px rgba(184,150,62,0.5)`,
                }} />
                <span style={{
                  fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.navy,
                }}>
                  Other Things I've Built
                </span>
              </div>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.75, margin: "0 0 12px",
              }}>
                Autonomous AI trading bot running 24/7. Full-stack personal command center. AI-powered date planning app with 1,000+ users. Funded experiential marketing platform.
              </p>
              <Link to="/about" style={{
                fontFamily: T.font, fontSize: 13, fontWeight: 600,
                color: T.gold, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                See all projects
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* ─── CTA ─── */}
        <section id="cta" style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <div style={{
            background: T.navy, borderRadius: 16,
            padding: "48px 40px", textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: T.display, fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700, lineHeight: 1.2, margin: "0 0 16px", color: "#FAF7F2",
            }}>
              Get Your Missed-Calls Audit
            </h3>
            <p style={{
              fontFamily: T.font, fontSize: 16, color: "rgba(250,247,242,0.7)", lineHeight: 1.8,
              margin: "0 auto 32px", maxWidth: 500,
            }}>
              I'll show you exactly how many jobs you're losing after hours and what an AI receptionist would recover. No pitch deck. Just numbers.
            </p>
            <a href="mailto:diego@vallotaventures.com" style={{
              display: "inline-block",
              fontFamily: T.font, fontSize: 16, fontWeight: 700,
              padding: "16px 40px", borderRadius: 8, border: "none",
              background: T.gold, color: "#FAF7F2",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(184,150,62,0.35)",
            }}>
              Get in Touch
            </a>
            <div style={{
              marginTop: 24, paddingTop: 20,
              borderTop: "1px solid rgba(250,247,242,0.12)",
              display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
            }}>
              <a href="https://substack.com/@diegovallota" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 13, fontWeight: 500,
                color: "rgba(250,247,242,0.6)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Substack
              </a>
              <a href="https://www.instagram.com/diegovallota/" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 13, fontWeight: 500,
                color: "rgba(250,247,242,0.6)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/diego-vallota/" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 13, fontWeight: 500,
                color: "rgba(250,247,242,0.6)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
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

      {/* ─── RESPONSIVE STYLES ─── */}
      <style>{`
        @media (max-width: 768px) {
          .vv-sidebar { display: none !important; }
          .vv-mobile-header { display: flex !important; }
          .vv-main { margin-left: 0 !important; padding-top: 60px; }
          .vv-main section, .vv-main footer, .vv-main > div { padding-left: 20px !important; padding-right: 20px !important; }
          .vv-pain-grid { grid-template-columns: 1fr !important; }
          .vv-proof-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .vv-mobile-header { display: none !important; }
          .vv-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
