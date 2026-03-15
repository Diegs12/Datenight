import { useState } from "react";
import { Link } from "react-router-dom";

// ─── LANDING PAGE PALETTE (matches main Vallota Ventures branding) ───
const L = {
  bg: "#FAF7F2",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EDE6",
  border: "#E2DDD4",
  borderLight: "#D4CFC6",
  navy: "#1B2A4A",
  gold: "#B8963E",
  goldDim: "rgba(184,150,62,0.1)",
  green: "#10B981",
  greenDim: "rgba(16,185,129,0.1)",
  red: "#ef4444",
  text: "#1B2A4A",
  textDim: "#4A5876",
  textFaint: "#8B95A5",
  font: "'Inter', sans-serif",
  display: "'Playfair Display', serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const lBtn = (x = {}) => ({
  fontFamily: L.font, fontSize: 15, fontWeight: 700,
  border: "none", borderRadius: 8, cursor: "pointer",
  padding: "14px 28px", transition: "all 0.2s",
  background: L.navy, color: "#FAF7F2",
  boxShadow: "0 4px 12px rgba(27,42,74,0.2)",
  letterSpacing: 0.3, textDecoration: "none",
  ...x,
});

const lBtnOutline = (x = {}) => ({
  fontFamily: L.font, fontSize: 15, fontWeight: 700,
  borderRadius: 8, cursor: "pointer",
  padding: "14px 28px", transition: "all 0.2s",
  background: "transparent", color: L.navy,
  border: `1px solid ${L.border}`,
  textDecoration: "none",
  ...x,
});

const lCard = (x = {}) => ({
  background: L.surface, borderRadius: 12,
  padding: 28, border: `1px solid ${L.border}`, ...x,
});

// ─── ICONS (use brand colors) ───
const IconBrain = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 015 5c0 1.1-.4 2.1-1 2.9.6.8 1 1.8 1 2.9a5 5 0 01-3.5 4.8V20a2 2 0 01-2 2h-1a2 2 0 01-2-2v-2.4A5 5 0 015 12.8c0-1.1.4-2.1 1-2.9A5 5 0 017 7a5 5 0 015-5z"/>
    <path d="M12 2v6M8.5 7h7M8 12h8"/>
  </svg>
);
const IconCloud = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
  </svg>
);
const IconWallet = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 010-4h14v4"/>
    <path d="M3 5v14a2 2 0 002 2h16v-5"/>
    <path d="M18 12a2 2 0 100 4h4v-4h-4z"/>
  </svg>
);
const IconNetwork = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="6" height="6" rx="1"/>
    <rect x="16" y="2" width="6" height="6" rx="1"/>
    <rect x="9" y="16" width="6" height="6" rx="1"/>
    <path d="M5 8v3a3 3 0 003 3h8a3 3 0 003-3V8"/>
    <path d="M12 14v2"/>
  </svg>
);
const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7V12C3 17.5 7 22 12 22C17 22 21 17.5 21 12V7L12 2Z"/>
    <path d="M9 12L11 14L15 10"/>
  </svg>
);
const IconYield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={L.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17L4 12" />
  </svg>
);

const FEATURES = [
  {
    icon: <IconBrain />,
    title: "Dual AI Engine",
    desc: "Claude handles trade decisions. Grok scans X/Twitter for real-time sentiment. Two AI systems working together so nothing slips through the cracks.",
  },
  {
    icon: <IconCloud />,
    title: "Computed Technical Analysis",
    desc: "RSI, MACD, Bollinger Bands, SMAs, and EMAs calculated mathematically on real price data across 30+ tokens. Not guessed by an LLM.",
  },
  {
    icon: <IconNetwork />,
    title: "Multi-Timeframe Analysis",
    desc: "The desk analyzes 5-minute, 1-hour, 4-hour, and daily charts simultaneously. It catches short-term moves and macro trends.",
  },
  {
    icon: <IconShield />,
    title: "Risk-Profile Trading",
    desc: "The desk runs at a configured risk tolerance level: conservative, moderate, or aggressive. Position sizing adjusts accordingly.",
  },
  {
    icon: <IconYield />,
    title: "Self-Improving AI",
    desc: "Every 30 minutes, the AI reviews its recent trades, analyzes what worked and what didn't, and adjusts its approach. It gets sharper over time.",
  },
  {
    icon: <IconWallet />,
    title: "Shared Learning",
    desc: "Trade reviews and lessons sync to a shared knowledge base. The desk feeds its own history back into future decisions.",
  },
];

