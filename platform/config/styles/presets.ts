import type { StylePreset } from "@/config/types";

export interface StyleTokens {
  colorPrimary: string;
  colorPrimaryDim: string;
  colorAccent: string;
  colorInk: string;
  colorInkSoft: string;
  colorSurface: string;
  colorSurfaceDim: string;
  colorPanel: string;
  colorPanelText: string;
  colorLine: string;
  radiusCard: string;
  /** CSS var name (from config/styles/fonts.ts) holding this preset's display font. */
  displayFontVar: string;
}

export const STYLE_PRESETS: Record<StylePreset, StyleTokens> = {
  "roman-classic": {
    colorPrimary: "#C1361D",
    colorPrimaryDim: "#A32C17",
    colorAccent: "#E3A73B",
    colorInk: "#221C16",
    colorInkSoft: "#5C5347",
    colorSurface: "#FFFDF8",
    colorSurfaceDim: "#F7F1E3",
    colorPanel: "#1B1611",
    colorPanelText: "#F7F1E3",
    colorLine: "rgba(34,28,22,0.14)",
    radiusCard: "3px",
    displayFontVar: "--font-display-roman-classic",
  },
  "modern-italian": {
    colorPrimary: "#1F2937",
    colorPrimaryDim: "#111827",
    colorAccent: "#B08D57",
    colorInk: "#111827",
    colorInkSoft: "#6B7280",
    colorSurface: "#FFFFFF",
    colorSurfaceDim: "#F3F4F6",
    colorPanel: "#111827",
    colorPanelText: "#F9FAFB",
    colorLine: "rgba(17,24,39,0.10)",
    radiusCard: "10px",
    displayFontVar: "--font-display-modern-italian",
  },
  "night-aperitivo": {
    colorPrimary: "#E8B84B",
    colorPrimaryDim: "#C99B2E",
    colorAccent: "#7A4FE0",
    colorInk: "#F5F3EE",
    colorInkSoft: "rgba(245,243,238,0.65)",
    colorSurface: "#1B1721",
    colorSurfaceDim: "#14121A",
    colorPanel: "#0D0B12",
    colorPanelText: "#F5F3EE",
    colorLine: "rgba(245,243,238,0.14)",
    radiusCard: "2px",
    displayFontVar: "--font-display-night-aperitivo",
  },
};

/** Merges a client's optional per-instance overrides on top of its style bucket's defaults. */
export function resolveStyleTokens(
  style: StylePreset,
  overrides?: { primaryColor?: string; accentColor?: string }
): StyleTokens {
  const base = STYLE_PRESETS[style];
  return {
    ...base,
    colorPrimary: overrides?.primaryColor ?? base.colorPrimary,
    colorAccent: overrides?.accentColor ?? base.colorAccent,
  };
}
