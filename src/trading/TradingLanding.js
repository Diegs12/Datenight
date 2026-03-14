import { useState } from "react";
import { Link } from "react-router-dom";
import { TT, btnPrimary, btnOutline, card } from "./theme";

// ─── ICONS ───
const IconBrain = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TT.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 015 5c0 1.1-.4 2.1-1 2.9.6.8 1 1.8 1 2.9a5 5 0 01-3.5 4.8V20a2 2 0 01-2 2h-1a2 2 0 01-2-2v-2.4A5 5 0 015 12.8c0-1.1.4-2.1 1-2.9A5 5 0 017 7a5 5 0 015-5z"/>
    <path d="M12 2v6M8.5 7h7M8 12h8"/>
  </svg>
);
const IconChart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TT.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20L9 14L13 18L21 8"/>
    <path d="M17 8H21V12"/>
  </svg>
);
const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TT.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7V12C3 17.5 7 22 12 22C17 22 21 17.5 21 12V7L12 2Z"/>
    <path d="M9 12L11 14L15 10"/>
  </svg>
);
const IconClock = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TT.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6V12L16 14"/>
  </svg>
);
const IconLoop = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TT.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2V8H15"/>
    <path d="M3 22V16H9"/>
    <path d="M21 8L16.5 3.5A9 9 0 003 12"/>
    <path d="M3 16L7.5 20.5A9 9 0 0021 12"/>
  </svg>
);
const IconTarget = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TT.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const FEATURES = [
  {
    icon: <IconBrain />,
    title: "Dual AI Engine",
    desc: "Claude handles trade decisions. Grok scans X/Twitter for real-time market sentiment. Two AI systems working together for broader market coverage.",
  },
  {
    icon: <IconChart />,
    title: "Real Technical Analysis",
    desc: "RSI, MACD, Bollinger Bands,computed mathematically, not guessed by an LLM. Your bot runs actual indicators on real price data.",
  },
  {
    icon: <IconLoop />,
    title: "Self-Improving AI",
    desc: "After every trade, the AI reviews what it did right and wrong. It analyzes its own history and attempts to refine its approach over time.",
  },
  {
    icon: <IconClock />,
    title: "Multi-Timeframe Analysis",
    desc: "Analyzes 5-minute, 1-hour, 4-hour, and daily charts simultaneously. Catches both scalping opportunities and macro trends.",
  },
  {
    icon: <IconShield />,
    title: "Hard Stop-Losses",
    desc: "Every position has a hard stop-loss to help limit losses. Plus a failsafe mode that pauses trading in extreme conditions. Stop-losses may not execute at exact prices during high volatility.",
  },
  {
    icon: <IconTarget />,
    title: "Risk-Matched Trading",
    desc: "Take our risk quiz and your bot is calibrated to your comfort level. Conservative, moderate, or aggressive,you decide how it trades.",
  },
];

const STEPS = [
  { num: "01", title: "Watch It Live", desc: "The bot runs 24/7 on paper funds. Check the live dashboard anytime to see what it's doing right now." },
  { num: "02", title: "See Every Decision", desc: "Every trade comes with the AI's full reasoning, technical indicators, and sentiment analysis. Nothing is hidden." },
  { num: "03", title: "Want Your Own?", desc: "If you like what you see, reach out. I can set you up with your own instance of the bot, configured to your risk profile." },
];

const FAQS = [
  {
    q: "Is this a live trading platform?",
    a: "No. This is my personal trading bot running on paper funds. You're watching it trade in real time, but no real money is involved. If you're interested in having your own instance, reach out and we can talk.",
  },
  {
    q: "What exchanges does the bot trade on?",
    a: "The bot trades on the Coinbase Base L2 network using simulated paper funds.",
  },
  {
    q: "How does the dual AI system work?",
    a: "Claude (by Anthropic) is the decision engine. It analyzes technicals, reviews past trades, and decides when to buy or sell. Grok (by xAI) monitors X/Twitter in real-time for market sentiment and breaking news. Together they cover signals that neither could alone.",
  },
  {
    q: "What does the self-review loop do?",
    a: "After each trade closes, the AI reviews its reasoning, the outcome, and market conditions. It identifies patterns in its own decisions, then attempts to refine its future approach based on what it finds.",
  },
  {
    q: "Can I get my own bot?",
    a: "Potentially. If you're interested, fill out the interest form and I'll reach out. You'd get your own instance of the bot configured to your risk profile. I am not liable for the bot's performance once it's in your hands.",
  },
  {
    q: "Does it cost anything to watch?",
    a: "No. The live dashboard is free to view. You can watch the bot trade, see its reasoning, and review historical performance anytime.",
  },
  {
    q: "Is this financial advice?",
    a: "No. This is a personal technology project. Nothing on this page or dashboard constitutes financial advice, a recommendation to trade, or a solicitation of any kind. All results shown are from paper trading with simulated funds.",
  },
];

