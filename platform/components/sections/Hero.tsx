"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import type { RestaurantConfig } from "@/config/types";

export function Hero({ config }: { config: RestaurantConfig }) {
  const { t, pick } = useLang();
  const primaryLocation =
    config.locations.find((l) => l.id === config.primaryLocationId) ?? config.locations[0];

  return (
    <section className="px-5 pb-14 pt-12 text-center sm:pb-20 sm:pt-16">
      <div className="mx-auto mb-8 aspect-[16/10] max-w-2xl overflow-hidden rounded-card bg-surface-dim">
        <Image
          src={config.heroImage}
          alt={config.restaurantName}
          width={1200}
          height={750}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
        {config.restaurantName}
      </h1>
      <p className="mx-auto mt-5 max-w-[44ch] text-lg text-ink-soft">{pick(config.tagline)}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/menu" variant="primary">
          {t("hero.ctaMenu")}
        </Button>
        {config.reservation.enabled ? (
          <Button href="/prenota" variant="ghost">
            {t("hero.ctaReserve")}
          </Button>
        ) : (
          primaryLocation && (
            <Button href="#dove-siamo" variant="ghost">
              📍 {primaryLocation.area ?? primaryLocation.label}
            </Button>
          )
        )}
      </div>

      {primaryLocation && (
        <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-soft">
          📍 {primaryLocation.area ?? primaryLocation.label}
          {config.locations.length > 1 && ` · ${config.locations.length} SEDI`}
        </p>
      )}
    </section>
  );
}
