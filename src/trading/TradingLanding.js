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
const IconChat = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={L.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
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
    desc: "RSI, MACD, Bollinger Bands calculated mathematically on real price data across 18 tokens. Not guessed by an LLM.",
  },
  {
    icon: <IconWallet />,
    title: "Daily Profit Payouts",
    desc: "Each morning, realized profits are calculated and deposited directly into your personal wallet. Automatic.",
  },
  {
    icon: <IconNetwork />,
    title: "Multi-Timeframe Analysis",
    desc: "Your desk analyzes 5-minute, 1-hour, 4-hour, and daily charts simultaneously. It catches scalps and macro trends.",
  },
  {
    icon: <IconShield />,
    title: "Hard Stop-Losses & Risk Profiles",
    desc: "Every position has a hard stop-loss. Take our risk quiz and your desk is calibrated to your comfort level. Conservative, moderate, or aggressive.",
  },
  {
    icon: <IconYield />,
    title: "Self-Improving AI",
    desc: "After every trade, the AI reviews what it did right and wrong. It studies its own history and refines its approach over time.",
  },
];

const STEPS = [
  { num: "01", title: "Set Up Your Desk", desc: "Create your accounts, paste in your API keys, and pick your risk profile. The whole thing takes about five minutes." },
  { num: "02", title: "Let It Learn", desc: "Your bot starts analyzing markets across multiple timeframes, building conviction from real data. Two AI systems cross-check every signal before it acts." },
  { num: "03", title: "Collect Daily Payouts", desc: "Profits are calculated each morning and deposited directly into your wallet. You watch, or you don't. The desk is always open." },
];

const PREREQUISITES = [
  { name: "Coinbase", desc: "API key + auto-created wallet" },
  { name: "Anthropic", desc: "Your bot's brain" },
  { name: "Railway", desc: "Keeps your bot running 24/7" },
];

const UNDER_THE_HOOD = [
  {
    title: "Real-Time Market Data",
    desc: "Price feeds, trading volume, and liquidity from CoinGecko, DexScreener, and Binance every cycle.",
  },
  {
    title: "Technical Analysis",
    desc: "RSI, MACD, Bollinger Bands, moving averages, and volume analysis across 18 tokens. Signals scored for confluence.",
  },
  {
    title: "Macro Intelligence",
    desc: "Fed interest rates, inflation data, treasury yields, dollar strength, oil, gold, and the S&P 500. Pulled directly from the Federal Reserve.",
  },
  {
    title: "DeFi Capital Flows",
    desc: "Total value locked, DEX volumes, protocol momentum, and stablecoin supply trends via DefiLlama.",
  },
  {
    title: "News & Sentiment",
    desc: "Real-time crypto news sentiment scoring. Fear & Greed Index. Bullish and bearish headline detection.",
  },
  {
    title: "Derivatives & Smart Money",
    desc: "Binance funding rates, open interest, and long/short ratios. Detects when smart money diverges from retail.",
  },
  {
    title: "AI Decision Engine",
    desc: "All signals feed into Claude AI with full market context. Not rules. Judgment. Every decision includes reasoning and confidence.",
  },
  {
    title: "Self-Learning & Auto-Updates",
    desc: "The bot tunes its own thresholds based on what is working. Cron jobs audit for new technology and market shifts every 6 hours. This is not a static tool.",
  },
];

const UPGRADE_ITEMS = [
  "New DeFi data source integrated",
  "Risk model v3.2 deployed",
  "Smarter entry timing logic",
  "Gas optimization update",
  "New token added to watchlist",
  "Payout algorithm refined",
  "Pushed to all deployed bots",
];

const SECURITY_POINTS = [
  "Coinbase CDP custody",
  "Non-custodial architecture",
  "No withdrawal permissions",
  "Real-time dashboard access",
  "Transparent 2% fee structure",
  "Full control to pause or stop anytime",
];

const PRICING_FEATURES = [
  "AI-powered autonomous trading",
  "24/7 cloud operation",
  "Daily profit payouts",
  "Real-time dashboard",
  "Aave yield integration",
  "Risk profile customization",
];

