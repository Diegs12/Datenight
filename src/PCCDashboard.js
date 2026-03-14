import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ═══════════════════════════════════════════
// Theme
// ═══════════════════════════════════════════
const D = {
  bg: "#F3F1EE", surface: "#FFFFFF", surfaceAlt: "#F8F6F3",
  border: "#E5E2DD", borderLight: "#EEEBE6",
  sidebar: "#0A0A0B", sidebarText: "#A39E98", sidebarActive: "#F5F0EB",
  primary: "#10B981", primaryDark: "#065F46", primaryLight: "#ECFDF5",
  primaryGhost: "rgba(16,185,129,0.08)",
  text: "#1A1A1A", textDim: "#6B7280", textFaint: "#9CA3AF",
  danger: "#EF4444", dangerLight: "#FEE2E2",
  warning: "#F59E0B", warningLight: "#FEF3C7",
  font: "'Inter', sans-serif", display: "'Playfair Display', serif",
};

const domainColors = {
  financial: { bg: "#FEF3C7", text: "#92400E" },
  business: { bg: "#DBEAFE", text: "#1E40AF" },
  systems: { bg: "#EDE9FE", text: "#5B21B6" },
  personal: { bg: "#FCE7F3", text: "#9D174D" },
  health: { bg: "#D1FAE5", text: "#065F46" },
};

const workoutTypes = {
  run: { icon: "\u{1F3C3}", label: "Run" },
  lift: { icon: "\u{1F3CB}\u{FE0F}", label: "Lift" },
  cycling: { icon: "\u{1F6B4}", label: "Cycling" },
  yoga: { icon: "\u{1F9D8}", label: "Yoga" },
  swim: { icon: "\u{1F3CA}", label: "Swim" },
  hyrox: { icon: "\u26A1", label: "HYROX" },
  other: { icon: "\u{1F4AA}", label: "Other" },
};

const categoryColors = {
  income: "#10B981", housing: "#6366F1", groceries: "#F59E0B",
  subscriptions: "#8B5CF6", transportation: "#3B82F6", dining: "#EC4899",
  health: "#14B8A6", entertainment: "#F97316", shopping: "#EF4444", other: "#6B7280",
};

// ═══════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════
const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtMoney = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const todayStr = () => new Date().toISOString().split("T")[0];
const dayOffset = (offset) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().split("T")[0]; };
const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };
const formatFullDate = () => new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

const getStreak = (completions) => {
  let streak = 0;
  let d = new Date();
  if (!completions[d.toISOString().split("T")[0]]) d.setDate(d.getDate() - 1);
  while (completions[d.toISOString().split("T")[0]]) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
};

