import { useState } from "react";
import { Link } from "react-router-dom";
import { TT, btnPrimary, btnOutline, card } from "./theme";

const QUESTIONS = [
  {
    id: "drop",
    q: "Your portfolio drops 10% overnight. What do you do?",
    opts: [
      { label: "Sell everything,I can't handle that kind of loss", value: 1 },
      { label: "Wait and watch,I'd be nervous but wouldn't panic", value: 2 },
      { label: "Buy more,that's a discount", value: 3 },
    ],
  },
  {
    id: "timeline",
    q: "What's your investment timeline?",
    opts: [
      { label: "Less than 6 months,I want quick returns", value: 1 },
      { label: "6 months to 2 years,medium term growth", value: 2 },
      { label: "2+ years,I'm in it for the long haul", value: 3 },
    ],
  },
  {
    id: "experience",
    q: "How much experience do you have with crypto?",
    opts: [
      { label: "I'm brand new,I've barely bought any crypto", value: 1 },
      { label: "Some experience,I've traded a few times", value: 2 },
      { label: "Experienced,I actively trade and understand DeFi", value: 3 },
    ],
  },
  {
    id: "capital",
    q: "What percentage of your total savings is this investment?",
    opts: [
      { label: "Less than 5%,just experimenting", value: 1 },
      { label: "5-20%,a meaningful but not critical portion", value: 2 },
      { label: "More than 20%,a significant part of my portfolio", value: 1.5 },
    ],
  },
  {
    id: "volatility",
    q: "How do you feel about daily price swings of 5-15%?",
    opts: [
      { label: "That's way too much,I prefer stability", value: 1 },
      { label: "It's uncomfortable but I understand it comes with the territory", value: 2 },
      { label: "That's the game,volatility is where the opportunity is", value: 3 },
    ],
  },
  {
    id: "goal",
    q: "What's your primary goal?",
    opts: [
      { label: "Preserve my capital,steady small gains are fine", value: 1 },
      { label: "Grow my portfolio,balanced risk and reward", value: 2 },
      { label: "Maximize returns,I'll accept higher risk for bigger upside", value: 3 },
    ],
  },
];

function getProfile(answers) {
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const max = QUESTIONS.length * 3;
  const pct = total / max;

  if (pct <= 0.4) return "conservative";
  if (pct <= 0.7) return "moderate";
  return "aggressive";
}

const PROFILES = {
  conservative: {
    label: "Conservative",
    color: "#00d4ff",
    emoji: "🛡️",
    desc: "You prefer stability over high returns. In this mode, the bot uses tighter stop-losses, smaller position sizes, and focuses on high-confidence setups only. It trades less frequently but with more precision.",
    config: "Tight stop-losses (2-3%), smaller positions, high-confidence signals only, lower trade frequency.",
  },
  moderate: {
    label: "Moderate",
    color: "#ffd93d",
    emoji: "⚖️",
    desc: "You're comfortable with some risk for better returns. In this mode, the bot balances opportunity with protection: moderate position sizes, standard stop-losses, and a mix of conservative and opportunistic trades.",
    config: "Standard stop-losses (3-5%), balanced position sizes, mixed signal confidence levels.",
  },
  aggressive: {
    label: "Aggressive",
    color: "#00ff88",
    emoji: "🚀",
    desc: "You're here for maximum upside and understand the risk. In this mode, the bot takes more positions, uses wider stop-losses to avoid getting shaken out, and acts on a broader range of signals including sentiment-driven plays.",
    config: "Wider stop-losses (5-8%), larger positions, broader signal range including sentiment plays.",
  },
};

