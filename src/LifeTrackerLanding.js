import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const T = {
  bg: "#0A0A0B", surface: "#141416", surfaceAlt: "#1C1C1F", border: "#2A2A2E",
  primary: "#10B981", accent: "#10B981", text: "#F5F0EB", textDim: "#A39E98",
  textFaint: "#6B6560", font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const section = { padding: "80px 24px", maxWidth: 1080, margin: "0 auto" };

// Animated counter
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

// Fake app screenshot — dashboard mockup
function DashboardMockup() {
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
          Life Tracker — Personal Command Center
        </span>
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
                transition: "all 0.2s",
              }}>
                {h.done && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>&#10003;</span>}
              </div>
              <span style={{
                fontSize: 13, color: h.done ? "#94A3B8" : "#1E293B",
                textDecoration: h.done ? "line-through" : "none",
                fontWeight: 500,
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
                background: `linear-gradient(180deg, #10B981 0%, #065F46 100%)`,
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
              const types = ["🏃", "🏋️", "🚴", "🧘", "🏃", null, null];
              const done = i < 4;
              return (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8,
                  background: done ? "#F0FDF4" : "#F8F6F3",
                  border: `1px solid ${done ? "#BBF7D0" : "#E2E0DB"}`,
                }}>
                  <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>{d}</div>
                  <div style={{ fontSize: 16 }}>{types[i] || "—"}</div>
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

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function LifeTrackerLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    // For now, open mailto as fallback — replace with real endpoint later
    window.location.href = `mailto:diego@vallotaventures.com?subject=Life Tracker Early Access&body=I'd like early access to Life Tracker.%0A%0AEmail: ${encodeURIComponent(email.trim())}`;
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "20px 24px", maxWidth: 1080, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{
          fontFamily: T.display, fontSize: 18, fontWeight: 700,
          color: T.textDim, textDecoration: "none", letterSpacing: 0.5,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ color: T.textFaint }}>&#8592;</span> Vallota Ventures
        </Link>
        <button onClick={() => scrollTo("get-started")} style={{
          fontFamily: T.font, fontSize: 14, fontWeight: 600, cursor: "pointer",
          padding: "8px 20px", borderRadius: 6, border: "none",
          background: T.primary, color: "#fff",
        }}>
          Get Started Free
        </button>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ ...section, paddingTop: 60, paddingBottom: 40, textAlign: "center" }}>
        <div style={{
          display: "inline-block", marginBottom: 24,
          padding: "6px 14px", borderRadius: 20,
          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
          fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: 1.5,
          color: T.primary, textTransform: "uppercase",
        }}>
          Personal Command Center
        </div>

        <h1 style={{
          fontFamily: T.display, fontSize: "clamp(36px, 7vw, 60px)",
          fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", color: T.text,
        }}>
          Your Entire Life.{" "}
          <span style={{
            background: "linear-gradient(90deg, #6EE7B7, #10B981)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            One Dashboard.
          </span>
        </h1>

        <p style={{
          fontFamily: T.font, fontSize: 18, color: T.textDim, lineHeight: 1.8,
          maxWidth: 580, margin: "0 auto 40px",
        }}>
          Track your finances, tasks, habits, workouts, and goals in one place.
          AI-integrated so your tools can talk to your life system.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
          <button onClick={() => scrollTo("get-started")} style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 700, cursor: "pointer",
            padding: "14px 36px", borderRadius: 8, border: "none",
            background: "linear-gradient(180deg, #6EE7B7 0%, #10B981 40%, #065F46 100%)",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(16,185,129,0.3), inset 0 1px 0 rgba(110,231,183,0.3)",
          }}>
            Start Tracking — It's Free
          </button>
          <button onClick={() => scrollTo("features")} style={{
            fontFamily: T.font, fontSize: 16, fontWeight: 600, cursor: "pointer",
            padding: "14px 36px", borderRadius: 8,
            border: `1px solid ${T.border}`, color: T.textDim, background: "transparent",
          }}>
            See Features
          </button>
        </div>

        {/* App Preview */}
        <DashboardMockup />
      </section>

      {/* ─── STATS BAR ─── */}
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

      {/* ─── FEATURES ─── */}
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
            Stop context-switching between five different apps. Your finances, tasks, habits, workouts, and goals — all connected.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {[
            {
              icon: "💰", title: "Finances",
              desc: "Track accounts, net worth, transactions, and monthly budgets. See exactly where your money goes with category breakdowns.",
            },
            {
              icon: "✅", title: "Tasks",
              desc: "Kanban board with backlog, this week, today, and done columns. Set your One Thing each day. Drag and drop to prioritize.",
            },
            {
              icon: "🔁", title: "Habits",
              desc: "Daily habit tracking with weekly progress. See your streaks, hit your targets, and build systems that compound.",
            },
            {
              icon: "🏋️", title: "Workouts",
              desc: "Log runs, lifts, bikes, swims, and more. Weekly overview, duration tracking, and workout history at a glance.",
            },
            {
              icon: "🎯", title: "Goals",
              desc: "Set targets with deadlines. Track progress with visual bars. Auto-completes when you hit the number. Stay accountable.",
            },
            {
              icon: "📅", title: "Calendar",
              desc: "Pull in your Google Calendar events. See today's schedule alongside your tasks and habits in one daily view.",
            },
          ].map((f, i) => (
            <div key={i} style={{
              background: T.surface, borderRadius: 14, padding: "28px 24px",
              border: `1px solid ${T.border}`,
              transition: "border-color 0.2s",
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{
                fontFamily: T.font, fontSize: 17, fontWeight: 700,
                color: T.text, margin: "0 0 8px",
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.7, margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI INTEGRATION ─── */}
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
            Claude Code, ChatGPT, custom agents — anything that can make an HTTP request
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

          <div style={{
            marginTop: 24, display: "flex", gap: 20, flexWrap: "wrap",
          }}>
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
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ ...section, paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: T.display, fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: T.text,
          }}>
            Up and Running in Minutes
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
          {[
            { step: "1", title: "Create Your Account", desc: "Pick a password. That's it. No email verification, no friction." },
            { step: "2", title: "Set Your Defaults", desc: "Default habits, budget categories, and domains are pre-loaded. Customize or start tracking immediately." },
            { step: "3", title: "Track Everything", desc: "Log habits, add tasks, update finances, log workouts. All from one dashboard." },
            { step: "4", title: "Connect Your AI", desc: "Grab your API key and let Claude, ChatGPT, or any tool update your system automatically." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)",
                fontFamily: T.display, fontSize: 20, fontWeight: 700, color: T.primary,
              }}>
                {s.step}
              </div>
              <h3 style={{
                fontFamily: T.font, fontSize: 16, fontWeight: 700,
                color: T.text, margin: "0 0 8px",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: T.font, fontSize: 14, color: T.textDim,
                lineHeight: 1.6, margin: 0,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
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
            If you track your life in spreadsheets, sticky notes, and five different apps — this replaces all of it.
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

      {/* ─── CTA ─── */}
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
          fontFamily: T.font, fontSize: 13, color: T.textFaint,
          marginTop: 16,
        }}>
          Currently in early access. Request an invite and you'll be set up within 24 hours.
        </p>
      </section>

      {/* ─── FOOTER ─── */}
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
        <a href="mailto:diego@vallotaventures.com" style={{
          fontFamily: T.font, fontSize: 13, color: T.textFaint, textDecoration: "none",
        }}>
          diego@vallotaventures.com
        </a>
      </footer>
    </div>
  );
}
