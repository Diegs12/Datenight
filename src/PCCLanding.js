import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const T = {
  bg: "#F8F6F3", surface: "#FFFFFF", surfaceAlt: "#F0EDE8", border: "#E5E2DD",
  primary: "#10B981", accent: "#10B981", text: "#1A1A1A", textDim: "#6B7280",
  textFaint: "#9CA3AF", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const section = { padding: "80px 24px", maxWidth: 1080, margin: "0 auto" };

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// ─── Animated Counter ───
function Counter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1200;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── FAQ Accordion Item ───
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: `1px solid ${T.border}`,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "20px 0", background: "none", border: "none",
          cursor: "pointer", display: "flex", justifyContent: "space-between",
          alignItems: "center", fontFamily: T.font, fontSize: 16, fontWeight: 600,
          color: T.text, textAlign: "left", gap: 16,
        }}
      >
        {question}
        <span style={{
          fontSize: 20, color: T.textFaint, transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0, overflow: "hidden",
        transition: "max-height 0.3s ease",
      }}>
        <p style={{
          fontFamily: T.font, fontSize: 15, color: T.textDim,
          lineHeight: 1.7, margin: 0, paddingBottom: 20,
        }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard Mockup with Tabs ───
function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Tasks", "Habits", "Finances", "Workouts"];

  const habits = [
    { name: "Workout", done: true },
    { name: "Deep Work", done: true },
    { name: "Outbound", done: false },
    { name: "Community", done: false },
    { name: "Read", done: true },
  ];
  const tasks = [
    { title: "Review Q1 budget forecast", domain: "financial", isOne: true },
    { title: "Send proposal to client", domain: "business", isOne: false },
    { title: "Update portfolio site", domain: "systems", isOne: false },
  ];
  const domainColors = {
    financial: "#FBBF24", business: "#60A5FA", systems: "#A78BFA",
    health: "#34D399", personal: "#F472B6",
  };

  return (
    <div style={{
      background: "#F8F6F3", borderRadius: 16, overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
      maxWidth: 800, margin: "0 auto", fontFamily: T.font,
    }}>
      {/* Title bar */}
      <div style={{
        background: "#1E293B", padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FBBF24" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22C55E" }} />
        <span style={{ marginLeft: 12, color: "#94A3B8", fontSize: 12, fontWeight: 500 }}>
          Personal Command Center by Vallota Ventures
        </span>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 0, borderBottom: "1px solid #E2E0DB",
        background: "#fff", padding: "0 16px",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 16px", background: "none", border: "none",
              borderBottom: activeTab === tab ? "2px solid #10B981" : "2px solid transparent",
              cursor: "pointer", fontFamily: T.font, fontSize: 12, fontWeight: 600,
              color: activeTab === tab ? "#1E293B" : "#94A3B8",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* App content */}
      <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* The One Thing */}
        <div style={{
          gridColumn: "1 / -1", background: "#FEF3C7", borderRadius: 12,
          padding: "16px 20px", border: "2px solid #F59E0B",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
            The One Thing
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1E293B" }}>
            Review Q1 budget forecast
          </div>
        </div>

        {/* Habits */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Today's Habits
          </div>
          {habits.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: h.done ? "#10B981" : "#E2E0DB",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {h.done && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>&#10003;</span>}
              </div>
              <span style={{
                fontSize: 13, color: h.done ? "#94A3B8" : "#1E293B",
                textDecoration: h.done ? "line-through" : "none", fontWeight: 500,
              }}>{h.name}</span>
            </div>
          ))}
          <div style={{ marginTop: 8, fontSize: 11, color: "#10B981", fontWeight: 600 }}>
            3/5 complete
          </div>
        </div>

        {/* Tasks */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Today's Tasks
          </div>
          {tasks.map((t, i) => (
            <div key={i} style={{
              padding: "8px 10px", borderRadius: 8, marginBottom: 6,
              background: t.isOne ? "#FFFBEB" : "#F8F6F3",
              border: t.isOne ? "1px solid #FDE68A" : "1px solid #E2E0DB",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{
                  fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
                  background: domainColors[t.domain] + "20", color: domainColors[t.domain],
                  textTransform: "uppercase", letterSpacing: 0.5,
                }}>{t.domain}</span>
                {t.isOne && <span style={{ fontSize: 9, fontWeight: 700, color: "#D97706" }}>#1</span>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1E293B" }}>{t.title}</div>
            </div>
          ))}
        </div>

        {/* Net Worth */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Net Worth
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1E293B" }}>$47,250</div>
          <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600, marginTop: 2 }}>+$1,340 this month</div>
          <div style={{ marginTop: 12, height: 40, display: "flex", alignItems: "end", gap: 3 }}>
            {[28, 32, 30, 35, 33, 38, 36, 40, 42, 45, 43, 47].map((h, i) => (
              <div key={i} style={{
                flex: 1, height: `${h}px`, borderRadius: 3,
                background: "linear-gradient(180deg, #10B981 0%, #065F46 100%)",
                opacity: 0.3 + (i / 12) * 0.7,
              }} />
            ))}
          </div>
        </div>

        {/* Weekly Workouts */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
            This Week
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
              const types = ["\u{1F3C3}", "\u{1F3CB}\u{FE0F}", "\u{1F6B4}", "\u{1F9D8}", "\u{1F3C3}", null, null];
              const done = i < 4;
              return (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8,
                  background: done ? "#F0FDF4" : "#F8F6F3",
                  border: `1px solid ${done ? "#BBF7D0" : "#E2E0DB"}`,
                }}>
                  <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>{d}</div>
                  <div style={{ fontSize: 16 }}>{types[i] || "\u2014"}</div>
                  {done && <div style={{ fontSize: 10, color: "#10B981", marginTop: 2 }}>&#10003;</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Landing Page ───
export default function PCCLanding() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // eslint-disable-line no-unused-vars
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try { localStorage.setItem("pcc_email", email.trim()); } catch {}
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "pcc" }),
      });
    } catch {}
    setTimeout(() => { navigate("/pcc/app"); }, 400);
  };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ═══════════ NAV ═══════════ */}
      <nav style={{
        padding: "16px 24px", maxWidth: 1080, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(248,246,243,0.9)", backdropFilter: "blur(12px)",
      }}>
        <Link to="/" style={{
          fontFamily: T.display, fontSize: 18, fontWeight: 700,
          color: T.textDim, textDecoration: "none", letterSpacing: 0.5,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <img src="/vv-logo.png" alt="Vallota Ventures" style={{ width: 28, height: 28, borderRadius: 6 }} />
          Vallota Ventures
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Features", id: "features" },
            { label: "Pricing", id: "pricing" },
            { label: "FAQ", id: "faq" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: T.font, fontSize: 14, fontWeight: 500,
                color: T.textDim, padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = T.text}
              onMouseLeave={(e) => e.target.style.color = T.textDim}
            >
              {link.label}
            </button>
          ))}
          <Link to="/pcc/login" style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 500,
            color: T.textDim, textDecoration: "none", transition: "color 0.2s",
          }}>
            Log In
          </Link>
          <Link to="/pcc/app" style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 600,
            padding: "8px 20px", borderRadius: 6, textDecoration: "none",
            background: T.primary, color: "#fff",
            transition: "opacity 0.2s",
          }}>
            Try Demo
          </Link>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ ...section, paddingTop: 80, paddingBottom: 40, textAlign: "center" }}>
        <h1 style={{
          fontFamily: T.display, fontSize: "clamp(36px, 7vw, 64px)",
          fontWeight: 700, lineHeight: 1.08, margin: "0 0 24px", color: T.text,
        }}>
          Your Entire Life.{" "}
          <br />
          <span style={{
            background: "linear-gradient(90deg, #6EE7B7, #10B981)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            One Dashboard.
          </span>
        </h1>

        <p style={{
          fontFamily: T.font, fontSize: 18, color: T.textDim, lineHeight: 1.8,
          maxWidth: 560, margin: "0 auto 32px",
        }}>
          Track finances, tasks, habits, workouts, and goals in one place.
          AI-integrated so your tools can talk to your life system.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <Link to="/pcc/app" style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 700, cursor: "pointer",
            padding: "14px 36px", borderRadius: 8, border: "none",
            background: "linear-gradient(180deg, #6EE7B7 0%, #10B981 40%, #065F46 100%)",
            color: "#fff", textDecoration: "none", display: "inline-block",
            boxShadow: "0 4px 12px rgba(16,185,129,0.3), inset 0 1px 0 rgba(110,231,183,0.3)",
          }}>
            Try the Demo
          </Link>
          <Link to="/pcc/login" style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 600, cursor: "pointer",
            padding: "14px 36px", borderRadius: 8, textDecoration: "none",
            border: `1px solid ${T.border}`, color: T.textDim,
            display: "inline-block",
          }}>
            Log In
          </Link>
        </div>
        <p style={{
          fontFamily: T.font, fontSize: 14, color: T.textFaint, margin: "0 0 60px",
        }}>
          Free to set up &middot; Your data stays yours &middot; AI-ready from day one
        </p>

        {/* Dashboard Preview */}
        <DashboardMockup />
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <div style={{
        borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
        padding: "28px 24px", background: T.surface,
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap",
        }}>
          {[
            { val: <Counter target={6} />, label: "Modules" },
            { val: <Counter target={30} suffix="+" />, label: "API Endpoints" },
            { val: <Counter target={0} prefix="$" />, label: "Cost" },
            { val: "AI", label: "Integrated" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: T.display, fontSize: 28, fontWeight: 700, color: T.primary }}>
                {s.val}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.textFaint, marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Up and Running in Minutes
          </h2>
          <p style={{
            fontFamily: T.font, fontSize: 16, color: T.textDim,
            maxWidth: 500, margin: "0 auto", lineHeight: 1.7,
          }}>
            Three things to set up. Then you're tracking everything.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24, maxWidth: 960, margin: "0 auto",
        }}>
          {[
            {
              step: "1", title: "Create Your Account",
              desc: "Pick a username and password. No email verification, no friction. You're in within 30 seconds.",
              details: ["Username + password", "No email required", "Instant access"],
            },
            {
              step: "2", title: "Configure Your System",
              desc: "Default habits, budget categories, and life domains are pre-loaded. Customize them or start tracking immediately.",
              details: ["Pre-loaded defaults", "6 life domains", "Budget categories ready"],
            },
            {
              step: "3", title: "Track & Connect AI",
              desc: "Start logging everything from one dashboard. Grab your API key to let Claude, ChatGPT, or any agent update your system.",
              details: ["One dashboard for all", "REST API access", "Bearer token auth"],
            },
          ].map((s, i) => (
            <div key={i} style={{
              background: T.surface, borderRadius: 16, padding: "32px 28px",
              border: `1px solid ${T.border}`, position: "relative",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)",
                fontFamily: T.display, fontSize: 18, fontWeight: 700, color: T.primary,
              }}>
                {s.step}
              </div>
              <h3 style={{
                fontFamily: T.font, fontSize: 18, fontWeight: 700,
                color: T.text, margin: "0 0 10px",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.7, margin: "0 0 16px",
              }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {s.details.map((d, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: T.primary, fontSize: 12 }}>&#10003;</span>
                    <span style={{ fontFamily: T.font, fontSize: 13, color: T.textFaint }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Everything in One System
          </h2>
          <p style={{
            fontFamily: T.font, fontSize: 16, color: T.textDim,
            maxWidth: 520, margin: "0 auto", lineHeight: 1.7,
          }}>
            Stop context-switching between five different apps. Your finances, tasks, habits, workouts, and goals,all connected.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {[
            {
              icon: "\u{1F4B0}", title: "Finances",
              desc: "Track accounts, net worth, transactions, and monthly budgets. See exactly where your money goes with category breakdowns.",
              highlight: "Net worth tracking with visual trends",
            },
            {
              icon: "\u2705", title: "Tasks",
              desc: "Kanban board with backlog, this week, today, and done columns. Set your One Thing each day to stay focused.",
              highlight: "\"The One Thing\" daily priority system",
            },
            {
              icon: "\u{1F501}", title: "Habits",
              desc: "Daily habit tracking with weekly progress. See your streaks, hit your targets, and build systems that compound.",
              highlight: "Weekly dot grid with streak tracking",
            },
            {
              icon: "\u{1F3CB}\u{FE0F}", title: "Workouts",
              desc: "Log runs, lifts, bikes, swims, and more. Weekly overview, duration tracking, and 30-day workout history.",
              highlight: "Emoji-based weekly calendar view",
            },
            {
              icon: "\u{1F3AF}", title: "Goals",
              desc: "Set targets with deadlines and track progress with visual bars. Auto-completes when you hit the number.",
              highlight: "Progress bars with quick-increment buttons",
            },
            {
              icon: "\u{1F4C5}", title: "Calendar",
              desc: "Pull in your iCal/Google Calendar events. See today's schedule alongside your tasks and habits in one daily view.",
              highlight: "6am-11pm daily timeline integration",
            },
          ].map((f, i) => (
            <div key={i} style={{
              background: T.surface, borderRadius: 14, padding: "28px 24px",
              border: `1px solid ${T.border}`,
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{
                fontFamily: T.font, fontSize: 17, fontWeight: 700,
                color: T.text, margin: "0 0 8px",
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.7, margin: "0 0 12px",
              }}>
                {f.desc}
              </p>
              <div style={{
                fontFamily: T.font, fontSize: 12, fontWeight: 600,
                color: T.primary, display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>&#9679;</span> {f.highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ AI INTEGRATION / TECHNICAL DEEP DIVE ═══════════ */}
      <section style={{ ...section, paddingTop: 100 }}>
        <div style={{
          background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`,
          padding: "56px 40px", maxWidth: 800, margin: "0 auto",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60, width: 200, height: 200,
            borderRadius: "50%", background: "rgba(16,185,129,0.05)",
            filter: "blur(40px)",
          }} />

          <div style={{
            display: "inline-block", marginBottom: 20,
            padding: "6px 14px", borderRadius: 20,
            background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
            fontFamily: T.font, fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
            color: T.primary, textTransform: "uppercase",
          }}>
            Built for the AI Era
          </div>

          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 700, lineHeight: 1.2, margin: "0 0 20px", color: T.text,
          }}>
            Your AI Can Update Your Life System
          </h2>

          <p style={{
            fontFamily: T.font, fontSize: 15, color: T.textDim, lineHeight: 1.8,
            margin: "0 0 28px", maxWidth: 560,
          }}>
            Every module is accessible through a REST API with Bearer token auth.
            Claude Code, ChatGPT, custom agents,anything that can make an HTTP request
            can create tasks, log habits, track goals, and update your finances.
          </p>

          {/* Code example */}
          <div style={{
            background: "#0D1117", borderRadius: 12, padding: "20px 24px",
            fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 13,
            lineHeight: 1.8, overflow: "auto",
            border: "1px solid #21262D",
          }}>
            <div style={{ color: "#8B949E" }}>{"// Ask any AI to add a task to your system"}</div>
            <div>
              <span style={{ color: "#FF7B72" }}>curl</span>
              <span style={{ color: "#C9D1D9" }}> -X POST </span>
              <span style={{ color: "#A5D6FF" }}>your-api.com/api/tasks</span>
            </div>
            <div>
              <span style={{ color: "#C9D1D9" }}>  -H </span>
              <span style={{ color: "#A5D6FF" }}>"Authorization: Bearer YOUR_KEY"</span>
            </div>
            <div>
              <span style={{ color: "#C9D1D9" }}>  -d </span>
              <span style={{ color: "#A5D6FF" }}>{"'{"}</span>
              <span style={{ color: "#7EE787" }}>"title"</span>
              <span style={{ color: "#C9D1D9" }}>: </span>
              <span style={{ color: "#A5D6FF" }}>"Ship the new feature"</span>
              <span style={{ color: "#A5D6FF" }}>{"}'  "}</span>
              <span style={{ color: "#10B981" }}>&#10003; 201 Created</span>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Claude Code", "ChatGPT", "Custom Agents", "Zapier", "Make"].map((tool) => (
              <span key={tool} style={{
                fontFamily: T.font, fontSize: 12, fontWeight: 500,
                padding: "6px 14px", borderRadius: 8,
                background: T.surfaceAlt, color: T.textDim,
                border: `1px solid ${T.border}`,
              }}>
                {tool}
              </span>
            ))}
          </div>

          {/* API Capabilities */}
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              "Create & update tasks",
              "Log habit completions",
              "Track goal progress",
              "Record transactions",
              "Add workout logs",
              "Query net worth",
            ].map((cap, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: T.primary, fontSize: 14 }}>&#10003;</span>
                <span style={{ fontFamily: T.font, fontSize: 13, color: T.textDim }}>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST & SECURITY ═══════════ */}
      <section style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Your Data. Your Control.
          </h2>
          <p style={{
            fontFamily: T.font, fontSize: 16, color: T.textDim,
            maxWidth: 500, margin: "0 auto", lineHeight: 1.7,
          }}>
            No ads. No data selling. No third-party analytics watching your finances. This is your personal system.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20, maxWidth: 900, margin: "0 auto",
        }}>
          {[
            {
              icon: "\u{1F512}", title: "Private by Default",
              desc: "Your financial data, habits, and goals are never shared. API keys are hashed and stored securely.",
            },
            {
              icon: "\u{1F6E1}\u{FE0F}", title: "Rate-Limited API",
              desc: "Built-in rate limiting protects your endpoints. 200 requests per 15 minutes for general use, 20 for auth.",
            },
            {
              icon: "\u{1F4E6}", title: "Self-Hostable",
              desc: "Run it on your own infrastructure. SQLite database means no external dependencies. Your data never leaves your server.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: T.surface, borderRadius: 14, padding: "28px 24px",
              border: `1px solid ${T.border}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
              <h3 style={{
                fontFamily: T.font, fontSize: 17, fontWeight: 700,
                color: T.text, margin: "0 0 8px",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.7, margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ WHO IT'S FOR ═══════════ */}
      <section style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Built for People Who Run Systems
          </h2>
          <p style={{
            fontFamily: T.font, fontSize: 16, color: T.textDim,
            maxWidth: 500, margin: "0 auto", lineHeight: 1.7,
          }}>
            If you track your life in spreadsheets, sticky notes, and five different apps,this replaces all of it.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16, maxWidth: 700, margin: "0 auto",
        }}>
          {[
            "Founders who need to track revenue, habits, and goals in one place",
            "Analysts who want their personal data as organized as their work data",
            "Athletes tracking training alongside life and career goals",
            "Anyone building AI workflows that need a personal data layer",
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "16px 20px", borderRadius: 12,
              background: T.surface, border: `1px solid ${T.border}`,
            }}>
              <span style={{ color: T.primary, fontSize: 16, marginTop: 1 }}>&#10003;</span>
              <span style={{ fontFamily: T.font, fontSize: 14, color: T.textDim, lineHeight: 1.6 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section id="pricing" style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Simple, Transparent Pricing
          </h2>
        </div>

        <div style={{
          maxWidth: 440, margin: "0 auto",
          background: T.surface, borderRadius: 20,
          border: `1px solid ${T.border}`, padding: "40px 36px",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: "linear-gradient(90deg, #6EE7B7, #10B981, #065F46)",
          }} />

          <div style={{
            fontFamily: T.font, fontSize: 14, fontWeight: 600, color: T.primary,
            textTransform: "uppercase", letterSpacing: 1, marginBottom: 16,
          }}>
            Early Access
          </div>

          <div style={{
            fontFamily: T.display, fontSize: 56, fontWeight: 700, color: T.text,
            lineHeight: 1,
          }}>
            $0
          </div>
          <div style={{
            fontFamily: T.font, fontSize: 14, color: T.textFaint, marginTop: 4, marginBottom: 28,
          }}>
            Free forever during early access
          </div>

          <div style={{
            textAlign: "left", display: "flex", flexDirection: "column", gap: 12,
            marginBottom: 32,
          }}>
            {[
              "All 6 modules included",
              "Full REST API access",
              "AI integration ready",
              "Unlimited tasks, habits, goals",
              "Net worth & budget tracking",
              "iCal calendar sync",
              "Self-hostable (SQLite)",
              "Rate-limited endpoints",
            ].map((feature, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  background: "rgba(16,185,129,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.primary, fontSize: 11, fontWeight: 700,
                }}>&#10003;</span>
                <span style={{ fontFamily: T.font, fontSize: 14, color: T.textDim }}>{feature}</span>
              </div>
            ))}
          </div>

          <Link to="/pcc/app" style={{
            width: "100%", fontFamily: T.font, fontSize: 16, fontWeight: 700,
            cursor: "pointer", padding: "14px 0", borderRadius: 8, border: "none",
            background: "linear-gradient(180deg, #6EE7B7 0%, #10B981 40%, #065F46 100%)",
            color: "#fff", textDecoration: "none", display: "block", textAlign: "center",
            boxShadow: "0 4px 12px rgba(16,185,129,0.3), inset 0 1px 0 rgba(110,231,183,0.3)",
          }}>
            Start Free
          </Link>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <FaqItem
            question="What exactly is the Personal Command Center?"
            answer="It's a single dashboard that combines task management (kanban board), habit tracking, workout logging, goal tracking, financial management (accounts, transactions, net worth, budgets), and calendar integration. Instead of using five different apps, you use one."
          />
          <FaqItem
            question="How does the AI integration work?"
            answer="Every module has a REST API with Bearer token authentication. You get an API key, and any AI tool,Claude Code, ChatGPT, custom agents, Zapier, Make,can create tasks, log habits, update goals, and record transactions by making HTTP requests. Your AI tools become part of your life system."
          />
          <FaqItem
            question="Is my data private?"
            answer="Yes. Your data is stored in a SQLite database on your server. There are no third-party analytics, no data sharing, and no ads. API keys are securely hashed. You own everything."
          />
          <FaqItem
            question="Can I self-host this?"
            answer="Yes. The backend is Express + Prisma + SQLite and the frontend is React + Vite + Tailwind. Clone the repo, run npm install, and you're live. No external database dependencies."
          />
          <FaqItem
            question="What does 'The One Thing' mean?"
            answer="Each day, you can mark one task as your most important priority. It gets highlighted at the top of your dashboard so you always know what to focus on. Inspired by Gary Keller's book."
          />
          <FaqItem
            question="What kind of workouts can I track?"
            answer="Runs, lifts, HYROX, cycling, swimming, mobility, rest days, and a general 'other' category. Each workout logs type, duration, distance, and notes. You get a weekly emoji calendar and 30-day history."
          />
          <FaqItem
            question="How does the financial tracking work?"
            answer="You add your accounts (checking, savings, brokerage, crypto, etc.) and log balance snapshots to track net worth over time. Record transactions with categories to see monthly budget breakdowns. No bank linking required,you're in full control."
          />
          <FaqItem
            question="Is there a mobile app?"
            answer="Not yet. The web app is fully responsive and works well on mobile browsers. A native mobile app is on the roadmap."
          />
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section id="get-started" style={{ ...section, paddingTop: 100, paddingBottom: 100, textAlign: "center" }}>
        <h2 style={{
          fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
        }}>
          Ready to Run Your Life Like a System?
        </h2>
        <p style={{
          fontFamily: T.font, fontSize: 16, color: T.textDim,
          maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7,
        }}>
          Free to use. Set up in 2 minutes. Your data stays yours.
        </p>
        {submitted ? (
          <div style={{
            padding: "20px 32px", borderRadius: 12,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            display: "inline-block",
          }}>
            <p style={{ fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.primary, margin: 0 }}>
              You're on the list!
            </p>
            <p style={{ fontFamily: T.font, fontSize: 14, color: T.textDim, margin: "8px 0 0" }}>
              We'll reach out within 24 hours to get you set up.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: "flex", gap: 12, justifyContent: "center",
            flexWrap: "wrap", maxWidth: 480, margin: "0 auto",
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1, minWidth: 240, padding: "14px 20px", borderRadius: 8,
                border: `1px solid ${T.border}`, background: T.surface,
                color: T.text, fontFamily: T.font, fontSize: 16,
                outline: "none",
              }}
            />
            <button type="submit" disabled={submitting} style={{
              fontFamily: T.font, fontSize: 16, fontWeight: 700, cursor: "pointer",
              padding: "14px 32px", borderRadius: 8, border: "none",
              background: "linear-gradient(180deg, #6EE7B7 0%, #10B981 40%, #065F46 100%)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(16,185,129,0.3), inset 0 1px 0 rgba(110,231,183,0.3)",
              opacity: submitting ? 0.7 : 1,
            }}>
              {submitting ? "Sending..." : "Get Early Access"}
            </button>
          </form>
        )}
        <p style={{
          fontFamily: T.font, fontSize: 13, color: T.textFaint, marginTop: 16,
        }}>
          Currently in early access. Request an invite and you'll be set up within 24 hours.
        </p>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{
        borderTop: `1px solid ${T.border}`, padding: "32px 24px",
        maxWidth: 1080, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <Link to="/" style={{
          fontFamily: T.font, fontSize: 13, color: T.textFaint, textDecoration: "none",
        }}>
          &copy; 2026 Vallota Ventures
        </Link>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="mailto:diego@vallotaventures.com" style={{
            fontFamily: T.font, fontSize: 13, color: T.textFaint, textDecoration: "none",
          }}>
            diego@vallotaventures.com
          </a>
        </div>
      </footer>
    </div>
  );
}
