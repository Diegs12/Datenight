import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TT, btnOutline, card, setTheme, getCurrentThemeName, onThemeChange, getTheme, THEME_NAMES } from "./theme"; // eslint-disable-line no-unused-vars

// In production, use the Vercel proxy (handles auth server-side).
// Locally, hit the bot directly for development.
const IS_LOCAL = window.location.hostname === "localhost";
const BOT_API = process.env.REACT_APP_BOT_API || "";
const POLL_INTERVAL = 10000;

function botFetch(endpoint, params) {
  const qs = params ? "&" + new URLSearchParams(params).toString() : "";
  if (IS_LOCAL && BOT_API) {
    const localQs = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetch(`${BOT_API}/api/${endpoint}${localQs}`).then((r) => r.ok ? r.json() : null);
  }
  return fetch(`/api/bot-proxy?endpoint=${endpoint}${qs}`).then((r) => r.ok ? r.json() : null);
}

function fmt(n, decimals = 2) {
  if (n == null || isNaN(n)) return "—";
  return Number(n).toFixed(decimals);
}
function fmtUsd(n) {
  if (n == null || isNaN(n)) return "—";
  return "$" + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

// ─── SETTINGS TAB (DEMO MODE) ───
function SettingsTab({ status, botRunning, connected, riskProfile, setRiskProfile, profileColors, handleLogout, fmtDate, fmtTime, themeName, onThemeSelect }) { // eslint-disable-line no-unused-vars
  const swatches = THEME_NAMES.map((name) => {
    const t = getTheme(name);
    return { name, bg: t.bg, accent: t.primary, surface: t.surface };
  });

  return (
    <div style={{ maxWidth: 600 }}>
      {/* Theme Picker */}
      <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
        <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
          Theme
        </h3>
        <div style={{ display: "flex", gap: 12 }}>
          {swatches.map((s) => (
            <button
              key={s.name}
              onClick={() => onThemeSelect(s.name)}
              style={{
                width: 80,
                height: 60,
                borderRadius: 10,
                border: themeName === s.name ? `2px solid ${s.accent}` : `1px solid ${TT.border}`,
                background: s.bg,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: 0,
                boxShadow: themeName === s.name ? `0 0 12px ${s.accent}44` : "none",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.accent }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.surface, border: `1px solid ${s.accent}33` }} />
              </div>
              <span style={{ fontFamily: TT.font, fontSize: 10, fontWeight: 600, color: s.accent, textTransform: "capitalize" }}>
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bot Status */}
      <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
        <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
          Bot Status
        </h3>
        {status ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Status: </span>
              <span style={{ fontFamily: TT.mono, fontSize: 13, color: botRunning ? TT.green : TT.yellow }}>{status.status}</span>
            </div>
            <div>
              <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Mode: </span>
              <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.primary }}>Demo (Paper Trading)</span>
            </div>
            <div>
              <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Cycles: </span>
              <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.text }}>{status.cycleCount}</span>
            </div>
            <div>
              <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Started: </span>
              <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.text }}>{fmtDate(status.botStartedAt)} {fmtTime(status.botStartedAt)}</span>
            </div>
            <div>
              <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Last cycle: </span>
              <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.text }}>{fmtDate(status.lastCycle)} {fmtTime(status.lastCycle)}</span>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textFaint }}>
            {connected ? "Loading..." : "Not connected to bot."}
          </div>
        )}
      </div>

      {/* Demo Notice */}
      <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
        <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 6px" }}>
          Demo Mode
        </h3>
        <p style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim, margin: "0 0 20px", lineHeight: 1.5 }}>
          This is Diego's personal trading bot running on paper (simulated) funds.
          No real money is involved. You're watching live results in real time.
        </p>
        <div style={{
          padding: "14px 16px", borderRadius: 8,
          background: TT.primaryDim, border: `1px solid rgba(0,212,255,0.2)`,
        }}>
          <div style={{ fontFamily: TT.mono, fontSize: 11, fontWeight: 600, color: TT.primary, marginBottom: 8, letterSpacing: 0.5 }}>
            INTERESTED IN YOUR OWN BOT?
          </div>
          <p style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim, margin: 0, lineHeight: 1.6 }}>
            If you want your own instance of this bot, <Link to="/trading" style={{ color: TT.primary, textDecoration: "none" }}>fill out the interest form</Link> and I'll reach out.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TradingDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [riskProfile, setRiskProfile] = useState("moderate");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [themeName, setThemeName] = useState(getCurrentThemeName);

  // Live data from bot API
  const [status, setStatus] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [decision, setDecision] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [indicators, setIndicators] = useState(null);
  const [research, setResearch] = useState(null);

  // Performance tab state
  const [scorecard, setScorecard] = useState(null);
  const [benchmark, setBenchmark] = useState(null);
  const [livePortfolio, setLivePortfolio] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [perfRange, setPerfRange] = useState("1W");
  const [chartHover, setChartHover] = useState(null);

  useEffect(() => {
    return onThemeChange((name) => setThemeName(name));
  }, []);

  const handleThemeSelect = useCallback((name) => {
    setTheme(name);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vt_risk_profile");
      if (saved) setRiskProfile(saved);
    } catch {}
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const endpoints = ["status", "portfolio", "trades", "stats", "decision", "reviews", "indicators", "research", "scorecard", "benchmark", "live-portfolio"];
      const results = await Promise.allSettled(
        endpoints.map((ep) => botFetch(ep))
      );
      const [s, p, t, st, d, rev, ind, res, sc, bm, lp] = results.map((r) => r.status === "fulfilled" ? r.value : null);

      if (s) { setStatus(s); setConnected(true); }
      if (p) setPortfolio(p);
      if (t) setTrades(Array.isArray(t) ? t : []);
      if (st) setStats(st);
      if (d) setDecision(d);
      if (rev) setReviews(Array.isArray(rev) ? rev : []);
      if (ind) setIndicators(ind);
      if (res) setResearch(res);
      if (sc) setScorecard(sc);
      if (bm) setBenchmark(bm);
      if (lp) setLivePortfolio(lp);

      // If no endpoints responded, mark disconnected
      if (!s && !p) setConnected(false);
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Fetch history data when performance range changes
  const perfRangeHours = { "1D": 24, "1W": 168, "1M": 720, "3M": 2160, "ALL": 8760 };
  useEffect(() => {
    const hours = perfRangeHours[perfRange] || 168;
    botFetch("history", { hours }).then((data) => {
      if (data && Array.isArray(data)) setHistoryData(data);
      else if (data?.points && Array.isArray(data.points)) setHistoryData(data.points);
      else setHistoryData([]);
    }).catch(() => setHistoryData([]));
  }, [perfRange, connected]); // eslint-disable-line react-hooks/exhaustive-deps

  const botRunning = status?.status === "running";
  const profileColors = { conservative: "#00d4ff", moderate: "#ffd93d", aggressive: "#00ff88" };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Performance" },
    { id: "trades", label: "Trades" },
    { id: "ai", label: "AI Log" },
    { id: "indicators", label: "Indicators" },
    { id: "settings", label: "Settings" },
  ];

  // Build trades for display,sorted newest first, with normalized fields
  const displayTrades = trades.map((t) => ({
    id: t.id,
    action: (t.action || "hold").toUpperCase(),
    token: (t.token || "—").toUpperCase(),
    amount_usd: t.amount_usd,
    confidence: t.confidence,
    reasoning: t.reasoning || "",
    market_summary: t.market_summary || "",
    risk_notes: t.risk_notes || "",
    timeframe_alignment: t.timeframe_alignment || "",
    executed: t.executed,
    timestamp: t.timestamp || t.loggedAt,
  })).reverse();

  // Build AI log from trades + decision
  const aiLog = [];
  if (decision) {
    aiLog.push({
      time: fmtTime(status?.lastCycle),
      type: "decision",
      msg: `${decision.action?.toUpperCase()}: ${decision.reasoning?.slice(0, 200) || "Analyzing..."}`,
    });
    if (decision.market_summary) {
      aiLog.push({ time: fmtTime(status?.lastCycle), type: "analysis", msg: decision.market_summary });
    }
    if (decision.timeframe_alignment) {
      aiLog.push({ time: fmtTime(status?.lastCycle), type: "scan", msg: decision.timeframe_alignment });
    }
    if (decision.risk_notes) {
      aiLog.push({ time: fmtTime(status?.lastCycle), type: "review", msg: decision.risk_notes });
    }
  }
  // Add recent executed trades to the log
  displayTrades.filter((t) => t.executed && t.action !== "HOLD").slice(0, 5).forEach((t) => {
    aiLog.push({
      time: fmtTime(t.timestamp),
      type: "decision",
      msg: `EXECUTED ${t.action}: ${t.token} $${t.amount_usd},${t.reasoning?.slice(0, 150)}`,
    });
  });
  // Add reviews
  reviews.forEach((r) => {
    aiLog.push({
      time: fmtTime(r.timestamp || r.createdAt),
      type: "review",
      msg: r.summary || r.review || JSON.stringify(r).slice(0, 200),
    });
  });
  // Add Grok research
  if (research?.summary) {
    aiLog.push({ time: fmtTime(status?.lastCycle), type: "grok", msg: research.summary });
  } else if (research?.sentiment) {
    aiLog.push({ time: fmtTime(status?.lastCycle), type: "grok", msg: `Sentiment: ${JSON.stringify(research.sentiment).slice(0, 200)}` });
  }

  return (
    <div style={{ background: TT.bg, color: TT.text, fontFamily: TT.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "14px 24px", borderBottom: `1px solid ${TT.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link to="/trading" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill={TT.primaryDim} />
              <path d="M12 26L17 20L21 23L28 14" stroke={TT.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 14H28V18" stroke={TT.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: TT.mono, fontSize: 15, fontWeight: 700, color: TT.text }}>
              Vallota Trading
            </span>
          </Link>

          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 20,
            background: connected && botRunning ? TT.greenDim : connected ? "rgba(255,217,61,0.12)" : TT.redDim,
            border: `1px solid ${connected && botRunning ? "rgba(0,255,136,0.2)" : connected ? "rgba(255,217,61,0.2)" : "rgba(255,71,87,0.2)"}`,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: connected && botRunning ? TT.green : connected ? TT.yellow : TT.red,
              animation: connected && botRunning ? "pulse 2s infinite" : "none",
            }} />
            <span style={{
              fontFamily: TT.mono, fontSize: 11, fontWeight: 600,
              color: connected && botRunning ? TT.green : connected ? TT.yellow : TT.red,
              textTransform: "uppercase",
            }}>
              {!connected ? "Disconnected" : botRunning ? "Bot Active" : "Bot Idle"}
            </span>
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

          {status?.mode && (
            <span style={{
              fontFamily: TT.mono, fontSize: 11, fontWeight: 600,
              padding: "4px 10px", borderRadius: 12,
              background: status.mode === "paper" ? "rgba(0,212,255,0.1)" : TT.greenDim,
              color: status.mode === "paper" ? TT.primary : TT.green,
              border: `1px solid ${status.mode === "paper" ? "rgba(0,212,255,0.2)" : "rgba(0,255,136,0.2)"}`,
              textTransform: "uppercase",
            }}>
              {status.mode} MODE
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{
            fontFamily: TT.mono, fontSize: 12, color: TT.textDim,
            padding: "4px 10px", borderRadius: 6,
            background: TT.surfaceAlt, border: `1px solid ${TT.border}`,
            textTransform: "capitalize",
          }}>
            <span style={{ color: profileColors[status?.riskProfile || riskProfile] }}>●</span> {status?.riskProfile || riskProfile}
          </span>
          <Link to="/trading" style={{
            fontFamily: TT.font, fontSize: 13, color: TT.textDim, textDecoration: "none",
          }}>
            &larr; Back
          </Link>
        </div>
      </nav>

      {/* ─── DEMO BANNER ─── */}
      <div style={{
        background: "rgba(0,212,255,0.08)", borderBottom: `1px solid rgba(0,212,255,0.15)`,
        padding: "10px 24px", textAlign: "center",
      }}>
        <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.primary }}>
          PAPER TRADING: All trades use simulated funds. No real money is involved.
          {connected && status ? ` Cycle ${status.cycleCount || 0} | Last: ${fmtTime(status.lastCycle)}` : ""}
        </span>
      </div>
      {!connected && !loading && (
        <div style={{
          background: TT.redDim, borderBottom: `1px solid rgba(255,71,87,0.15)`,
          padding: "10px 24px", textAlign: "center",
        }}>
          <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.red }}>
            NOT CONNECTED: Cannot reach bot. The demo bot may be restarting.
          </span>
        </div>
      )}
      {status?.errors?.length > 0 && status.errors.map((err, i) => (
        <div key={i} style={{
          background: TT.redDim, borderBottom: `1px solid rgba(255,71,87,0.15)`,
          padding: "10px 24px", textAlign: "center",
        }}>
          <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.red }}>
            ERROR: {err.message} {err.at ? `(${fmtTime(err.at)})` : ""}
          </span>
        </div>
      ))}
      {status?.warnings?.length > 0 && status.warnings.map((warn, i) => (
        <div key={i} style={{
          background: "rgba(255,217,61,0.08)", borderBottom: `1px solid rgba(255,217,61,0.15)`,
          padding: "10px 24px", textAlign: "center",
        }}>
          <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.yellow }}>
            WARNING: {warn.message}
          </span>
        </div>
      ))}
      {status?.failsafeActive && (
        <div style={{
          background: TT.redDim, borderBottom: `1px solid rgba(255,71,87,0.15)`,
          padding: "12px 24px", textAlign: "center",
        }}>
          <span style={{ fontFamily: TT.mono, fontSize: 13, fontWeight: 700, color: TT.red }}>
            FAILSAFE ACTIVE: Claude API is down. Bot is protecting capital. Check your Anthropic API credits.
          </span>
        </div>
      )}

      {/* ─── TABS ─── */}
      <div style={{
        borderBottom: `1px solid ${TT.border}`, padding: "0 24px",
        display: "flex", gap: 0, overflowX: "auto",
      }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "14px 20px", background: "none", border: "none",
            borderBottom: `2px solid ${activeTab === t.id ? TT.primary : "transparent"}`,
            cursor: "pointer", fontFamily: TT.font, fontSize: 14,
            fontWeight: activeTab === t.id ? 600 : 400,
            color: activeTab === t.id ? TT.text : TT.textDim,
            transition: "all 0.15s", whiteSpace: "nowrap",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 100px" }}>

        {loading && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ fontFamily: TT.mono, fontSize: 14, color: TT.textDim }}>Connecting to bot...</div>
          </div>
        )}

        {!loading && activeTab === "overview" && (
          <>
            {/* Portfolio Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16, marginBottom: 28,
            }}>
              {[
                {
                  label: "Portfolio Value",
                  value: portfolio ? fmtUsd(portfolio.totalValue) : "—",
                  color: TT.text,
                },
                {
                  label: "P&L",
                  value: portfolio ? `${portfolio.pnl >= 0 ? "+" : ""}${fmtUsd(portfolio.pnl)}` : "—",
                  sub: portfolio ? `${portfolio.pnlPercent >= 0 ? "+" : ""}${fmt(portfolio.pnlPercent)}%` : null,
                  color: portfolio?.pnl >= 0 ? TT.green : TT.red,
                },
                {
                  label: "Starting Capital",
                  value: portfolio ? fmtUsd(portfolio.startingCapital) : "—",
                  color: TT.textDim,
                },
                {
                  label: "Decisions / Executed",
                  value: stats ? `${stats.totalDecisions} / ${stats.totalExecuted}` : "—",
                  sub: stats ? `Avg confidence: ${stats.avgConfidence}%` : null,
                  color: TT.primary,
                },
              ].map((s, i) => (
                <div key={i} style={card({ padding: 20 })}>
                  <div style={{ fontFamily: TT.font, fontSize: 12, color: TT.textDim, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: TT.mono, fontSize: 24, fontWeight: 700, color: s.color }}>
                    {s.value}
                  </div>
                  {s.sub && (
                    <div style={{ fontFamily: TT.mono, fontSize: 13, color: s.color, marginTop: 4 }}>
                      {s.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Side-by-side: Paper Holdings + Live Coinbase Wallet */}
            <div style={{ display: "grid", gridTemplateColumns: livePortfolio?.balances ? "1fr 1fr" : "1fr", gap: 20, marginBottom: 28 }}>
              {/* Paper Holdings */}
              {portfolio?.balances && (
                <div style={{ ...card(), margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: 0 }}>
                      Paper Holdings
                    </h3>
                    <div style={{
                      padding: "4px 10px", borderRadius: 4,
                      background: TT.primaryDim,
                      fontFamily: TT.mono, fontSize: 12, fontWeight: 700,
                      color: TT.primary,
                    }}>SIMULATED</div>
                  </div>
                  <div style={{ overflowX: "auto", maxHeight: 400, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: TT.font }}>
                      <thead>
                        <tr>
                          {["Token", "Amount"].map((h) => (
                            <th key={h} style={{
                              textAlign: "left", padding: "8px 10px",
                              fontSize: 11, fontWeight: 600, color: TT.textFaint,
                              borderBottom: `1px solid ${TT.border}`,
                              textTransform: "uppercase", letterSpacing: 0.5,
                              position: "sticky", top: 0, background: TT.surface,
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(portfolio.balances)
                          .sort(([,a], [,b]) => b - a)
                          .map(([token, amount]) => (
                            <tr key={token}>
                              <td style={{ padding: "10px 10px", fontFamily: TT.mono, fontSize: 13, fontWeight: 600, color: TT.text }}>
                                {token.toUpperCase()}
                              </td>
                              <td style={{ padding: "10px 10px", fontFamily: TT.mono, fontSize: 13, color: TT.textDim }}>
                                {typeof amount === "number" ? fmt(amount, token === "usdc" ? 2 : 6) : String(amount)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Live Coinbase Wallet */}
              {livePortfolio?.balances && (
                <div style={{ ...card(), margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: 0 }}>
                      Coinbase Wallet
                    </h3>
                    <div style={{
                      padding: "4px 10px", borderRadius: 4,
                      background: TT.greenDim,
                      fontFamily: TT.mono, fontSize: 12, fontWeight: 700,
                      color: TT.green,
                    }}>LIVE {fmtUsd(livePortfolio.totalValueUsd)}</div>
                  </div>
                  <div style={{ overflowX: "auto", maxHeight: 400, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: TT.font }}>
                      <thead>
                        <tr>
                          {["Token", "Amount"].map((h) => (
                            <th key={h} style={{
                              textAlign: "left", padding: "8px 10px",
                              fontSize: 11, fontWeight: 600, color: TT.textFaint,
                              borderBottom: `1px solid ${TT.border}`,
                              textTransform: "uppercase", letterSpacing: 0.5,
                              position: "sticky", top: 0, background: TT.surface,
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(livePortfolio.balances)
                          .sort(([,a], [,b]) => b - a)
                          .map(([token, amount]) => (
                            <tr key={token}>
                              <td style={{ padding: "10px 10px", fontFamily: TT.mono, fontSize: 13, fontWeight: 600, color: TT.text }}>
                                {token.toUpperCase()}
                              </td>
                              <td style={{ padding: "10px 10px", fontFamily: TT.mono, fontSize: 13, color: TT.textDim }}>
                                {typeof amount === "number" ? (amount < 0.01 && amount > 0 ? amount.toExponential(4) : fmt(amount, amount > 100 ? 2 : 6)) : String(amount)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Latest AI Decision */}
            {decision && (
              <div style={{ ...card(), marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: 0 }}>
                    Latest AI Decision
                  </h3>
                  <div style={{
                    padding: "4px 12px", borderRadius: 4,
                    background: decision.action === "buy" ? TT.greenDim : decision.action === "sell" ? TT.redDim : TT.primaryDim,
                    fontFamily: TT.mono, fontSize: 13, fontWeight: 700,
                    color: decision.action === "buy" ? TT.green : decision.action === "sell" ? TT.red : TT.primary,
                  }}>
                    {decision.action?.toUpperCase()} {decision.token ? `${decision.token.toUpperCase()}` : ""},{decision.confidence}% confidence
                  </div>
                </div>
                <p style={{ fontFamily: TT.font, fontSize: 14, color: TT.textDim, lineHeight: 1.7, margin: "0 0 12px" }}>
                  {decision.reasoning}
                </p>
                {decision.market_summary && (
                  <div style={{ padding: "12px 16px", borderRadius: 8, background: TT.surfaceAlt, marginBottom: 8 }}>
                    <div style={{ fontFamily: TT.mono, fontSize: 11, color: TT.primary, marginBottom: 4, letterSpacing: 0.5 }}>MARKET</div>
                    <div style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim, lineHeight: 1.6 }}>{decision.market_summary}</div>
                  </div>
                )}
                {decision.risk_notes && (
                  <div style={{ padding: "12px 16px", borderRadius: 8, background: TT.surfaceAlt }}>
                    <div style={{ fontFamily: TT.mono, fontSize: 11, color: TT.yellow, marginBottom: 4, letterSpacing: 0.5 }}>RISK</div>
                    <div style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim, lineHeight: 1.6 }}>{decision.risk_notes}</div>
                  </div>
                )}
              </div>
            )}

            {/* Recent Executed Trades */}
            <div style={card()}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
                Recent Trades
              </h3>
              {displayTrades.filter((t) => t.executed).length === 0 && (
                <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textFaint, padding: "20px 0" }}>No executed trades yet.</div>
              )}
              {displayTrades.filter((t) => t.executed).slice(0, 10).map((t) => (
                <div key={t.id} style={{
                  padding: "16px 0", borderBottom: `1px solid ${TT.border}`,
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <div style={{
                    padding: "4px 10px", borderRadius: 4,
                    background: t.action === "BUY" ? TT.greenDim : t.action === "SELL" ? TT.redDim : TT.primaryDim,
                    fontFamily: TT.mono, fontSize: 12, fontWeight: 700,
                    color: t.action === "BUY" ? TT.green : t.action === "SELL" ? TT.red : TT.primary,
                    flexShrink: 0,
                  }}>
                    {t.action}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.text }}>
                        {t.token} {t.amount_usd ? `$${t.amount_usd}` : ""},{t.confidence}% conf
                      </span>
                    </div>
                    <div style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim, lineHeight: 1.5 }}>
                      {t.reasoning}
                    </div>
                    <div style={{ fontFamily: TT.mono, fontSize: 11, color: TT.textFaint, marginTop: 6 }}>
                      {fmtDate(t.timestamp)} {fmtTime(t.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && activeTab === "performance" && (() => {
          // ─── CHART HELPERS ───
          const points = historyData.map((pt) => ({
            t: new Date(pt.timestamp || pt.time || pt.date),
            v: pt.liveValue ?? pt.live_value ?? 0,
            btc: pt.btcPrice ?? pt.btc_price ?? null,
          })).filter((p) => p.v > 0).sort((a, b) => a.t - b.t);

          // Normalize BTC to same starting value as portfolio for comparison
          const startVal = points.length > 0 ? points[0].v : 0;
          const startBtc = points.length > 0 ? points[0].btc : 1;
          points.forEach((p) => {
            if (p.btc && startBtc > 0) p.btcNorm = (p.btc / startBtc) * startVal;
          });

          const hasData = points.length > 1;
          const vals = points.map((p) => p.v);
          const btcVals = points.map((p) => p.btcNorm).filter((v) => v != null);
          const hasBtc = btcVals.length > 1;

          const allVals = [...vals, ...(hasBtc ? btcVals : [])];
          const minV = Math.min(...allVals);
          const maxV = Math.max(...allVals);
          const rangeV = maxV - minV || 1;
          const isPositive = hasData ? vals[vals.length - 1] >= vals[0] : true;

          const W = 800, H = 300, PAD = { top: 20, right: 60, bottom: 30, left: 70 };
          const chartW = W - PAD.left - PAD.right;
          const chartH = H - PAD.top - PAD.bottom;

          const toX = (i) => PAD.left + (i / (points.length - 1)) * chartW;
          const toY = (v) => PAD.top + chartH - ((v - minV) / rangeV) * chartH;

          const buildPath = (accessor) => {
            const pts = points.map((p, i) => ({ x: toX(i), y: toY(accessor(p)) }));
            return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
          };

          const linePath = hasData ? buildPath((p) => p.v) : "";
          const btcPath = hasData && hasBtc ? buildPath((p) => p.btcNorm ?? p.v) : "";
          const areaPath = hasData
            ? `${linePath} L${toX(points.length - 1).toFixed(1)},${(PAD.top + chartH).toFixed(1)} L${PAD.left.toFixed(1)},${(PAD.top + chartH).toFixed(1)} Z`
            : "";

          // Y-axis labels (5 ticks)
          const yTicks = Array.from({ length: 5 }, (_, i) => {
            const v = minV + (rangeV * i) / 4;
            return { v, y: toY(v) };
          });

          // X-axis labels (up to 6)
          const xCount = Math.min(6, points.length);
          const xTicks = hasData ? Array.from({ length: xCount }, (_, i) => {
            const idx = Math.round((i / (xCount - 1)) * (points.length - 1));
            const pt = points[idx];
            const label = perfRange === "1D"
              ? pt.t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : pt.t.toLocaleDateString([], { month: "short", day: "numeric" });
            return { x: toX(idx), label };
          }) : [];

          // Hover index from mouse
          const handleChartMouse = (e) => {
            const svg = e.currentTarget;
            const rect = svg.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * W;
            if (mouseX < PAD.left || mouseX > W - PAD.right) { setChartHover(null); return; }
            const ratio = (mouseX - PAD.left) / chartW;
            const idx = Math.round(ratio * (points.length - 1));
            if (idx >= 0 && idx < points.length) setChartHover(idx);
          };

          // Scorecard values
          const sc = scorecard || {};
          const paperReturn = sc.paperReturnGross ?? sc.paper_return_gross ?? sc.pnlPercent ?? (portfolio?.pnlPercent);
          const paperReturnNet = sc.paperReturnNet ?? sc.paper_return_net ?? null;
          const liveValue = sc.livePortfolioValue ?? sc.live_portfolio_value ?? portfolio?.totalValue ?? null;
          const btcReturn = sc.btcBuyHoldReturn ?? sc.btc_return ?? benchmark?.btc?.returnPct ?? null;
          const alphaVsBtc = (paperReturn != null && btcReturn != null) ? (paperReturn - btcReturn) : (sc.alpha ?? sc.alphaVsBtc ?? null);
          const totalCost = sc.totalApiCost ?? sc.total_api_cost ?? sc.apiCosts?.total ?? null;
          const monthlyCost = sc.monthlyRunRate ?? sc.monthly_run_rate ?? sc.apiCosts?.monthlyRate ?? null;

          // Benchmark bars
          const bm = benchmark || {};
          const benchmarks = [
            { label: "Bot", value: paperReturn },
            { label: "BTC", value: bm.btc?.returnPct ?? btcReturn },
            { label: "ETH", value: bm.eth?.returnPct ?? sc.ethReturn ?? null },
            { label: "Basket", value: bm.basket?.returnPct ?? sc.basketReturn ?? null },
          ].filter((b) => b.value != null);
          const bmMax = Math.max(...benchmarks.map((b) => Math.abs(b.value)), 1);

          // Cost breakdown
          const costs = sc.apiCosts || sc.costs || {};
          const costRows = [
            { label: "Claude Analysis (Haiku)", value: costs.claude_analysis ?? costs.haiku ?? costs.claudeAnalysis },
            { label: "Opus Strategist", value: costs.opus_strategist ?? costs.opus ?? costs.opusStrategist },
            { label: "Grok Research", value: costs.grok_research ?? costs.grok ?? costs.grokResearch },
          ].filter((r) => r.value != null);

          return (
            <>
              {/* ─── PORTFOLIO VALUE CHART ─── */}
              <div style={{ ...card(), marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: 0 }}>
                    Coinbase Wallet Value
                  </h3>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["1D", "1W", "1M", "3M", "ALL"].map((r) => (
                      <button key={r} onClick={() => setPerfRange(r)} style={{
                        padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                        fontFamily: TT.mono, fontSize: 12, fontWeight: 600,
                        background: perfRange === r ? TT.primary : TT.surfaceAlt,
                        color: perfRange === r ? TT.bg : TT.textDim,
                        transition: "all 0.15s",
                      }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {!hasData ? (
                  <div style={{ padding: "60px 0", textAlign: "center", fontFamily: TT.mono, fontSize: 14, color: TT.textFaint }}>
                    {connected ? "Collecting data points..." : "Connect to bot to see chart."}
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <svg
                      viewBox={`0 0 ${W} ${H}`}
                      style={{ width: "100%", height: "auto", display: "block" }}
                      onMouseMove={handleChartMouse}
                      onMouseLeave={() => setChartHover(null)}
                    >
                      {/* Horizontal gridlines */}
                      {yTicks.map((tick, i) => (
                        <line key={i} x1={PAD.left} x2={W - PAD.right} y1={tick.y} y2={tick.y}
                          stroke={TT.border} strokeWidth="0.5" strokeDasharray="4 4" />
                      ))}

                      {/* Area fill */}
                      <path d={areaPath} fill={isPositive ? TT.green : TT.red} opacity="0.06" />

                      {/* BTC line (if available) */}
                      {btcPath && (
                        <path d={btcPath} fill="none" stroke={TT.textFaint} strokeWidth="1.5" strokeDasharray="4 3" />
                      )}

                      {/* Portfolio line */}
                      <path d={linePath} fill="none" stroke={isPositive ? TT.green : TT.red} strokeWidth="2" strokeLinejoin="round" />

                      {/* Y-axis labels */}
                      {yTicks.map((tick, i) => (
                        <text key={i} x={PAD.left - 8} y={tick.y + 4} textAnchor="end"
                          style={{ fontFamily: TT.mono, fontSize: 10, fill: TT.textFaint }}>
                          ${tick.v.toFixed(0)}
                        </text>
                      ))}

                      {/* X-axis labels */}
                      {xTicks.map((tick, i) => (
                        <text key={i} x={tick.x} y={H - 6} textAnchor="middle"
                          style={{ fontFamily: TT.mono, fontSize: 10, fill: TT.textFaint }}>
                          {tick.label}
                        </text>
                      ))}

                      {/* Hover crosshair + dot */}
                      {chartHover != null && points[chartHover] && (
                        <>
                          <line x1={toX(chartHover)} x2={toX(chartHover)} y1={PAD.top} y2={PAD.top + chartH}
                            stroke={TT.textFaint} strokeWidth="0.5" strokeDasharray="3 3" />
                          <circle cx={toX(chartHover)} cy={toY(points[chartHover].v)} r="4"
                            fill={isPositive ? TT.green : TT.red} stroke={TT.bg} strokeWidth="2" />
                          {points[chartHover].btc != null && (
                            <circle cx={toX(chartHover)} cy={toY(points[chartHover].btc)} r="3"
                              fill={TT.textFaint} stroke={TT.bg} strokeWidth="1.5" />
                          )}
                        </>
                      )}
                    </svg>

                    {/* Tooltip */}
                    {chartHover != null && points[chartHover] && (
                      <div style={{
                        position: "absolute", top: 8,
                        left: `${((toX(chartHover) / W) * 100)}%`,
                        transform: "translateX(-50%)",
                        background: TT.surface, border: `1px solid ${TT.border}`, borderRadius: 8,
                        padding: "8px 14px", pointerEvents: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        zIndex: 10,
                      }}>
                        <div style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 700, color: isPositive ? TT.green : TT.red }}>
                          {fmtUsd(points[chartHover].v)}
                        </div>
                        {points[chartHover].btcNorm != null && (
                          <div style={{ fontFamily: TT.mono, fontSize: 11, color: TT.textFaint, marginTop: 2 }}>
                            BTC B&H: {fmtUsd(points[chartHover].btcNorm)}
                          </div>
                        )}
                        <div style={{ fontFamily: TT.mono, fontSize: 10, color: TT.textDim, marginTop: 4 }}>
                          {fmtDate(points[chartHover].t.toISOString())} {fmtTime(points[chartHover].t.toISOString())}
                        </div>
                      </div>
                    )}

                    {/* Legend */}
                    <div style={{ display: "flex", gap: 20, marginTop: 12, justifyContent: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 16, height: 2, background: isPositive ? TT.green : TT.red, borderRadius: 1 }} />
                        <span style={{ fontFamily: TT.mono, fontSize: 11, color: TT.textDim }}>Coinbase Wallet</span>
                      </div>
                      {hasBtc && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 16, height: 2, background: TT.textFaint, borderRadius: 1, borderTop: "1px dashed" }} />
                          <span style={{ fontFamily: TT.mono, fontSize: 11, color: TT.textDim }}>BTC Buy & Hold</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── SCORECARD GRID ─── */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16, marginBottom: 28,
              }}>
                {[
                  {
                    label: "Paper Return (Gross)",
                    value: paperReturn != null ? `${paperReturn >= 0 ? "+" : ""}${fmt(paperReturn)}%` : "--",
                    color: paperReturn >= 0 ? TT.green : TT.red,
                  },
                  {
                    label: "Paper Return (Net)",
                    value: paperReturnNet != null ? `${paperReturnNet >= 0 ? "+" : ""}${fmt(paperReturnNet)}%` : "--",
                    color: paperReturnNet != null ? (paperReturnNet >= 0 ? TT.green : TT.red) : TT.textDim,
                  },
                  {
                    label: "Live Portfolio Value",
                    value: liveValue != null ? fmtUsd(liveValue) : "--",
                    color: TT.text,
                  },
                  {
                    label: "BTC Buy & Hold",
                    value: btcReturn != null ? `${btcReturn >= 0 ? "+" : ""}${fmt(btcReturn)}%` : "--",
                    color: btcReturn != null ? (btcReturn >= 0 ? TT.green : TT.red) : TT.textDim,
                  },
                  {
                    label: "Alpha vs BTC",
                    value: alphaVsBtc != null ? `${alphaVsBtc >= 0 ? "+" : ""}${fmt(alphaVsBtc)}%` : "--",
                    color: alphaVsBtc != null ? (alphaVsBtc >= 0 ? TT.green : TT.red) : TT.textDim,
                  },
                  {
                    label: "API Costs",
                    value: totalCost != null ? fmtUsd(totalCost) : "--",
                    sub: monthlyCost != null ? `${fmtUsd(monthlyCost)}/mo run rate` : null,
                    color: TT.primary,
                  },
                ].map((s, i) => (
                  <div key={i} style={card({ padding: 20 })}>
                    <div style={{ fontFamily: TT.font, fontSize: 12, color: TT.textDim, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: TT.mono, fontSize: 22, fontWeight: 700, color: s.color }}>
                      {s.value}
                    </div>
                    {s.sub && (
                      <div style={{ fontFamily: TT.mono, fontSize: 12, color: TT.textDim, marginTop: 4 }}>
                        {s.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ─── BENCHMARK COMPARISON BARS ─── */}
              {benchmarks.length > 1 && (
                <div style={{ ...card(), marginBottom: 28 }}>
                  <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
                    Benchmark Comparison
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {benchmarks.map((b, i) => {
                      const pct = (Math.abs(b.value) / bmMax) * 100;
                      const barColor = i === 0 ? TT.primary : b.value >= 0 ? TT.green : TT.red;
                      return (
                        <div key={b.label}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontFamily: TT.mono, fontSize: 13, fontWeight: 600, color: TT.text }}>
                              {b.label}
                            </span>
                            <span style={{ fontFamily: TT.mono, fontSize: 13, fontWeight: 700, color: b.value >= 0 ? TT.green : TT.red }}>
                              {b.value >= 0 ? "+" : ""}{fmt(b.value)}%
                            </span>
                          </div>
                          <div style={{
                            width: "100%", height: 8, borderRadius: 4,
                            background: TT.surfaceAlt,
                            overflow: "hidden",
                          }}>
                            <div style={{
                              width: `${Math.min(pct, 100)}%`, height: "100%", borderRadius: 4,
                              background: barColor, transition: "width 0.3s ease",
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── COST BREAKDOWN ─── */}
              {costRows.length > 0 && (
                <div style={{ ...card(), marginBottom: 28 }}>
                  <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
                    Cost Breakdown
                  </h3>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Service", "Cost"].map((h) => (
                          <th key={h} style={{
                            textAlign: h === "Cost" ? "right" : "left",
                            padding: "10px 12px", fontSize: 12, fontWeight: 600,
                            color: TT.textFaint, borderBottom: `1px solid ${TT.border}`,
                            fontFamily: TT.font, textTransform: "uppercase", letterSpacing: 0.5,
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {costRows.map((row, i) => (
                        <tr key={i}>
                          <td style={{ padding: "12px 12px", fontFamily: TT.font, fontSize: 14, color: TT.textDim }}>
                            {row.label}
                          </td>
                          <td style={{ padding: "12px 12px", fontFamily: TT.mono, fontSize: 14, color: TT.text, textAlign: "right" }}>
                            {fmtUsd(row.value)}
                          </td>
                        </tr>
                      ))}
                      {totalCost != null && (
                        <tr>
                          <td style={{ padding: "12px 12px", fontFamily: TT.font, fontSize: 14, fontWeight: 700, color: TT.text, borderTop: `1px solid ${TT.border}` }}>
                            Total
                          </td>
                          <td style={{ padding: "12px 12px", fontFamily: TT.mono, fontSize: 14, fontWeight: 700, color: TT.primary, textAlign: "right", borderTop: `1px solid ${TT.border}` }}>
                            {fmtUsd(totalCost)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          );
        })()}

        {!loading && activeTab === "trades" && (
          <div style={card()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: 0 }}>
                All Decisions ({displayTrades.length})
              </h3>
              {stats && (
                <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.textDim }}>
                  {stats.buys} buys · {stats.sells} sells · {stats.totalHolds} holds
                </span>
              )}
            </div>
            {displayTrades.length === 0 && (
              <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textFaint, padding: "20px 0" }}>No trade data available.</div>
            )}
            {displayTrades.map((t) => (
              <div key={t.id} style={{
                padding: "18px 0", borderBottom: `1px solid ${TT.border}`,
                display: "flex", alignItems: "flex-start", gap: 14,
                opacity: t.executed ? 1 : 0.6,
              }}>
                <div style={{
                  padding: "4px 10px", borderRadius: 4,
                  background: t.action === "BUY" ? TT.greenDim : t.action === "SELL" ? TT.redDim : TT.primaryDim,
                  fontFamily: TT.mono, fontSize: 12, fontWeight: 700,
                  color: t.action === "BUY" ? TT.green : t.action === "SELL" ? TT.red : TT.primary,
                  flexShrink: 0,
                }}>
                  {t.action}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.text }}>
                      {t.token} {t.amount_usd ? `$${t.amount_usd}` : ""},{t.confidence}% confidence
                    </span>
                    <span style={{
                      fontFamily: TT.mono, fontSize: 11,
                      color: t.executed ? TT.green : TT.textFaint,
                    }}>
                      {t.executed ? "EXECUTED" : "SKIPPED"}
                    </span>
                  </div>
                  <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textDim, lineHeight: 1.6 }}>
                    {t.reasoning}
                  </div>
                  {t.timeframe_alignment && (
                    <div style={{ fontFamily: TT.font, fontSize: 12, color: TT.textFaint, marginTop: 6, lineHeight: 1.5 }}>
                      Timeframes: {t.timeframe_alignment}
                    </div>
                  )}
                  <div style={{ fontFamily: TT.mono, fontSize: 12, color: TT.textFaint, marginTop: 6 }}>
                    #{t.id} · {fmtDate(t.timestamp)} at {fmtTime(t.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && activeTab === "ai" && (
          <div style={card()}>
            <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
              AI Decision Log
            </h3>
            <div style={{
              background: TT.surfaceAlt, borderRadius: 8,
              padding: "16px 20px", fontFamily: TT.mono, fontSize: 13, lineHeight: 2,
            }}>
              {aiLog.length === 0 && (
                <div style={{ color: TT.textFaint }}>Waiting for bot data...</div>
              )}
              {aiLog.map((log, i) => {
                const colors = { decision: TT.green, grok: "#a78bfa", analysis: TT.primary, scan: TT.textDim, review: TT.yellow };
                const labels = { decision: "CLAUDE", grok: "GROK", analysis: "MARKET", scan: "TIMEFRAMES", review: "RISK" };
                return (
                  <div key={i}>
                    <span style={{ color: TT.textFaint }}>{log.time}</span>
                    {" "}
                    <span style={{ color: colors[log.type], fontWeight: 600 }}>[{labels[log.type]}]</span>
                    {" "}
                    <span style={{ color: TT.textDim }}>{log.msg}</span>
                  </div>
                );
              })}
              <span style={{
                display: "inline-block", width: 8, height: 14,
                background: TT.primary,
                animation: "blink 1s step-end infinite",
                verticalAlign: "middle", marginTop: 4,
              }} />
              <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          </div>
        )}

        {!loading && activeTab === "indicators" && (
          <div style={card()}>
            <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
              Technical Indicators
            </h3>
            {!indicators ? (
              <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textFaint, padding: "20px 0" }}>
                {connected ? "Waiting for indicator data..." : "Connect to bot to see live indicators."}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {Object.entries(indicators.technicals || indicators).map(([token, timeframes]) => {
                  if (typeof timeframes !== "object" || !timeframes) return null;
                  return (
                    <div key={token}>
                      <div style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 700, color: TT.primary, marginBottom: 12, textTransform: "uppercase" }}>
                        {token}
                      </div>
                      <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12,
                      }}>
                        {Object.entries(timeframes).map(([tf, data]) => {
                          if (typeof data !== "object" || !data) return null;
                          return (
                            <div key={tf} style={{
                              background: TT.surfaceAlt, borderRadius: 8, padding: 16,
                              border: `1px solid ${TT.border}`,
                            }}>
                              <div style={{ fontFamily: TT.mono, fontSize: 12, fontWeight: 600, color: TT.textDim, marginBottom: 10, textTransform: "uppercase" }}>
                                {tf}
                              </div>
                              {data.rsi != null && (
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                  <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint }}>RSI</span>
                                  <span style={{
                                    fontFamily: TT.mono, fontSize: 13, fontWeight: 600,
                                    color: data.rsi < 30 ? TT.green : data.rsi > 70 ? TT.red : TT.text,
                                  }}>{fmt(data.rsi, 1)}</span>
                                </div>
                              )}
                              {data.macd?.histogram != null && (
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                  <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint }}>MACD Hist</span>
                                  <span style={{
                                    fontFamily: TT.mono, fontSize: 13, fontWeight: 600,
                                    color: data.macd.histogram >= 0 ? TT.green : TT.red,
                                  }}>{fmt(data.macd.histogram, 4)}</span>
                                </div>
                              )}
                              {data.bollingerBands?.percentB != null && (
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                  <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint }}>BB %B</span>
                                  <span style={{ fontFamily: TT.mono, fontSize: 13, fontWeight: 600, color: TT.text }}>
                                    {fmt(data.bollingerBands.percentB, 3)}
                                  </span>
                                </div>
                              )}
                              {data.sma20 != null && (
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint }}>SMA 20</span>
                                  <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.textDim }}>{fmtUsd(data.sma20)}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {!loading && activeTab === "settings" && (
          <SettingsTab
            status={status}
            botRunning={botRunning}
            connected={connected}
            riskProfile={riskProfile}
            setRiskProfile={setRiskProfile}
            profileColors={profileColors}
            fmtDate={fmtDate}
            fmtTime={fmtTime}
            themeName={themeName}
            onThemeSelect={handleThemeSelect}
          />
        )}
      </div>
    </div>
  );
}
