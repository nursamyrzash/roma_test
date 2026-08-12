import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getClientConfig } from "@/lib/getClientConfig";
import { resolveStyleTokens, type StyleTokens } from "@/config/styles/presets";
import {
  bodyFont,
  monoFont,
  romanClassicDisplay,
  modernItalianDisplay,
  nightAperitivoDisplay,
} from "@/config/styles/fonts";
import { LangProvider } from "@/lib/i18n";
import { pick } from "@/lib/text";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import "./globals.css";

const DISPLAY_FONTS = {
  "roman-classic": romanClassicDisplay,
  "modern-italian": modernItalianDisplay,
  "night-aperitivo": nightAperitivoDisplay,
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const config = getClientConfig();
  const lang = config.languages[0];
  return {
    title: pick(config.seo.title, lang),
    description: pick(config.seo.description, lang),
  };
}

function tokensToCssVars(tokens: StyleTokens): CSSProperties {
  return {
    "--rt-color-primary": tokens.colorPrimary,
    "--rt-color-primary-dim": tokens.colorPrimaryDim,
    "--rt-color-accent": tokens.colorAccent,
    "--rt-color-ink": tokens.colorInk,
    "--rt-color-ink-soft": tokens.colorInkSoft,
    "--rt-color-surface": tokens.colorSurface,
    "--rt-color-surface-dim": tokens.colorSurfaceDim,
    "--rt-color-panel": tokens.colorPanel,
    "--rt-color-panel-text": tokens.colorPanelText,
    "--rt-color-line": tokens.colorLine,
    "--rt-radius-card": tokens.radiusCard,
    "--rt-font-display": `var(${tokens.displayFontVar})`,
  } as CSSProperties;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const config = getClientConfig();
  const tokens = resolveStyleTokens(config.style, config.styleOverrides);
  const displayFont = DISPLAY_FONTS[config.style];

  return (
    <html
      lang={config.languages[0]}
      className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable} h-full antialiased`}
      style={tokensToCssVars(tokens)}
    >
      <body className="flex min-h-full flex-col pb-16 sm:pb-0">
        <LangProvider languages={config.languages}>
          <PageViewTracker />
          <TopBar config={config} />
          <main className="flex-1">{children}</main>
          <Footer config={config} />
          <StickyMobileBar config={config} />
        </LangProvider>
      </body>
    </html>
  );
}
