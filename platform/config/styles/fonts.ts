import { Fraunces, Manrope, Anton, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Shared across every style preset (body copy + price/mono accents) so a
 * client build only ever ships 3 extra display-font families on top of
 * these, not a full font set per preset.
 */
export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

/** One display font per style preset — this is the main typographic signal that differentiates the 3 looks. */
export const romanClassicDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-roman-classic",
  weight: ["400", "500", "600"],
});

export const modernItalianDisplay = Manrope({
  subsets: ["latin"],
  variable: "--font-display-modern-italian",
  weight: ["500", "600", "700"],
});

export const nightAperitivoDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-night-aperitivo",
});