export default function RiskQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (qId, value) => {
    const updated = { ...answers, [qId]: value };
    setAnswers(updated);

    if (current < QUESTIONS.length - 1) {
      setTimeout(() => setCurrent(current + 1), 200);
    } else {
      const profile = getProfile(updated);
      setResult(profile);
      try {
        localStorage.setItem("vt_risk_profile", profile);
        localStorage.setItem("vt_quiz_answers", JSON.stringify(updated));
      } catch {}
    }
  };

  const handleGoBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const q = QUESTIONS[current];
  const profile = result ? PROFILES[result] : null;

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
        <Link to="/trading" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill={TT.primaryDim} />
            <path d="M12 26L17 20L21 23L28 14" stroke={TT.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 14H28V18" stroke={TT.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: TT.mono, fontSize: 16, fontWeight: 700, color: TT.text }}>
            Vallota Trading
          </span>
        </Link>
        <Link to="/trading" style={{ fontFamily: TT.font, fontSize: 14, color: TT.textDim, textDecoration: "none" }}>
          &larr; Back
        </Link>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px 100px" }}>

        <p style={{
          fontFamily: TT.font, fontSize: 11, color: TT.textFaint,
          textAlign: "center", marginBottom: 24, lineHeight: 1.6,
        }}>
          This quiz is for educational and demonstration purposes only. It does not constitute
          investment advice or a recommendation to trade. All trading involves risk.
        </p>

        {!result ? (
          <>
            {/* ─── PROGRESS ─── */}
            <div style={{ marginBottom: 40 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12,
              }}>
                <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.textDim }}>
                  Question {current + 1} of {QUESTIONS.length}
                </span>
                <span style={{ fontFamily: TT.mono, fontSize: 13, color: TT.primary }}>
                  {Math.round(((current) / QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div style={{
                height: 4, borderRadius: 2,
                background: TT.border,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${(current / QUESTIONS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${TT.primary}, ${TT.green})`,
                  borderRadius: 2,
                  transition: "width 0.3s ease",
                }} />
              </div>
            </div>

            {/* ─── QUESTION ─── */}
            <h2 style={{
              fontFamily: TT.font,
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: 700,
              margin: "0 0 32px",
              color: TT.text,
              lineHeight: 1.3,
            }}>
              {q.q}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {q.opts.map((opt, i) => {
                const selected = answers[q.id] === opt.value;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(q.id, opt.value)}
                    style={{
                      ...card({
                        padding: "18px 24px",
                        cursor: "pointer",
                        textAlign: "left",
                        border: `1px solid ${selected ? TT.primary : TT.border}`,
                        background: selected ? TT.primaryDim : TT.surface,
                        transition: "all 0.15s",
                      }),
                      fontFamily: TT.font,
                      fontSize: 15,
                      fontWeight: 500,
                      color: selected ? TT.primary : TT.text,
                      lineHeight: 1.5,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {current > 0 && (
              <button onClick={handleGoBack} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: TT.font, fontSize: 14, color: TT.textDim,
                marginTop: 24, padding: 0,
              }}>
                &larr; Previous question
              </button>
            )}
          </>
        ) : (
          /* ─── RESULT ─── */
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 64, marginBottom: 24, lineHeight: 1,
            }}>
              {profile.emoji}
            </div>

            <div style={{
              fontFamily: TT.mono, fontSize: 13, fontWeight: 600,
              color: profile.color, letterSpacing: 2,
              marginBottom: 16, textTransform: "uppercase",
            }}>
              YOUR RISK PROFILE
            </div>

            <h1 style={{
              fontFamily: TT.font,
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 800,
              margin: "0 0 24px",
              color: profile.color,
            }}>
              {profile.label}
            </h1>

            <p style={{
              fontFamily: TT.font,
              fontSize: 17,
              color: TT.textDim,
              lineHeight: 1.7,
              margin: "0 0 32px",
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              {profile.desc}
            </p>

            <div style={{
              ...card({ textAlign: "left", marginBottom: 40 }),
            }}>
              <div style={{
                fontFamily: TT.mono, fontSize: 12, fontWeight: 600,
                color: TT.primary, letterSpacing: 1.5,
                marginBottom: 12, textTransform: "uppercase",
              }}>
                BOT CONFIGURATION
              </div>
              <p style={{
                fontFamily: TT.font, fontSize: 14, color: TT.textDim,
                lineHeight: 1.7, margin: 0,
              }}>
                {profile.config}
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/trading/signup" style={{ textDecoration: "none", ...btnPrimary({ fontSize: 16, padding: "16px 36px" }) }}>
                Explore the Demo &rarr;
              </Link>
              <button
                onClick={() => { setResult(null); setCurrent(0); setAnswers({}); }}
                style={btnOutline({ fontSize: 14, padding: "14px 24px" })}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
