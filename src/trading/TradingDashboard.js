import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TT, btnPrimary, btnOutline, card } from "./theme";

// Demo data for the dashboard
const DEMO_PORTFOLIO = {
  totalValue: 10847.32,
  dayChange: 2.4,
  dayPnl: 254.18,
  totalPnl: 847.32,
  totalPnlPct: 8.47,
  positions: [
    { token: "ETH", amount: 1.25, avgEntry: 3180.0, currentPrice: 3341.50, pnl: 201.88, pnlPct: 5.08 },
    { token: "USDC", amount: 6674.45, avgEntry: 1.0, currentPrice: 1.0, pnl: 0, pnlPct: 0 },
  ],
};

const DEMO_TRADES = [
  {
    id: 1, time: "14:32", date: "Mar 8",
    action: "BUY", token: "ETH", amount: "0.15",
    price: "$3,241.50", pnl: null,
    reasoning: "RSI oversold (32.4), MACD bullish crossover, X sentiment 72% bullish. Multi-timeframe alignment on 1h and 4h charts.",
  },
  {
    id: 2, time: "11:15", date: "Mar 8",
    action: "SELL", token: "ETH", amount: "0.20",
    price: "$3,380.00", pnl: "+$47.60",
    reasoning: "Take-profit hit at +5%. RSI approaching overbought (68). Securing gains before potential resistance at $3,400.",
  },
  {
    id: 3, time: "09:02", date: "Mar 8",
    action: "BUY", token: "ETH", amount: "0.20",
    price: "$3,142.00", pnl: null,
    reasoning: "Morning dip. Bollinger Band lower touch. Grok detected whale accumulation tweets. High-confidence entry.",
  },
  {
    id: 4, time: "22:45", date: "Mar 7",
    action: "SELL", token: "ETH", amount: "0.30",
    price: "$3,290.00", pnl: "+$83.10",
    reasoning: "Self-review flagged overexposure. Reducing position size ahead of overnight session. Locking in 2.8% gain.",
  },
  {
    id: 5, time: "16:30", date: "Mar 7",
    action: "BUY", token: "ETH", amount: "0.30",
    price: "$3,013.00", pnl: null,
    reasoning: "4h chart showing double bottom pattern. Social sentiment recovering after morning FUD. Conservative entry with tight stop.",
  },
];

const DEMO_AI_LOG = [
  { time: "14:32", type: "decision", msg: "EXECUTING BUY: 0.15 ETH @ $3,241.50 — Confluence of oversold RSI, MACD cross, and positive sentiment." },
  { time: "14:31", type: "grok", msg: "Sentiment scan complete: 847 posts/hr, 72% bullish. Key influencer posts signaling accumulation." },
  { time: "14:30", type: "analysis", msg: "TA computed: RSI(14)=32.4, MACD bullish crossover confirmed, price at lower Bollinger Band." },
  { time: "14:29", type: "scan", msg: "Scanning ETH/USD across 5m, 1h, 4h, 1d timeframes..." },
  { time: "11:15", type: "decision", msg: "EXECUTING SELL: 0.20 ETH @ $3,380 — Take-profit target reached (+5.0%)." },
  { time: "09:05", type: "review", msg: "Self-review: Yesterday's morning entries averaged +2.3% return. Strategy performing well in current volatility regime." },
];

