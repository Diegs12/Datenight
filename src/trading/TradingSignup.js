import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TT, btnPrimary, inp, card } from "./theme";

export default function TradingSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState("register"); // register | setup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Setup step state
  const [capital, setCapital] = useState("");
  const [riskProfile, setRiskProfile] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vt_risk_profile");
      if (saved) setRiskProfile(saved);
      // Check if already logged in
      const session = localStorage.getItem("vt_session");
      if (session) setStep("setup");
    } catch {}
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPw) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/trading-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          risk_profile: riskProfile || null,
          quiz_answers: (() => { try { return JSON.parse(localStorage.getItem("vt_quiz_answers")); } catch { return null; } })(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      localStorage.setItem("vt_session", JSON.stringify({ email, id: data.user_id || email }));
      setStep("setup");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = (e) => {
    e.preventDefault();
    if (!capital || isNaN(Number(capital)) || Number(capital) <= 0) {
      setError("Enter a valid capital amount.");
      return;
    }
    try {
      localStorage.setItem("vt_capital", capital);
      localStorage.setItem("vt_risk_profile", riskProfile);
    } catch {}
    navigate("/trading/dashboard");
  };

  const profileLabels = {
    conservative: { label: "Conservative", color: "#00d4ff", icon: "🛡️" },
    moderate: { label: "Moderate", color: "#ffd93d", icon: "⚖️" },
    aggressive: { label: "Aggressive", color: "#00ff88", icon: "🚀" },
  };

  return (
    <div style={{ background: TT.bg, color: TT.text, fontFamily: TT.font, minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <nav style={{
        padding: "18px 24px", maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
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

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px 100px" }}>

        {step === "register" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h1 style={{
                fontFamily: TT.font, fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 800, margin: "0 0 12px", color: TT.text,
              }}>
                Create Your Account
              </h1>
              <p style={{ fontFamily: TT.font, fontSize: 16, color: TT.textDim, margin: 0 }}>
                Free signup. No credit card required.
              </p>
            </div>

            {riskProfile && (
              <div style={{
                ...card({ marginBottom: 24, padding: "16px 20px" }),
                display: "flex", alignItems: "center", gap: 12,
                background: TT.surfaceAlt,
              }}>
                <span style={{ fontSize: 24 }}>{profileLabels[riskProfile]?.icon}</span>
                <div>
                  <div style={{ fontFamily: TT.mono, fontSize: 11, color: TT.textFaint, letterSpacing: 1, textTransform: "uppercase" }}>
                    RISK PROFILE
                  </div>
                  <div style={{ fontFamily: TT.font, fontSize: 15, fontWeight: 600, color: profileLabels[riskProfile]?.color }}>
                    {profileLabels[riskProfile]?.label}
                  </div>
                </div>
                <Link to="/trading/quiz" style={{
                  marginLeft: "auto",
                  fontFamily: TT.font, fontSize: 13, color: TT.textDim, textDecoration: "none",
                }}>
                  Retake
                </Link>
              </div>
            )}

            {!riskProfile && (
              <Link to="/trading/quiz" style={{
                textDecoration: "none", display: "block", marginBottom: 24,
                ...card({ padding: "16px 20px", background: TT.surfaceAlt }),
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>📋</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: TT.font, fontSize: 14, fontWeight: 600, color: TT.text }}>
                      Take the Risk Quiz first
                    </div>
                    <div style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>
                      We'll calibrate your bot to your risk tolerance
                    </div>
                  </div>
                  <span style={{ color: TT.primary, fontSize: 18 }}>&rarr;</span>
                </div>
              </Link>
            )}

            <form onSubmit={handleRegister}>
              <div style={{ ...card(), padding: 32 }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 600, color: TT.textDim, display: "block", marginBottom: 8 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    style={inp()}
                    autoComplete="email"
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 600, color: TT.textDim, display: "block", marginBottom: 8 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    style={inp()}
                    autoComplete="new-password"
                  />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontFamily: TT.font, fontSize: 13, fontWeight: 600, color: TT.textDim, display: "block", marginBottom: 8 }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    placeholder="Confirm your password"
                    style={inp()}
                    autoComplete="new-password"
                  />
                </div>

                {error && (
                  <div style={{
                    fontFamily: TT.font, fontSize: 14, color: TT.red,
                    background: TT.redDim, padding: "12px 16px",
                    borderRadius: 8, marginBottom: 20,
                  }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...btnPrimary({ width: "100%", fontSize: 16, padding: "16px 28px" }),
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            <p style={{
              fontFamily: TT.font, fontSize: 12, color: TT.textFaint,
              textAlign: "center", marginTop: 20, lineHeight: 1.6,
            }}>
              By signing up, you agree that cryptocurrency trading involves risk.
              Only invest what you can afford to lose.
            </p>
          </>
        ) : (
          /* ─── SETUP STEP ─── */
          <>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: TT.greenDim,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={TT.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <h1 style={{
                fontFamily: TT.font, fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 800, margin: "0 0 12px", color: TT.text,
              }}>
                Account Created
              </h1>
              <p style={{ fontFamily: TT.font, fontSize: 16, color: TT.textDim, margin: 0 }}>
                Let's configure your bot.
              </p>
            </div>

            <form onSubmit={handleSetup}>
              {/* Trading Capital */}
              <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
                <label style={{
                  fontFamily: TT.font, fontSize: 14, fontWeight: 700,
                  color: TT.text, display: "block", marginBottom: 4,
                }}>
                  Trading Capital
                </label>
                <p style={{
                  fontFamily: TT.font, fontSize: 13, color: TT.textDim,
                  margin: "0 0 14px", lineHeight: 1.5,
                }}>
                  How much USD are you starting with? You can change this later.
                </p>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                    fontFamily: TT.mono, fontSize: 16, color: TT.textDim,
                  }}>$</span>
                  <input
                    type="text"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value.replace(/[^0-9.]/g, ""))}
                    placeholder="1,000"
                    style={inp({ paddingLeft: 32, fontFamily: TT.mono })}
                  />
                </div>
              </div>

              {/* Risk Profile */}
              <div style={{ ...card(), marginBottom: 20, padding: 28 }}>
                <label style={{
                  fontFamily: TT.font, fontSize: 14, fontWeight: 700,
                  color: TT.text, display: "block", marginBottom: 4,
                }}>
                  Risk Profile
                </label>
                <p style={{
                  fontFamily: TT.font, fontSize: 13, color: TT.textDim,
                  margin: "0 0 14px", lineHeight: 1.5,
                }}>
                  This determines how aggressively your bot trades.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["conservative", "moderate", "aggressive"].map((p) => {
                    const selected = riskProfile === p;
                    const pl = profileLabels[p];
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setRiskProfile(p)}
                        style={{
                          flex: 1,
                          padding: "14px 12px",
                          borderRadius: 8,
                          border: `1px solid ${selected ? pl.color : TT.border}`,
                          background: selected ? `${pl.color}15` : TT.surfaceAlt,
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.15s",
                        }}
                      >
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{pl.icon}</div>
                        <div style={{
                          fontFamily: TT.font, fontSize: 12, fontWeight: 600,
                          color: selected ? pl.color : TT.textDim,
                          textTransform: "capitalize",
                        }}>
                          {p}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coinbase Setup Instructions */}
              <div style={{ ...card(), marginBottom: 24, padding: 28 }}>
                <label style={{
                  fontFamily: TT.font, fontSize: 14, fontWeight: 700,
                  color: TT.text, display: "block", marginBottom: 12,
                }}>
                  Required Accounts
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    {
                      title: "Coinbase CDP Account",
                      desc: "Create a Coinbase Developer Platform account for API access.",
                      url: "https://portal.cdp.coinbase.com",
                    },
                    {
                      title: "Anthropic API Key",
                      desc: "Get an API key from Anthropic to power the Claude AI engine.",
                      url: "https://console.anthropic.com",
                    },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: "14px 16px",
                      borderRadius: 8,
                      background: TT.surfaceAlt,
                      border: `1px solid ${TT.border}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontFamily: TT.font, fontSize: 14, fontWeight: 600, color: TT.text }}>
                          {item.title}
                        </span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: TT.mono, fontSize: 12, color: TT.primary, textDecoration: "none" }}
                        >
                          Open &rarr;
                        </a>
                      </div>
                      <span style={{ fontFamily: TT.font, fontSize: 13, color: TT.textDim }}>
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{
                  fontFamily: TT.font, fontSize: 12, color: TT.textFaint,
                  margin: "14px 0 0", lineHeight: 1.5,
                }}>
                  You can set these up later. We'll guide you through the process in your dashboard.
                </p>
              </div>

              {error && (
                <div style={{
                  fontFamily: TT.font, fontSize: 14, color: TT.red,
                  background: TT.redDim, padding: "12px 16px",
                  borderRadius: 8, marginBottom: 20,
                }}>
                  {error}
                </div>
              )}

              <button type="submit" style={btnPrimary({ width: "100%", fontSize: 16, padding: "16px 28px" })}>
                Go to Dashboard &rarr;
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
