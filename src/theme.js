/**
 * ─────────────────────────────────────────────────────────────────
 *  THEME CONFIGURATION  — single file to control the entire look
 *  Change values here; nothing else needs touching.
 * ─────────────────────────────────────────────────────────────────
 */

// ── Brand Colors ─────────────────────────────────────────────
export const COLORS = {
  // Primary palette — derived from the logo
  forest: {
    50:  "#e8f0ee",
    100: "#c5d8d1",
    200: "#9fbfb5",
    300: "#79a699",
    400: "#5c9388",
    500: "#3f8070",
    600: "#2d6b5c",
    700: "#1d5245",
    800: "#0f3d2f",   // ← deep forest green (logo background)
    900: "#0a2d22",
    950: "#061a14",
  },

  gold: {
    50:  "#fdf8ec",
    100: "#f9edd0",
    200: "#f4d99d",
    300: "#efc46a",
    400: "#e8b048",   // ← warm gold (logo text / crown)
    500: "#c9943a",
    600: "#a87930",
    700: "#865e26",
    800: "#64461c",
    900: "#422e12",
  },

  ivory: {
    50:  "#fdfcf8",
    100: "#f9f6ee",
    200: "#f2ead9",
    300: "#e8dcc2",
    400: "#d8c89a",
  },
};

// ── Typography ────────────────────────────────────────────────
export const FONTS = {
  // Montserrat — headings (geometric, professional, clean)
  display: {
    family: '"Montserrat", system-ui, sans-serif',
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&family=Inter:wght@400;500;600&display=swap",
  },

  heading: {
    family: '"Montserrat", system-ui, sans-serif',
    googleUrl: "", // loaded with display above
  },

  // Inter — body (purpose-built for screen readability)
  body: {
    family: '"Inter", system-ui, sans-serif',
    googleUrl: "", // loaded with display above
  },
};

// ── Spacing / Shape ───────────────────────────────────────────
export const RADIUS = {
  card:   "1rem",      // 16px
  button: "9999px",    // pill
  badge:  "0.375rem",  // 6px
};

// ── Shadow presets ────────────────────────────────────────────
export const SHADOWS = {
  card:   "0 2px 16px 0 rgba(10,45,34,0.10)",
  cardHover: "0 8px 32px 0 rgba(10,45,34,0.18)",
  gold:   "0 4px 24px 0 rgba(201,148,58,0.30)",
};
