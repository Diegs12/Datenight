const themes = {
  terminal: {
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
  },
  midnight: {
    bg: "#0c0a1a",
    surface: "#1a1535",
    surfaceAlt: "#221c45",
    border: "#2e2655",
    borderLight: "#3d3470",
    primary: "#a78bfa",
    primaryDim: "rgba(167,139,250,0.12)",
    green: "#34d399",
    greenDim: "rgba(52,211,153,0.12)",
    red: "#f87171",
    redDim: "rgba(248,113,113,0.12)",
    yellow: "#fbbf24",
    text: "#e2e8f0",
    textDim: "#94a3b8",
    textFaint: "#64748b",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    font: "'Inter', sans-serif",
  },
  light: {
    bg: "#f8fafc",
    surface: "#ffffff",
    surfaceAlt: "#f1f5f9",
    border: "#e2e8f0",
    borderLight: "#cbd5e1",
    primary: "#0ea5e9",
    primaryDim: "rgba(14,165,233,0.1)",
    green: "#10b981",
    greenDim: "rgba(16,185,129,0.1)",
    red: "#ef4444",
    redDim: "rgba(239,68,68,0.1)",
    yellow: "#f59e0b",
    text: "#0f172a",
    textDim: "#64748b",
    textFaint: "#94a3b8",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    font: "'Inter', sans-serif",
  },
};

export const THEME_NAMES = Object.keys(themes);

export function getTheme(name) {
  return themes[name] || themes.terminal;
}

let _current = localStorage.getItem("vt_theme") || "terminal";
export let TT = getTheme(_current);

const listeners = new Set();

export function setTheme(name) {
  if (!themes[name]) return;
  _current = name;
  TT = getTheme(name);
  localStorage.setItem("vt_theme", name);
  listeners.forEach((fn) => fn(name));
}

export function getCurrentThemeName() {
  return _current;
}

export function onThemeChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

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