const STEPS = [
  { num: "01", title: "It Watches the Market", desc: "Every two minutes, the desk pulls live data from 9+ sources: prices, volume, sentiment, macro indicators, DeFi flows, and derivatives data." },
  { num: "02", title: "Two AIs Cross-Check", desc: "Claude analyzes the full picture and makes a judgment call. Grok independently scans X/Twitter for breaking sentiment. They have to agree before the desk acts." },
  { num: "03", title: "It Trades, Then Reviews Itself", desc: "After every trade closes, the AI reviews its own reasoning against the outcome. It identifies what worked, what didn't, and adjusts. The desk gets smarter over time." },
];

const UNDER_THE_HOOD = [
  {
    title: "Real-Time Market Data",
    desc: "Price feeds, 24-hour changes, market caps, and trading volume from CoinGecko across 30+ tokens every cycle.",
  },
  {
    title: "Historical Price Data",
    desc: "Candle data from CryptoCompare across four timeframes (5m, 1h, 4h, 1d). Feeds directly into the technical analysis engine.",
  },
  {
    title: "Computed Technical Analysis",
    desc: "RSI, MACD, Bollinger Bands, SMA, and EMA calculated with pure math on every timeframe. No LLM guessing. Real indicators on real data.",
  },
  {
    title: "DeFi Capital Flows",
    desc: "Top protocol TVL, daily changes, and chain distribution pulled from DefiLlama. Tracks where capital is moving in DeFi.",
  },
  {
    title: "Market Sentiment & News",
    desc: "Fear & Greed Index from Alternative.me. Grok scans X/Twitter for breaking news, whale activity, trending narratives, and regulatory risk.",
  },
  {
    title: "Derivatives Intelligence",
    desc: "Funding rates, open interest trends, long/short ratios, and recent liquidation data for BTC, ETH, and SOL. Sourced via Grok from derivatives markets.",
  },
  {
    title: "Macro & Dominance Signals",
    desc: "BTC dominance, stablecoin supply trends, and broad market risk appetite indicators. Helps the AI read the macro environment.",
  },
  {
    title: "Trending Token Detection",
    desc: "DexScreener trending tokens plus Grok-sourced meme coin and pump detection. The desk watches for momentum before the crowd arrives.",
  },
  {
    title: "AI Decision Engine",
    desc: "All signals feed into Claude AI with full market context. Not rules. Judgment. Every decision includes reasoning and a confidence score.",
  },
  {
    title: "Self-Review Loop",
    desc: "Every 30 minutes, Claude reviews recent trades against outcomes. Lessons learned feed back into future decisions via a shared knowledge base synced to Supabase.",
  },
];

const FAQS = [
  {
    q: "Is this trading real money?",
    a: "The desk currently runs on paper (simulated) funds. No real money is being traded. You are watching the AI make decisions and execute on simulated capital in real time.",
  },
  {
    q: "What exchanges does it trade on?",
    a: "The desk trades on the Coinbase Base L2 network using simulated paper funds.",
  },
  {
    q: "How does the dual AI system work?",
    a: "Claude (by Anthropic) is the decision engine. It analyzes technicals, reviews past trades, and decides when to buy or sell. Grok (by xAI) monitors X/Twitter in real time for market sentiment and breaking news. Together they cover signals that neither could catch alone.",
  },
  {
    q: "What does the self-review loop do?",
    a: "After each trade closes, the AI reviews its reasoning, the outcome, and market conditions at the time. It identifies patterns in its own decisions and attempts to refine its future approach based on what it finds.",
  },
  {
    q: "Can I get my own trading desk?",
    a: "Not at this time. This is a personal technology project. If you are interested in commissioning a custom-built trading system, you can reach out to discuss a development engagement. This would be a software development service, not an investment product.",
  },
  {
    q: "Is this financial advice?",
    a: "No. This is a personal technology project and engineering demonstration. Nothing on this page or dashboard constitutes financial advice, a recommendation to trade, or a solicitation of any kind. All results shown are from paper trading with simulated funds. I am not a registered investment adviser.",
  },
  {
    q: "Does it cost anything to watch?",
    a: "No. The live dashboard is free to view. You can watch the desk trade, see its reasoning, and review historical performance anytime.",
  },
];

