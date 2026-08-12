import type { Lang, LocalizedText } from "@/config/types";

/** Resolves a restaurant-content field for the current language, falling back to Italian. No React/client dependency — safe to call from Server Components (e.g. generateMetadata). */
export function pick(text: LocalizedText | undefined, lang: Lang): string {
  if (!text) return "";
  return text[lang] ?? text.it;
}
