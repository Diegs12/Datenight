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
    desc: "Claude handles trade decisions. Grok scans X/Twitter for real-time market sentiment. Two AI systems working together — no other bot does this.",
  },
  {
    icon: <IconChart />,
    title: "Real Technical Analysis",
    desc: "RSI, MACD, Bollinger Bands — computed mathematically, not guessed by an LLM. Your bot runs actual indicators on real price data.",
  },
  {
    icon: <IconLoop />,
    title: "Self-Improving AI",
    desc: "After every trade, the AI reviews what it did right and wrong. It learns from its own history and adapts its strategy over time.",
  },
  {
    icon: <IconClock />,
    title: "Multi-Timeframe Analysis",
    desc: "Analyzes 5-minute, 1-hour, 4-hour, and daily charts simultaneously. Catches both scalping opportunities and macro trends.",
  },
  {
    icon: <IconShield />,
    title: "Hard Stop-Losses",
    desc: "Every position has a hard stop-loss. If the AI makes a bad call, your downside is capped. Plus a failsafe mode that pauses trading in extreme conditions.",
  },
  {
    icon: <IconTarget />,
    title: "Risk-Matched Trading",
    desc: "Take our risk quiz and your bot is calibrated to your comfort level. Conservative, moderate, or aggressive — you decide how it trades.",
  },
];

const STEPS = [
  { num: "01", title: "Sign Up", desc: "Create your account, take the risk quiz, and tell us your trading capital." },
  { num: "02", title: "Configure", desc: "Connect your Coinbase account and set your risk preferences. We walk you through every step." },
  { num: "03", title: "Deploy", desc: "Your personal AI bot goes live on Coinbase Base L2. Monitor everything from your dashboard." },
];

const FAQS = [
  {
    q: "How does pricing work?",
    a: "Setup is free. We take 2% of your daily realized profits only. If you don't make money, we don't make money. No monthly fees, no hidden costs.",
  },
  {
    q: "What exchanges do you support?",
    a: "We trade on Coinbase Base L2 network. You'll need a Coinbase account with CDP (Coinbase Developer Platform) access. We'll walk you through the setup.",
  },
  {
    q: "How much capital do I need to start?",
    a: "There's no minimum, but we recommend starting with at least $500 to see meaningful results. The bot works with any amount.",
  },
  {
    q: "Can I lose money?",
    a: "Yes. Crypto trading carries real risk. While our bot uses hard stop-losses and failsafe modes to limit downside, no trading system can guarantee profits. Only invest what you can afford to lose.",
  },
  {
    q: "How does the dual AI system work?",
    a: "Claude (by Anthropic) is the decision engine — it analyzes technicals, reviews past trades, and decides when to buy/sell. Grok (by xAI) monitors X/Twitter in real-time for market sentiment and breaking news. Together they catch signals that neither could alone.",
  },
  {
    q: "What does the self-review loop do?",
    a: "After each trade closes, the AI reviews its reasoning, the outcome, and market conditions. It identifies patterns in its own mistakes and successes, then adjusts its future strategy. Your bot literally gets smarter over time.",
  },
  {
    q: "Can I see what the bot is doing?",
    a: "Yes. Your dashboard shows every trade, every AI decision with its reasoning, your portfolio performance, and real-time market data. Full transparency.",
  },
  {
    q: "Can I stop trading at any time?",
    a: "Absolutely. You can pause or stop your bot from the dashboard at any time. Your funds stay in your Coinbase account — we never have custody of your money.",
  },
];

