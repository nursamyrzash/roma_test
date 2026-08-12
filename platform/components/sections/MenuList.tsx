"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import type { RestaurantConfig } from "@/config/types";

/** The full, tabbed digital menu — the core product per spec §6. Used on /menu. */
export function MenuList({ config }: { config: RestaurantConfig }) {
  const { pick } = useLang();
  const [activeCategory, setActiveCategory] = useState(config.menuCategories[0]?.id);

  useEffect(() => {
    trackEvent("menu_view");
  }, []);

  if (config.menuCategories.length === 0) return null;

  const active = config.menuCategories.find((c) => c.id === activeCategory) ?? config.menuCategories[0];

  return (
    <section className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-2 flex flex-wrap gap-2" role="tablist">
        {config.menuCategories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={cat.id === active.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              cat.id === active.id
                ? "border-primary bg-primary text-white"
                : "border-line bg-surface text-ink-soft"
            }`}
          >
            {pick(cat.label)}
          </button>
        ))}
      </div>

      <div className="mt-5 border-t border-line">
        {active.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 border-b border-line py-4">
            <div>
              <div className="font-bold">{item.name}</div>
              {item.desc && <div className="mt-1 text-sm leading-relaxed text-ink-soft">{pick(item.desc)}</div>}
            </div>
            <div className="whitespace-nowrap font-mono font-bold text-primary">{item.price}</div>
          </div>
        ))}
      </div>

      {config.menuNote && (
        <p className="mt-5 font-mono text-xs text-ink-soft">{pick(config.menuNote)}</p>
      )}
    </section>
  );
}