const FAQS = [
  {
    q: "How much capital do I need to start?",
    a: "There is no strict minimum, but we recommend starting with at least $500 in USDC to give the bot enough room to trade effectively across multiple positions.",
  },
  {
    q: "What accounts do I need?",
    a: "You need three accounts: Coinbase (for the trading wallet and API key), Anthropic (for Claude AI, which powers the decision engine), and Railway (to host your bot 24/7 in the cloud). All are free to create and we walk you through every step.",
  },
  {
    q: "How does the 2% fee work?",
    a: "Each morning, realized profits from the previous day are calculated. 2% of those profits are sent as a fee. If your bot did not profit that day, you pay nothing. There are no monthly subscriptions, no hidden charges.",
  },
  {
    q: "Can the bot lose money?",
    a: "Yes. Trading crypto involves risk and the bot can lose money. The risk management system uses stop-losses and position sizing to limit downside, but no system can guarantee profits. Only trade with capital you can afford to lose.",
  },
  {
    q: "What is the Base network?",
    a: "Base is a Layer 2 blockchain built by Coinbase. It offers low transaction fees and fast settlement times compared to Ethereum mainnet, making it ideal for frequent trading.",
  },
  {
    q: "Can I stop the bot at any time?",
    a: "Yes. You have full control. You can pause or stop your bot at any time through your dashboard. Your funds stay in your wallet at all times.",
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
        <div style={cs}><div style={sl}>PORTFOLIO VALUE</div><div style={sv}>$12,847</div><div style={{ fontSize: 12, color: M.green, fontWeight: 600, marginTop: 4 }}>+28.47%</div></div>
        <div style={cs}><div style={sl}>TOTAL P&L</div><div style={sv}>$2,847</div><div style={{ fontSize: 12, color: M.dim, marginTop: 4 }}>47 trades</div></div>
        <div style={cs}><div style={sl}>TODAY'S PAYOUTS</div><div style={sv}>$64.20</div><div style={{ fontSize: 12, color: M.green, marginTop: 4 }}>Deposited</div></div>
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
          {tab === "payouts" && renderPayouts()}
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
          <button onClick={() => { const el = document.getElementById("pricing"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: L.font, fontSize: 14, fontWeight: 500, color: L.textDim, padding: 0 }}>Pricing</button>
          <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: L.font, fontSize: 14, fontWeight: 500, color: L.textDim, padding: 0 }}>FAQ</button>
          <Link to="/trading/dashboard" style={{ fontFamily: L.font, fontSize: 14, fontWeight: 500, color: L.textDim, textDecoration: "none" }}>Dashboard</Link>
          <Link to="/trading/signup" style={{
            ...lBtn({ fontSize: 14, padding: "8px 20px" }),
            display: "inline-block",
          }}>
            Get Your Desk
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
          Two AI systems. Real technical analysis. A self-improving trading bot
          that runs 24/7, learns from every trade, and deposits profits
          directly to your wallet.
        </p>

        <p style={{
          fontFamily: L.font, fontSize: 14, color: L.textFaint,
          margin: "0 auto 36px",
        }}>
          Free to set up &middot; 2% of realized profits
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
          <Link to="/trading/signup" style={lBtn({ fontSize: 16, padding: "16px 32px", display: "inline-block" })}>
            Get Your Desk
          </Link>
        </div>
      </section>

      {/* ─── COMMAND CENTER (Dashboard Mockup) ─── */}
      <section style={{ padding: "0 24px 80px", ...sectionWrap }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={sectionTitle}>Your Live Trading Floor</h2>
          <p style={sectionDesc}>
            Every desk comes with a real-time dashboard. Watch your bot think, trade, and learn. Full transparency into every position, every payout, every decision it makes.
          </p>
        </div>
        <TradingDashboardMockup />
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ fontFamily: L.font, fontSize: 13, color: L.textFaint }}>
            7 themes included. This is your real dashboard.
          </p>
          <Link to="/trading/dashboard" style={lBtnOutline({ fontSize: 14, padding: "10px 24px", marginTop: 12, display: "inline-block" })}>
            Try the Live Demo
          </Link>
        </div>
      </section>

      {/* ─── PREREQUISITES ─── */}
      <section style={{
        padding: "80px 24px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={sectionWrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={sectionTitle}>Three Accounts, Five Minutes</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 32,
          }}>
            {PREREQUISITES.map((p, i) => (
              <div key={i} style={{
                ...lCard({ background: L.bg }),
                textAlign: "center",
                padding: "36px 28px",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: L.goldDim,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                  fontFamily: L.display, fontSize: 22, fontWeight: 700, color: L.gold,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: L.display, fontSize: 20, fontWeight: 700, color: L.text, margin: "0 0 8px" }}>
                  {p.name}
                </h3>
                <p style={{ fontFamily: L.font, fontSize: 14, color: L.textDim, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: L.font, fontSize: 14, color: L.textDim,
            lineHeight: 1.7, maxWidth: 640, margin: "0 auto", textAlign: "center",
          }}>
            All free to create. We walk you through every step. Each service gives you an "API key,"
            which is basically a password that lets your bot access that service. You will just copy and paste
            them during setup.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={sectionTitle}>How Your Desk Works</h2>
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

      {/* ─── UPGRADE FLOW ─── */}
      <section style={{
        padding: "80px 24px 100px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={sectionWrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={sectionTitle}>We Improve It. Your Desk Gets It.</h2>
            <p style={sectionDesc}>
              Every time we ship a smarter model, a new data source, or a better risk algorithm, your desk gets the update automatically. You never fall behind.
            </p>
          </div>

          <div style={{
            ...lCard({ padding: "32px 36px" }),
            maxWidth: 560,
            margin: "0 auto 40px",
          }}>
            {UPGRADE_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0",
                borderBottom: i < UPGRADE_ITEMS.length - 1 ? `1px solid ${L.border}` : "none",
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: i === UPGRADE_ITEMS.length - 1 ? L.green : L.gold,
                }} />
                <span style={{
                  fontFamily: L.font, fontSize: 14,
                  color: i === UPGRADE_ITEMS.length - 1 ? L.green : L.textDim,
                  fontWeight: i === UPGRADE_ITEMS.length - 1 ? 600 : 400,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {[
              { title: "Zero Downtime", desc: "Automatic. Same day." },
              { title: "Zero Action Required", desc: "Your bot receives every upgrade without you lifting a finger." },
              { title: "Same System, Every Bot", desc: "Everyone runs the latest version. No tiers. No feature gates." },
            ].map((item, i) => (
              <div key={i} style={{ ...lCard({ background: L.bg }), textAlign: "center" }}>
                <h3 style={{ fontFamily: L.display, fontSize: 18, fontWeight: 700, color: L.text, margin: "0 0 8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: L.font, fontSize: 14, color: L.textDim, margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={sectionTitle}>What Sits on Your Desk</h2>
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

      {/* ─── ASK YOUR BOT ─── */}
      <section style={{
        padding: "80px 24px 100px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={sectionWrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={sectionLabel}>TALK TO YOUR DESK</div>
            <h2 style={sectionTitle}>Ask It Why</h2>
            <p style={sectionDesc}>
              Most bots are black boxes. Yours is not. Ask why it bought, why it sold, what it sees in the market right now. Get real answers backed by the same data it trades on.
            </p>
          </div>

          <div style={{
            ...lCard({ padding: "32px", maxWidth: 640, margin: "0 auto 40px" }),
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 18px",
              borderRadius: 10,
              border: `1px solid ${L.border}`,
              background: L.bg,
            }}>
              <IconChat />
              <span style={{ fontFamily: L.font, fontSize: 15, color: L.textFaint }}>
                Ask your bot anything...
              </span>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {[
              { title: "Grounded in Data", desc: "Every answer pulls from your live portfolio, open positions, and current market conditions." },
              { title: "No Jargon", desc: "It explains in plain language. You do not need a finance degree to understand your own desk." },
              { title: "24/7", desc: "Your desk never clocks out. Neither does its ability to explain itself." },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <h3 style={{ fontFamily: L.display, fontSize: 16, fontWeight: 700, color: L.text, margin: "0 0 8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: L.font, fontSize: 14, color: L.textDim, margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UNDER THE HOOD ─── */}
      <section style={{
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={sectionLabel}>UNDER THE HOOD</div>
          <h2 style={sectionTitle}>Nine Data Sources. Every Two Minutes.</h2>
          <p style={{ ...sectionDesc, marginBottom: 48 }}>
            Your desk does not guess. It pulls live data from nine sources, runs real math on it, and feeds everything into Claude AI for a judgment call. Every cycle. All day.
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
          Could you wire all this up yourself? Probably. But keeping it sharp requires constant research, auditing, and engineering. That is what the 2% covers.
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
            <h2 style={sectionTitle}>I Built This for Myself First</h2>
            <p style={sectionDesc}>Then people asked for their own.</p>
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
                label: "WHERE WE ARE",
                title: "Now you can have the same desk I run.",
                desc: "Same AI. Same data sources. Same self-improving loop. Calibrated to your risk profile. Your capital works while you do whatever you want. No returns are guaranteed, but the system is built to give your money a real shot at growing.",
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
              "I built the desk I wished existed. Then I realized other people needed it too."
            </p>
            <p style={{
              fontFamily: L.font, fontSize: 14, color: L.textDim, margin: 0,
            }}>
              - Diego Vallota, Founder
            </p>
          </div>
        </div>
      </section>

      {/* ─── TRUST & SECURITY ─── */}
      <section style={{
        padding: "100px 24px",
        ...sectionWrap,
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={sectionLabel}>SECURITY</div>
          <h2 style={sectionTitle}>Your Keys. Your Wallet. Your Rules.</h2>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {[
              "Your wallet is created through Coinbase Developer Platform. You hold the keys. We never do.",
              "Your desk can trade, but it cannot withdraw to external addresses. Your capital stays in your wallet at all times.",
              "A flat 2% of daily realized profits. No subscription. No markup. If your desk does not profit, you pay nothing.",
            ].map((text, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                fontFamily: L.font, fontSize: 15, color: L.textDim, lineHeight: 1.7,
              }}>
                <div style={{ marginTop: 4, flexShrink: 0 }}><IconCheck /></div>
                {text}
              </div>
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}>
            {SECURITY_POINTS.map((point, i) => (
              <div key={i} style={{
                ...lCard({ padding: "16px 20px", textAlign: "center" }),
              }}>
                <span style={{ fontFamily: L.font, fontSize: 13, color: L.textDim }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{
        padding: "80px 24px 100px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={sectionWrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={sectionTitle}>Simple, Transparent Pricing</h2>
          </div>

          <div style={{
            ...lCard({ padding: "48px 40px" }),
            maxWidth: 520,
            margin: "0 auto",
            textAlign: "center",
            border: `1px solid ${L.borderLight}`,
          }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 32 }}>
                <div>
                  <div style={{ fontFamily: L.font, fontSize: 14, color: L.textDim, marginBottom: 8 }}>Setup Cost</div>
                  <div style={{ fontFamily: L.display, fontSize: 36, fontWeight: 700, color: L.navy }}>$0</div>
                </div>
                <div>
                  <div style={{ fontFamily: L.font, fontSize: 14, color: L.textDim, marginBottom: 8 }}>Profit Fee</div>
                  <div style={{ fontFamily: L.display, fontSize: 36, fontWeight: 700, color: L.navy }}>2%</div>
                  <div style={{ fontFamily: L.font, fontSize: 13, color: L.textFaint }}>of daily realized profits</div>
                </div>
              </div>
              <p style={{
                fontFamily: L.font, fontSize: 16, color: L.green, fontWeight: 600, margin: "0 0 32px",
              }}>
                You only pay when you make money
              </p>
            </div>

            <div style={{ textAlign: "left", marginBottom: 32 }}>
              {PRICING_FEATURES.map((feature, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 0",
                  fontFamily: L.font, fontSize: 15, color: L.textDim,
                }}>
                  <IconCheck />
                  {feature}
                </div>
              ))}
            </div>

            <Link to="/trading/signup" style={lBtn({ fontSize: 16, padding: "16px 40px", width: "100%", display: "block", textAlign: "center", boxSizing: "border-box" })}>
              Get Your Desk
            </Link>
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

      {/* ─── BOTTOM CTA ─── */}
      <section style={{
        padding: "80px 24px",
        background: L.surface,
        borderTop: `1px solid ${L.border}`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={sectionTitle}>
            Open Your Desk
          </h2>
          <p style={{
            fontFamily: L.font, fontSize: 17, color: L.textDim, margin: "0 0 36px",
          }}>
            Five minutes to set up. Then it runs on its own.
          </p>
          <Link to="/trading/signup" style={lBtn({ fontSize: 16, padding: "16px 36px", display: "inline-block" })}>
            Get Your Desk
          </Link>
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
          Trading crypto involves risk. Your desk can lose money and past performance is not indicative of future results.
          Nothing on this page constitutes financial advice, a recommendation to trade, or an offer to manage assets.
          You maintain full control of your funds at all times. The 2% fee applies only to realized daily profits.
          By opening a desk, you accept full responsibility for its performance and any trading decisions made.
        </p>
      </div>
    </div>
  );
}
