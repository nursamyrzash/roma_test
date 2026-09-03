"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { RestaurantConfig } from "@/config/types";

export function Footer({ config }: { config: RestaurantConfig }) {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const primaryLocation =
    config.locations.find((l) => l.id === config.primaryLocationId) ?? config.locations[0];

  return (
    <footer className="border-t border-line bg-surface-dim px-5 py-12">
      <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
        <div>
          <h4 className="font-display text-lg uppercase">{config.restaurantName}</h4>
          {primaryLocation && <p className="mt-2 text-sm text-ink-soft">{primaryLocation.address}</p>}
          {config.phone && (
            <TrackedLink event="phone_click" href={`tel:${config.phone}`} className="mt-1 block text-sm text-ink-soft hover:text-primary">
              📞 {config.phone}
            </TrackedLink>
          )}
          {config.email && (
            <p className="mt-1 text-sm text-ink-soft">
              <a href={`mailto:${config.email}`} className="hover:text-primary">
                ✉️ {config.email}
              </a>
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-ink-soft">{t("nav.menu")}</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/menu" className="hover:text-primary">
                {t("nav.menu")}
              </Link>
            </li>
            {config.reservation.enabled && (
              <li>
                <Link href="/prenota" className="hover:text-primary">
                  {t("nav.reserve")}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-ink-soft">{t("social.follow")}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {config.social.instagram && (
              <li>
                <TrackedLink
                  event="instagram_click"
                  href={config.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {config.social.instagram.handle}
                </TrackedLink>
              </li>
            )}
            {config.social.facebook && (
              <li>
                <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Facebook
                </a>
              </li>
            )}
            {config.social.tripadvisor && (
              <li>
                <a href={config.social.tripadvisor} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  TripAdvisor
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-between gap-2 border-t border-line pt-5 text-xs text-ink-soft">
        <span>
          © {year} {config.legalName ?? config.restaurantName}
        </span>
        <span>
          <Link href="/privacy" className="hover:text-primary">
            {t("footer.privacy")}
          </Link>
          {" · "}
          <Link href="/cookie" className="hover:text-primary">
            {t("footer.cookie")}
          </Link>
        </span>
      </div>
    </footer>
  );
}
