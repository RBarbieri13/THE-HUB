// Donation Closet / The Hub — Design Tokens
// Single source of truth for brand constants.
// CSS custom properties in globals.css are the runtime source;
// this file provides typed access for programmatic use.

export const colors = {
  primary: "#40D9F1",
  primaryDark: "#1E899D",
  accent: "#EE732F",
  white: "#FFFFFF",
  offWhite: "#F4F4F4",
  textPrimary: "#333333",
  textBody: "#444444",
  textLight: "#999999",
  dark: "#222222",
  black: "#000000",
  donateRed: "#CC0000",
  donateBorder: "#FFBF00",
  success: "#28A745",
  warning: "#F0AD4E",
  error: "#DC3545",
  info: "#40D9F1",
} as const

export const gradients = {
  brand: "linear-gradient(135deg, #40D9F1, #1E899D)",
  accent: "linear-gradient(135deg, #EE732F, #D45F1F)",
  hero: "linear-gradient(135deg, #1E899D, #40D9F1)",
  text: "linear-gradient(135deg, #EE732F, #1E899D)",
} as const

export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.08)",
  md: "0 4px 12px rgba(0, 0, 0, 0.12)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.16)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.18)",
  focus: "0 0 0 3px rgba(30, 137, 157, 0.15)",
  card: "0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.1)",
  cardHover: "0 8px 24px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.1)",
} as const

export const radii = {
  none: "0px",
  sm: "3px",
  md: "6px",
  lg: "12px",
  full: "9999px",
} as const

export const transitions = {
  fast: "0.15s ease",
  default: "0.2s ease",
  slow: "0.3s ease",
} as const
