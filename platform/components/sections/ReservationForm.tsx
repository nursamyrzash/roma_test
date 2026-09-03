"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { buildReservationLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import type { RestaurantConfig } from "@/config/types";

/**
 * Generates a pre-filled wa.me deep link — intentionally not an automated
 * booking system (spec §8: restaurant confirms manually via WhatsApp).
 * Only rendered when config.reservation.enabled; the walk-in fallback for
 * disabled clients lives in app/prenota/page.tsx instead.
 */
export function ReservationForm({ config }: { config: RestaurantConfig }) {
  const { t, lang } = useLang();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("20:00");
  const [people, setPeople] = useState("2");
  const [demoSent, setDemoSent] = useState(false);

  if (config.reservation.channel === "phone") {
    return (
      <section className="mx-auto max-w-md px-5 py-10 text-center">
        <h2 className="mb-3 font-display text-2xl uppercase">{t("reservation.title")}</h2>
        <p className="mb-6 text-ink-soft">{t("reservation.callNote")}</p>
        {config.phone && (
          <a
            href={`tel:${config.phone}`}
            onClick={() => trackEvent("phone_click", { source: "reservation_section" })}
            className="inline-flex rounded-card bg-primary px-6 py-3.5 text-sm font-bold uppercase text-white transition-transform hover:-translate-y-0.5"
          >
            📞 {t("reservation.call")} · {config.phone}
          </a>
        )}
      </section>
    );
  }

  function formatDate(iso: string): string {
    if (!iso) return "";
    const parsed = new Date(`${iso}T00:00:00`);
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "it-IT", {
      day: "numeric",
      month: "long",
    }).format(parsed);
  }

  return (
    <section className="mx-auto max-w-md px-5 py-10">
      <h2 className="mb-6 font-display text-2xl uppercase">{t("reservation.title")}</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (config.reservation.channel === "demo") {
            setDemoSent(true);
            return;
          }
          const link = buildReservationLink(
            config.reservation,
            { people, date: formatDate(date) || date, time },
            lang
          );
          if (!link) return;
          trackEvent("whatsapp_click", { source: "reservation_form" });
          window.open(link, "_blank", "noopener,noreferrer");
        }}
      >
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-soft">
          {t("reservation.date")}
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-card border border-line bg-surface px-4 py-3 text-ink"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-soft">
          {t("reservation.time")}
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-card border border-line bg-surface px-4 py-3 text-ink"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-soft">
          {t("reservation.people")}
          <input
            type="number"
            min={1}
            max={20}
            required
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="rounded-card border border-line bg-surface px-4 py-3 text-ink"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-card bg-primary px-6 py-3.5 text-sm font-bold uppercase text-white transition-transform hover:-translate-y-0.5"
        >
          {config.reservation.channel === "demo" ? `✦ ${t("reservation.demoSubmit")}` : `💬 ${t("reservation.submit")}`}
        </button>
        {demoSent && <p className="text-center text-sm font-semibold text-primary">{t("reservation.demoSuccess")}</p>}
      </form>
    </section>
  );
}
