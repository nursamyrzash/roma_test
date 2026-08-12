"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { RestaurantConfig } from "@/config/types";

export function LocationSection({ config }: { config: RestaurantConfig }) {
  const { t, pick } = useLang();
  const [activeId, setActiveId] = useState(config.primaryLocationId ?? config.locations[0]?.id);
  if (config.locations.length === 0) return null;

  const active = config.locations.find((l) => l.id === activeId) ?? config.locations[0];
  const multi = config.locations.length > 1;

  return (
    <section id="dove-siamo" className="mx-auto max-w-3xl px-5 py-14">
      <SectionHeading title={t("nav.locations")} center={!multi} />

      {multi && (
        <div className="mb-6 flex flex-wrap gap-2">
          {config.locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveId(loc.id)}
              className={`rounded-card border px-3.5 py-2 text-left text-sm font-semibold ${
                loc.id === active.id ? "border-panel bg-panel text-panel-text" : "border-line text-ink-soft"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-card border border-line bg-surface p-6">
        {active.area && (
          <div className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{active.area}</div>
        )}
        <address className="not-italic text-lg font-semibold">{active.address}</address>
        <div className="mt-3 font-mono text-sm text-ink-soft">🕐 {active.hours}</div>
        {active.walkInOnly && (
          <div className="mt-2 text-sm font-semibold text-primary">
            🚶 {pick(active.walkInNote) || t("location.walkIn")}
          </div>
        )}
        {active.landmarks && active.landmarks.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1 text-sm text-ink-soft">
            {active.landmarks.map((l, i) => (
              <li key={i}>📍 {pick(l)}</li>
            ))}
          </ul>
        )}
        <TrackedLink
          event="maps_click"
          href={active.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-card bg-panel px-5 py-3 text-sm font-bold uppercase text-panel-text"
        >
          {t("location.openInMaps")}
        </TrackedLink>
      </div>
    </section>
  );
}