export default function TradingDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [riskProfile, setRiskProfile] = useState("moderate");
  const [capital, setCapital] = useState("10000");
  const [botStatus, setBotStatus] = useState("running");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vt_risk_profile");
      if (saved) setRiskProfile(saved);
      const cap = localStorage.getItem("vt_capital");
      if (cap) setCapital(cap);
    } catch {}
  }, []);

  const profileColors = {
    conservative: "#00d4ff",
    moderate: "#ffd93d",
    aggressive: "#00ff88",
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("vt_session");
    } catch {}
    navigate("/trading");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "trades", label: "Trades" },
    { id: "ai", label: "AI Log" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div style={{ background: TT.bg, color: TT.text, fontFamily: TT.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "14px 24px",
        borderBottom: `1px solid ${TT.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
            background: botStatus === "running" ? TT.greenDim : TT.redDim,
            border: `1px solid ${botStatus === "running" ? "rgba(0,255,136,0.2)" : "rgba(255,71,87,0.2)"}`,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: botStatus === "running" ? TT.green : TT.red,
              animation: botStatus === "running" ? "pulse 2s infinite" : "none",
            }} />
            <span style={{
              fontFamily: TT.mono, fontSize: 11, fontWeight: 600,
              color: botStatus === "running" ? TT.green : TT.red,
              textTransform: "uppercase",
            }}>
              {botStatus === "running" ? "Bot Active" : "Bot Paused"}
            </span>
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{
            fontFamily: TT.mono, fontSize: 12, color: TT.textDim,
            padding: "4px 10px", borderRadius: 6,
            background: TT.surfaceAlt, border: `1px solid ${TT.border}`,
            textTransform: "capitalize",
          }}>
            <span style={{ color: profileColors[riskProfile] }}>●</span> {riskProfile}
          </span>
          <button onClick={handleLogout} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: TT.font, fontSize: 13, color: TT.textDim,
          }}>
            Log out
          </button>
        </div>
      </nav>

      {/* ─── DEMO BANNER ─── */}
      <div style={{
        background: TT.primaryDim,
        borderBottom: `1px solid rgba(0,212,255,0.15)`,
        padding: "10px 24px",
        textAlign: "center",
      }}>
        <span style={{ fontFamily: TT.mono, fontSize: 12, color: TT.primary }}>
          DEMO MODE — Showing sample data. Your live bot data will appear here once connected.
        </span>
      </div>

      {/* ─── TABS ─── */}
      <div style={{
        borderBottom: `1px solid ${TT.border}`,
        padding: "0 24px",
        display: "flex",
        gap: 0,
      }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "14px 20px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${activeTab === t.id ? TT.primary : "transparent"}`,
              cursor: "pointer",
              fontFamily: TT.font,
              fontSize: 14,
              fontWeight: activeTab === t.id ? 600 : 400,
              color: activeTab === t.id ? TT.text : TT.textDim,
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 100px" }}>

        {activeTab === "overview" && (
          <>
            {/* Portfolio Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}>
              {[
                { label: "Portfolio Value", value: `$${DEMO_PORTFOLIO.totalValue.toLocaleString()}`, color: TT.text },
                { label: "Today's P&L", value: `+$${DEMO_PORTFOLIO.dayPnl.toFixed(2)}`, sub: `+${DEMO_PORTFOLIO.dayChange}%`, color: TT.green },
                { label: "Total Return", value: `+$${DEMO_PORTFOLIO.totalPnl.toFixed(2)}`, sub: `+${DEMO_PORTFOLIO.totalPnlPct}%`, color: TT.green },
                { label: "Starting Capital", value: `$${Number(capital).toLocaleString()}`, color: TT.textDim },
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

            {/* Positions */}
            <div style={{ ...card(), marginBottom: 28 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
                Open Positions
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: TT.font }}>
                  <thead>
                    <tr>
                      {["Token", "Amount", "Avg Entry", "Current", "P&L"].map((h) => (
                        <th key={h} style={{
                          textAlign: "left", padding: "10px 12px",
                          fontSize: 12, fontWeight: 600, color: TT.textFaint,
                          borderBottom: `1px solid ${TT.border}`,
                          textTransform: "uppercase", letterSpacing: 0.5,
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_PORTFOLIO.positions.map((pos, i) => (
                      <tr key={i}>
                        <td style={{ padding: "14px 12px", fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.text }}>
                          {pos.token}
                        </td>
                        <td style={{ padding: "14px 12px", fontFamily: TT.mono, fontSize: 14, color: TT.textDim }}>
                          {pos.amount}
                        </td>
                        <td style={{ padding: "14px 12px", fontFamily: TT.mono, fontSize: 14, color: TT.textDim }}>
                          ${pos.avgEntry.toLocaleString()}
                        </td>
                        <td style={{ padding: "14px 12px", fontFamily: TT.mono, fontSize: 14, color: TT.text }}>
                          ${pos.currentPrice.toLocaleString()}
                        </td>
                        <td style={{
                          padding: "14px 12px", fontFamily: TT.mono, fontSize: 14,
                          color: pos.pnl >= 0 ? TT.green : TT.red,
                        }}>
                          {pos.pnl >= 0 ? "+" : ""}${pos.pnl.toFixed(2)} ({pos.pnlPct >= 0 ? "+" : ""}{pos.pnlPct.toFixed(2)}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={card()}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
                Recent Trades
              </h3>
              {DEMO_TRADES.slice(0, 3).map((t) => (
                <div key={t.id} style={{
                  padding: "16px 0",
                  borderBottom: `1px solid ${TT.border}`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}>
                  <div style={{
                    padding: "4px 10px", borderRadius: 4,
                    background: t.action === "BUY" ? TT.greenDim : TT.redDim,
                    fontFamily: TT.mono, fontSize: 12, fontWeight: 700,
                    color: t.action === "BUY" ? TT.green : TT.red,
                    flexShrink: 0,
                  }}>
                    {t.action}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.text }}>
                        {t.amount} {t.token} @ {t.price}
                      </span>
                      {t.pnl && (
                        <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.green }}>
                          {t.pnl}
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim, lineHeight: 1.5 }}>
                      {t.reasoning}
                    </div>
                    <div style={{ fontFamily: TT.mono, fontSize: 11, color: TT.textFaint, marginTop: 6 }}>
                      {t.date} {t.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "trades" && (
          <div style={card()}>
            <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
              Trade History
            </h3>
            {DEMO_TRADES.map((t) => (
              <div key={t.id} style={{
                padding: "18px 0",
                borderBottom: `1px solid ${TT.border}`,
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}>
                <div style={{
                  padding: "4px 10px", borderRadius: 4,
                  background: t.action === "BUY" ? TT.greenDim : TT.redDim,
                  fontFamily: TT.mono, fontSize: 12, fontWeight: 700,
                  color: t.action === "BUY" ? TT.green : TT.red,
                  flexShrink: 0,
                }}>
                  {t.action}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.text }}>
                      {t.amount} {t.token} @ {t.price}
                    </span>
                    {t.pnl && (
                      <span style={{ fontFamily: TT.mono, fontSize: 14, fontWeight: 600, color: TT.green }}>
                        {t.pnl}
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: TT.font, fontSize: 14, color: TT.textDim, lineHeight: 1.6 }}>
                    {t.reasoning}
                  </div>
                  <div style={{ fontFamily: TT.mono, fontSize: 12, color: TT.textFaint, marginTop: 8 }}>
                    {t.date} at {t.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "ai" && (
          <div style={card()}>
            <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
              AI Decision Log
            </h3>
            <div style={{
              background: "#060a10",
              borderRadius: 8,
              padding: "16px 20px",
              fontFamily: TT.mono,
              fontSize: 13,
              lineHeight: 2,
            }}>
              {DEMO_AI_LOG.map((log, i) => {
                const colors = {
                  decision: TT.green,
                  grok: "#a78bfa",
                  analysis: TT.primary,
                  scan: TT.textDim,
                  review: TT.yellow,
                };
                const labels = {
                  decision: "CLAUDE",
                  grok: "GROK",
                  analysis: "TA",
                  scan: "SCAN",
                  review: "REVIEW",
                };
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

        {activeTab === "settings" && (
          <div style={{ maxWidth: 600 }}>
            <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 20px" }}>
                Bot Controls
              </h3>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setBotStatus(botStatus === "running" ? "paused" : "running")}
                  style={botStatus === "running"
                    ? btnOutline({ borderColor: TT.red, color: TT.red })
                    : btnPrimary()
                  }
                >
                  {botStatus === "running" ? "Pause Bot" : "Resume Bot"}
                </button>
              </div>
            </div>

            <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
                Risk Profile
              </h3>
              <div style={{ display: "flex", gap: 8 }}>
                {["conservative", "moderate", "aggressive"].map((p) => {
                  const selected = riskProfile === p;
                  return (
                    <button
                      key={p}
                      onClick={() => {
                        setRiskProfile(p);
                        try { localStorage.setItem("vt_risk_profile", p); } catch {}
                      }}
                      style={{
                        flex: 1, padding: "12px 8px", borderRadius: 8,
                        border: `1px solid ${selected ? profileColors[p] : TT.border}`,
                        background: selected ? `${profileColors[p]}15` : TT.surfaceAlt,
                        cursor: "pointer",
                        fontFamily: TT.font, fontSize: 13, fontWeight: 600,
                        color: selected ? profileColors[p] : TT.textDim,
                        textTransform: "capitalize",
                        transition: "all 0.15s",
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ ...card(), padding: 28 }}>
              <h3 style={{ fontFamily: TT.font, fontSize: 16, fontWeight: 700, color: TT.text, margin: "0 0 16px" }}>
                Account
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Coinbase CDP: </span>
                  <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.yellow }}>Not connected</span>
                </div>
                <div>
                  <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>Anthropic API: </span>
                  <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.yellow }}>Not connected</span>
                </div>
              </div>
              <button onClick={handleLogout} style={{
                ...btnOutline({ marginTop: 20, borderColor: TT.red, color: TT.red, fontSize: 14, padding: "10px 20px" }),
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