// ─── TRADING DASHBOARD MOCKUP (keeps its own dark theme system) ───
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
        <div style={cs}><div style={sl}>PORTFOLIO VALUE</div><div style={sv}>$12,847</div><div style={{ fontSize: 12, color: M.green, fontWeight: 600, marginTop: 4 }}>+28.47%</div></div>
        <div style={cs}><div style={sl}>TOTAL P&L</div><div style={sv}>$2,847</div><div style={{ fontSize: 12, color: M.dim, marginTop: 4 }}>47 trades</div></div>
        <div style={cs}><div style={sl}>WIN RATE</div><div style={sv}>67.2%</div><div style={{ fontSize: 12, color: M.green, marginTop: 4 }}>Last 30 trades</div></div>
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
    <div style={{ background: M.bg, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)", maxWidth: 960, margin: "0 auto", fontFamily: M.font, textAlign: "left", transition: "background 0.3s" }}>
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
          {tab === "performance" && renderPerformance()}
          {tab === "holdings" && renderHoldings()}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN LANDING PAGE ───
export default function TradingLanding() {
  const [openFaq, setOpenFaq] = useState(null);

  const sectionLabel = {
    fontFamily: L.mono, fontSize: 11, fontWeight: 600,
    color: L.gold, letterSpacing: 2,
    marginBottom: 16, textTransform: "uppercase",
  };
  const sectionTitle = {
    fontFamily: L.display,
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 700,
    margin: "0 0 16px",
    color: L.text,
  };
  const sectionDesc = {
    fontFamily: L.font, fontSize: 17, color: L.textDim, margin: 0, maxWidth: 600, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7,
  };
  const sectionWrap = { maxWidth: 1100, margin: "0 auto" };

  return (
    <div style={{ background: L.bg, color: L.text, fontFamily: L.font, minHeight: "100vh" }}>

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
          <span style={{ fontFamily: L.display, fontSize: 18, fontWeight: 700, color: L.navy, letterSpacing: 0.3 }}>
            Vallota Trading Desk
          </span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <button onClick={() => { const el = document.getElementById("how-it-works"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: L.font, fontSize: 14, fontWeight: 500, color: L.textDim, padding: 0 }}>How It Works</button>
          <button onClick={() => { const el = document.getElementById("features"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: L.font, fontSize: 14, fontWeight: 500, color: L.textDim, padding: 0 }}>Features</button>
          <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: L.font, fontSize: 14, fontWeight: 500, color: L.textDim, padding: 0 }}>FAQ</button>
          <Link to="/trading/dashboard" style={{
            ...lBtn({ fontSize: 14, padding: "8px 20px" }),
            display: "inline-block",
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
        <h1 style={{
          fontFamily: L.display,
          fontSize: "clamp(36px, 5.5vw, 56px)",
          fontWeight: 700,
          lineHeight: 1.1,
          margin: "0 0 24px",
          color: L.navy,
        }}>
          A Trading Desk{" "}
          <br />
          <span style={{ color: L.gold }}>
            That Never Closes
          </span>
        </h1>

        <p style={{
          fontFamily: L.font,
          fontSize: 18,
          color: L.textDim,
          lineHeight: 1.7,
          margin: "0 auto 12px",
          maxWidth: 560,
        }}>
          Dual AI. Computed technical analysis across 30+ tokens and four
          timeframes. A self-reviewing trading bot that runs 24/7 on the
          Coinbase Base network and gets smarter after every trade.
        </p>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 20, marginBottom: 36,
          padding: "6px 14px", borderRadius: 20,
          background: L.greenDim, border: `1px solid rgba(16,185,129,0.2)`,
          fontFamily: L.mono, fontSize: 12, fontWeight: 600,
          color: L.green,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: L.green }} />
          LIVE ON PAPER FUNDS
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
          <Link to="/trading/dashboard" style={lBtn({ fontSize: 16, padding: "16px 32px", display: "inline-block" })}>
            Watch It Trade Live
          </Link>
        </div>
      </section>

      {/* ─── COMMAND CENTER (Dashboard Mockup) ─── */}
      <section style={{ padding: "0 24px 80px", ...sectionWrap }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={sectionTitle}>The Live Dashboard</h2>
          <p style={sectionDesc}>
            This is what the desk looks like from the inside. Real-time positions, AI reasoning behind every trade, performance metrics, and full trade history. Nothing is hidden.
          </p>
        </div>
        <TradingDashboardMockup />
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ fontFamily: L.font, fontSize: 13, color: L.textFaint }}>
            7 themes included. This is the real dashboard.
          </p>
          <Link to="/trading/dashboard" style={lBtnOutline({ fontSize: 14, padding: "10px 24px", marginTop: 12, display: "inline-block" })}>
            Try the Live Demo
          </Link>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={sectionTitle}>How the Desk Works</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {STEPS.map((s) => (
            <div key={s.num} style={{
              ...lCard(),
              position: "relative",
              paddingTop: 36,
            }}>
              <div style={{
                fontFamily: L.display,
                fontSize: 48,
                fontWeight: 700,
                color: L.goldDim,
                position: "absolute",
                top: -8,
                right: 20,
                lineHeight: 1,
                opacity: 0.6,
                WebkitTextStroke: `1px ${L.gold}`,
                WebkitTextFillColor: "transparent",
              }}>
                {s.num}
              </div>
              <h3 style={{
                fontFamily: L.display,
                fontSize: 20,
                fontWeight: 700,
                color: L.text,
                margin: "0 0 12px",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: L.font,
                fontSize: 15,
                color: L.textDim,
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
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={sectionTitle}>What Powers the Desk</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              ...lCard(),
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 10,
                background: L.goldDim,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: L.display, fontSize: 18, fontWeight: 700,
                color: L.text, margin: 0,
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: L.font, fontSize: 14, color: L.textDim,
                lineHeight: 1.7, margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── UNDER THE HOOD ─── */}
      <section style={{
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={sectionLabel}>UNDER THE HOOD</div>
          <h2 style={sectionTitle}>Ten Data Sources. Every Five Minutes.</h2>
          <p style={{ ...sectionDesc, marginBottom: 48 }}>
            The desk does not guess. It pulls live data from ten sources, runs real math on it, and feeds everything into Claude AI for a judgment call. Every cycle. All day.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {UNDER_THE_HOOD.map((item, i) => (
            <div key={i} style={{
              ...lCard(),
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <div style={{
                fontFamily: L.mono, fontSize: 11, fontWeight: 600,
                color: L.gold, letterSpacing: 1, textTransform: "uppercase",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{
                fontFamily: L.display, fontSize: 17, fontWeight: 700,
                color: L.text, margin: 0,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: L.font, fontSize: 14, color: L.textDim,
                lineHeight: 1.7, margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: L.font, fontSize: 14, color: L.textFaint,
          textAlign: "center", marginTop: 40, maxWidth: 600, marginLeft: "auto", marginRight: "auto",
          lineHeight: 1.7,
        }}>
          Could you wire all this up yourself? Probably. But keeping it sharp requires constant research, auditing, and engineering. That is what I spend my time on.
        </p>
      </section>

      {/* ─── ORIGIN STORY ─── */}
      <section style={{
        padding: "100px 24px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={sectionWrap}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={sectionLabel}>OUR STORY</div>
            <h2 style={sectionTitle}>I Built This for Myself</h2>
            <p style={sectionDesc}>This is the story of why.</p>
          </div>

          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {[
              {
                label: "THE FRUSTRATION",
                title: "I watched my savings lose purchasing power every month.",
                desc: "Sitting in a bank account earning next to nothing while inflation eats away at it. I knew there were opportunities in crypto markets every single day. But I had a full-time job. I could not sit at a screen and trade.",
              },
              {
                label: "THE BUILD",
                title: "So I built something that could.",
                desc: "I wired together Claude AI for decisions, Grok for real-time sentiment off X, and computed technical analysis on actual price data. RSI, MACD, Bollinger Bands. Not vibes. Math. Then I added a self-review loop so the bot could study its own trades and get better.",
              },
              {
                label: "THE MOMENT",
                title: "Coinbase launched agent wallets. Everything clicked.",
                desc: "On February 11, 2026, Coinbase released programmable, non-custodial wallets for AI agents. That was the missing piece. Now the bot could hold its own wallet, execute trades, and deposit profits directly. No middleman. No custody risk. A real autonomous trading desk.",
              },
              {
                label: "WHERE IT IS NOW",
                title: "The desk runs every day. I watch it learn.",
                desc: "It trades on paper funds while I continue improving it. New data sources, better risk models, smarter entry logic. The dashboard is open so you can watch it work in real time and see every decision it makes.",
              },
            ].map((block, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? 48 : 0 }}>
                <div style={{
                  fontFamily: L.mono, fontSize: 11, fontWeight: 700,
                  color: L.gold, letterSpacing: 2, marginBottom: 12,
                }}>
                  {block.label}
                </div>
                <h3 style={{
                  fontFamily: L.display, fontSize: 22, fontWeight: 700,
                  color: L.text, margin: "0 0 12px", lineHeight: 1.3,
                }}>
                  {block.title}
                </h3>
                <p style={{
                  fontFamily: L.font, fontSize: 15, color: L.textDim,
                  lineHeight: 1.8, margin: 0,
                }}>
                  {block.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            maxWidth: 600, margin: "60px auto 0",
            borderLeft: `4px solid ${L.gold}`,
            paddingLeft: 24,
          }}>
            <p style={{
              fontFamily: L.display, fontSize: 18, color: L.navy,
              lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic",
            }}>
              "I wanted a trading desk that could think, learn, and run without me. So I built one."
            </p>
            <p style={{
              fontFamily: L.font, fontSize: 14, color: L.textDim, margin: 0,
            }}>
              - Diego Vallota, Founder
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
          ...sectionTitle,
          textAlign: "center",
          marginBottom: 48,
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} style={{
                background: L.surface,
                border: `1px solid ${L.border}`,
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
                    fontFamily: L.font,
                    fontSize: 16,
                    fontWeight: 600,
                    color: L.text,
                    textAlign: "left",
                  }}
                >
                  {faq.q}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke={L.textDim} strokeWidth="2" strokeLinecap="round"
                    style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}
                  >
                    <path d="M6 9L12 15L18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{
                    padding: "0 24px 20px",
                    fontFamily: L.font,
                    fontSize: 15,
                    color: L.textDim,
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

      {/* ─── INTERESTED ─── */}
      <section style={{
        padding: "80px 24px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={sectionTitle}>
            Interested in a Custom Build?
          </h2>
          <p style={{
            fontFamily: L.font, fontSize: 17, color: L.textDim, margin: "0 0 16px", lineHeight: 1.7,
          }}>
            I am not selling access to my desk or managing anyone's capital.
            But if you want a custom trading system built for you as a software
            development project, reach out and we can talk scope.
          </p>
          <p style={{
            fontFamily: L.font, fontSize: 14, color: L.textFaint, margin: "0 0 36px", lineHeight: 1.7,
          }}>
            This would be a paid development engagement. You own the code. You run it yourself. I do not manage funds or provide investment advice.
          </p>
          <a href="mailto:diego@vallotaventures.com" style={lBtn({ fontSize: 16, padding: "16px 36px", display: "inline-block" })}>
            Get in Touch
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${L.border}`,
        padding: "32px 24px",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{ fontFamily: L.font, fontSize: 13, color: L.textFaint }}>
          &copy; 2026 Vallota Trading Desk
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link to="/" style={{ fontFamily: L.font, fontSize: 13, color: L.textFaint, textDecoration: "none" }}>
            Home
          </Link>
          <a href="mailto:diego@vallotaventures.com" style={{ fontFamily: L.font, fontSize: 13, color: L.textFaint, textDecoration: "none" }}>
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
          fontFamily: L.font, fontSize: 11, color: L.textFaint,
          lineHeight: 1.6, margin: 0, textAlign: "center",
        }}>
          This is a personal technology project and engineering demonstration. The trading desk shown on this page
          operates exclusively with paper (simulated) funds. No real money is traded. Nothing on this page constitutes
          financial advice, a recommendation to trade, a solicitation of investment, or an offer to manage assets.
          Past simulated performance is not indicative of future results. The creator of this project is not a
          registered investment adviser, broker-dealer, or financial planner. Any inquiry about custom software
          development is for a software engineering service only and does not constitute an investment product,
          managed account, or securities offering.
        </p>
      </div>
    </div>
  );
}
