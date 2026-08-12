"use client";

import { useLang, type UIKey } from "@/lib/i18n";
import type { LocalizedText } from "@/config/types";

/**
 * Renders real legal content if a client has supplied it; otherwise a
 * clearly-flagged placeholder — never fabricated filler text standing in
 * for privacy/cookie policy (spec §11 treats this as real content to get
 * right, not decoration).
 */
export function LegalPage({ titleKey, content }: { titleKey: UIKey; content?: LocalizedText }) {
  const { t, pick } = useLang();
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="mb-6 font-display text-2xl uppercase">{t(titleKey)}</h1>
      {content ? (
        <p className="whitespace-pre-line leading-relaxed text-ink-soft">{pick(content)}</p>
      ) : (
        <p className="rounded-card border border-dashed border-line bg-surface-dim p-5 text-sm font-semibold text-primary">
          ⚠️ {t("legal.pending")}
        </p>
      )}
    </div>
  );
}
