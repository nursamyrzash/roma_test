import type { RestaurantConfig } from "@/config/types";
import { buildGoogleMapsUrl } from "@/lib/maps";

/**
 * Fictional reference client — Roman-classic style, single location,
 * reservations ON. Exists to exercise the schema's "everything enabled"
 * path (opposite of Tonnarello's multi-location/walk-in-only path) so the
 * architecture is proven against both branches before a real second
 * paying client is onboarded. All contact details below are placeholders
 * — swap for a real prospect's info before ever sending this out.
 */
const address = "Via della Scala 12, 00153 Roma RM";

export const osteriaDaMario: RestaurantConfig = {
  id: "osteria-da-mario",
  restaurantName: "Osteria da Mario",
  tagline: {
    it: "Cucina romana nel cuore di Trastevere",
    en: "Roman cooking in the heart of Trastevere",
  },
  logo: "/clients/osteria-da-mario/logo.png",
  heroImage: "/clients/osteria-da-mario/hero.png",
  deployedUrl: "https://osteria-da-mario.romatavola.app",

  style: "roman-classic",
  languages: ["it", "en"],

  phone: "+39 06 000 0000",
  whatsapp: "+39 000 000 0000",
  email: "info@osteriadamario.example",

  locations: [
    {
      id: "trastevere",
      label: "Trastevere",
      address,
      googleMapsUrl: buildGoogleMapsUrl(address),
      hours: "Mar–Dom: 12:00–15:00 / 19:00–23:00",
      landmarks: [
        { it: "5 min da Piazza Santa Maria in Trastevere", en: "5 min from Piazza Santa Maria in Trastevere" },
        { it: "10 min dal Colosseo in auto", en: "10 min from the Colosseum by car" },
      ],
    },
  ],
  primaryLocationId: "trastevere",

  openingHours: [
    { dayKey: "mon", hours: "" },
    { dayKey: "tue", hours: "12:00–15:00 / 19:00–23:00" },
    { dayKey: "wed", hours: "12:00–15:00 / 19:00–23:00" },
    { dayKey: "thu", hours: "12:00–15:00 / 19:00–23:00" },
    { dayKey: "fri", hours: "12:00–15:00 / 19:00–23:30" },
    { dayKey: "sat", hours: "12:00–15:00 / 19:00–23:30" },
    { dayKey: "sun", hours: "12:00–15:30 / 19:00–23:00" },
  ],
  hoursLastUpdated: "2026-08-13",

  whyUs: [
    {
      icon: "🍝",
      title: { it: "Cucina Romana", en: "Roman Cooking" },
      body: {
        it: "Carbonara, amatriciana, cacio e pepe — fatti come si deve, ogni giorno.",
        en: "Carbonara, amatriciana, cacio e pepe — done properly, every day.",
      },
    },
    {
      icon: "🍷",
      title: { it: "Ingredienti Italiani", en: "Italian Ingredients" },
      body: {
        it: "Prodotti selezionati da piccoli produttori locali.",
        en: "Products sourced from small local producers.",
      },
    },
    {
      icon: "📍",
      title: { it: "Nel Cuore di Roma", en: "Heart of Rome" },
      body: {
        it: "A pochi passi da Piazza Santa Maria in Trastevere.",
        en: "Steps from Piazza Santa Maria in Trastevere.",
      },
    },
  ],

  signatureDishes: [
    {
      id: "carbonara",
      name: "Carbonara",
      desc: { it: "Guanciale, pecorino romano, uova e pepe nero", en: "Guanciale, pecorino romano, egg and black pepper" },
      price: "€14",
      flag: "SIGNATURE",
      image: "/clients/osteria-da-mario/dishes/carbonara.png",
    },
    {
      id: "cacio-e-pepe",
      name: "Cacio e Pepe",
      desc: { it: "Pasta fresca, pecorino romano, pepe nero", en: "Fresh pasta, pecorino romano, black pepper" },
      price: "€13",
      image: "/clients/osteria-da-mario/dishes/cacio-e-pepe.png",
    },
    {
      id: "saltimbocca",
      name: "Saltimbocca alla Romana",
      desc: { it: "Vitello, prosciutto crudo, salvia", en: "Veal, cured ham, sage" },
      price: "€17",
      image: "/clients/osteria-da-mario/dishes/saltimbocca.png",
    },
    {
      id: "tiramisu",
      name: "Tiramisù della Casa",
      desc: { it: "Ricetta della casa", en: "House recipe" },
      price: "€7",
      image: "/clients/osteria-da-mario/dishes/tiramisu.png",
    },
  ],

  menuCategories: [
    {
      id: "antipasti",
      label: { it: "Antipasti", en: "Starters" },
      items: [
        { id: "bruschetta", name: "Bruschetta al Pomodoro", desc: { it: "Pomodoro fresco, aglio, basilico", en: "Fresh tomato, garlic, basil" }, price: "€7" },
        { id: "fiori-di-zucca", name: "Fiori di Zucca", desc: { it: "Fritti, ripieni di mozzarella e acciuga", en: "Fried, stuffed with mozzarella and anchovy" }, price: "€9" },
        { id: "suppli", name: "Supplì Romano", desc: { it: "Riso, ragù, mozzarella filante", en: "Rice, ragù, melted mozzarella" }, price: "€5" },
      ],
    },
    {
      id: "primi",
      label: { it: "Primi", en: "First Courses" },
      items: [
        { id: "carbonara-menu", name: "Carbonara", desc: { it: "Guanciale, pecorino romano, uovo e pepe", en: "Guanciale, pecorino romano, egg and pepper" }, price: "€14" },
        { id: "amatriciana", name: "Amatriciana", desc: { it: "Guanciale, pomodoro, pecorino", en: "Guanciale, tomato, pecorino" }, price: "€14" },
        { id: "cacio-e-pepe-menu", name: "Cacio e Pepe", desc: { it: "Pecorino romano, pepe nero", en: "Pecorino romano, black pepper" }, price: "€13" },
      ],
    },
    {
      id: "secondi",
      label: { it: "Secondi", en: "Main Courses" },
      items: [
        { id: "saltimbocca-menu", name: "Saltimbocca alla Romana", desc: { it: "Vitello, prosciutto crudo, salvia", en: "Veal, cured ham, sage" }, price: "€17" },
        { id: "abbacchio", name: "Abbacchio Scottadito", desc: { it: "Costolette d'agnello alla griglia", en: "Grilled lamb chops" }, price: "€18" },
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
    it: "Prezzi indicativi — da confermare con il ristorante prima della pubblicazione.",
    en: "Indicative pricing — to be confirmed with the restaurant before publishing.",
  },

  reservation: {
    enabled: true,
    whatsappNumber: "+39 000 000 0000",
    messageTemplate: {
      it: "Ciao, vorrei prenotare un tavolo per {people} persone il {date} alle {time}.",
      en: "Hi, I'd like to reserve a table for {people} people on {date} at {time}.",
    },
  },

  social: {
    instagram: { handle: "@osteriadamario", url: "https://instagram.com/osteriadamario" },
  },
  instagramTeaserImages: [
    "/clients/osteria-da-mario/instagram/1.png",
    "/clients/osteria-da-mario/instagram/2.png",
    "/clients/osteria-da-mario/instagram/3.png",
  ],

  seo: {
    title: {
      it: "Osteria da Mario — Cucina Romana a Trastevere",
      en: "Osteria da Mario — Roman Cooking in Trastevere",
    },
    description: {
      it: "Menù digitale, prenotazioni WhatsApp e la vera cucina romana nel cuore di Trastevere.",
      en: "Digital menu, WhatsApp reservations and real Roman cooking in the heart of Trastevere.",
    },
  },

  legal: {},
};
