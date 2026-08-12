import type { RestaurantConfig } from "@/config/types";
import { buildGoogleMapsUrl } from "@/lib/maps";

/**
 * Real client — data ported from tonnarello-redesign.html (built from
 * tonnarello.it's real published info: 6 locations, walk-in-only policy,
 * PDF-only menus, real dish/menu names). Menu prices are placeholders
 * (never had access to the real PDF pricing) — flagged via menuNote,
 * must be confirmed before this goes out for real outreach. reservation
 * is intentionally OFF: Tonnarello takes no phone/email/web bookings, so
 * this config exercises the walk-in-only branch of the schema (no
 * Prenota CTA anywhere, /prenota renders the walk-in explainer).
 */
function loc(id: string, label: string, area: string, address: string, hours: string) {
  return {
    id,
    label,
    area,
    address,
    googleMapsUrl: buildGoogleMapsUrl(address),
    hours,
    walkInOnly: true,
    walkInNote: {
      it: "No Reservation, Just Walk in",
      en: "No Reservation, Just Walk In",
    },
  };
}

export const tonnarello: RestaurantConfig = {
  id: "tonnarello",
  restaurantName: "Tonnarello",
  legalName: "Tonnarello in Trastevere",
  tagline: {
    it: "Pasta fatta in casa e cucina romana autentica. Niente prenotazioni, niente fretta — solo un tavolo che ti aspetta.",
    en: "House-made pasta and authentic Roman cooking. No bookings, no rush — just a table waiting for you.",
  },
  logo: "/clients/tonnarello/logo.png",
  heroImage: "/clients/tonnarello/hero.png",
  deployedUrl: "https://tonnarello.romatavola.app",

  style: "roman-classic",
  styleOverrides: {
    // Distinct from Osteria da Mario within the same style bucket, per
    // the existing rule against every client looking templated.
    primaryColor: "#C1361D",
    accentColor: "#E3A73B",
  },
  languages: ["it", "en"],

  locations: [
    loc("via-della-paglia-1-3", "Via della Paglia 1–3", "Trastevere", "Via della Paglia, 1/2/3, 00153 Roma RM", "Lun–Dom: 11:30–23:00"),
    loc("piazza-della-scala", "Piazza della Scala", "Trastevere", "Piazza della Scala, 19–21, 00153 Roma", "Lun–Dom: 11:30–23:00"),
    loc("via-del-mascherino", "Via del Mascherino", "Borgo", "Via del Mascherino, 80, 00193 Roma", "Lun–Dom: 11:30–23:00"),
    loc("piazza-san-calisto", "Piazza San Calisto", "Trastevere", "Piazza San Calisto 10, 00153 Roma", "Lun–Dom: 11:30–23:00"),
    loc("via-della-paglia-40", "Via della Paglia 40", "Trastevere · Bistrot", "Via della Paglia 40, 00153 Roma", "Ven–Dom: 11:30–02:00"),
    loc("santa-prassede", "Santa Prassede", "Esquilino", "Via di Santa Prassede 9/C, 00184 Roma RM", "Lun–Dom: 10:00–23:00"),
  ],
  primaryLocationId: "via-della-paglia-1-3",

  // Hours vary by location (see locations[].hours) more than they do by
  // day-of-week, so this table reflects the primary location's pattern.
  openingHours: [
    { dayKey: "mon", hours: "11:30–23:00" },
    { dayKey: "tue", hours: "11:30–23:00" },
    { dayKey: "wed", hours: "11:30–23:00" },
    { dayKey: "thu", hours: "11:30–23:00" },
    { dayKey: "fri", hours: "11:30–23:00" },
    { dayKey: "sat", hours: "11:30–23:00" },
    { dayKey: "sun", hours: "11:30–23:00" },
  ],
  hoursLastUpdated: "2026-08-13",

  whyUs: [
    {
      icon: "🍝",
      title: { it: "Cucina Romanesca", en: "Roman Cooking" },
      body: {
        it: "Tonnarelli, saltimbocca, abbacchio: i classici della tradizione, fatti come si deve.",
        en: "Tonnarelli, saltimbocca, abbacchio — the classics, done properly.",
      },
    },
    {
      icon: "🍷",
      title: { it: "Sei Sedi a Roma", en: "Six Locations in Rome" },
      body: {
        it: "Spazio per grandi gruppi, coppie o una cena veloce tra amici.",
        en: "Room for big groups, a couple, or a quick dinner with friends.",
      },
    },
    {
      icon: "📍",
      title: { it: "Nel Cuore di Trastevere", en: "Heart of Trastevere" },
      body: {
        it: "A pochi passi da Piazza Santa Maria e dai vicoli più belli di Roma.",
        en: "Steps from Piazza Santa Maria and Rome's prettiest backstreets.",
      },
    },
  ],

  signatureDishes: [
    {
      id: "tonnarelli",
      name: "Tonnarelli",
      desc: { it: "La pasta fatta in casa che dà il nome alla trattoria", en: "The house-made pasta the trattoria is named after" },
      price: "€13",
      flag: "SIGNATURE",
      image: "/clients/tonnarello/dishes/tonnarelli.png",
    },
    {
      id: "saltimbocca",
      name: "Saltimbocca alla Romana",
      desc: { it: "Vitello, prosciutto crudo, salvia", en: "Veal, cured ham, sage" },
      price: "€17",
      image: "/clients/tonnarello/dishes/saltimbocca.png",
    },
    {
      id: "abbacchio",
      name: "Abbacchio",
      desc: { it: "Agnello romano, alla griglia o scottadito", en: "Roman lamb, grilled" },
      price: "€18",
      image: "/clients/tonnarello/dishes/abbacchio.png",
    },
    {
      id: "tiramisu",
      name: "Tiramisù della Casa",
      desc: { it: "La ricetta di cui tutti parlano", en: "The recipe everyone talks about" },
      price: "€7",
      image: "/clients/tonnarello/dishes/tiramisu.png",
    },
  ],

  menuCategories: [
    {
      id: "antipasti",
      label: { it: "Antipasti", en: "Starters" },
      items: [
        { id: "supplì-al-telefono", name: "Supplì al Telefono", desc: { it: "Riso, ragù, mozzarella filante", en: "Rice, ragù, melted mozzarella" }, price: "€6" },
        { id: "bruschetta-romana", name: "Bruschetta Romana", desc: { it: "Pomodoro fresco, aglio, basilico", en: "Fresh tomato, garlic, basil" }, price: "€6" },
      ],
    },
    {
      id: "primi",
      label: { it: "Primi", en: "First Courses" },
      items: [
        { id: "cacio-e-pepe", name: "Tonnarelli Cacio e Pepe", desc: { it: "Pasta fatta in casa, pecorino, pepe nero", en: "House-made pasta, pecorino, black pepper" }, price: "€13" },
        { id: "carbonara", name: "Tonnarelli alla Carbonara", desc: { it: "Guanciale, uovo, pecorino romano", en: "Guanciale, egg, pecorino romano" }, price: "€14" },
        { id: "amatriciana", name: "Amatriciana", desc: { it: "Guanciale, pomodoro, pecorino", en: "Guanciale, tomato, pecorino" }, price: "€13" },
      ],
    },
    {
      id: "secondi",
      label: { it: "Secondi", en: "Main Courses" },
      items: [
        { id: "saltimbocca-menu", name: "Saltimbocca alla Romana", desc: { it: "Vitello, prosciutto crudo, salvia", en: "Veal, cured ham, sage" }, price: "€17" },
        { id: "coda-alla-vaccinara", name: "Coda alla Vaccinara", desc: { it: "Stufato romano, cottura lenta", en: "Slow-braised Roman oxtail" }, price: "€16" },
        { id: "abbacchio-scottadito", name: "Abbacchio Scottadito", desc: { it: "Costolette d'agnello alla griglia", en: "Grilled lamb chops" }, price: "€18" },
      ],
    },
    {
      id: "dolci",
      label: { it: "Dolci", en: "Desserts" },
      items: [
        { id: "tiramisu-menu", name: "Tiramisù della Casa", desc: { it: "Ricetta della casa", en: "House recipe" }, price: "€7" },
        { id: "panna-cotta", name: "Panna Cotta", desc: { it: "Con frutti di bosco", en: "With mixed berries" }, price: "€6" },
      ],
    },
  ],
  menuNote: {
    it: "Prezzi indicativi — da confermare con il menù ufficiale prima della pubblicazione.",
    en: "Indicative pricing — to be confirmed against the official menu before going live.",
  },

  reservation: {
    enabled: false,
  },

  social: {
    facebook: "https://www.facebook.com/tonnarelloroma/",
    tripadvisor: "https://www.tripadvisor.it/Restaurant_Review-g187791-d13443832-Reviews-Tonnarello-Rome_Lazio.html",
  },

  seo: {
    title: {
      it: "Tonnarello — Trastevere, Roma",
      en: "Tonnarello — Trastevere, Rome",
    },
    description: {
      it: "Pasta fatta in casa e cucina romana autentica in 6 sedi a Roma. Solo walk-in, niente prenotazioni.",
      en: "House-made pasta and authentic Roman cooking across 6 Rome locations. Walk-in only, no reservations.",
    },
  },

  legal: {},
};
