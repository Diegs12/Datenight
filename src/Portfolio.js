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

  // Sessions no longer affect card links, cards always go to landing pages
  const sessions = { vela: false, trading: false }; // eslint-disable-line no-unused-vars

  const apps = [
    {
      id: "vela",
      title: "Vela",
      tagline: "Date Night, Figured Out",
      description:
        "Take a 2-minute quiz about your partner. Vela scores 154+ date ideas to their personality, plans every detail, and sends a beautiful invite. All for free.",
      tags: ["React", "Vercel", "PWA"],
      status: "Live",
      link: "/vela",
      dashboardLink: null,
      hasSession: false,
      external: false,
      gradient: "linear-gradient(135deg, #141414 0%, #1C1810 50%, #141414 100%)",
      accent: "#D68853",
      glow: "rgba(214,136,83,0.35)",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8C24 8 16 18 16 26C16 30.4 19.6 34 24 34C28.4 34 32 30.4 32 26C32 18 24 8 24 8Z" fill="rgba(255,255,255,0.9)" />
          <path d="M24 16C24 16 20 22 20 26C20 28.2 21.8 30 24 30C26.2 30 28 28.2 28 26C28 22 24 16 24 16Z" fill="#D68853" fillOpacity="0.7" />
        </svg>
      ),
    },
    {
      id: "pcc",
      title: "Personal Command Center",
      tagline: "PCC",
      description:
        "Full-stack personal dashboard for tracking finances, tasks, habits, workouts, and goals. AI-integrated API so any LLM can create tasks, log habits, and update progress.",
      tags: ["React", "Express", "Prisma", "AI API"],
      status: "Live",
      link: "/pcc",
      dashboardLink: null,
      hasSession: false,
      external: false,
      gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)",
      accent: "#10B981",
      glow: "rgba(16,185,129,0.35)",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="12" y="12" width="9" height="9" rx="2" fill="rgba(255,255,255,0.9)" />
          <rect x="24" y="12" width="9" height="9" rx="2" fill="rgba(255,255,255,0.5)" />
          <rect x="12" y="24" width="9" height="9" rx="2" fill="rgba(255,255,255,0.5)" />
          <rect x="24" y="24" width="9" height="9" rx="2" fill="#10B981" fillOpacity="0.7" />
        </svg>
      ),
    },
    {
      id: "trading",
      title: "Vallota Trading",
      tagline: "AI-Powered Crypto Trading",
      description:
        "Dual-AI trading bot powered by Claude + Grok. Computed technical analysis, self-improving AI, and multi-timeframe signals,all on Coinbase Base L2.",
      tags: ["Node.js", "Claude AI", "Grok", "Crypto"],
      status: "Live",
      link: "/trading",
      dashboardLink: "/trading/dashboard",
      hasSession: false,
      external: false,
      gradient: "linear-gradient(135deg, #0A0E17 0%, #162033 50%, #0A0E17 100%)",
      accent: "#00D4FF",
      glow: "rgba(0,212,255,0.35)",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M12 32L19 24L25 28L36 16" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 16H36V22" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="32" r="2.5" fill="rgba(255,255,255,0.5)" />
          <circle cx="19" cy="24" r="2.5" fill="rgba(255,255,255,0.5)" />
          <circle cx="25" cy="28" r="2.5" fill="rgba(255,255,255,0.5)" />
          <circle cx="36" cy="16" r="2.5" fill="#00D4FF" />
        </svg>
      ),
    },
    {
      id: "uncharted",
      title: "UNCHARTED",
      tagline: "Sea-Doo Experiential App",
      description:
        "A concept app I built for Sea-Doo's experiential events: gamified scavenger hunts, crew boards, and live photo feeds that solved the data collection problem. Pitched it, got it funded.",
      tags: ["React 18", "Concept", "Experiential"],
      status: "Funded",
      link: "/uncharted",
      dashboardLink: null,
      hasSession: false,
      external: false,
      gradient: "linear-gradient(135deg, #0a0a0a 0%, #0f1a12 50%, #0a0a0a 100%)",
      accent: "#3dd98a",
      glow: "rgba(61,217,138,0.35)",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 10L28 18L37 19.5L30.5 25.8L32 35L24 30.5L16 35L17.5 25.8L11 19.5L20 18L24 10Z" fill="rgba(255,255,255,0.9)" />
          <path d="M24 16L26.5 21L32 21.8L28 25.6L29 31L24 28.2L19 31L20 25.6L16 21.8L21.5 21L24 16Z" fill="#3dd98a" fillOpacity="0.6" />
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
              fontFamily: T.font, fontSize: 17, color: T.textDim, lineHeight: 1.85,
              margin: "0 0 40px", maxWidth: 560,
            }}>
              I take on complex operational problems and build AI tools that fix them.
              Everything below is something I designed, built, and shipped, each for a
              different reason. Some were built for clients, some for curiosity, some just
              because the problem bugged me. They're all live and working right now. Click
              into any project to see the thinking, the product, and a demo.
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

          <div className="vv-projects-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 28,
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
                    borderRadius: 20,
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isHovered && isLive ? "translateY(-8px) scale(1.02)" : "none",
                    boxShadow: isHovered && isLive
                      ? `0 20px 60px ${app.glow}, 0 0 0 1px rgba(255,255,255,0.1)`
                      : "0 4px 20px rgba(0,0,0,0.12)",
                    cursor: isLive ? "pointer" : "default",
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  {/* Full card gradient background */}
                  <div style={{
                    background: app.gradient,
                    padding: "36px 28px 32px",
                    position: "relative",
                    overflow: "hidden",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    {/* Ambient glow orb */}
                    <div style={{
                      position: "absolute",
                      top: -40, right: -40,
                      width: 180, height: 180,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${app.glow} 0%, transparent 70%)`,
                      transition: "opacity 0.35s ease",
                      opacity: isHovered ? 0.8 : 0.3,
                      pointerEvents: "none",
                    }} />
                    {/* Secondary glow */}
                    <div style={{
                      position: "absolute",
                      bottom: -60, left: -30,
                      width: 160, height: 160,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${app.glow} 0%, transparent 70%)`,
                      opacity: isHovered ? 0.4 : 0.1,
                      transition: "opacity 0.35s ease",
                      pointerEvents: "none",
                    }} />

                    {/* Top row: icon + status */}
                    <div style={{
                      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                      marginBottom: 28, position: "relative", zIndex: 1,
                    }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: 16,
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.35s ease",
                        transform: isHovered ? "scale(1.08)" : "none",
                        boxShadow: isHovered ? `0 8px 24px ${app.glow}` : "none",
                      }}>
                        {app.icon}
                      </div>
                      <span style={{
                        fontFamily: T.font, fontSize: 11, fontWeight: 600,
                        padding: "5px 12px", borderRadius: 20,
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        color: app.accent,
                        border: `1px solid ${app.accent}33`,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: app.accent,
                          boxShadow: `0 0 8px ${app.accent}`,
                        }} />
                        {app.status}
                      </span>
                    </div>

                    {/* Title + tagline */}
                    <div style={{ position: "relative", zIndex: 1, marginBottom: 16 }}>
                      <h3 style={{
                        fontFamily: T.display, fontSize: 26, fontWeight: 700,
                        color: "#FFFFFF", margin: "0 0 6px", letterSpacing: 0.3,
                      }}>
                        {app.title}
                      </h3>
                      <span style={{
                        fontFamily: T.font, fontSize: 14, fontWeight: 500,
                        color: app.accent, letterSpacing: 0.3,
                      }}>
                        {app.tagline}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontFamily: T.font, fontSize: 14,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.7, margin: "0 0 24px",
                      position: "relative", zIndex: 1,
                      flex: 1,
                    }}>
                      {app.description}
                    </p>

                    {/* Divider */}
                    <div style={{
                      height: 1,
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                      marginBottom: 20,
                      position: "relative", zIndex: 1,
                    }} />

                    {/* Tags + Launch */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      position: "relative", zIndex: 1,
                    }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {app.tags.map((tag) => (
                          <span key={tag} style={{
                            fontFamily: T.font, fontSize: 11, fontWeight: 500,
                            padding: "4px 10px", borderRadius: 8,
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.45)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {isLive && (
                        <span style={{
                          fontFamily: T.font, fontSize: 13, fontWeight: 600,
                          color: app.accent,
                          display: "flex", alignItems: "center", gap: 6,
                          transition: "all 0.25s ease",
                          transform: isHovered ? "translateX(4px)" : "none",
                        }}>
                          {app.hasSession ? "Dashboard" : "Launch"}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transition: "transform 0.25s ease", transform: isHovered ? "translateX(2px)" : "none" }}>
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
                  <Link key={app.id} to={app.link} style={{ textDecoration: "none", color: "inherit", display: "flex" }}>
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
          {/* Intro card */}
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
                I'm Diego, a UNC Chapel Hill economics grad, Revenue and Growth Analyst
                at a sports marketing agency in Cincinnati, and the founder of Vallota Ventures.
                My day job sits at the intersection of marketing, finance, and operations. My
                nights and weekends go into building AI-powered tools that solve the problems
                I see businesses struggling with every day.
              </p>
              <p style={{
                fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8, margin: 0,
              }}>
                I don't build for the sake of building. Every project on this site started
                with a real problem, something I watched a business waste time or money on,
                and turned into a working product. I'm actively looking for companies that
                want to stop talking about AI and start using it.
              </p>
            </div>
          </div>

          {/* What I've Built - value highlights */}
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
              Each project solves a specific operational problem. Here's the work behind the cards above.
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
                  text: "A concept app I built for Sea-Doo's experiential marketing events,gamified scavenger hunts, crew leaderboards, and live photo feeds designed to solve the data collection problem that plagues experiential campaigns. I pitched it, and it got funded.",
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

          {/* Bottom,personal + CTA */}
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
          .vv-projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .vv-mobile-header { display: none !important; }
          .vv-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