// ─── ANIMATED TERMINAL ───
function TerminalAnimation() { // eslint-disable-line no-unused-vars
  const lines = [
    { color: TT.textDim, text: "$ vallota-bot --start" },
    { color: TT.textFaint, text: "" },
    { color: TT.green, text: "[AI] Scanning ETH/USD across 4 timeframes..." },
    { color: TT.textDim, text: "[TA] RSI(14): 32.4 | MACD: bullish crossover" },
    { color: TT.textDim, text: "[TA] BB: price near lower band (oversold)" },
    { color: TT.primary, text: "[GROK] X sentiment: 72% bullish (847 posts/hr)" },
    { color: TT.textFaint, text: "" },
    { color: TT.green, text: "[CLAUDE] Decision: BUY 0.15 ETH @ $3,241.50" },
    { color: TT.textDim, text: "[RISK] Stop-loss set: $3,144.26 (-3.0%)" },
    { color: TT.textDim, text: "[RISK] Take-profit: $3,403.58 (+5.0%)" },
    { color: TT.green, text: "[EXEC] Order filled ✓" },
  ];

  return (
    <div style={{
      background: "#060a10",
      border: `1px solid ${TT.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      fontFamily: TT.mono,
      fontSize: 13,
      lineHeight: 1.8,
      overflow: "hidden",
      maxWidth: 520,
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.color, opacity: l.text ? 1 : 0.3 }}>
          {l.text || "\u00A0"}
        </div>
      ))}
      <span style={{
        display: "inline-block",
        width: 8,
        height: 16,
        background: TT.primary,
        animation: "blink 1s step-end infinite",
        verticalAlign: "middle",
        marginTop: 4,
      }} />
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}

// ─── TRADING DASHBOARD MOCKUP ───
const MOCKUP_THEMES = {
  gold: {
    bg: "#1a1f2e", card: "#212736", border: "#2a3344",
    text: "#e8edf3", dim: "#8899aa", faint: "#4a5568",
    green: "#10B981", red: "#ef4444", accent: "#fbbf24",
    blue: "#60a5fa", cyan: "#67e8f9", purple: "#a78bfa",
    font: "'Inter', sans-serif",
  },
  pink: {
    bg: "#1f1520", card: "#2a1d2e", border: "#3d2a42",
    text: "#f3e8ef", dim: "#aa8899", faint: "#68455c",
    green: "#10B981", red: "#ef4444", accent: "#f472b6",
    blue: "#60a5fa", cyan: "#67e8f9", purple: "#a78bfa",
    font: "'Inter', sans-serif",
  },
  purple: {
    bg: "#1a1530", card: "#221d38", border: "#332a4e",
    text: "#ede8f3", dim: "#9988bb", faint: "#5a4878",
    green: "#10B981", red: "#ef4444", accent: "#a78bfa",
    blue: "#60a5fa", cyan: "#67e8f9", purple: "#a78bfa",
    font: "'Inter', sans-serif",
  },
  emerald: {
    bg: "#0f1f1a", card: "#152824", border: "#1e3d34",
    text: "#e8f3ef", dim: "#88aa99", faint: "#456858",
    green: "#10B981", red: "#ef4444", accent: "#10B981",
    blue: "#60a5fa", cyan: "#67e8f9", purple: "#a78bfa",
    font: "'Inter', sans-serif",
  },
  light: {
    bg: "#f3f1ee", card: "#ffffff", border: "#e5e2dd",
    text: "#1a1a1a", dim: "#6b7280", faint: "#9ca3af",
    green: "#10B981", red: "#ef4444", accent: "#e8edf3",
    blue: "#3b82f6", cyan: "#06b6d4", purple: "#8b5cf6",
    font: "'Inter', sans-serif",
  },
  slate: {
    bg: "#1e2127", card: "#282c34", border: "#3a3f4b",
    text: "#abb2bf", dim: "#7f848e", faint: "#5c6370",
    green: "#98c379", red: "#e06c75", accent: "#6b7280",
    blue: "#61afef", cyan: "#56b6c2", purple: "#c678dd",
    font: "'Inter', sans-serif",
  },
  midnight: {
    bg: "#0a0e17", card: "#111827", border: "#1e293b",
    text: "#f0f4f8", dim: "#94a3b8", faint: "#64748b",
    green: "#10B981", red: "#ef4444", accent: "#1a1f2e",
    blue: "#60a5fa", cyan: "#00d4ff", purple: "#a78bfa",
    font: "'Inter', sans-serif",
  },
};
const THEME_KEYS = ["gold", "pink", "purple", "emerald", "light", "slate", "midnight"];
const THEME_DOTS = ["#fbbf24", "#f472b6", "#a78bfa", "#10B981", "#e8edf3", "#6b7280", "#1a1f2e"];

function TradingDashboardMockup() {
  const [tab, setTab] = useState("overview");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [theme, setTheme] = useState("gold");

  const M = MOCKUP_THEMES[theme];

  const cs = { background: M.card, border: `1px solid ${M.border}`, borderRadius: 10, padding: "18px 22px" };
  const sl = { fontSize: 10, fontWeight: 600, color: M.dim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 };
  const sv = { fontSize: 24, fontWeight: 700, color: M.text };

  const navItems = [
    { key: "overview", label: "Overview", d: "M3 3h6v6H3zM13 3h6v6h-6zM3 13h6v6H3zM13 13h6v6h-6z" },
    { key: "trades", label: "Trades", d: "M4 6h14M15 3l3 3-3 3M20 18H6M9 15l-3 3 3 3" },
    { key: "payouts", label: "Payouts", d: "M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM8 8h8M8 12h8M8 16h4" },
    { key: "performance", label: "Performance", d: "M3 18l5-6 4 3 8-10" },
    { key: "holdings", label: "Holdings", d: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6h5" },
  ];

  const allTrades = [
    { action: "BUY", token: "AERO", amount: "$142.50", time: "2h ago", reason: "Strong momentum signal detected on Base DEX volume spike" },
    { action: "SELL", token: "VIRTUAL", amount: "$89.20", time: "6h ago" },
    { action: "BUY", token: "MORPHO", amount: "$210.00", time: "12h ago" },
    { action: "BUY", token: "ETH", amount: "$450.00", time: "1d ago" },
    { action: "SELL", token: "BRETT", amount: "$67.30", time: "1d ago" },
  ];

  const holdings = [
    { token: "USDC", value: 4210, tokens: "4,210.50 tokens", color: "#60a5fa", pct: 33 },
    { token: "ETH", value: 3860, tokens: "1.245 tokens", color: "#67e8f9", pct: 30 },
    { token: "AERO", value: 2580, tokens: "2,150 tokens", color: "#10B981", pct: 20 },
    { token: "MORPHO", value: 1246, tokens: "890 tokens", color: "#a78bfa", pct: 10 },
  ];

  const badge = (action) => ({
    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
    background: action === "BUY" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
    color: action === "BUY" ? M.green : M.red,
  });

  const renderOverview = () => (
    <>
      <div style={{ fontSize: 10, color: M.faint, textAlign: "center", marginBottom: 8, fontFamily: M.font, letterSpacing: 0.5, textTransform: "uppercase" }}>Simulated example data for illustration only</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
        <div style={cs}><div style={sl}>PORTFOLIO VALUE</div><div style={sv}>$12,847</div><div style={{ fontSize: 12, color: M.green, fontWeight: 600, marginTop: 4 }}>+28.47%</div></div>
        <div style={cs}><div style={sl}>TOTAL P&L</div><div style={sv}>$2,847</div><div style={{ fontSize: 12, color: M.dim, marginTop: 4 }}>47 trades</div></div>
        <div style={cs}><div style={sl}>TODAY'S PAYOUTS</div><div style={sv}>$64.20</div><div style={{ fontSize: 12, color: M.green, marginTop: 4 }}>2 recipients</div></div>
        <div style={cs}><div style={sl}>MAX DRAWDOWN</div><div style={{ ...sv, color: M.red }}>-4.21%</div><div style={{ fontSize: 12, color: M.red, marginTop: 4 }}>Within limits</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={cs}>
          <div style={sl}>DAILY P&L (14D)</div>
          <div style={{ display: "flex", alignItems: "end", gap: 6, height: 100, marginTop: 12 }}>
            {[65, 42, -18, 35, 58, -12, 28, 45, -8, 32, 15, -22, 48, 38].map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${Math.abs(v)}%`, borderRadius: 3, background: v >= 0 ? M.green : M.red, opacity: 0.8 }} />
            ))}
          </div>
        </div>
        <div style={cs}>
          <div style={sl}>RECENT TRADES</div>
          {[
            { action: "BUY", token: "AERO", amount: "$142.50", time: "2h ago" },
            { action: "SELL", token: "VIRTUAL", amount: "$89.20", time: "6h ago" },
            { action: "BUY", token: "MORPHO", amount: "$210.00", time: "12h ago" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? `1px solid ${M.border}` : "none" }}>
              <span style={{ ...badge(t.action), marginRight: 10 }}>{t.action}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: M.text, flex: 1 }}>{t.token}</span>
              <span style={{ fontSize: 13, color: M.dim, marginRight: 10 }}>{t.amount}</span>
              <span style={{ fontSize: 11, color: M.faint }}>{t.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderTrades = () => {
    const filtered = tradeFilter === "all" ? allTrades : allTrades.filter(t => t.action.toLowerCase() === tradeFilter);
    return (
      <div style={cs}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={sl}>TRADE HISTORY</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "buy", "sell"].map(f => (
              <button key={f} onClick={() => setTradeFilter(f)} style={{
                padding: "4px 12px", borderRadius: 16, fontFamily: M.font,
                border: `1px solid ${tradeFilter === f ? M.green : M.border}`,
                background: tradeFilter === f ? "rgba(16,185,129,0.12)" : "transparent",
                color: tradeFilter === f ? M.green : M.dim,
                fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "uppercase",
              }}>{f === "all" ? "All" : f}</button>
            ))}
          </div>
        </div>
        {filtered.map((t, i) => (
          <div key={i} style={{ padding: "12px 0", borderTop: i > 0 ? `1px solid ${M.border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ ...badge(t.action), marginRight: 10 }}>{t.action}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: M.text, marginRight: 8 }}>{t.token}</span>
              <span style={{ fontSize: 13, color: M.dim, flex: 1 }}>{t.amount}</span>
              <span style={{ fontSize: 12, color: M.faint }}>{t.time}</span>
              <span style={{ fontSize: 14, color: M.faint, marginLeft: 8 }}>{"\u203A"}</span>
            </div>
            {t.reason && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, marginLeft: 42 }}>
                <span style={{ fontSize: 14 }}>{"\u{1F9E0}"}</span>
                <span style={{ fontSize: 12, color: M.dim }}>{t.reason}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPayouts = () => (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={cs}><div style={sl}>TOTAL PAID OUT</div><div style={sv}>$2,418.60</div></div>
        <div style={cs}><div style={sl}>PAYOUT COUNT</div><div style={sv}>42</div></div>
        <div style={cs}><div style={sl}>REINVEST RATE</div><div style={sv}>70%</div></div>
      </div>
      <div style={{ ...cs, marginBottom: 14 }}>
        <div style={{ ...sl, color: M.purple }}>RECIPIENTS</div>
        {[
          { name: "Henry", wallet: "0x1a2B...9f4E", amount: "$32.10", split: "15% split" },
          { name: "Harrison", wallet: "0x3c4D...2b1A", amount: "$32.10", split: "15% split" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i > 0 ? `1px solid ${M.border}` : "none" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: M.text }}>{r.name}</div>
              <div style={{ fontSize: 12, color: M.faint, fontFamily: "'JetBrains Mono', monospace" }}>{r.wallet}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: M.green }}>{r.amount}</div>
              <div style={{ fontSize: 11, color: M.dim }}>{r.split}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={cs}>
        <div style={{ ...sl, color: M.purple }}>AAVE YIELD</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: M.text }}>$2,000 deposited</div>
            <div style={{ fontSize: 12, color: M.dim }}>Earning 4.2% APY</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: M.green }}>+$18.42</div>
            <div style={{ fontSize: 11, color: M.dim }}>yield earned</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderPerformance = () => (
    <>
      <div style={{ fontSize: 10, color: M.faint, textAlign: "center", marginBottom: 8, fontFamily: M.font, letterSpacing: 0.5, textTransform: "uppercase" }}>Hypothetical results for demonstration purposes only</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
        <div style={cs}><div style={{ ...sl, textAlign: "center" }}>WIN RATE</div><div style={{ ...sv, textAlign: "center" }}>67.2%</div></div>
        <div style={cs}><div style={{ ...sl, textAlign: "center" }}>PROFIT FACTOR</div><div style={{ ...sv, textAlign: "center" }}>2.14</div></div>
        <div style={cs}><div style={{ ...sl, textAlign: "center" }}>AVG WIN</div><div style={{ ...sv, textAlign: "center", color: M.green }}>+$48.20</div></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
        <div style={cs}><div style={{ ...sl, textAlign: "center" }}>AVG LOSS</div><div style={{ ...sv, textAlign: "center", color: M.red }}>-$22.50</div></div>
        <div style={cs}><div style={{ ...sl, textAlign: "center" }}>EXPECTANCY</div><div style={{ ...sv, textAlign: "center", color: M.green }}>+$18.40</div></div>
        <div style={cs}><div style={{ ...sl, textAlign: "center" }}>RISK/REWARD</div><div style={{ ...sv, textAlign: "center" }}>2.1:1</div></div>
      </div>
      <div style={cs}>
        <div style={sl}>PORTFOLIO GROWTH</div>
        <svg viewBox="0 0 500 120" style={{ width: "100%", height: 120, marginTop: 8 }}>
          <polyline points="0,110 35,105 70,95 105,90 140,82 175,72 210,65 245,60 280,55 315,48 350,42 385,35 420,28 455,20 500,12" fill="none" stroke={M.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );

  const renderHoldings = () => (
    <>
      <div style={cs}>
        <div style={sl}>ALLOCATION</div>
        <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
          {holdings.map((x, i) => <div key={i} style={{ width: `${x.pct}%`, background: x.color }} />)}
          <div style={{ width: "7%", background: "#6b7280" }} />
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {holdings.map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: M.dim }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: x.color }} />
              {x.token} {x.pct}%
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: M.dim }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6b7280" }} />
            Others 7%
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 14 }}>
        {holdings.slice(0, 3).map((x, i) => (
          <div key={i} style={cs}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: x.color }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: M.text }}>{x.token}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: M.text }}>${x.value.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: M.dim, marginTop: 4 }}>{x.tokens}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 14 }}>
        {holdings.slice(3).map((x, i) => (
          <div key={i} style={cs}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: x.color }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: M.text }}>{x.token}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: M.text }}>${x.value.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: M.dim, marginTop: 4 }}>{x.tokens}</div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={{ background: M.bg, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)", maxWidth: 960, margin: "0 auto", fontFamily: M.font, textAlign: "left", transition: "background 0.3s" }}>
      {/* Browser chrome */}
      <div style={{ background: M.bg, borderBottom: `1px solid ${M.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "background 0.3s" }}>
        <div style={{ position: "absolute", left: 16, display: "flex", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FBBF24" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22C55E" }} />
        </div>
        <div style={{ background: M.card, borderRadius: 20, padding: "6px 24px", fontSize: 12, color: M.dim, fontFamily: "'JetBrains Mono', monospace", border: `1px solid ${M.border}` }}>
          vallotaventures.com/trading/dashboard
        </div>
      </div>
      {/* Main */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 200, borderRight: `1px solid ${M.border}`, padding: "20px 0", display: "flex", flexDirection: "column", minHeight: 480 }}>
          <div style={{ padding: "0 20px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${M.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: M.accent }}>VT</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: M.text }}>My Bot</div>
              <div style={{ fontSize: 11, color: M.dim }}>Trading Command</div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "10px 8px" }}>
            {navItems.map(n => (
              <button key={n.key} onClick={() => setTab(n.key)} style={{
                width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                background: tab === n.key ? "rgba(16,185,129,0.08)" : "transparent",
                color: tab === n.key ? M.green : M.dim,
                fontFamily: M.font, fontSize: 13, fontWeight: tab === n.key ? 600 : 500,
                textAlign: "left", display: "flex", alignItems: "center", gap: 10, marginBottom: 2,
                borderLeft: tab === n.key ? `3px solid ${M.green}` : "3px solid transparent",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={n.d} /></svg>
                {n.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${M.border}` }}>
            <div style={{ fontSize: 11, color: M.faint, marginBottom: 8 }}>Theme</div>
            <div style={{ display: "flex", gap: 6 }}>
              {THEME_DOTS.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setTheme(THEME_KEYS[i])}
                  style={{
                    width: 20, height: 20, borderRadius: "50%", background: c, cursor: "pointer",
                    border: theme === THEME_KEYS[i] ? `2px solid ${M.accent}` : `1px solid ${M.border}`,
                    transition: "border 0.15s, transform 0.15s",
                    transform: theme === THEME_KEYS[i] ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: 20, background: M.card, transition: "background 0.3s" }}>
          {tab === "overview" && renderOverview()}
          {tab === "trades" && renderTrades()}
          {tab === "payouts" && renderPayouts()}
          {tab === "performance" && renderPerformance()}
          {tab === "holdings" && renderHoldings()}
        </div>
      </div>
    </div>
  );
}

// ─── STATS BAR ───
function StatsBar() {
  const stats = [
    { label: "Timeframes", value: "4" },
    { label: "Indicators", value: "3+" },
    { label: "AI Models", value: "2" },
    { label: "Mode", value: "Demo" },
  ];
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 0,
      borderTop: `1px solid ${TT.border}`,
      borderBottom: `1px solid ${TT.border}`,
      background: TT.surface,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1,
          padding: "28px 20px",
          textAlign: "center",
          borderRight: i < stats.length - 1 ? `1px solid ${TT.border}` : "none",
        }}>
          <div style={{
            fontFamily: TT.mono,
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 700,
            color: TT.primary,
            marginBottom: 6,
          }}>
            {s.value}
          </div>
          <div style={{
            fontFamily: TT.font,
            fontSize: 13,
            color: TT.textDim,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TradingLanding() {
  const [openFaq, setOpenFaq] = useState(null);
  const [interestSent, setInterestSent] = useState(false);
  const hasSession = (() => { try { return !!localStorage.getItem("vt_session"); } catch { return false; } })(); // eslint-disable-line no-unused-vars

  return (
    <div style={{ background: TT.bg, color: TT.text, fontFamily: TT.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "18px 24px",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: TT.textDim, fontSize: 14 }}>&larr;</span>
          <span style={{ fontFamily: TT.mono, fontSize: 16, fontWeight: 700, color: TT.textDim, letterSpacing: 0.5 }}>
            Vallota Ventures
          </span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <button onClick={() => { const el = document.getElementById("features"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.textDim, padding: 0 }}>Features</button>
          <button onClick={() => { const el = document.getElementById("how-it-works"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.textDim, padding: 0 }}>How It Works</button>
          <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.textDim, padding: 0 }}>FAQ</button>
          <Link to="/trading/dashboard" style={{
            fontFamily: TT.font, fontSize: 14, fontWeight: 600, textDecoration: "none",
            padding: "8px 20px", borderRadius: 6,
            background: TT.primary, color: "#fff",
          }}>
            Live Dashboard
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        padding: "80px 24px 60px",
        maxWidth: 1100,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: 24,
          padding: "6px 14px", borderRadius: 20,
          background: TT.greenDim, border: `1px solid rgba(0,255,136,0.15)`,
          fontFamily: TT.mono, fontSize: 12, fontWeight: 600,
          color: TT.green,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: TT.green }} />
          LIVE BOT
        </div>

        <h1 style={{
          fontFamily: TT.font,
          fontSize: "clamp(36px, 5.5vw, 56px)",
          fontWeight: 800,
          lineHeight: 1.1,
          margin: "0 0 24px",
          color: TT.text,
        }}>
          I Built Two AIs.{" "}
          <br />
          <span style={{
            background: "linear-gradient(135deg, #00d4ff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Then I Let Them Trade.
          </span>
        </h1>

        <p style={{
          fontFamily: TT.font,
          fontSize: 18,
          color: TT.textDim,
          lineHeight: 1.7,
          margin: "0 auto 36px",
          maxWidth: 560,
        }}>
          One AI reads the charts. The other reads the room. Together they
          spot potential opportunities across charts and social sentiment, and refine their approach after every trade.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
          <Link to="/trading/dashboard" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 32px" }) }}>
            See Live Results
          </Link>
          <a href="#interested" style={{ textDecoration: "none", ...btnOutline({ fontSize: 16, padding: "16px 32px" }) }}>
            I'm Interested
          </a>
        </div>

        <TradingDashboardMockup />
      </section>

      {/* ─── STATS BAR ─── */}
      <StatsBar />

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{
        padding: "100px 24px",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{
            fontFamily: TT.font,
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 800,
            margin: "0 0 16px",
            color: TT.text,
          }}>
            How It Works
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: 0, maxWidth: 560, marginLeft: "auto", marginRight: "auto",
          }}>
            The bot runs 24/7. You can watch everything it does in real time.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {STEPS.map((s) => (
            <div key={s.num} style={{
              ...card(),
              position: "relative",
              paddingTop: 36,
            }}>
              <div style={{
                fontFamily: TT.mono,
                fontSize: 48,
                fontWeight: 800,
                color: TT.primaryDim,
                position: "absolute",
                top: -8,
                right: 20,
                lineHeight: 1,
                WebkitTextStroke: `1px ${TT.primary}`,
                WebkitTextFillColor: "transparent",
                opacity: 0.4,
              }}>
                {s.num}
              </div>
              <h3 style={{
                fontFamily: TT.font,
                fontSize: 20,
                fontWeight: 700,
                color: TT.text,
                margin: "0 0 12px",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: TT.font,
                fontSize: 15,
                color: TT.textDim,
                lineHeight: 1.7,
                margin: 0,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{
        padding: "80px 24px 100px",
        background: TT.surface,
        borderTop: `1px solid ${TT.border}`,
        borderBottom: `1px solid ${TT.border}`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontFamily: TT.mono, fontSize: 12, fontWeight: 600,
              color: TT.primary, letterSpacing: 2,
              marginBottom: 16, textTransform: "uppercase",
            }}>
              UNDER THE HOOD
            </div>
            <h2 style={{
              fontFamily: TT.font,
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              margin: "0 0 16px",
              color: TT.text,
            }}>
              What Powers the Bot
            </h2>
            <p style={{
              fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: 0, maxWidth: 600, marginLeft: "auto", marginRight: "auto",
            }}>
              Two AI systems working alongside real computed technical analysis.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                ...card({ background: TT.bg }),
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: TT.primaryDim,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: TT.font, fontSize: 18, fontWeight: 700,
                  color: TT.text, margin: 0,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: TT.font, fontSize: 14, color: TT.textDim,
                  lineHeight: 1.7, margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RISK QUIZ CTA ─── */}
      <section style={{
        padding: "100px 24px",
        maxWidth: 800,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{
          ...card({ padding: "48px 40px", border: `1px solid ${TT.borderLight}` }),
          background: `linear-gradient(135deg, ${TT.surface} 0%, ${TT.surfaceAlt} 100%)`,
        }}>
          <div style={{
            fontFamily: TT.mono, fontSize: 12, fontWeight: 600,
            color: TT.green, letterSpacing: 2,
            marginBottom: 20, textTransform: "uppercase",
          }}>
            FIND YOUR STRATEGY
          </div>
          <h2 style={{
            fontFamily: TT.font,
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800,
            margin: "0 0 16px",
            color: TT.text,
          }}>
            What Kind of Trader Are You?
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 16, color: TT.textDim,
            lineHeight: 1.7, margin: "0 0 32px", maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            Answer 6 quick questions. See how the bot would be calibrated to match your risk tolerance,
            timeline, and experience level.
          </p>
          <Link to="/trading/quiz" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 40px" }) }}>
            Take the Quiz &rarr;
          </Link>
        </div>
      </section>

      {/* ─── INTEREST FORM ─── */}
      <section id="interested" style={{
        padding: "80px 24px 100px",
        background: TT.surface,
        borderTop: `1px solid ${TT.border}`,
        borderBottom: `1px solid ${TT.border}`,
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: TT.font,
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 800,
            margin: "0 0 16px",
            color: TT.text,
          }}>
            Want Your Own Bot?
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: "0 0 48px",
          }}>
            I built this for myself, but if you want your own instance, let me know and I'll reach out.
          </p>

          <div style={{
            ...card({ padding: "48px 40px", border: `1px solid ${TT.borderLight}` }),
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: TT.mono, fontSize: 13, fontWeight: 600,
              color: TT.primary, letterSpacing: 1.5,
              marginBottom: 24, textTransform: "uppercase",
            }}>
              WHAT YOU'D GET
            </div>

            <div style={{ textAlign: "left" }}>
              {[
                "Your own instance of the bot, running 24/7",
                "Configured to your risk profile",
                "Live dashboard with full transparency",
                "All the AI systems: Claude, Grok, computed TA",
                "Paper trading to start, live trading when you're ready",
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0",
                  fontFamily: TT.font, fontSize: 15, color: TT.textDim,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TT.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const emailVal = form.email.value;
              if (!emailVal || !emailVal.includes("@")) return;
              try {
                await fetch("/api/capture-lead", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: emailVal, source: "trading-interest" }),
                });
                form.reset();
                setInterestSent(true);
              } catch {}
            }} style={{ marginTop: 32, display: "flex", gap: 10 }}>
              {interestSent ? (
                <div style={{
                  width: "100%", padding: "16px 28px", borderRadius: 8,
                  background: TT.greenDim, border: `1px solid rgba(0,255,136,0.2)`,
                  fontFamily: TT.font, fontSize: 15, fontWeight: 600, color: TT.green,
                  textAlign: "center",
                }}>
                  Got it! I'll be in touch.
                </div>
              ) : (
                <>
                  <input
                    name="email" type="email" placeholder="Your email"
                    required
                    style={{
                      flex: 1, padding: "14px 16px", borderRadius: 8,
                      border: `1px solid ${TT.border}`, background: TT.bg,
                      color: TT.text, fontSize: 15, fontFamily: TT.font,
                      outline: "none",
                    }}
                  />
                  <button type="submit" style={btnPrimary({ fontSize: 15, padding: "14px 28px", whiteSpace: "nowrap" })}>
                    I'm Interested
                  </button>
                </>
              )}
            </form>

            <p style={{
              fontFamily: TT.font, fontSize: 11, color: TT.textFaint,
              marginTop: 16, lineHeight: 1.6,
            }}>
              By submitting, you're expressing interest only. This is not a purchase, subscription,
              or agreement. I am not liable for the bot's trading performance.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{
        padding: "100px 24px",
        maxWidth: 720,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontFamily: TT.font,
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 800,
          margin: "0 0 48px",
          color: TT.text,
          textAlign: "center",
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} style={{
                background: TT.surface,
                border: `1px solid ${TT.border}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "all 0.2s",
              }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    fontFamily: TT.font,
                    fontSize: 16,
                    fontWeight: 600,
                    color: TT.text,
                    textAlign: "left",
                  }}
                >
                  {faq.q}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke={TT.textDim} strokeWidth="2" strokeLinecap="round"
                    style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}
                  >
                    <path d="M6 9L12 15L18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{
                    padding: "0 24px 20px",
                    fontFamily: TT.font,
                    fontSize: 15,
                    color: TT.textDim,
                    lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{
        padding: "80px 24px",
        background: TT.surface,
        borderTop: `1px solid ${TT.border}`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: TT.font,
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 800,
            margin: "0 0 16px",
            color: TT.text,
          }}>
            See the Bot in Action
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: "0 0 36px",
          }}>
            Watch real trades, real reasoning, real results. All paper funds, full transparency.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/trading/dashboard" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 36px" }) }}>
              Live Dashboard
            </Link>
            <a href="#interested" style={{ textDecoration: "none", ...btnOutline({ fontSize: 16, padding: "16px 36px" }) }}>
              I'm Interested
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${TT.border}`,
        padding: "32px 24px",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint }}>
          &copy; 2026 Vallota Ventures
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link to="/" style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint, textDecoration: "none" }}>
            Home
          </Link>
          <a href="mailto:diego@vallotaventures.com" style={{ fontFamily: TT.font, fontSize: 13, color: TT.textFaint, textDecoration: "none" }}>
            Contact
          </a>
        </div>
      </footer>

      {/* ─── DISCLAIMER ─── */}
      <div style={{
        padding: "20px 24px 32px",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: TT.font, fontSize: 11, color: TT.textFaint,
          lineHeight: 1.6, margin: 0, textAlign: "center",
        }}>
          This is a personal technology project. The bot operates with paper (simulated) funds only. No real money
          is traded. Past performance is not indicative of future results. Nothing on this page constitutes financial
          advice, a recommendation to trade, or an offer to manage assets. If you purchase access to your own instance
          of the bot, you assume full responsibility for its performance and any trading decisions made.
        </p>
      </div>
    </div>
  );
}
