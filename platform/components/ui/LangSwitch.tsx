"use client";

import { useLang } from "@/lib/i18n";

const LABELS: Record<string, string> = { it: "IT", en: "EN", es: "ES" };

export function LangSwitch() {
  const { lang, setLang, availableLanguages } = useLang();
  if (availableLanguages.length < 2) return null;

  return (
    <div role="group" aria-label="Language" className="flex gap-0.5 font-mono text-xs">
      {availableLanguages.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
          className={`rounded-card border px-2.5 py-1.5 ${
            l === lang ? "border-primary bg-primary text-white" : "border-line text-ink-soft"
          }`}
        >
          {LABELS[l] ?? l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
