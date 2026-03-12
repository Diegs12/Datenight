// Vallota Trading,Dark terminal theme
export const TT = {
  bg: "#0a0e17",
  surface: "#0f1419",
  surfaceAlt: "#141c25",
  border: "#1e2a3a",
  borderLight: "#2a3a4e",
  primary: "#00d4ff",
  primaryDim: "rgba(0,212,255,0.12)",
  green: "#00ff88",
  greenDim: "rgba(0,255,136,0.12)",
  red: "#ff4757",
  redDim: "rgba(255,71,87,0.12)",
  yellow: "#ffd93d",
  text: "#e8edf3",
  textDim: "#8899aa",
  textFaint: "#4a5568",
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  font: "'Inter', sans-serif",
};

export const btn = (bg, color, x = {}) => ({
  fontFamily: TT.font,
  fontSize: 15,
  fontWeight: 700,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  padding: "14px 28px",
  transition: "all 0.2s",
  background: bg,
  color,
  ...x,
});

export const btnPrimary = (x = {}) => ({
  ...btn(TT.primary, TT.bg),
  boxShadow: `0 0 20px rgba(0,212,255,0.25), 0 4px 12px rgba(0,0,0,0.3)`,
  letterSpacing: 0.3,
  ...x,
});

export const btnOutline = (x = {}) => ({
  ...btn("transparent", TT.primary),
  border: `1px solid ${TT.primary}`,
  ...x,
});

export const inp = (x = {}) => ({
  fontFamily: TT.font,
  fontSize: 15,
  padding: "14px 16px",
  borderRadius: 8,
  border: `1px solid ${TT.border}`,
  background: TT.surfaceAlt,
  color: TT.text,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  ...x,
});

export const card = (x = {}) => ({
  background: TT.surface,
  borderRadius: 12,
  padding: 28,
  border: `1px solid ${TT.border}`,
  ...x,
});
