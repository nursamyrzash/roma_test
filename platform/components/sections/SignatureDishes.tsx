"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { RestaurantConfig } from "@/config/types";

export function SignatureDishes({ config }: { config: RestaurantConfig }) {
  const { t, pick } = useLang();
  if (config.signatureDishes.length === 0) return null;

  return (
    <section id="piatti" className="mx-auto max-w-3xl px-5 py-14">
      <SectionHeading eyebrow={t("dishes.eyebrow")} title={t("dishes.title")} center />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {config.signatureDishes.map((dish) => (
          <div key={dish.id} className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="relative aspect-[4/3] bg-surface-dim">
              <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
              {dish.flag && (
                <span className="absolute left-2 top-2 rounded bg-panel px-2 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-panel-text">
                  {dish.flag}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-display text-base uppercase">{dish.name}</h3>
              {dish.desc && <p className="mt-1 text-sm leading-snug text-ink-soft">{pick(dish.desc)}</p>}
              <div className="mt-3 border-t border-dashed border-line pt-2.5 font-mono text-sm font-bold text-primary">
                {dish.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button href="/menu" variant="ghost">
          {t("dishes.seeFullMenu")}
        </Button>
      </div>
    </section>
  );
}
