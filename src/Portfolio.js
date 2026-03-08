import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  bg: "#0A0A0B", surface: "#141416", surfaceAlt: "#1C1C1F", border: "#2A2A2E",
  primary: "#D68853", accent: "#D68853", text: "#F5F0EB", textDim: "#A39E98",
  textFaint: "#6B6560", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);

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
      statusColor: "#4ADE80",
      link: sessions.vela ? "/vela" : "/vela",
      dashboardLink: "/vela",
      hasSession: sessions.vela,
      external: false,
      gradient: "linear-gradient(135deg, #D68853 0%, #8B4A28 100%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#D68853" fillOpacity="0.15" />
          <path d="M20 10C20 10 14 18 14 24C14 27.3 16.7 30 20 30C23.3 30 26 27.3 26 24C26 18 20 10 20 10Z" fill="#D68853" />
          <path d="M20 16C20 16 17 21 17 24.5C17 26.2 18.3 27.5 20 27.5C21.7 27.5 23 26.2 23 24.5C23 21 20 16 20 16Z" fill="#FFD0A1" fillOpacity="0.5" />
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
      statusColor: "#4ADE80",
      link: "/tracker",
      dashboardLink: null,
      hasSession: false,
      external: false,
      gradient: "linear-gradient(135deg, #10B981 0%, #065F46 100%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#10B981" fillOpacity="0.15" />
          <rect x="12" y="12" width="7" height="7" rx="1.5" fill="#10B981" />
          <rect x="21" y="12" width="7" height="7" rx="1.5" fill="#10B981" fillOpacity="0.6" />
          <rect x="12" y="21" width="7" height="7" rx="1.5" fill="#10B981" fillOpacity="0.6" />
          <rect x="21" y="21" width="7" height="7" rx="1.5" fill="#10B981" fillOpacity="0.3" />
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
      statusColor: "#4ADE80",
      link: sessions.trading ? "/trading/dashboard" : "/trading",
      dashboardLink: "/trading/dashboard",
      hasSession: sessions.trading,
      external: false,
      gradient: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#6366F1" fillOpacity="0.15" />
          <path d="M12 26L17 20L21 23L28 14" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 14H28V18" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "20px 24px", maxWidth: 1040, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: T.display, fontSize: 20, fontWeight: 700,
          color: T.text, letterSpacing: 0.5,
        }}>
          Vallota Ventures
        </span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#projects" style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 500,
            color: T.textDim, textDecoration: "none",
          }}>
            Projects
          </a>
          <a href="#about" style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 500,
            color: T.textDim, textDecoration: "none",
          }}>
            About
          </a>
          <a href="mailto:diego@vallotaventures.com" style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 600, textDecoration: "none",
            padding: "8px 20px", borderRadius: 6,
            border: `1px solid ${T.border}`, color: T.textDim,
          }}>
            Contact
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        padding: "100px 24px 80px", maxWidth: 1040, margin: "0 auto",
      }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{
            display: "inline-block", marginBottom: 24,
            padding: "6px 14px", borderRadius: 20,
            background: "rgba(214,136,83,0.08)", border: "1px solid rgba(214,136,83,0.12)",
            fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: 1.5,
            color: T.primary, textTransform: "uppercase",
          }}>
            Builder &middot; Strategist
          </div>

          <h1 style={{
            fontFamily: T.display, fontSize: "clamp(40px, 7vw, 64px)",
            fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", color: T.text,
          }}>
            Hi, I'm{" "}
            <span style={{
              background: "linear-gradient(90deg, #FFD0A1, #D68853)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
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

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#projects" style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 700, textDecoration: "none",
              padding: "14px 32px", borderRadius: 8,
              background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)",
              color: "#141414",
              boxShadow: "0 4px 12px rgba(139,74,40,0.25), inset 0 1px 0 rgba(255,208,161,0.3)",
            }}>
              View Projects
            </a>
            <a href="https://github.com/Diegs12" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 600, textDecoration: "none",
              padding: "14px 32px", borderRadius: 8,
              border: `1px solid ${T.border}`, color: T.textDim, background: "transparent",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="https://substack.com/@diegovallota" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: T.font, fontSize: 15, fontWeight: 600, textDecoration: "none",
              padding: "14px 32px", borderRadius: 8,
              border: `1px solid ${T.border}`, color: T.textDim, background: "transparent",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
              Substack
            </a>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div style={{
        maxWidth: 1040, margin: "0 auto", padding: "0 24px",
      }}>
        <div style={{ height: 1, background: T.border }} />
      </div>

      {/* ─── PROJECTS ─── */}
      <section id="projects" style={{
        padding: "80px 24px", maxWidth: 1040, margin: "0 auto",
      }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 12px", color: T.text,
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
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
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
                  border: `1px solid ${isHovered && isLive ? T.primary : T.border}`,
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  transform: isHovered && isLive ? "translateY(-4px)" : "none",
                  boxShadow: isHovered && isLive
                    ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(214,136,83,0.1)"
                    : "0 2px 8px rgba(0,0,0,0.2)",
                  cursor: isLive ? "pointer" : "default",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                {/* Card Header / Preview Area */}
                <div style={{
                  height: 160, background: app.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
                  }} />
                  <span style={{
                    fontFamily: T.display, fontSize: 32, fontWeight: 700,
                    color: "rgba(255,255,255,0.9)", letterSpacing: 1,
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
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
                        color: T.text, margin: 0,
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
                      background: `${app.statusColor}15`,
                      color: app.statusColor,
                      border: `1px solid ${app.statusColor}30`,
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
                        color: app.hasSession ? "#4ADE80" : T.primary,
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
        padding: "80px 24px", maxWidth: 1040, margin: "0 auto",
      }}>
        <div style={{
          background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
          padding: "48px 40px", maxWidth: 800, margin: "0 auto",
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
              fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", color: T.text,
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
                color: T.primary, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                diego@vallotaventures.com
              </a>
              <a href="https://github.com/Diegs12" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.primary, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a href="https://substack.com/@diegovallota" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.primary, textDecoration: "none",
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
        borderTop: `1px solid ${T.border}`, padding: "32px 24px",
        maxWidth: 1040, margin: "0 auto",
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
    </div>
  );
}
