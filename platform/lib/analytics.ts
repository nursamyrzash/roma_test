export type AnalyticsEvent =
  | "page_view"
  | "menu_view"
  | "whatsapp_click"
  | "maps_click"
  | "phone_click"
  | "instagram_click";

type AnalyticsProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
    gtag?: (command: "event", event: string, props?: AnalyticsProps) => void;
  }
}

/**
 * Backend-agnostic event sink. No script tag is injected yet — wiring a
 * real backend later (Plausible/GA4) is one <Script> in app/layout.tsx
 * plus config.analytics, with zero changes to any call site below.
 */
export function trackEvent(event: AnalyticsEvent, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible(event, { props });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", event, props);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props);
  }
}
