import { useState } from "react";

// ——— NEW GRADIENT SYSTEM ———
// Philosophy: 4 energy moods that give the gradient palette meaning
// Each category gets a rich multi-stop gradient + a subtle animated accent

const GRADS = {
  // 🌿 ENERGIZING — vibrant, alive, movement
  outdoor:   "linear-gradient(135deg, #0b3d2c 0%, #1a6b45 35%, #2ecc71 70%, #a8e6cf 100%)",
  adventure: "linear-gradient(135deg, #4a1942 0%, #8e24aa 30%, #e040fb 65%, #f8bbd0 100%)",

  // 💖 INTIMATE — warm, deep, magnetic
  romantic:   "linear-gradient(135deg, #5c0a2e 0%, #b91c55 35%, #ff4081 65%, #ff80ab 100%)",
  meaningful: "linear-gradient(135deg, #1a3a2a 0%, #2e7d5e 35%, #66bb9a 65%, #b2dfdb 100%)",

  // 🎉 SOCIAL — bold, electric, alive
  nightlife: "linear-gradient(135deg, #1a0533 0%, #4a148c 30%, #7c4dff 60%, #b388ff 100%)",
  food:      "linear-gradient(135deg, #4e1600 0%, #bf360c 30%, #ff6d3a 60%, #ffab91 100%)",

  // 🌊 RELAXING — soft, dreamy, calming
  chill:     "linear-gradient(135deg, #0d1b3e 0%, #1565c0 35%, #42a5f5 65%, #bbdefb 100%)",
  creative:  "linear-gradient(135deg, #1a1040 0%, #283593 30%, #536dfe 60%, #8c9eff 100%)",
};

// Mood groupings for label/badge system
const MOOD_META = {
  outdoor:    { mood: "Energizing",  moodEmoji: "⚡", icon: "🌿",  accent: "#2ecc71" },
  adventure:  { mood: "Energizing",  moodEmoji: "⚡", icon: "🧭",  accent: "#e040fb" },
  romantic:   { mood: "Intimate",    moodEmoji: "💫", icon: "🕯️",  accent: "#ff4081" },
  meaningful: { mood: "Intimate",    moodEmoji: "💫", icon: "💎",  accent: "#66bb9a" },
  nightlife:  { mood: "Social",      moodEmoji: "🎉", icon: "✨",  accent: "#7c4dff" },
  food:       { mood: "Social",      moodEmoji: "🎉", icon: "🔥",  accent: "#ff6d3a" },
  chill:      { mood: "Relaxing",    moodEmoji: "🌊", icon: "☁️",  accent: "#42a5f5" },
  creative:   { mood: "Relaxing",    moodEmoji: "🌊", icon: "🎨",  accent: "#536dfe" },
};

// Budget tier styling
const getTier = (p) => {
  if (p <= 20) return { label: "Free-ish", color: "#4ade80" };
  if (p <= 50) return { label: "Sweet Spot", color: "#fbbf24" };
  if (p <= 100) return { label: "Splurge", color: "#fb923c" };
  return { label: "Go Big", color: "#f472b6" };
};

const FONT = `'Segoe UI', -apple-system, system-ui, sans-serif`;

