import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <div style={{ padding: 20 }}>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "Overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
              <div style={{ marginTop: 8, fontSize: 11, color: "#10B981", fontWeight: 600 }}>3/5 complete</div>
            </div>

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
        )}

        {/* ── TASKS TAB ── */}
        {activeTab === "Tasks" && (
          <div>
            <div style={{
              background: "#FEF3C7", borderRadius: 12, padding: "14px 20px",
              border: "2px solid #F59E0B", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: 1 }}>
                #1 Today
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B" }}>
                Review Q1 budget forecast
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              {[
                { col: "Backlog", color: "#94A3B8", items: [
                  { t: "Research competitor pricing", d: "business" },
                  { t: "Update investor deck", d: "business" },
                  { t: "Plan Q2 content calendar", d: "personal" },
                ]},
                { col: "This Week", color: "#FBBF24", items: [
                  { t: "Finalize project documentation", d: "systems" },
                  { t: "Call accountant re: taxes", d: "financial" },
                ]},
                { col: "Today", color: "#10B981", items: [
                  { t: "Review Q1 budget forecast", d: "financial", one: true },
                  { t: "Send proposal to client", d: "business" },
                  { t: "Update portfolio site", d: "systems" },
                ]},
                { col: "Done", color: "#6B7280", items: [
                  { t: "Set up CI/CD pipeline", d: "systems" },
                  { t: "Weekly grocery order", d: "personal" },
                ]},
              ].map((column) => (
                <div key={column.col}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                    color: column.color, marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: column.color }} />
                    {column.col}
                    <span style={{ color: "#94A3B8", fontWeight: 500 }}>({column.items.length})</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {column.items.map((item, j) => (
                      <div key={j} style={{
                        padding: "10px 12px", borderRadius: 8,
                        background: item.one ? "#FFFBEB" : "#fff",
                        border: `1px solid ${item.one ? "#FDE68A" : "#E2E0DB"}`,
                        opacity: column.col === "Done" ? 0.6 : 1,
                      }}>
                        <span style={{
                          fontSize: 8, fontWeight: 600, padding: "2px 5px", borderRadius: 3,
                          background: (domainColors[item.d] || "#94A3B8") + "20",
                          color: domainColors[item.d] || "#94A3B8",
                          textTransform: "uppercase", letterSpacing: 0.5,
                        }}>{item.d}</span>
                        <div style={{
                          fontSize: 12, fontWeight: 500, color: "#1E293B", marginTop: 6,
                          textDecoration: column.col === "Done" ? "line-through" : "none",
                        }}>{item.t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HABITS TAB ── */}
        {activeTab === "Habits" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1E293B" }}>Weekly Progress</div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Mar 10 - Mar 16, 2026</div>
              </div>
              <div style={{
                padding: "6px 14px", borderRadius: 8, background: "#F0FDF4",
                border: "1px solid #BBF7D0", fontSize: 13, fontWeight: 600, color: "#10B981",
              }}>
                68% complete
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px repeat(7, 1fr) 60px", gap: 6, alignItems: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}></div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} style={{ fontSize: 10, fontWeight: 600, color: "#94A3B8", textAlign: "center" }}>{d}</div>
                ))}
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textAlign: "center" }}>Streak</div>

                {[
                  { name: "Workout", days: [1,1,1,1,0,0,0], streak: 12 },
                  { name: "Deep Work", days: [1,1,1,1,1,0,0], streak: 8 },
                  { name: "Outbound", days: [1,0,1,0,0,0,0], streak: 2 },
                  { name: "Read 30min", days: [1,1,1,1,0,0,0], streak: 21 },
                  { name: "Meditate", days: [0,1,0,1,0,0,0], streak: 1 },
                  { name: "Journal", days: [1,1,1,0,0,0,0], streak: 5 },
                  { name: "No Alcohol", days: [1,1,1,1,1,0,0], streak: 14 },
                ].map((habit) => (
                  <React.Fragment key={habit.name}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{habit.name}</div>
                    {habit.days.map((done, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 6,
                          background: done ? "#10B981" : (i < 4 ? "#FEE2E2" : "#F3F4F6"),
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {done ? <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>&#10003;</span>
                            : i < 4 ? <span style={{ color: "#FCA5A5", fontSize: 10 }}>&#10005;</span>
                            : null}
                        </div>
                      </div>
                    ))}
                    <div style={{ fontSize: 13, fontWeight: 700, color: habit.streak >= 10 ? "#10B981" : "#1E293B", textAlign: "center" }}>
                      {habit.streak}d
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[
                { label: "Best Streak", val: "21 days", sub: "Read 30min" },
                { label: "Completion Rate", val: "68%", sub: "This week" },
                { label: "Habits Tracked", val: "7", sub: "Active habits" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB", textAlign: "center",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1E293B" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FINANCES TAB ── */}
        {activeTab === "Finances" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ gridColumn: "1 / -1", background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E2E0DB" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5 }}>Net Worth</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#1E293B" }}>$47,250</div>
                </div>
                <div style={{
                  padding: "6px 14px", borderRadius: 8, background: "#F0FDF4",
                  border: "1px solid #BBF7D0", fontSize: 13, fontWeight: 600, color: "#10B981",
                }}>
                  +$1,340 this month
                </div>
              </div>
              <div style={{ height: 60, display: "flex", alignItems: "end", gap: 4 }}>
                {[28, 32, 30, 35, 33, 38, 36, 40, 42, 45, 43, 47].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h * 1.3}px`, borderRadius: 4,
                    background: "linear-gradient(180deg, #10B981 0%, #065F46 100%)",
                    opacity: 0.3 + (i / 12) * 0.7,
                  }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: 10, color: "#94A3B8" }}>Apr '25</span>
                <span style={{ fontSize: 10, color: "#94A3B8" }}>Mar '26</span>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Accounts
              </div>
              {[
                { name: "Checking", bal: "$8,420", icon: "\u{1F3E6}" },
                { name: "Savings", bal: "$15,300", icon: "\u{1F4B0}" },
                { name: "Brokerage", bal: "$18,200", icon: "\u{1F4C8}" },
                { name: "Crypto", bal: "$5,330", icon: "\u26A1" },
              ].map((a, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderBottom: i < 3 ? "1px solid #F3F4F6" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{a.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{a.name}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>{a.bal}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Recent Transactions
              </div>
              {[
                { name: "Whole Foods", amt: "-$67.42", cat: "Groceries", color: "#10B981" },
                { name: "Spotify", amt: "-$15.99", cat: "Subscriptions", color: "#8B5CF6" },
                { name: "Deposit", amt: "+$3,200", cat: "Income", color: "#3B82F6" },
                { name: "Electric Co", amt: "-$142.00", cat: "Utilities", color: "#F59E0B" },
                { name: "Amazon", amt: "-$34.99", cat: "Shopping", color: "#EF4444" },
              ].map((tx, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", borderBottom: i < 4 ? "1px solid #F3F4F6" : "none",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{tx.name}</div>
                    <span style={{
                      fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 3,
                      background: tx.color + "15", color: tx.color, textTransform: "uppercase",
                    }}>{tx.cat}</span>
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: tx.amt.startsWith("+") ? "#10B981" : "#1E293B",
                  }}>{tx.amt}</span>
                </div>
              ))}
            </div>

            <div style={{ gridColumn: "1 / -1", background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Monthly Budget
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { cat: "Housing", spent: 1800, budget: 1800, color: "#3B82F6" },
                  { cat: "Food", spent: 420, budget: 600, color: "#10B981" },
                  { cat: "Transport", spent: 180, budget: 300, color: "#F59E0B" },
                  { cat: "Subscriptions", spent: 89, budget: 100, color: "#8B5CF6" },
                  { cat: "Shopping", spent: 234, budget: 200, color: "#EF4444" },
                  { cat: "Savings", spent: 500, budget: 500, color: "#06B6D4" },
                ].map((b) => (
                  <div key={b.cat}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#1E293B" }}>{b.cat}</span>
                      <span style={{ fontSize: 10, color: b.spent > b.budget ? "#EF4444" : "#94A3B8" }}>
                        ${b.spent}/${b.budget}
                      </span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6" }}>
                      <div style={{
                        height: "100%", borderRadius: 3,
                        width: `${Math.min((b.spent / b.budget) * 100, 100)}%`,
                        background: b.spent > b.budget ? "#EF4444" : b.color,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── WORKOUTS TAB ── */}
        {activeTab === "Workouts" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "This Week", val: "4/5", sub: "workouts" },
                { label: "Total Time", val: "3h 45m", sub: "this week" },
                { label: "Avg Duration", val: "56 min", sub: "per session" },
                { label: "30-Day", val: "18", sub: "workouts" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #E2E0DB", textAlign: "center",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1E293B" }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB", marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                This Week
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { d: "Mon", type: "\u{1F3C3}", label: "Run", dur: "45m", done: true },
                  { d: "Tue", type: "\u{1F3CB}\u{FE0F}", label: "Lift", dur: "60m", done: true },
                  { d: "Wed", type: "\u{1F6B4}", label: "Bike", dur: "50m", done: true },
                  { d: "Thu", type: "\u{1F9D8}", label: "Yoga", dur: "30m", done: true },
                  { d: "Fri", type: "\u{1F3C3}", label: "Run", dur: null, done: false },
                  { d: "Sat", type: null, label: null, dur: null, done: false },
                  { d: "Sun", type: null, label: "Rest", dur: null, done: false },
                ].map((w, i) => (
                  <div key={i} style={{
                    flex: 1, textAlign: "center", padding: "12px 4px", borderRadius: 10,
                    background: w.done ? "#F0FDF4" : "#F8F6F3",
                    border: `1px solid ${w.done ? "#BBF7D0" : "#E2E0DB"}`,
                  }}>
                    <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginBottom: 6 }}>{w.d}</div>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{w.type || "\u2014"}</div>
                    {w.label && <div style={{ fontSize: 10, fontWeight: 600, color: w.done ? "#1E293B" : "#94A3B8" }}>{w.label}</div>}
                    {w.dur && <div style={{ fontSize: 10, color: "#10B981", fontWeight: 600, marginTop: 2 }}>{w.dur}</div>}
                    {w.done && <div style={{ fontSize: 10, color: "#10B981", marginTop: 4 }}>&#10003;</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E2E0DB" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Recent Workouts
              </div>
              {[
                { date: "Thu, Mar 13", type: "\u{1F9D8}", label: "Yoga", dur: "30 min", notes: "Morning flow + hip openers" },
                { date: "Wed, Mar 12", type: "\u{1F6B4}", label: "Cycling", dur: "50 min", notes: "Peloton HIIT ride, 18.2 mi" },
                { date: "Tue, Mar 11", type: "\u{1F3CB}\u{FE0F}", label: "Lift", dur: "60 min", notes: "Upper body: bench 185x5, OHP 115x8" },
                { date: "Mon, Mar 10", type: "\u{1F3C3}", label: "Run", dur: "45 min", notes: "Easy 5K, 8:45/mi pace" },
              ].map((w, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
                  borderBottom: i < 3 ? "1px solid #F3F4F6" : "none",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: "#F0FDF4",
                    border: "1px solid #BBF7D0", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 20, flexShrink: 0,
                  }}>{w.type}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B" }}>{w.label}</span>
                      <span style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>{w.dur}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{w.notes}</div>
                    <div style={{ fontSize: 10, color: "#CBD5E1", marginTop: 2 }}>{w.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
          Stop context-switching between five apps. Run your life from one dashboard.
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
          Free to set up &middot; Your data stays yours &middot; Works on any device
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
            { val: <Counter target={5} />, label: "Life Domains" },
            { val: <Counter target={0} prefix="$" />, label: "Cost" },
            { val: "100%", label: "Your Data" },
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
              step: "3", title: "Start Tracking Everything",
              desc: "Log tasks, habits, workouts, finances, and goals from one dashboard. See your whole life at a glance and build momentum daily.",
              details: ["One dashboard for all", "Daily progress view", "Net worth tracking"],
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
              desc: "Your financial data, habits, and goals are never shared. No third-party tracking, no analytics, no ads.",
            },
            {
              icon: "\u{1F6E1}\u{FE0F}", title: "Secure & Protected",
              desc: "Passwords are securely hashed. Rate limiting protects your account. Your sensitive data is always encrypted.",
            },
            {
              icon: "\u{1F4E6}", title: "Your Data, Your Control",
              desc: "Everything stays on your account. Export your data anytime. No vendor lock-in, no hidden fees.",
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
            "Anyone tired of tracking their life across five different apps",
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
              "Net worth + budget tracking",
              "Works on desktop and mobile",
              "Unlimited tasks, habits, goals",
              "Net worth & budget tracking",
              "iCal calendar sync",
              "Works on any device",
              "Export your data anytime",
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
            question="How is this different from Notion or a spreadsheet?"
            answer="PCC is purpose-built for life tracking. It's not a blank canvas you have to build yourself. Habits, tasks, finances, workouts, and goals all come pre-wired with the right views, progress tracking, and daily workflows out of the box."
          />
          <FaqItem
            question="Is my data private?"
            answer="Yes. There are no third-party analytics, no data sharing, and no ads. Your passwords are securely hashed and your data is yours alone."
          />
          <FaqItem
            question="Can I access this on my phone?"
            answer="Yes. The web app is fully responsive and works great on mobile browsers. Open it on any device and your data syncs automatically."
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
            question="Can I connect my bank accounts?"
            answer="Bank account linking through Plaid is coming soon. For now, you can manually track your accounts, balances, and transactions to see your full financial picture."
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