// ─── ANIMATED TERMINAL ───
function TerminalAnimation() {
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

// ─── STATS BAR ───
function StatsBar() {
  const stats = [
    { label: "Timeframes", value: "4" },
    { label: "Indicators", value: "3+" },
    { label: "AI Models", value: "2" },
    { label: "Profit Fee", value: "2%" },
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
  const hasSession = (() => { try { return !!localStorage.getItem("vt_session"); } catch { return false; } })();

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
          <button onClick={() => { const el = document.getElementById("pricing"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.textDim, padding: 0 }}>Pricing</button>
          <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: TT.font, fontSize: 14, fontWeight: 500, color: TT.textDim, padding: 0 }}>FAQ</button>
          {hasSession && (
            <Link to="/trading/dashboard" style={{
              fontFamily: TT.font, fontSize: 14, fontWeight: 600, textDecoration: "none",
              padding: "8px 20px", borderRadius: 6,
              background: TT.primary, color: "#fff",
            }}>
              Dashboard
            </Link>
          )}
          <Link to="/trading/signup" style={{
            fontFamily: TT.font, fontSize: 14, fontWeight: 600, textDecoration: "none",
            padding: "8px 20px", borderRadius: 6,
            border: `1px solid ${TT.primary}`, color: TT.primary,
          }}>
            {hasSession ? "Account" : "Get Started"}
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        padding: "100px 24px 60px",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        gap: 60,
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 24,
            padding: "6px 14px", borderRadius: 20,
            background: TT.greenDim, border: `1px solid rgba(0,255,136,0.15)`,
            fontFamily: TT.mono, fontSize: 12, fontWeight: 600,
            color: TT.green,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: TT.green }} />
            LIVE ON COINBASE BASE L2
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
            margin: "0 0 36px",
            maxWidth: 480,
          }}>
            One AI reads the charts. The other reads the room. Together they
            find trades most humans miss — and they get smarter after every single one.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/trading/quiz" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 32px" }) }}>
              Take the Risk Quiz
            </Link>
            <a href="#how-it-works" style={{ textDecoration: "none", ...btnOutline({ fontSize: 16, padding: "16px 32px" }) }}>
              How It Works
            </a>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 320, display: "flex", justifyContent: "center" }}>
          <TerminalAnimation />
        </div>
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
            Up and Running in Minutes
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: 0, maxWidth: 560, marginLeft: "auto", marginRight: "auto",
          }}>
            No coding. No complicated setup. We handle the infrastructure — you just connect your account.
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
              WHAT MAKES US DIFFERENT
            </div>
            <h2 style={{
              fontFamily: TT.font,
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              margin: "0 0 16px",
              color: TT.text,
            }}>
              Built Different. Trades Smarter.
            </h2>
            <p style={{
              fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: 0, maxWidth: 600, marginLeft: "auto", marginRight: "auto",
            }}>
              Most bots use one model and hope for the best. Vallota Trading combines two AI systems
              with real computed analysis.
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
            Answer 6 quick questions. We'll calibrate your bot to match your risk tolerance,
            timeline, and experience level.
          </p>
          <Link to="/trading/quiz" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 40px" }) }}>
            Take the Quiz &rarr;
          </Link>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{
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
            Simple, Aligned Pricing
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: "0 0 48px",
          }}>
            We only make money when you do.
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
              PERFORMANCE FEE
            </div>
            <div style={{
              fontFamily: TT.mono,
              fontSize: "clamp(48px, 8vw, 72px)",
              fontWeight: 800,
              color: TT.text,
              lineHeight: 1,
              marginBottom: 8,
            }}>
              2<span style={{ color: TT.primary }}>%</span>
            </div>
            <div style={{
              fontFamily: TT.font, fontSize: 16, color: TT.textDim, marginBottom: 36,
            }}>
              of daily realized profits only
            </div>

            <div style={{ borderTop: `1px solid ${TT.border}`, paddingTop: 28, textAlign: "left" }}>
              {[
                "Free setup — no upfront cost",
                "No monthly subscription",
                "No fee on losing days",
                "Your funds stay in YOUR Coinbase account",
                "Cancel anytime",
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

            <Link to="/trading/signup" style={{
              textDecoration: "none",
              display: "block",
              marginTop: 32,
              ...btnPrimary({ width: "100%", fontSize: 16, padding: "16px 28px" }),
            }}>
              Start Trading
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
            Ready to Deploy Your AI?
          </h2>
          <p style={{
            fontFamily: TT.font, fontSize: 17, color: TT.textDim, margin: "0 0 36px",
          }}>
            Free setup. You only pay when you profit.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/trading/signup" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 36px" }) }}>
              Get Started
            </Link>
            <Link to="/trading/quiz" style={{ textDecoration: "none", ...btnOutline({ fontSize: 16, padding: "16px 36px" }) }}>
              Take the Risk Quiz
            </Link>
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
          Trading cryptocurrency involves substantial risk of loss and is not suitable for every investor. Past performance
          is not indicative of future results. Vallota Trading does not guarantee profits. Only trade with capital you can
          afford to lose. This is not financial advice.
        </p>
      </div>
    </div>
  );
}
