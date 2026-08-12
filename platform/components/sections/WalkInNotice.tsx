"use client";

import { useLang } from "@/lib/i18n";
import { LocationSection } from "@/components/sections/LocationSection";
import { HoursTable } from "@/components/sections/HoursTable";
import type { RestaurantConfig } from "@/config/types";

/** Shown at /prenota for walk-in-only clients (reservation.enabled=false) — never a dead page. */
export function WalkInNotice({ config }: { config: RestaurantConfig }) {
  const { t } = useLang();
  return (
    <div>
      <div className="mx-auto max-w-md px-5 pt-10 text-center">
        <h1 className="mb-3 font-display text-2xl uppercase">{t("location.walkIn")}</h1>
        <p className="text-ink-soft">{t("reservation.walkInOnly")}</p>
      </div>
      <LocationSection config={config} />
      <HoursTable config={config} />
    </div>
  );
}
