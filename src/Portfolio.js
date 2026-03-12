import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#FAF7F2", surface: "#FFFFFF", surfaceAlt: "#F0EDE6", border: "#E2DDD4",
  navy: "#1B2A4A", gold: "#B8963E", text: "#1B2A4A", textDim: "#4A5876",
  textFaint: "#8B95A5", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const SIDEBAR_W = 240;

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sessions = {
    vela: (() => { try { return !!localStorage.getItem("vela_quiz"); } catch { return false; } })(),
    trading: (() => { try { return !!localStorage.getItem("vt_session"); } catch { return false; } })(),
  };

  const apps = [
    {
      id: "vela",
      title: "Vela",
      tagline: "Date Night, Figured Out",
      description:
        "Take a 2-minute quiz about your partner. Vela scores 154+ date ideas to their personality, plans every detail, and sends a beautiful invite — all for free.",
      tags: ["React", "Vercel", "PWA"],
      status: "Live",
      link: sessions.vela ? "/vela" : "/vela",
      dashboardLink: "/vela",
      hasSession: sessions.vela,
      external: false,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={T.navy} fillOpacity="0.08" />
          <path d="M20 10C20 10 14 18 14 24C14 27.3 16.7 30 20 30C23.3 30 26 27.3 26 24C26 18 20 10 20 10Z" fill={T.navy} />
          <path d="M20 16C20 16 17 21 17 24.5C17 26.2 18.3 27.5 20 27.5C21.7 27.5 23 26.2 23 24.5C23 21 20 16 20 16Z" fill={T.gold} fillOpacity="0.5" />
        </svg>
      ),
    },
    {
      id: "pcc",
      title: "Life Tracker",
      tagline: "Personal Command Center",
      description:
        "Full-stack personal dashboard for tracking finances, tasks, habits, workouts, and goals. AI-integrated API so any LLM can create tasks, log habits, and update progress.",
      tags: ["React", "Express", "Prisma", "AI API"],
      status: "Live",
      link: "/tracker",
      dashboardLink: null,
      hasSession: false,
      external: false,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={T.navy} fillOpacity="0.08" />
          <rect x="12" y="12" width="7" height="7" rx="1.5" fill={T.navy} />
          <rect x="21" y="12" width="7" height="7" rx="1.5" fill={T.navy} fillOpacity="0.6" />
          <rect x="12" y="21" width="7" height="7" rx="1.5" fill={T.navy} fillOpacity="0.6" />
          <rect x="21" y="21" width="7" height="7" rx="1.5" fill={T.navy} fillOpacity="0.3" />
        </svg>
      ),
    },
    {
      id: "trading",
      title: "Vallota Trading",
      tagline: "AI-Powered Crypto Trading",
      description:
        "Dual-AI trading bot powered by Claude + Grok. Computed technical analysis, self-improving AI, and multi-timeframe signals — all on Coinbase Base L2.",
      tags: ["Node.js", "Claude AI", "Grok", "Crypto"],
      status: "Live",
      link: sessions.trading ? "/trading/dashboard" : "/trading",
      dashboardLink: "/trading/dashboard",
      hasSession: sessions.trading,
      external: false,
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={T.navy} fillOpacity="0.08" />
          <path d="M12 26L17 20L21 23L28 14" stroke={T.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 14H28V18" stroke={T.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <button onClick={() => scrollTo("projects")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        Projects
      </button>
      <button onClick={() => scrollTo("about")} style={{
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
        fontFamily: T.font, fontSize: 14, fontWeight: 500,
        color: T.textDim, padding: "8px 0", width: "100%",
      }}>
        About
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

      {/* ─── SIDEBAR (desktop) ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: SIDEBAR_W, height: "100vh",
        background: T.surface, borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column", padding: "32px 28px",
        zIndex: 100, boxSizing: "border-box",
      }}
        className="vv-sidebar"
      >
        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <img
            src="/vv-logo.png"
            alt="Vallota Ventures"
            style={{ width: "100%", maxWidth: 160, height: "auto", marginBottom: 12 }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{
              fontFamily: T.display, fontSize: 20, fontWeight: 700,
              color: T.navy, letterSpacing: 0.5,
            }}>
              VALLOTA
            </span>
            <span style={{
              fontFamily: T.font, fontSize: 10, fontWeight: 500,
              color: T.textDim, letterSpacing: 4, textTransform: "uppercase",
            }}>
              VENTURES
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {navLinks}
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: 20, borderTop: `1px solid ${T.border}`, marginTop: 20,
        }}>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textFaint }}>
            &copy; 2026 Vallota Ventures
          </span>
        </div>
      </nav>

      {/* ─── MOBILE HEADER ─── */}
      <div className="vv-mobile-header" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 60,
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        display: "none", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/vv-logo.png" alt="Vallota Ventures" style={{ height: 32, width: "auto" }} />
          <span style={{
            fontFamily: T.display, fontSize: 16, fontWeight: 700, color: T.navy,
          }}>
            VALLOTA
          </span>
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

      {/* ─── MOBILE MENU DROPDOWN ─── */}
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

      {/* ─── MAIN CONTENT ─── */}
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
              Builder &middot; Strategist
            </div>

            <h1 style={{
              fontFamily: T.display, fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", color: T.navy,
            }}>
              Hi, I'm{" "}
              <span style={{ color: T.gold }}>
                Diego
              </span>
            </h1>

            <p style={{
              fontFamily: T.font, fontSize: 18, color: T.textDim, lineHeight: 1.8,
              margin: "0 0 40px", maxWidth: 520,
            }}>
              I build practical AI tools that solve real operational problems for businesses.
              This is the home for everything I'm building and shipping.
            </p>

            <button onClick={() => scrollTo("projects")} style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 700, cursor: "pointer",
              padding: "14px 32px", borderRadius: 8, border: "none",
              background: T.navy,
              color: "#FAF7F2",
              boxShadow: "0 4px 12px rgba(27,42,74,0.2)",
            }}>
              View Projects
            </button>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div style={{ padding: "0 48px" }}>
          <div style={{ height: 1, background: T.border }} />
        </div>

        {/* ─── PROJECTS ─── */}
        <section id="projects" style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: T.display, fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700, lineHeight: 1.15, margin: "0 0 12px", color: T.navy,
            }}>
              Projects
            </h2>
            <p style={{
              fontFamily: T.font, fontSize: 16, color: T.textDim, margin: 0, lineHeight: 1.7,
            }}>
              Apps I've built and shipped.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}>
            {apps.map((app) => {
              const isHovered = hoveredCard === app.id;
              const isLive = app.link !== null;

              const cardContent = (
                <div
                  key={app.id}
                  onMouseEnter={() => setHoveredCard(app.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: T.surface,
                    borderRadius: 16,
                    border: `1px solid ${isHovered && isLive ? T.navy : T.border}`,
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    transform: isHovered && isLive ? "translateY(-4px)" : "none",
                    boxShadow: isHovered && isLive
                      ? "0 12px 40px rgba(27,42,74,0.12), 0 0 0 1px rgba(27,42,74,0.08)"
                      : "0 2px 8px rgba(27,42,74,0.06)",
                    cursor: isLive ? "pointer" : "default",
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  {/* Card Header */}
                  <div style={{
                    height: 160, background: T.navy,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                    }} />
                    <span style={{
                      fontFamily: T.display, fontSize: 32, fontWeight: 700,
                      color: "rgba(250,247,242,0.9)", letterSpacing: 1,
                    }}>
                      {app.title}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "24px 24px 28px" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
                    }}>
                      {app.icon}
                      <div>
                        <h3 style={{
                          fontFamily: T.font, fontSize: 18, fontWeight: 700,
                          color: T.navy, margin: 0,
                        }}>
                          {app.title}
                        </h3>
                        <span style={{
                          fontFamily: T.font, fontSize: 13, color: T.textDim,
                        }}>
                          {app.tagline}
                        </span>
                      </div>
                      <span style={{
                        marginLeft: "auto",
                        fontFamily: T.font, fontSize: 11, fontWeight: 600,
                        padding: "4px 10px", borderRadius: 12,
                        background: "rgba(27,42,74,0.06)",
                        color: T.navy,
                        border: `1px solid rgba(27,42,74,0.12)`,
                        letterSpacing: 0.3,
                      }}>
                        {app.status}
                      </span>
                    </div>

                    <p style={{
                      fontFamily: T.font, fontSize: 14, color: T.textDim,
                      lineHeight: 1.7, margin: "0 0 20px",
                    }}>
                      {app.description}
                    </p>

                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {app.tags.map((tag) => (
                          <span key={tag} style={{
                            fontFamily: T.font, fontSize: 11, fontWeight: 500,
                            padding: "4px 10px", borderRadius: 6,
                            background: T.surfaceAlt, color: T.textFaint,
                            border: `1px solid ${T.border}`,
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {isLive && (
                        <span style={{
                          fontFamily: T.font, fontSize: 13, fontWeight: 600,
                          color: app.hasSession ? T.gold : T.navy,
                          display: "flex", alignItems: "center", gap: 4,
                        }}>
                          {app.hasSession ? "Open Dashboard" : "Launch"}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );

              if (isLive) {
                return (
                  <Link key={app.id} to={app.link} style={{ textDecoration: "none", color: "inherit" }}>
                    {cardContent}
                  </Link>
                );
              }
              return cardContent;
            })}
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" style={{
          padding: "80px 48px", maxWidth: 960,
        }}>
          <div style={{
            background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "48px 40px",
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
                I'm Diego, a Revenue and Growth Analyst at a sports marketing agency in
                Cincinnati, a UNC Chapel Hill economics grad, and the founder of Vallota
                Ventures. I spend my days at the intersection of marketing, finance, and
                operations, building systems that help businesses grow smarter. Outside of
                work, I'm big into fitness. I've completed two Ironman 70.3s and I'm always
                training for something.
              </p>
              <p style={{
                fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, margin: 0,
              }}>
                Vallota Ventures is where I build practical AI tools that solve real
                operational problems for businesses. From voice agents that answer phones
                and qualify leads, to automation systems that eliminate repetitive work.
                This site is the home for everything I'm building. If you're here, you're
                probably looking for a smarter way to run your business. That's exactly
                what I'm working on.
              </p>
              <div style={{
                marginTop: 28, paddingTop: 24,
                borderTop: `1px solid ${T.border}`,
                display: "flex", gap: 24, flexWrap: "wrap",
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
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          borderTop: `1px solid ${T.border}`, padding: "32px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: T.font, fontSize: 13, color: T.textFaint }}>
            &copy; 2026 Vallota Ventures
          </span>
          <span style={{ fontFamily: T.font, fontSize: 13, color: T.textFaint }}>
            Built by Diego Vallota
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
        }
        @media (min-width: 769px) {
          .vv-mobile-header { display: none !important; }
          .vv-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
