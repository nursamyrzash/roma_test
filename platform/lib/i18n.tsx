"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, LocalizedText } from "@/config/types";
import { pick } from "@/lib/text";

export { pick };

/**
 * Fixed app-chrome strings shared by every client (nav, buttons, labels).
 * Restaurant-specific copy (tagline, dish descriptions, etc) lives as
 * LocalizedText fields inside each RestaurantConfig instead — see pick().
 *
 * Only "it"/"en" are authored for now (ES is a later, config-driven
 * upgrade — adding "es" to a client's `languages` array surfaces the
 * button immediately, but chrome strings fall back to Italian via t()
 * until someone actually translates this dictionary).
 */
export type UIKey =
  | "nav.menu"
  | "nav.locations"
  | "nav.reserve"
  | "hero.ctaMenu"
  | "hero.ctaReserve"
  | "sticky.menu"
  | "sticky.reserve"
  | "sticky.locations"
  | "dishes.eyebrow"
  | "dishes.title"
  | "dishes.seeFullMenu"
  | "menu.title"
  | "location.openInMaps"
  | "location.walkIn"
  | "hours.title"
  | "hours.lastUpdated"
  | "hours.closed"
  | "day.mon"
  | "day.tue"
  | "day.wed"
  | "day.thu"
  | "day.fri"
  | "day.sat"
  | "day.sun"
  | "instagram.follow"
  | "social.follow"
  | "reservation.title"
  | "reservation.date"
  | "reservation.time"
  | "reservation.people"
  | "reservation.submit"
  | "reservation.call"
  | "reservation.callNote"
  | "reservation.demoSubmit"
  | "reservation.demoSuccess"
  | "reservation.walkInOnly"
  | "footer.privacy"
  | "footer.cookie"
  | "legal.pending";

export const UI_COPY: Record<"it" | "en", Record<UIKey, string>> = {
  it: {
    "nav.menu": "Menù",
    "nav.locations": "Sedi",
    "nav.reserve": "Prenota",
    "hero.ctaMenu": "Vedi il Menù",
    "hero.ctaReserve": "Prenota un Tavolo",
    "sticky.menu": "Menù",
    "sticky.reserve": "Prenota",
    "sticky.locations": "Dove Siamo",
    "dishes.eyebrow": "I Piatti",
    "dishes.title": "I Nostri Cavalli di Battaglia",
    "dishes.seeFullMenu": "Vedi Menù Completo",
    "menu.title": "Il Menù",
    "location.openInMaps": "Apri in Google Maps",
    "location.walkIn": "No Prenotazioni — Solo Walk-in",
    "hours.title": "Orari",
    "hours.lastUpdated": "Ultimo aggiornamento",
    "hours.closed": "Chiuso",
    "day.mon": "Lun",
    "day.tue": "Mar",
    "day.wed": "Mer",
    "day.thu": "Gio",
    "day.fri": "Ven",
    "day.sat": "Sab",
    "day.sun": "Dom",
    "instagram.follow": "Seguici su Instagram",
    "social.follow": "Seguici",
    "reservation.title": "Prenota il Tuo Tavolo",
    "reservation.date": "Data",
    "reservation.time": "Orario",
    "reservation.people": "Persone",
    "reservation.submit": "Prenota su WhatsApp",
    "reservation.call": "Chiama per Prenotare",
    "reservation.callNote": "Le prenotazioni vengono confermate direttamente dal ristorante per telefono.",
    "reservation.demoSubmit": "Richiedi disponibilità",
    "reservation.demoSuccess": "Richiesta demo ricevuta — nel sito reale verrebbe inviata al ristorante.",
    "reservation.walkInOnly": "Non prendiamo prenotazioni — basta presentarsi.",
    "footer.privacy": "Privacy Policy",
    "footer.cookie": "Cookie Policy",
    "legal.pending": "Testo legale in preparazione — da confermare prima della pubblicazione.",
  },
  en: {
    "nav.menu": "Menu",
    "nav.locations": "Locations",
    "nav.reserve": "Reserve",
    "hero.ctaMenu": "View the Menu",
    "hero.ctaReserve": "Reserve a Table",
    "sticky.menu": "Menu",
    "sticky.reserve": "Reserve",
    "sticky.locations": "Location",
    "dishes.eyebrow": "House Favorites",
    "dishes.title": "Our Signature Dishes",
    "dishes.seeFullMenu": "See Full Menu",
    "menu.title": "The Menu",
    "location.openInMaps": "Open in Google Maps",
    "location.walkIn": "No Reservations — Walk-in Only",
    "hours.title": "Opening Hours",
    "hours.lastUpdated": "Last updated",
    "hours.closed": "Closed",
    "day.mon": "Mon",
    "day.tue": "Tue",
    "day.wed": "Wed",
    "day.thu": "Thu",
    "day.fri": "Fri",
    "day.sat": "Sat",
    "day.sun": "Sun",
    "instagram.follow": "Follow us on Instagram",
    "social.follow": "Follow us",
    "reservation.title": "Reserve Your Table",
    "reservation.date": "Date",
    "reservation.time": "Time",
    "reservation.people": "People",
    "reservation.submit": "Reserve via WhatsApp",
    "reservation.call": "Call to Reserve",
    "reservation.callNote": "Reservations are confirmed directly by the restaurant by phone.",
    "reservation.demoSubmit": "Request availability",
    "reservation.demoSuccess": "Demo request received — on the live site it would be sent to the restaurant.",
    "reservation.walkInOnly": "We don't take reservations — just walk in.",
    "footer.privacy": "Privacy Policy",
    "footer.cookie": "Cookie Policy",
    "legal.pending": "Legal text pending — confirm before publishing.",
  },
};


interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  availableLanguages: Lang[];
  t: (key: UIKey) => string;
  pick: (text: LocalizedText | undefined) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "roma-tavola-lang";

export function LangProvider({
  languages,
  children,
}: {
  languages: Lang[];
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(languages[0]);

  useEffect(() => {
    // Restoring a persisted preference after mount (localStorage is
    // unavailable during SSR, so this can't be a lazy initial state
    // without causing a hydration mismatch).
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored && languages.includes(stored)) setLangState(stored);
  }, [languages]);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const value: LangContextValue = {
    lang,
    setLang,
    availableLanguages: languages,
    t: (key: UIKey) => UI_COPY[lang === "es" ? "it" : lang]?.[key] ?? UI_COPY.it[key],
    pick: (text) => pick(text, lang),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang() must be used within a <LangProvider>");
  return ctx;
}
