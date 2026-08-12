"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { RestaurantConfig } from "@/config/types";

export function InstagramTeaser({ config }: { config: RestaurantConfig }) {
  const { t } = useLang();
  if (!config.social.instagram || !config.instagramTeaserImages?.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 text-center">
      <h2 className="mb-6 font-display text-2xl uppercase">{t("instagram.follow")}</h2>
      <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {config.instagramTeaserImages.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-card bg-surface-dim">
            <Image src={src} alt="" fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
      <TrackedLink
        event="instagram_click"
        href={config.social.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-card border border-ink px-5 py-3 text-sm font-bold uppercase hover:border-primary hover:text-primary"
      >
        {config.social.instagram.handle}
      </TrackedLink>
    </section>
  );
}
