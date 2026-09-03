"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { LangSwitch } from "@/components/ui/LangSwitch";
import type { RestaurantConfig } from "@/config/types";

export function TopBar({ config }: { config: RestaurantConfig }) {
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-line bg-surface/90 px-5 py-4 backdrop-blur">
      <Link href="/" className="flex items-center gap-2.5 font-display text-xl uppercase tracking-wide text-ink">
        {config.logo && (
          <Image src={config.logo} alt="" width={32} height={32} className="rounded-card object-cover" />
        )}
        {config.restaurantName}
      </Link>
      <nav className="flex items-center gap-6">
        <div className="hidden items-center gap-6 text-sm font-semibold text-ink-soft sm:flex">
          <Link href="/menu" className="hover:text-primary">
            {t("nav.menu")}
          </Link>
          {config.premium && (
            <Link href="/#esperienza" className="hover:text-primary">
              {config.languages[0] === "it" ? "Esperienza" : "Experience"}
            </Link>
          )}
          {config.locations.length > 0 && (
            <a href="#dove-siamo" className="hover:text-primary">
              {t("nav.locations")}
            </a>
          )}
          {config.reservation.enabled && (
            <Link href="/prenota" className="hover:text-primary">
              {t("nav.reserve")}
            </Link>
          )}
        </div>
        <LangSwitch />
      </nav>
    </header>
  );
}