// ═══════════════════════════════════════════
// Shared styles
// ═══════════════════════════════════════════
const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${D.border}`,
  fontFamily: D.font, fontSize: 14, color: D.text, background: D.surfaceAlt,
  outline: "none", boxSizing: "border-box",
};
const primaryBtn = {
  padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer",
  background: D.primary, color: "#fff", fontFamily: D.font, fontSize: 13, fontWeight: 600,
};
const miniBtn = {
  padding: "4px 8px", borderRadius: 4, border: `1px solid ${D.border}`,
  background: D.surfaceAlt, cursor: "pointer", fontFamily: D.font,
  fontSize: 11, fontWeight: 600, color: D.textDim,
};

// ═══════════════════════════════════════════
// Initial Data,simulates 1 year of use
// ═══════════════════════════════════════════
function getInitialData() {
  const habitCompletions = (rate, seed) => {
    const c = {};
    for (let i = 365; i >= 0; i--) {
      const d = dayOffset(-i);
      const hash = [...(d + seed)].reduce((a, ch) => a + ch.charCodeAt(0), 0);
      if ((hash % 100) < rate * 100) c[d] = true;
    }
    return c;
  };

  const workouts = [];
  let wId = 1;
  const wTypes = ["run", "lift", "cycling", "yoga", "swim", "hyrox"];
  for (let i = 365; i >= 0; i--) {
    const d = dayOffset(-i);
    const hash = [...d].reduce((a, ch) => a + ch.charCodeAt(0), 0);
    if (hash % 10 < 5) {
      workouts.push({
        id: wId++, type: wTypes[hash % wTypes.length],
        duration: 25 + (hash % 40),
        distance: wTypes[hash % wTypes.length] === "run" ? +((hash % 40) / 10 + 2).toFixed(1) : wTypes[hash % wTypes.length] === "cycling" ? +((hash % 60) / 5 + 8).toFixed(1) : null,
        notes: "", date: d,
      });
    }
  }

  const transactions = [];
  let tId = 1;
  const monthDate = (monthsAgo, day) => {
    const d = new Date(); d.setMonth(d.getMonth() - monthsAgo); d.setDate(Math.min(day, 28));
    return d.toISOString().split("T")[0];
  };
  for (let m = 11; m >= 0; m--) {
    transactions.push({ id: tId++, description: "Paycheck", amount: 3200, category: "income", date: monthDate(m, 1), type: "income" });
    transactions.push({ id: tId++, description: "Paycheck", amount: 3200, category: "income", date: monthDate(m, 15), type: "income" });
    if (m % 3 === 0) transactions.push({ id: tId++, description: "Freelance project", amount: 800 + m * 50, category: "income", date: monthDate(m, 10), type: "income" });
    transactions.push({ id: tId++, description: "Rent", amount: -1450, category: "housing", date: monthDate(m, 1), type: "expense" });
    transactions.push({ id: tId++, description: "Car Insurance", amount: -125, category: "transportation", date: monthDate(m, 3), type: "expense" });
    transactions.push({ id: tId++, description: "Phone Bill", amount: -85, category: "subscriptions", date: monthDate(m, 5), type: "expense" });
    transactions.push({ id: tId++, description: "Netflix", amount: -15.99, category: "subscriptions", date: monthDate(m, 7), type: "expense" });
    transactions.push({ id: tId++, description: "Gym Membership", amount: -49.99, category: "health", date: monthDate(m, 1), type: "expense" });
    transactions.push({ id: tId++, description: "Spotify", amount: -10.99, category: "subscriptions", date: monthDate(m, 7), type: "expense" });
    const varExp = [
      { desc: "Whole Foods", range: [45, 120], cat: "groceries" },
      { desc: "H-E-B", range: [30, 90], cat: "groceries" },
      { desc: "Restaurant", range: [25, 75], cat: "dining" },
      { desc: "Gas Station", range: [35, 55], cat: "transportation" },
      { desc: "Amazon", range: [15, 95], cat: "shopping" },
      { desc: "Coffee shop", range: [4, 8], cat: "dining" },
      { desc: "Target", range: [20, 60], cat: "shopping" },
    ];
    for (let d = 0; d < 10; d++) {
      const e = varExp[(m * 7 + d * 3) % varExp.length];
      const amt = -(e.range[0] + ((m * 13 + d * 7) % (e.range[1] - e.range[0])));
      transactions.push({ id: tId++, description: e.desc, amount: +amt.toFixed(2), category: e.cat, date: monthDate(m, 2 + d * 2), type: "expense" });
    }
  }
  transactions.sort((a, b) => b.date.localeCompare(a.date));

  return {
    tasks: [
      { id: 1, title: "Review Q1 budget forecast", domain: "financial", column: "today", isOne: true, createdAt: dayOffset(-2) },
      { id: 2, title: "Send proposal to Acme Corp", domain: "business", column: "today", isOne: false, createdAt: dayOffset(-1) },
      { id: 3, title: "Update portfolio website", domain: "systems", column: "thisWeek", isOne: false, createdAt: dayOffset(-3) },
      { id: 4, title: "Schedule dentist appointment", domain: "personal", column: "thisWeek", isOne: false, createdAt: dayOffset(-4) },
      { id: 5, title: "Research index fund options", domain: "financial", column: "thisWeek", isOne: false, createdAt: dayOffset(-5) },
      { id: 6, title: "Plan Austin apartment search", domain: "personal", column: "backlog", isOne: false, createdAt: dayOffset(-10) },
      { id: 7, title: "Set up automated savings transfer", domain: "financial", column: "backlog", isOne: false, createdAt: dayOffset(-12) },
      { id: 8, title: "Read Atomic Habits ch. 5-8", domain: "personal", column: "backlog", isOne: false, createdAt: dayOffset(-8) },
      { id: 9, title: "Refactor API error handling", domain: "systems", column: "backlog", isOne: false, createdAt: dayOffset(-15) },
      { id: 10, title: "File Q4 expense reports", domain: "financial", column: "done", isOne: false, createdAt: dayOffset(-20) },
      { id: 11, title: "Call insurance company", domain: "personal", column: "done", isOne: false, createdAt: dayOffset(-18) },
      { id: 12, title: "Set up CI/CD pipeline", domain: "systems", column: "done", isOne: false, createdAt: dayOffset(-22) },
      { id: 13, title: "Meal prep for the week", domain: "health", column: "done", isOne: false, createdAt: dayOffset(-14) },
      { id: 14, title: "Run 5K personal best", domain: "health", column: "done", isOne: false, createdAt: dayOffset(-16) },
      { id: 15, title: "Deep clean apartment", domain: "personal", column: "done", isOne: false, createdAt: dayOffset(-25) },
    ],
    habits: [
      { id: 1, name: "Workout", completions: habitCompletions(0.72, "workout") },
      { id: 2, name: "Read 30 min", completions: habitCompletions(0.68, "read30") },
      { id: 3, name: "Meditate", completions: habitCompletions(0.55, "meditate") },
      { id: 4, name: "Drink 8 glasses water", completions: habitCompletions(0.80, "water8") },
      { id: 5, name: "No phone first hour", completions: habitCompletions(0.60, "nophone") },
      { id: 6, name: "Journal", completions: habitCompletions(0.50, "journal") },
    ],
    accounts: [
      { id: 1, name: "Chase Checking", type: "checking", balance: 4850.32 },
      { id: 2, name: "Marcus Savings", type: "savings", balance: 12400.00 },
      { id: 3, name: "Fidelity 401k", type: "retirement", balance: 18500.00 },
      { id: 4, name: "Robinhood Brokerage", type: "brokerage", balance: 8200.45 },
      { id: 5, name: "Coinbase", type: "crypto", balance: 3300.00 },
    ],
    transactions,
    workouts,
    goals: [
      { id: 1, name: "Emergency Fund $10k", target: 10000, current: 6500, unit: "$", deadline: "2026-06-30" },
      { id: 2, name: "Run a Half Marathon", target: 13.1, current: 8.4, unit: "mi", deadline: "2026-09-15" },
      { id: 3, name: "Read 24 Books", target: 24, current: 14, unit: "books", deadline: "2026-12-31" },
      { id: 4, name: "Save $5k for Travel", target: 5000, current: 3200, unit: "$", deadline: "2026-08-01" },
      { id: 5, name: "Bench Press 225 lbs", target: 225, current: 195, unit: "lbs", deadline: "2026-07-01" },
      { id: 6, name: "Learn Spanish", target: 100, current: 42, unit: "lessons", deadline: "2026-12-31" },
    ],
    netWorthHistory: [
      { month: "Apr 25", value: 30200 }, { month: "May 25", value: 31800 },
      { month: "Jun 25", value: 33100 }, { month: "Jul 25", value: 34500 },
      { month: "Aug 25", value: 35800 }, { month: "Sep 25", value: 37200 },
      { month: "Oct 25", value: 39100 }, { month: "Nov 25", value: 40800 },
      { month: "Dec 25", value: 42300 }, { month: "Jan 26", value: 43900 },
      { month: "Feb 26", value: 45600 }, { month: "Mar 26", value: 47250.77 },
    ],
  };
}

// ═══════════════════════════════════════════
// Persisted State Hook
// ═══════════════════════════════════════════
function usePersistedState(key, initialValue) {
  const [state, setState] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initialValue; }
    catch { return initialValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

// ═══════════════════════════════════════════
// Overview Tab
// ═══════════════════════════════════════════
function OverviewTab({ data, setData }) {
  const today = todayStr();
  const netWorth = data.accounts.reduce((s, a) => s + a.balance, 0);
  const theOneThing = data.tasks.find(t => t.isOne && t.column !== "done");
  const todayTasks = data.tasks.filter(t => t.column === "today");
  const todayHabits = data.habits.map(h => ({ ...h, done: !!h.completions[today], streak: getStreak(h.completions) }));
  const completedToday = todayHabits.filter(h => h.done).length;

  const now = new Date();
  const dow = now.getDay();
  const mondayOff = dow === 0 ? -6 : 1 - dow;
  const weekDays = Array.from({ length: 7 }, (_, i) => dayOffset(mondayOff + i));

  const toggleHabit = (habitId) => {
    setData(prev => ({
      ...prev,
      habits: prev.habits.map(h => {
        if (h.id !== habitId) return h;
        const c = { ...h.completions };
        if (c[today]) delete c[today]; else c[today] = true;
        return { ...h, completions: c };
      }),
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: D.display, fontSize: 28, fontWeight: 700, color: D.text, margin: 0 }}>
          {getGreeting()}, Diego
        </h1>
        <p style={{ fontFamily: D.font, fontSize: 14, color: D.textDim, margin: "4px 0 0" }}>{formatFullDate()}</p>
      </div>

      {theOneThing && (
        <div style={{ background: D.warningLight, borderRadius: 12, padding: "16px 20px", border: "2px solid #F59E0B", marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>The One Thing</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: D.text }}>{theOneThing.title}</div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Habits */}
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>Today's Habits</h3>
            <span style={{ fontSize: 12, fontWeight: 600, color: D.primary }}>{completedToday}/{todayHabits.length}</span>
          </div>
          {todayHabits.map(h => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", cursor: "pointer" }} onClick={() => toggleHabit(h.id)}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: h.done ? D.primary : D.border, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>
                {h.done && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{"\u2713"}</span>}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: h.done ? D.textFaint : D.text, textDecoration: h.done ? "line-through" : "none", flex: 1 }}>{h.name}</span>
              {h.streak > 0 && <span style={{ fontSize: 11, color: D.textFaint }}>{"\u{1F525}"} {h.streak}d</span>}
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>Today's Tasks</h3>
          {todayTasks.length === 0 ? <p style={{ fontSize: 13, color: D.textFaint, margin: 0 }}>No tasks for today</p> : todayTasks.map(t => (
            <div key={t.id} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 8, background: t.isOne ? D.warningLight : D.surfaceAlt, border: t.isOne ? "1px solid #FDE68A" : `1px solid ${D.borderLight}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: (domainColors[t.domain] || domainColors.personal).bg, color: (domainColors[t.domain] || domainColors.personal).text, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.domain}</span>
                {t.isOne && <span style={{ fontSize: 9, fontWeight: 700, color: "#D97706" }}>#1</span>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: D.text }}>{t.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Net Worth */}
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 8px" }}>Net Worth</h3>
          <div style={{ fontSize: 28, fontWeight: 700, color: D.text }}>{fmtMoney(netWorth)}</div>
          <div style={{ fontSize: 12, color: D.primary, fontWeight: 600, marginTop: 2 }}>+{fmtMoney(netWorth - (data.netWorthHistory[data.netWorthHistory.length - 2]?.value || 0))} this month</div>
          <div style={{ marginTop: 14, height: 48, display: "flex", alignItems: "end", gap: 4 }}>
            {data.netWorthHistory.map((h, i) => {
              const max = Math.max(...data.netWorthHistory.map(x => x.value));
              const min = Math.min(...data.netWorthHistory.map(x => x.value)) * 0.9;
              return <div key={i} style={{ flex: 1, height: `${Math.max(((h.value - min) / (max - min)) * 100, 8)}%`, borderRadius: 3, background: `linear-gradient(180deg, ${D.primary} 0%, ${D.primaryDark} 100%)`, opacity: 0.3 + (i / 12) * 0.7 }} title={`${h.month}: ${fmtMoney(h.value)}`} />;
            })}
          </div>
        </div>

        {/* This Week Workouts */}
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 12px" }}>This Week</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {weekDays.map((d, i) => {
              const w = data.workouts.find(wo => wo.date === d);
              const isToday = d === today;
              return (
                <div key={d} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8, background: w ? D.primaryLight : isToday ? "#FFF8F0" : D.surfaceAlt, border: `1px solid ${w ? "#BBF7D0" : isToday ? D.warning : D.borderLight}` }}>
                  <div style={{ fontSize: 10, color: D.textFaint, fontWeight: 600, marginBottom: 4 }}>{"MTWTFSS"[i]}</div>
                  <div style={{ fontSize: 16 }}>{w ? (workoutTypes[w.type]?.icon || "\u{1F4AA}") : d < today ? "\u2014" : "\u00B7"}</div>
                  {w && <div style={{ fontSize: 10, color: D.primary, marginTop: 2 }}>{"\u2713"}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>Goals Progress</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {data.goals.slice(0, 4).map(g => {
            const pct = Math.min((g.current / g.target) * 100, 100);
            return (
              <div key={g.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: D.text }}>{g.name}</span>
                  <span style={{ fontSize: 12, color: D.textDim }}>{Math.round(pct)}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: D.borderLight, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 4, width: `${pct}%`, background: `linear-gradient(90deg, ${D.primary}, ${D.primaryDark})`, transition: "width 0.3s" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Tasks Tab
// ═══════════════════════════════════════════
function TasksTab({ data, setData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDomain, setNewDomain] = useState("personal");
  const [newColumn, setNewColumn] = useState("backlog");
  const columns = [
    { key: "backlog", label: "Backlog" }, { key: "thisWeek", label: "This Week" },
    { key: "today", label: "Today" }, { key: "done", label: "Done" },
  ];
  const colOrder = columns.map(c => c.key);

  const addTask = () => {
    if (!newTitle.trim()) return;
    setData(prev => ({ ...prev, tasks: [...prev.tasks, { id: Math.max(0, ...prev.tasks.map(t => t.id)) + 1, title: newTitle.trim(), domain: newDomain, column: newColumn, isOne: false, createdAt: todayStr() }] }));
    setNewTitle(""); setShowAdd(false);
  };
  const moveTask = (id, dir) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.map(t => { if (t.id !== id) return t; const idx = colOrder.indexOf(t.column) + dir; if (idx < 0 || idx >= colOrder.length) return t; return { ...t, column: colOrder[idx] }; }) }));
  };
  const setTheOne = (id) => setData(prev => ({ ...prev, tasks: prev.tasks.map(t => ({ ...t, isOne: t.id === id })) }));
  const deleteTask = (id) => setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: D.display, fontSize: 24, fontWeight: 700, color: D.text, margin: 0 }}>Tasks</h1>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: showAdd ? D.surfaceAlt : D.primary, color: showAdd ? D.text : "#fff", fontFamily: D.font, fontSize: 13, fontWeight: 600 }}>
          {showAdd ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, marginBottom: 20, display: "flex", gap: 12, alignItems: "end", flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Task</label>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="What needs to be done?" onKeyDown={e => e.key === "Enter" && addTask()} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Domain</label>
            <select value={newDomain} onChange={e => setNewDomain(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
              {Object.keys(domainColors).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Column</label>
            <select value={newColumn} onChange={e => setNewColumn(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
              {columns.filter(c => c.key !== "done").map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <button onClick={addTask} style={primaryBtn}>Add</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {columns.map(col => {
          const tasks = data.tasks.filter(t => t.column === col.key);
          return (
            <div key={col.key}>
              <div style={{ fontSize: 12, fontWeight: 700, color: D.textDim, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
                <span>{col.label}</span>
                <span style={{ background: D.surfaceAlt, borderRadius: 10, padding: "2px 8px", fontSize: 11, color: D.textFaint }}>{tasks.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 100 }}>
                {tasks.map(t => (
                  <div key={t.id} style={{ background: D.surface, borderRadius: 10, padding: "12px 14px", border: t.isOne ? "2px solid #F59E0B" : `1px solid ${D.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: (domainColors[t.domain] || domainColors.personal).bg, color: (domainColors[t.domain] || domainColors.personal).text, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.domain}</span>
                      {t.isOne && <span style={{ fontSize: 9, fontWeight: 700, color: "#D97706" }}>#1</span>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: col.key === "done" ? D.textFaint : D.text, textDecoration: col.key === "done" ? "line-through" : "none", marginBottom: 8 }}>{t.title}</div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {colOrder.indexOf(col.key) > 0 && <button onClick={() => moveTask(t.id, -1)} style={miniBtn}>{"\u2190"}</button>}
                      {colOrder.indexOf(col.key) < colOrder.length - 1 && <button onClick={() => moveTask(t.id, 1)} style={miniBtn}>{"\u2192"}</button>}
                      {col.key !== "done" && !t.isOne && <button onClick={() => setTheOne(t.id)} style={{ ...miniBtn, color: "#D97706" }} title="Set as #1">{"\u2605"}</button>}
                      <button onClick={() => deleteTask(t.id)} style={{ ...miniBtn, color: D.danger }} title="Delete">{"\u00D7"}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Habits Tab
// ═══════════════════════════════════════════
function HabitsTab({ data, setData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const today = todayStr();
  const last7 = Array.from({ length: 7 }, (_, i) => dayOffset(-6 + i));
  const last30 = Array.from({ length: 30 }, (_, i) => dayOffset(-29 + i));

  const toggleHabit = (habitId, date) => {
    setData(prev => ({
      ...prev,
      habits: prev.habits.map(h => {
        if (h.id !== habitId) return h;
        const c = { ...h.completions };
        if (c[date]) delete c[date]; else c[date] = true;
        return { ...h, completions: c };
      }),
    }));
  };
  const addHabit = () => {
    if (!newName.trim()) return;
    setData(prev => ({ ...prev, habits: [...prev.habits, { id: Math.max(0, ...prev.habits.map(h => h.id)) + 1, name: newName.trim(), completions: {} }] }));
    setNewName(""); setShowAdd(false);
  };
  const deleteHabit = (id) => setData(prev => ({ ...prev, habits: prev.habits.filter(h => h.id !== id) }));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: D.display, fontSize: 24, fontWeight: 700, color: D.text, margin: 0 }}>Habits</h1>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: showAdd ? D.surfaceAlt : D.primary, color: showAdd ? D.text : "#fff", fontFamily: D.font, fontSize: 13, fontWeight: 600 }}>
          {showAdd ? "Cancel" : "+ Add Habit"}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, marginBottom: 20, display: "flex", gap: 12, alignItems: "end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Habit Name</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g., Cold shower" onKeyDown={e => e.key === "Enter" && addHabit()} style={inputStyle} />
          </div>
          <button onClick={addHabit} style={primaryBtn}>Add</button>
        </div>
      )}

      {/* Weekly tracker table */}
      <div style={{ background: D.surface, borderRadius: 12, border: `1px solid ${D.border}`, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 60px 60px 40px", padding: "12px 20px", borderBottom: `1px solid ${D.border}`, fontSize: 11, fontWeight: 600, color: D.textFaint, textTransform: "uppercase", letterSpacing: 0.5 }}>
          <span>Habit</span><span style={{ textAlign: "center" }}>Last 7 Days</span><span style={{ textAlign: "center" }}>Streak</span><span style={{ textAlign: "center" }}>Year</span><span></span>
        </div>
        {data.habits.map(h => {
          const streak = getStreak(h.completions);
          const yearTotal = Object.keys(h.completions).length;
          return (
            <div key={h.id} style={{ display: "grid", gridTemplateColumns: "180px 1fr 60px 60px 40px", padding: "14px 20px", borderBottom: `1px solid ${D.borderLight}`, alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: D.text }}>{h.name}</span>
              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                {last7.map(d => (
                  <div key={d} onClick={() => toggleHabit(h.id, d)} style={{ width: 28, height: 28, borderRadius: 6, cursor: "pointer", background: h.completions[d] ? D.primary : D.surfaceAlt, border: d === today ? `2px solid ${D.primary}` : `1px solid ${D.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>
                    {h.completions[d] && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{"\u2713"}</span>}
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: streak > 0 ? D.primary : D.textFaint }}>{streak > 0 ? `\u{1F525} ${streak}` : "0"}</div>
              <div style={{ textAlign: "center", fontSize: 13, color: D.textDim }}>{yearTotal}d</div>
              <button onClick={() => deleteHabit(h.id)} style={{ ...miniBtn, color: D.danger, padding: "4px 6px" }}>{"\u00D7"}</button>
            </div>
          );
        })}
      </div>

      {/* 30-day heatmap */}
      <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>Last 30 Days</h3>
        {data.habits.map(h => (
          <div key={h.id} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: D.textDim, marginBottom: 6 }}>{h.name}</div>
            <div style={{ display: "flex", gap: 3 }}>
              {last30.map(d => (
                <div key={d} style={{ width: 14, height: 14, borderRadius: 3, background: h.completions[d] ? D.primary : D.borderLight, opacity: h.completions[d] ? 1 : 0.5 }} title={`${fmtDate(d)}: ${h.completions[d] ? "Done" : "Missed"}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Finances Tab
// ═══════════════════════════════════════════
function FinancesTab({ data, setData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [txDesc, setTxDesc] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txCategory, setTxCategory] = useState("other");
  const [txType, setTxType] = useState("expense");

  const netWorth = data.accounts.reduce((s, a) => s + a.balance, 0);
  const prevMonth = data.netWorthHistory[data.netWorthHistory.length - 2]?.value || 0;
  const thisMonth = todayStr().slice(0, 7);
  const monthTx = data.transactions.filter(t => t.date.startsWith(thisMonth));
  const monthIncome = monthTx.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const monthSpend = monthTx.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  const spendByCategory = {};
  monthTx.filter(t => t.amount < 0).forEach(t => { spendByCategory[t.category] = (spendByCategory[t.category] || 0) + Math.abs(t.amount); });
  const sortedCats = Object.entries(spendByCategory).sort((a, b) => b[1] - a[1]);
  const maxCatSpend = sortedCats[0]?.[1] || 1;

  const addTransaction = () => {
    if (!txDesc.trim() || !txAmount) return;
    const amt = txType === "expense" ? -Math.abs(parseFloat(txAmount)) : Math.abs(parseFloat(txAmount));
    setData(prev => ({
      ...prev,
      transactions: [{ id: Math.max(0, ...prev.transactions.map(t => t.id)) + 1, description: txDesc.trim(), amount: amt, category: txCategory, date: todayStr(), type: txType }, ...prev.transactions],
    }));
    setTxDesc(""); setTxAmount(""); setShowAdd(false);
  };

  const acctIcons = { checking: "\u{1F3E6}", savings: "\u{1F4B0}", retirement: "\u{1F4C8}", brokerage: "\u{1F4CA}", crypto: "\u20BF" };

  return (
    <div>
      <h1 style={{ fontFamily: D.display, fontSize: 24, fontWeight: 700, color: D.text, margin: "0 0 24px" }}>Finances</h1>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: D.textFaint, textTransform: "uppercase", marginBottom: 6 }}>Net Worth</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: D.text }}>{fmtMoney(netWorth)}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: D.primary, marginTop: 4 }}>+{fmtMoney(netWorth - prevMonth)} this month</div>
        </div>
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: D.textFaint, textTransform: "uppercase", marginBottom: 6 }}>Income (Month)</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: D.primary }}>{fmtMoney(monthIncome)}</div>
        </div>
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: D.textFaint, textTransform: "uppercase", marginBottom: 6 }}>Spent (Month)</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: D.danger }}>{fmtMoney(monthSpend)}</div>
        </div>
      </div>

      {/* Net Worth Chart */}
      <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, marginBottom: 24 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>Net Worth (12 Months)</h3>
        <div style={{ height: 120, display: "flex", alignItems: "end", gap: 8 }}>
          {data.netWorthHistory.map((h, i) => {
            const max = Math.max(...data.netWorthHistory.map(x => x.value));
            const min = Math.min(...data.netWorthHistory.map(x => x.value)) * 0.9;
            const pct = ((h.value - min) / (max - min)) * 100;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: `${Math.max(pct, 5)}%`, borderRadius: 4, background: `linear-gradient(180deg, ${D.primary} 0%, ${D.primaryDark} 100%)`, minHeight: 4 }} title={fmtMoney(h.value)} />
                <span style={{ fontSize: 9, color: D.textFaint }}>{h.month.split(" ")[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accounts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12, marginBottom: 24 }}>
        {data.accounts.map(a => (
          <div key={a.id} style={{ background: D.surface, borderRadius: 12, padding: 16, border: `1px solid ${D.border}` }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{acctIcons[a.type] || "\u{1F3E6}"}</div>
            <div style={{ fontSize: 12, color: D.textDim, marginBottom: 4 }}>{a.name}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: D.text }}>{fmtMoney(a.balance)}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Spending by Category */}
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>Spending by Category</h3>
          {sortedCats.map(([cat, total]) => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: D.text, textTransform: "capitalize" }}>{cat}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: D.textDim }}>{fmtMoney(total)}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: D.borderLight, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${(total / maxCatSpend) * 100}%`, background: categoryColors[cat] || D.textFaint }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>Recent Transactions</h3>
            <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer", background: showAdd ? D.surfaceAlt : D.primary, color: showAdd ? D.text : "#fff", fontFamily: D.font, fontSize: 11, fontWeight: 600 }}>
              {showAdd ? "Cancel" : "+ Add"}
            </button>
          </div>
          {showAdd && (
            <div style={{ marginBottom: 16, padding: 12, background: D.surfaceAlt, borderRadius: 8 }}>
              <input value={txDesc} onChange={e => setTxDesc(e.target.value)} placeholder="Description" style={{ ...inputStyle, marginBottom: 8 }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input value={txAmount} onChange={e => setTxAmount(e.target.value)} placeholder="Amount" type="number" style={{ ...inputStyle, flex: 1 }} />
                <select value={txType} onChange={e => setTxType(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
                  <option value="expense">Expense</option><option value="income">Income</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={txCategory} onChange={e => setTxCategory(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
                  {Object.keys(categoryColors).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={addTransaction} style={primaryBtn}>Add</button>
              </div>
            </div>
          )}
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            {data.transactions.slice(0, 15).map(t => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${D.borderLight}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: D.text }}>{t.description}</div>
                  <div style={{ fontSize: 11, color: D.textFaint }}>{fmtDate(t.date)} &middot; {t.category}</div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.amount >= 0 ? D.primary : D.danger }}>{t.amount >= 0 ? "+" : ""}{fmtMoney(t.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Workouts Tab
// ═══════════════════════════════════════════
function WorkoutsTab({ data, setData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [wType, setWType] = useState("run");
  const [wDuration, setWDuration] = useState("");
  const [wDistance, setWDistance] = useState("");
  const [wNotes, setWNotes] = useState("");
  const today = todayStr();

  const now = new Date();
  const dow = now.getDay();
  const mondayOff = dow === 0 ? -6 : 1 - dow;
  const weekDays = Array.from({ length: 7 }, (_, i) => dayOffset(mondayOff + i));

  const thisWeekWorkouts = data.workouts.filter(w => weekDays.includes(w.date));
  const thisMonthWorkouts = data.workouts.filter(w => w.date.startsWith(today.slice(0, 7)));
  const totalDuration = thisMonthWorkouts.reduce((s, w) => s + w.duration, 0);

  const addWorkout = () => {
    if (!wDuration) return;
    setData(prev => ({
      ...prev,
      workouts: [...prev.workouts, { id: Math.max(0, ...prev.workouts.map(w => w.id)) + 1, type: wType, duration: parseInt(wDuration), distance: wDistance ? parseFloat(wDistance) : null, notes: wNotes, date: today }],
    }));
    setWDuration(""); setWDistance(""); setWNotes(""); setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: D.display, fontSize: 24, fontWeight: 700, color: D.text, margin: 0 }}>Workouts</h1>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: showAdd ? D.surfaceAlt : D.primary, color: showAdd ? D.text : "#fff", fontFamily: D.font, fontSize: 13, fontWeight: 600 }}>
          {showAdd ? "Cancel" : "+ Log Workout"}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Type</label>
              <select value={wType} onChange={e => setWType(e.target.value)} style={inputStyle}>
                {Object.entries(workoutTypes).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Duration (min)</label>
              <input value={wDuration} onChange={e => setWDuration(e.target.value)} type="number" placeholder="45" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Distance (mi)</label>
              <input value={wDistance} onChange={e => setWDistance(e.target.value)} type="number" placeholder="Optional" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <input value={wNotes} onChange={e => setWNotes(e.target.value)} placeholder="Notes (optional)" onKeyDown={e => e.key === "Enter" && addWorkout()} style={{ ...inputStyle, flex: 1 }} />
            <button onClick={addWorkout} style={primaryBtn}>Log</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          { label: "This Week", value: thisWeekWorkouts.length, sub: "workouts" },
          { label: "This Month", value: thisMonthWorkouts.length, sub: "workouts" },
          { label: "Total Time", value: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`, sub: "this month" },
        ].map((s, i) => (
          <div key={i} style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: D.textFaint, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: D.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: D.textDim }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Weekly Calendar */}
      <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, marginBottom: 24 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>This Week</h3>
        <div style={{ display: "flex", gap: 10 }}>
          {weekDays.map((d, i) => {
            const w = data.workouts.find(wo => wo.date === d);
            const isToday = d === today;
            return (
              <div key={d} style={{ flex: 1, textAlign: "center", padding: "12px 0", borderRadius: 10, background: w ? D.primaryLight : isToday ? "#FFF8F0" : D.surfaceAlt, border: `1px solid ${w ? "#BBF7D0" : isToday ? D.warning : D.borderLight}` }}>
                <div style={{ fontSize: 11, color: D.textFaint, fontWeight: 600, marginBottom: 6 }}>{"MTWTFSS"[i]}</div>
                <div style={{ fontSize: 22 }}>{w ? (workoutTypes[w.type]?.icon || "\u{1F4AA}") : d < today ? "\u2014" : "\u00B7"}</div>
                {w && <div style={{ fontSize: 10, color: D.primary, marginTop: 4, fontWeight: 600 }}>{w.duration}min</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent History */}
      <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}` }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: D.text, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 16px" }}>Recent Workouts</h3>
        {data.workouts.slice(-20).reverse().map(w => (
          <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${D.borderLight}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: D.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {workoutTypes[w.type]?.icon || "\u{1F4AA}"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: D.text }}>{workoutTypes[w.type]?.label || w.type}</div>
              <div style={{ fontSize: 12, color: D.textDim }}>{fmtDate(w.date)} &middot; {w.duration} min{w.distance ? ` \u00B7 ${w.distance} mi` : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Goals Tab
// ═══════════════════════════════════════════
function GoalsTab({ data, setData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [gName, setGName] = useState("");
  const [gTarget, setGTarget] = useState("");
  const [gUnit, setGUnit] = useState("");
  const [gDeadline, setGDeadline] = useState("");

  const addGoal = () => {
    if (!gName.trim() || !gTarget) return;
    setData(prev => ({ ...prev, goals: [...prev.goals, { id: Math.max(0, ...prev.goals.map(g => g.id)) + 1, name: gName.trim(), target: parseFloat(gTarget), current: 0, unit: gUnit, deadline: gDeadline || null }] }));
    setGName(""); setGTarget(""); setGUnit(""); setGDeadline(""); setShowAdd(false);
  };
  const updateProgress = (id, delta) => {
    setData(prev => ({ ...prev, goals: prev.goals.map(g => g.id !== id ? g : { ...g, current: Math.max(0, Math.min(g.target, +(g.current + delta).toFixed(2))) }) }));
  };
  const deleteGoal = (id) => setData(prev => ({ ...prev, goals: prev.goals.filter(g => g.id !== id) }));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: D.display, fontSize: 24, fontWeight: 700, color: D.text, margin: 0 }}>Goals</h1>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: showAdd ? D.surfaceAlt : D.primary, color: showAdd ? D.text : "#fff", fontFamily: D.font, fontSize: 13, fontWeight: 600 }}>
          {showAdd ? "Cancel" : "+ Add Goal"}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: D.surface, borderRadius: 12, padding: 20, border: `1px solid ${D.border}`, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Goal</label>
              <input value={gName} onChange={e => setGName(e.target.value)} placeholder="e.g., Read 24 books" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Target</label>
              <input value={gTarget} onChange={e => setGTarget(e.target.value)} type="number" placeholder="24" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Unit</label>
              <input value={gUnit} onChange={e => setGUnit(e.target.value)} placeholder="books" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Deadline</label>
              <input value={gDeadline} onChange={e => setGDeadline(e.target.value)} type="date" style={inputStyle} />
            </div>
          </div>
          <button onClick={addGoal} style={primaryBtn}>Add Goal</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {data.goals.map(g => {
          const pct = Math.min((g.current / g.target) * 100, 100);
          const done = pct >= 100;
          const daysLeft = g.deadline ? Math.max(0, Math.ceil((new Date(g.deadline) - new Date()) / 86400000)) : null;
          return (
            <div key={g.id} style={{ background: D.surface, borderRadius: 12, padding: 20, border: done ? `2px solid ${D.primary}` : `1px solid ${D.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: D.text, textDecoration: done ? "line-through" : "none" }}>{g.name}</div>
                  {g.deadline && <div style={{ fontSize: 12, color: done ? D.primary : daysLeft < 30 ? D.warning : D.textFaint, marginTop: 4 }}>{done ? "Completed!" : `${daysLeft} days left`}</div>}
                </div>
                <button onClick={() => deleteGoal(g.id)} style={{ ...miniBtn, color: D.danger }}>{"\u00D7"}</button>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: D.textDim }}>{g.current} / {g.target} {g.unit}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: done ? D.primary : D.text }}>{Math.round(pct)}%</span>
                </div>
                <div style={{ height: 10, borderRadius: 5, background: D.borderLight, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 5, width: `${pct}%`, background: done ? D.primary : `linear-gradient(90deg, ${D.primary}, ${D.primaryDark})`, transition: "width 0.3s" }} />
                </div>
              </div>
              {!done && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => updateProgress(g.id, -1)} style={miniBtn}>-1</button>
                  <button onClick={() => updateProgress(g.id, 1)} style={{ ...miniBtn, background: D.primaryGhost, color: D.primary, borderColor: D.primary }}>+1</button>
                  <button onClick={() => updateProgress(g.id, 5)} style={{ ...miniBtn, background: D.primaryGhost, color: D.primary, borderColor: D.primary }}>+5</button>
                  <button onClick={() => updateProgress(g.id, 10)} style={{ ...miniBtn, background: D.primaryGhost, color: D.primary, borderColor: D.primary }}>+10</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Main Dashboard
// ═══════════════════════════════════════════
export default function PCCDashboard() {
  const [tab, setTab] = useState("overview");
  const [data, setData] = usePersistedState("pcc_data", getInitialData());
  const [showSignup, setShowSignup] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupDone, setSignupDone] = useState(() => {
    try { return !!localStorage.getItem("pcc_signup"); } catch { return false; }
  });

  const tabs = [
    { key: "overview", label: "Overview", icon: "\u{1F4CA}" },
    { key: "tasks", label: "Tasks", icon: "\u2705" },
    { key: "habits", label: "Habits", icon: "\u{1F501}" },
    { key: "finances", label: "Finances", icon: "\u{1F4B0}" },
    { key: "workouts", label: "Workouts", icon: "\u{1F3CB}\u{FE0F}" },
    { key: "goals", label: "Goals", icon: "\u{1F3AF}" },
  ];

  const resetData = () => { localStorage.removeItem("pcc_data"); setData(getInitialData()); };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupEmail.trim()) return;
    try {
      localStorage.setItem("pcc_signup", JSON.stringify({ name: signupName.trim(), email: signupEmail.trim(), date: new Date().toISOString() }));
    } catch {}
    setSignupDone(true);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: D.font }}>
      {/* Signup Modal */}
      {showSignup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setShowSignup(false)}>
          <div style={{ background: D.surface, borderRadius: 16, padding: "36px 32px", maxWidth: 440, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", fontFamily: D.font }} onClick={e => e.stopPropagation()}>
            {signupDone ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{"\u2705"}</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: D.text, margin: "0 0 8px" }}>You're on the list!</h2>
                <p style={{ fontSize: 15, color: D.textDim, lineHeight: 1.6, margin: "0 0 24px" }}>
                  We'll reach out within 24 hours to set up your personal dashboard.
                </p>
                <button onClick={() => setShowSignup(false)} style={{ ...primaryBtn, width: "100%", padding: "14px 0" }}>
                  Back to Demo
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: D.text, margin: "0 0 8px" }}>Get Your Own Dashboard</h2>
                <p style={{ fontSize: 14, color: D.textDim, lineHeight: 1.6, margin: "0 0 24px" }}>
                  Sign up for early access. Free to use,your data stays yours.
                </p>
                <form onSubmit={handleSignup}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Name</label>
                    <input value={signupName} onChange={e => setSignupName(e.target.value)} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: D.textDim, display: "block", marginBottom: 4 }}>Email</label>
                    <input value={signupEmail} onChange={e => setSignupEmail(e.target.value)} type="email" placeholder="you@email.com" required style={inputStyle} />
                  </div>
                  <button type="submit" style={{ ...primaryBtn, width: "100%", padding: "14px 0", fontSize: 15 }}>
                    Request Early Access
                  </button>
                  <p style={{ fontSize: 12, color: D.textFaint, textAlign: "center", margin: "12px 0 0" }}>
                    No credit card required. We'll set up your account within 24 hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: 260, background: D.sidebar, padding: "24px 0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid #2A2A2E" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #10B981, #065F46)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>D</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#F5F0EB" }}>Diego V.</div>
              <div style={{ fontSize: 12, color: "#6B6560" }}>Demo Account</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: tab === t.key ? "rgba(16,185,129,0.12)" : "transparent", color: tab === t.key ? "#10B981" : "#A39E98", fontFamily: D.font, fontSize: 14, fontWeight: tab === t.key ? 600 : 500, marginBottom: 2, transition: "all 0.15s", textAlign: "left" }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        {/* Signup CTA */}
        <div style={{ padding: "0 16px 16px" }}>
          <button onClick={() => setShowSignup(true)} style={{
            width: "100%", padding: "12px 0", borderRadius: 8, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #10B981, #065F46)", color: "#fff",
            fontFamily: D.font, fontSize: 14, fontWeight: 700,
            boxShadow: "0 2px 8px rgba(16,185,129,0.3)",
          }}>
            {signupDone ? "\u2713 Signed Up" : "Get Your Own Dashboard"}
          </button>
        </div>
        <div style={{ padding: "12px 24px", borderTop: "1px solid #2A2A2E" }}>
          <Link to="/pcc" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B6560", textDecoration: "none", fontFamily: D.font, marginBottom: 12 }}>
            <img src="/vv-logo.png" alt="" style={{ width: 16, height: 16, borderRadius: 3, opacity: 0.6 }} /> Back to Landing
          </Link>
          <button onClick={resetData} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6B6560", background: "none", border: "none", cursor: "pointer", fontFamily: D.font, padding: 0 }}>
            {"\u{1F501}"} Reset Demo Data
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 260, flex: 1, background: D.bg, padding: 32, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Demo Banner */}
          {!signupDone && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: D.primaryGhost, border: `1px solid rgba(16,185,129,0.2)`,
              borderRadius: 10, padding: "12px 20px", marginBottom: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>{"\u{1F50D}"}</span>
                <span style={{ fontSize: 14, color: D.text, fontWeight: 500 }}>
                  You're exploring a demo account.
                </span>
              </div>
              <button onClick={() => setShowSignup(true)} style={{
                padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                background: D.primary, color: "#fff",
                fontFamily: D.font, fontSize: 13, fontWeight: 600,
              }}>
                Sign Up for Your Own
              </button>
            </div>
          )}
          {tab === "overview" && <OverviewTab data={data} setData={setData} />}
          {tab === "tasks" && <TasksTab data={data} setData={setData} />}
          {tab === "habits" && <HabitsTab data={data} setData={setData} />}
          {tab === "finances" && <FinancesTab data={data} setData={setData} />}
          {tab === "workouts" && <WorkoutsTab data={data} setData={setData} />}
          {tab === "goals" && <GoalsTab data={data} setData={setData} />}
        </div>
      </main>
    </div>
  );
}