// ——— REDESIGNED CARD ———
function Card({ date, onClick, grid }) {
  const [hovered, setHovered] = useState(false);
  const meta = MOOD_META[date.category];
  const tier = getTier(date.budget);
  const grad = GRADS[date.category];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: grid ? undefined : "0 0 200px",
        minWidth: grid ? undefined : 200,
        height: grid ? 220 : 260,
        borderRadius: 20,
        background: grad,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        scrollSnapAlign: "start",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${meta.accent}22`
          : "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Glassmorphic inner layer */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.15) 100%)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Decorative orbs */}
      <div style={{
        position: "absolute",
        top: -50,
        right: -50,
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${meta.accent}18, transparent 70%)`,
        zIndex: 0,
        transition: "transform 0.4s ease",
        transform: hovered ? "scale(1.3)" : "scale(1)",
      }} />
      <div style={{
        position: "absolute",
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)`,
        zIndex: 0,
      }} />

      {/* Accent line at top */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "20%",
        right: "20%",
        height: 2,
        background: `linear-gradient(90deg, transparent, ${meta.accent}66, transparent)`,
        zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: grid ? "16px 16px 0" : "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Category icon with glow */}
          <div style={{
            width: grid ? 38 : 44,
            height: grid ? 38 : 44,
            borderRadius: 12,
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${meta.accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: grid ? 18 : 22,
            boxShadow: `0 2px 12px ${meta.accent}22`,
          }}>
            {meta.icon}
          </div>

          {/* Budget badge */}
          <div style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${tier.color}33`,
            borderRadius: 10,
            padding: "4px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}>
            <span style={{
              color: tier.color,
              fontSize: grid ? 13 : 15,
              fontWeight: 800,
              fontFamily: FONT,
              lineHeight: 1,
            }}>${date.budget}</span>
            <span style={{
              color: `${tier.color}99`,
              fontSize: 8,
              fontWeight: 600,
              fontFamily: FONT,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>{tier.label}</span>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ position: "relative", zIndex: 2, padding: grid ? "0 16px 16px" : "0 20px 20px" }}>
        {/* Mood tag */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: `${meta.accent}20`,
          border: `1px solid ${meta.accent}30`,
          borderRadius: 6,
          padding: "2px 8px",
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 9 }}>{meta.moodEmoji}</span>
          <span style={{
            color: `${meta.accent}`,
            fontSize: 9,
            fontWeight: 700,
            fontFamily: FONT,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>{meta.mood}</span>
        </div>

        {/* Title */}
        <p style={{
          color: "#fff",
          fontSize: grid ? 14 : 16,
          fontWeight: 700,
          margin: "0 0 8px",
          lineHeight: 1.25,
          fontFamily: FONT,
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>{date.title}</p>

        {/* Vibes */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {date.vibe.slice(0, 2).map(v => (
            <span key={v} style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              fontSize: grid ? 9 : 10,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 6,
              fontFamily: FONT,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
  );
}


// ——— PREVIEW SHOWCASE ———
const SAMPLE_DATES = [
  { id: 1, title: "Stargazing Picnic", category: "outdoor", budget: 15, vibe: ["romantic", "chill"], difficulty: "easy" },
  { id: 4, title: "Cook-Off Battle", category: "food", budget: 30, vibe: ["playful", "competitive"], difficulty: "moderate" },
  { id: 14, title: "Escape Room", category: "adventure", budget: 60, vibe: ["adventurous", "competitive"], difficulty: "moderate" },
  { id: 5, title: "Wine & Paint Night", category: "creative", budget: 35, vibe: ["creative", "romantic"], difficulty: "easy" },
  { id: 6, title: "Bookstore Date + Coffee", category: "chill", budget: 40, vibe: ["intellectual", "chill"], difficulty: "easy" },
  { id: 10, title: "Spa Night at Home", category: "romantic", budget: 25, vibe: ["romantic", "intimate"], difficulty: "easy" },
  { id: 12, title: "Arcade + Bar Night", category: "nightlife", budget: 45, vibe: ["playful", "spontaneous"], difficulty: "easy" },
  { id: 19, title: "Volunteer Together", category: "meaningful", budget: 0, vibe: ["meaningful", "intimate"], difficulty: "easy" },
  { id: 31, title: "Progressive All-Day Date", category: "adventure", budget: 280, vibe: ["adventurous", "spontaneous"], difficulty: "hard" },
  { id: 9, title: "Cocktail Creation Night", category: "food", budget: 35, vibe: ["playful", "sophisticated"], difficulty: "easy" },
  { id: 23, title: "Build a Blanket Fort", category: "chill", budget: 20, vibe: ["chill", "cozy"], difficulty: "easy" },
  { id: 2, title: "Sunset Hike + Peak Snacks", category: "outdoor", budget: 10, vibe: ["adventurous", "athletic"], difficulty: "moderate" },
];

export default function CardRedesignPreview() {
  const [selectedMood, setSelectedMood] = useState(null);
  const moods = ["Energizing", "Intimate", "Social", "Relaxing"];
  const moodColors = { Energizing: "#e040fb", Intimate: "#ff4081", Social: "#7c4dff", Relaxing: "#42a5f5" };

  const filtered = selectedMood
    ? SAMPLE_DATES.filter(d => MOOD_META[d.category].mood === selectedMood)
    : SAMPLE_DATES;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f12",
      padding: "40px 24px",
      fontFamily: FONT,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <h1 style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: 800,
          margin: "0 0 6px",
          background: "linear-gradient(135deg, #fff 30%, #888)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Card Redesign Preview</h1>
        <p style={{ color: "#8888a0", fontSize: 14, margin: "0 0 28px" }}>
          Mood-based gradient system with glassmorphic polish
        </p>

        {/* Mood filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedMood(null)}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              border: `1px solid ${!selectedMood ? "#fff" : "#2a2a38"}`,
              background: !selectedMood ? "rgba(255,255,255,0.1)" : "transparent",
              color: !selectedMood ? "#fff" : "#8888a0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >All</button>
          {moods.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMood(selectedMood === m ? null : m)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: `1px solid ${selectedMood === m ? moodColors[m] : "#2a2a38"}`,
                background: selectedMood === m ? `${moodColors[m]}18` : "transparent",
                color: selectedMood === m ? moodColors[m] : "#8888a0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: FONT,
                transition: "all 0.2s ease",
              }}
            >{m}</button>
          ))}
        </div>

        {/* Card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
        }}>
          {filtered.map(d => (
            <Card key={d.id} date={d} onClick={() => {}} grid />
          ))}
        </div>

        {/* Horizontal scroll preview */}
        <h2 style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: 700,
          margin: "48px 0 16px",
        }}>Horizontal Scroll (Netflix Row)</h2>
        <div style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 16,
          scrollSnapType: "x mandatory",
        }}>
          {SAMPLE_DATES.map(d => (
            <Card key={`h-${d.id}`} date={d} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}