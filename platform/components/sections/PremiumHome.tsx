"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { LocationSection } from "@/components/sections/LocationSection";
import type { RestaurantConfig } from "@/config/types";

export function PremiumHome({ config }: { config: RestaurantConfig }) {
  const { pick, lang } = useLang();
  const premium = config.premium;
  if (!premium) return null;

  const labels = lang === "en"
    ? { discover: "Discover the experience", chef: "Executive Chef", menus: "Tasting journeys", gallery: "Inside Velaria", menu: "Explore the menu", reserve: "Reserve your table", fictional: "Fictional premium concept by Grandenes" }
    : { discover: "Scopri l’esperienza", chef: "Executive Chef", menus: "Percorsi degustazione", gallery: "Dentro Velaria", menu: "Scopri il menù", reserve: "Prenota il tuo tavolo", fictional: "Concept premium immaginario di Grandenes" };

  return (
    <div className="bg-surface text-ink">
      <section className="relative min-h-[82vh] overflow-hidden">
        <Image src={config.heroImage} alt={config.restaurantName} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col items-center justify-end px-6 pb-16 text-center text-white sm:pb-24">
          <div className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-white/75">{labels.fictional}</div>
          <h1 className="font-display text-6xl uppercase leading-none tracking-[0.08em] sm:text-8xl">{config.restaurantName}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{pick(config.tagline)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#esperienza" className="rounded-card bg-white px-6 py-3 text-sm font-bold uppercase text-black">{labels.discover}</a>
            <Link href="/prenota" className="rounded-card border border-white/70 px-6 py-3 text-sm font-bold uppercase text-white">{labels.reserve}</Link>
          </div>
        </div>
      </section>

      <section id="esperienza" className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{pick(premium.conceptLabel)}</div>
        <p className="mx-auto mt-8 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">{pick(premium.introduction)}</p>
      </section>

      <section className="bg-surface-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image src={premium.chefImage} alt={premium.chefName} fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" />
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{labels.chef}</div>
            <h2 className="mt-5 font-display text-4xl uppercase sm:text-6xl">{premium.chefName}</h2>
            <p className="mt-3 text-lg text-ink-soft">{pick(premium.chefTitle)}</p>
            <p className="mt-8 max-w-xl leading-8 text-ink-soft">{pick(premium.chefBio)}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{pick(premium.philosophyTitle)}</div>
          <p className="mt-6 font-display text-3xl leading-tight sm:text-5xl">{pick(premium.philosophyBody)}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {config.signatureDishes.slice(0, 3).map((dish) => (
            <article key={dish.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-card bg-surface-dim">
                <Image src={dish.image} alt={dish.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width:768px) 33vw, 100vw" />
              </div>
              <h3 className="mt-5 font-display text-2xl uppercase">{dish.name}</h3>
              <p className="mt-2 leading-6 text-ink-soft">{pick(dish.desc)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-panel py-24 text-panel-text sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{labels.menus}</div>
          <div className="mt-12 grid gap-px bg-white/20 md:grid-cols-2">
            {premium.tastingMenus.map((menu) => (
              <div key={pick(menu.name)} className="bg-panel px-8 py-12">
                <h3 className="font-display text-3xl uppercase">{pick(menu.name)}</h3>
                <p className="mt-3 text-panel-text/65">{pick(menu.courses)}</p>
                <p className="mt-6 font-mono text-lg text-accent">{menu.price}</p>
              </div>
            ))}
          </div>
          <Link href="/menu" className="mt-10 inline-flex border-b border-accent pb-2 text-sm font-bold uppercase tracking-widest text-accent">{labels.menu}</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[480px]">
          <Image src={premium.wineImage} alt={pick(premium.wineTitle)} fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" />
        </div>
        <div className="flex items-center bg-surface-dim px-8 py-20 sm:px-16">
          <div className="max-w-xl">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{pick(premium.wineTitle)}</div>
            <p className="mt-6 font-display text-3xl leading-tight sm:text-5xl">{pick(premium.wineBody)}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl uppercase sm:text-6xl">{labels.gallery}</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Roma · Centro Storico</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {premium.galleryImages.map((image) => (
            <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image src={image.src} alt={pick(image.alt)} fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      </section>

      <div className="bg-surface-dim py-14"><ReservationForm config={config} /></div>
      <LocationSection config={config} />
    </div>
  );
}
