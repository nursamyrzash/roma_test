"use client";

import { useLang, type UIKey } from "@/lib/i18n";
import type { RestaurantConfig, DayKey } from "@/config/types";

const DAY_KEYS: Record<DayKey, UIKey> = {
  mon: "day.mon",
  tue: "day.tue",
  wed: "day.wed",
  thu: "day.thu",
  fri: "day.fri",
  sat: "day.sat",
  sun: "day.sun",
};

export function HoursTable({ config }: { config: RestaurantConfig }) {
  const { t } = useLang();
  if (config.openingHours.length === 0) return null;

  return (
    <section className="mx-auto max-w-md px-5 py-14">
      <h2 className="mb-6 text-center font-display text-2xl uppercase">{t("hours.title")}</h2>
      <table className="w-full text-sm">
        <tbody>
          {config.openingHours.map((row) => (
            <tr key={row.dayKey} className="border-b border-line">
              <td className="py-2.5 font-semibold">{t(DAY_KEYS[row.dayKey])}</td>
              <td className="py-2.5 text-right font-mono text-ink-soft">{row.hours || t("hours.closed")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-center font-mono text-xs text-ink-soft">
        {t("hours.lastUpdated")}: {config.hoursLastUpdated}
      </p>
    </section>
  );
}
