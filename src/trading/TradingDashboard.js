import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TT, btnOutline, card } from "./theme";

// Bot API base — uses env var in production (Railway), falls back to localhost for dev
const BOT_API = process.env.REACT_APP_BOT_API || "http://localhost:3333";
const POLL_INTERVAL = 10000; // 10 seconds, matches the bot's dashboard

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

export default function TradingDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [riskProfile, setRiskProfile] = useState("moderate");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Live data from bot API
  const [status, setStatus] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [decision, setDecision] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [indicators, setIndicators] = useState(null);
  const [research, setResearch] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vt_risk_profile");
      if (saved) setRiskProfile(saved);
    } catch {}
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const endpoints = ["status", "portfolio", "trades", "stats", "decision", "reviews", "indicators", "research"];
      const results = await Promise.allSettled(
        endpoints.map((ep) => fetch(`${BOT_API}/api/${ep}`).then((r) => r.ok ? r.json() : null))
      );
      const [s, p, t, st, d, rev, ind, res] = results.map((r) => r.status === "fulfilled" ? r.value : null);

      if (s) { setStatus(s); setConnected(true); }
      if (p) setPortfolio(p);
      if (t) setTrades(Array.isArray(t) ? t : []);
      if (st) setStats(st);
      if (d) setDecision(d);
      if (rev) setReviews(Array.isArray(rev) ? rev : []);
      if (ind) setIndicators(ind);
      if (res) setResearch(res);

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

  const botRunning = status?.status === "running";
  const profileColors = { conservative: "#00d4ff", moderate: "#ffd93d", aggressive: "#00ff88" };

  const handleLogout = () => {
    try { localStorage.removeItem("vt_session"); } catch {}
    navigate("/trading");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "trades", label: "Trades" },
    { id: "ai", label: "AI Log" },
    { id: "indicators", label: "Indicators" },
    { id: "settings", label: "Settings" },
  ];

  // Build trades for display — sorted newest first, with normalized fields
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
      msg: `EXECUTED ${t.action}: ${t.token} $${t.amount_usd} — ${t.reasoning?.slice(0, 150)}`,
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
          <button onClick={handleLogout} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: TT.font, fontSize: 13, color: TT.textDim,
          }}>
            Log out
          </button>
        </div>
      </nav>

      {/* ─── CONNECTION BANNER ─── */}
      {!connected && !loading && (
        <div style={{
          background: TT.redDim, borderBottom: `1px solid rgba(255,71,87,0.15)`,
          padding: "10px 24px", textAlign: "center",
        }}>
          <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.red }}>
            NOT CONNECTED — Cannot reach bot at {BOT_API}. Make sure your trading bot is running.
          </span>
        </div>
      )}
      {connected && status?.mode === "paper" && (
        <div style={{
          background: TT.primaryDim, borderBottom: `1px solid rgba(0,212,255,0.15)`,
          padding: "10px 24px", textAlign: "center",
        }}>
          <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.primary }}>
            PAPER TRADING — Bot is running with simulated funds. Cycle {status.cycleCount || 0} | Last: {fmtTime(status.lastCycle)}
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

            {/* Balances */}
            {portfolio?.balances && (
              <div style={{ ...card(), marginBottom: 28 }}>
                <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
                  Holdings
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: TT.font }}>
                    <thead>
                      <tr>
                        {["Token", "Amount"].map((h) => (
                          <th key={h} style={{
                            textAlign: "left", padding: "10px 12px",
                            fontSize: 12, fontWeight: 600, color: TT.textFaint,
                            borderBottom: `1px solid ${TT.border}`,
                            textTransform: "uppercase", letterSpacing: 0.5,
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(portfolio.balances).map(([token, amount]) => (
                        <tr key={token}>
                          <td style={{ padding: "14px 12px", fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.text }}>
                            {token.toUpperCase()}
                          </td>
                          <td style={{ padding: "14px 12px", fontFamily: TT.mono, fontSize: 14, color: TT.textDim }}>
                            {typeof amount === "number" ? fmt(amount, token === "usdc" ? 2 : 6) : String(amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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
                    {decision.action?.toUpperCase()} {decision.token ? `${decision.token.toUpperCase()}` : ""} — {decision.confidence}% confidence
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
                        {t.token} {t.amount_usd ? `$${t.amount_usd}` : ""} — {t.confidence}% conf
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
                      {t.token} {t.amount_usd ? `$${t.amount_usd}` : ""} — {t.confidence}% confidence
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
              background: "#060a10", borderRadius: 8,
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
          <div style={{ maxWidth: 600 }}>
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
                    <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.primary }}>{status.mode}</span>
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
                <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textFaint }}>Not connected to bot.</div>
              )}
            </div>

            <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
                Connection
              </h3>
              <div>
                <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Bot API: </span>
                <span style={{ fontFamily: TT.mono, fontSize: 13, color: connected ? TT.green : TT.red }}>
                  {BOT_API} — {connected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <p style={{ fontFamily: TT.font, fontSize: 12, color: TT.textFaint, margin: "12px 0 0", lineHeight: 1.5 }}>
                Set REACT_APP_BOT_API in your environment to point to your deployed bot (e.g. Railway URL).
              </p>
            </div>

            <div style={{ ...card(), padding: 28 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
                Account
              </h3>
              <button onClick={handleLogout} style={{
                ...btnOutline({ borderColor: TT.red, color: TT.red, fontSize: 14, padding: "10px 20px" }),
              }}>
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
