"use client";

import { useLang } from "@/lib/i18n";
import type { RestaurantConfig } from "@/config/types";

export function WhyUs({ config }: { config: RestaurantConfig }) {
  const { pick } = useLang();
  if (config.whyUs.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <div className="grid gap-5 sm:grid-cols-3">
        {config.whyUs.map((card, i) => (
          <div key={i} className="rounded-card border border-line bg-surface p-6">
            <div className="mb-3 text-2xl">{card.icon}</div>
            <h3 className="font-display text-lg uppercase">{pick(card.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(card.body)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
