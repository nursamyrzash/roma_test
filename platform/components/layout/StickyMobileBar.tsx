"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { RestaurantConfig } from "@/config/types";

/**
 * Mobile-only quick actions, hidden on desktop (spec §3). Second slot
 * adapts to reservation.enabled so it's never a dead/meaningless button —
 * Tonnarello (walk-in only) gets "Dove Siamo" instead of "Prenota".
 */
export function StickyMobileBar({ config }: { config: RestaurantConfig }) {
  const { t } = useLang();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-surface shadow-[0_-6px_20px_-10px_rgba(0,0,0,0.25)] sm:hidden">
      <Link
        href="/menu"
        className="flex flex-1 items-center justify-center gap-2 border-r border-line py-3.5 text-sm font-bold uppercase text-ink"
      >
        🍽 {t("sticky.menu")}
      </Link>
      {config.reservation.enabled ? (
        <Link
          href="/prenota"
          className="flex flex-1 items-center justify-center gap-2 bg-primary py-3.5 text-sm font-bold uppercase text-white"
        >
          💬 {t("sticky.reserve")}
        </Link>
      ) : (
        <a
          href="#dove-siamo"
          className="flex flex-1 items-center justify-center gap-2 bg-primary py-3.5 text-sm font-bold uppercase text-white"
        >
          📍 {t("sticky.locations")}
        </a>
      )}
    </div>
  );
}
