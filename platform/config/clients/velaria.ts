import type { RestaurantConfig } from "@/config/types";
import { buildGoogleMapsUrl } from "@/lib/maps";

/** Fictional premium concept used to demonstrate the €300–€500 tier. */
const conceptAddress = "Piazza Navona, 00186 Roma RM";

export const velaria: RestaurantConfig = {
  id: "velaria",
  restaurantName: "Velaria",
  tagline: {
    it: "Una nuova luce sulla cucina romana",
    en: "A new light on Roman cuisine",
  },
  logo: "/clients/velaria/logo.svg",
  heroImage: "/clients/velaria/hero.png",
  deployedUrl: "https://roma-tavola-velaria.vercel.app",
  style: "night-aperitivo",
  styleOverrides: { primaryColor: "#D7B778", accentColor: "#C68B5B" },
  languages: ["it", "en"],

  locations: [{
    id: "centro-storico",
    label: "Centro Storico",
    area: "Concept location · Piazza Navona",
    address: conceptAddress,
    googleMapsUrl: buildGoogleMapsUrl(conceptAddress),
    hours: "Mar–Sab: 19:00–23:00",
    landmarks: [
      { it: "Concept dimostrativo — ristorante e sede sono immaginari", en: "Demonstration concept — restaurant and venue are fictional" },
    ],
  }],
  primaryLocationId: "centro-storico",
  openingHours: [
    { dayKey: "mon", hours: "" },
    { dayKey: "tue", hours: "19:00–23:00" },
    { dayKey: "wed", hours: "19:00–23:00" },
    { dayKey: "thu", hours: "19:00–23:00" },
    { dayKey: "fri", hours: "19:00–23:00" },
    { dayKey: "sat", hours: "19:00–23:00" },
    { dayKey: "sun", hours: "" },
  ],
  hoursLastUpdated: "2026-09-04",

  whyUs: [],
  signatureDishes: [
    {
      id: "cappellacci",
      name: "Cappellacci al Carciofo",
      desc: { it: "Pecorino, mentuccia e carciofo croccante", en: "Pecorino, Roman mint and crisp artichoke" },
      price: "",
      image: "/clients/velaria/dishes/cappellacci.png",
    },
    {
      id: "gambero-rosso",
      name: "Gambero Rosso Mediterraneo",
      desc: { it: "Finocchio, agrumi e fondo di crostacei", en: "Fennel, citrus and shellfish reduction" },
      price: "",
      image: "/clients/velaria/dishes/gambero-rosso.png",
    },
    {
      id: "agnello",
      name: "Agnello, Melanzana e Rosmarino",
      desc: { it: "Agnello laziale, melanzana affumicata e jus", en: "Lazio lamb, smoked aubergine and rosemary jus" },
      price: "",
      image: "/clients/velaria/dishes/agnello.png",
    },
  ],
  menuCategories: [
    {
      id: "incipit",
      label: { it: "Incipit", en: "Opening" },
      items: [
        { id: "ostrica", name: "Ostrica, Mela Verde e Sedano", desc: { it: "Granita vegetale e olio alle foglie", en: "Green apple granita and leaf oil" }, price: "" },
        { id: "gambero", name: "Gambero Rosso Mediterraneo", desc: { it: "Finocchio, agrumi e fondo di crostacei", en: "Fennel, citrus and shellfish reduction" }, price: "" },
      ],
    },
    {
      id: "terra",
      label: { it: "Terra e memoria", en: "Land and memory" },
      items: [
        { id: "cappellacci-menu", name: "Cappellacci al Carciofo", desc: { it: "Pecorino, mentuccia e carciofo croccante", en: "Pecorino, Roman mint and crisp artichoke" }, price: "" },
        { id: "agnello-menu", name: "Agnello, Melanzana e Rosmarino", desc: { it: "Agnello laziale, melanzana affumicata e jus", en: "Lazio lamb, smoked aubergine and rosemary jus" }, price: "" },
      ],
    },
    {
      id: "finale",
      label: { it: "Finale", en: "Finale" },
      items: [
        { id: "limone", name: "Limone, Alloro e Olio d’Oliva", desc: { it: "Crema al limone, gelato all’alloro e crumble", en: "Lemon cream, bay-leaf gelato and crumble" }, price: "" },
        { id: "cioccolato", name: "Cioccolato, Caffè e Fico", desc: { it: "Fondente, espresso e fico fermentato", en: "Dark chocolate, espresso and fermented fig" }, price: "" },
      ],
    },
  ],
  menuNote: {
    it: "Concept e menù interamente immaginari, creati da Grandenes per mostrare il pacchetto premium.",
    en: "A fully fictional concept and menu created by Grandenes to demonstrate the premium package.",
  },
  reservation: { enabled: true, channel: "demo" },
  social: {},
  seo: {
    title: { it: "Velaria Roma — Concept Fine Dining", en: "Velaria Rome — Fine Dining Concept" },
    description: { it: "Demo premium Grandenes per un ristorante gastronomico immaginario a Roma.", en: "A Grandenes premium demo for a fictional gastronomic restaurant in Rome." },
  },
  premium: {
    conceptLabel: { it: "Cucina contemporanea · Roma", en: "Contemporary cuisine · Rome" },
    introduction: {
      it: "Velaria racconta Roma attraverso la luce, la pietra e una cucina che trasforma la memoria in gesto contemporaneo.",
      en: "Velaria tells the story of Rome through light, stone and a cuisine that transforms memory into a contemporary gesture.",
    },
    chefName: "Livia Neri",
    chefTitle: { it: "Un’identità romana, uno sguardo aperto sul Mediterraneo", en: "Roman identity with an open view of the Mediterranean" },
    chefBio: {
      it: "Figura immaginaria creata per questo demo, la Chef Livia Neri interpreta ingredienti laziali con precisione, leggerezza e una sensibilità maturata lungo le coste del Mediterraneo.",
      en: "A fictional character created for this demo, Chef Livia Neri interprets Lazio ingredients with precision, lightness and a sensibility shaped along the Mediterranean coast.",
    },
    chefImage: "/clients/velaria/chef.png",
    philosophyTitle: { it: "La filosofia", en: "The philosophy" },
    philosophyBody: {
      it: "Pochi elementi, materia riconoscibile e tecnica invisibile. Ogni piatto lascia spazio al gusto e al ricordo.",
      en: "Few elements, recognisable ingredients and invisible technique. Every plate leaves room for flavour and memory.",
    },
    wineTitle: { it: "Cantina e abbinamenti", en: "Cellar and pairings" },
    wineBody: {
      it: "Etichette italiane, piccoli produttori e percorsi al calice costruiti intorno a ogni portata.",
      en: "Italian labels, small producers and by-the-glass journeys composed around every course.",
    },
    wineImage: "/clients/velaria/gallery/wine.png",
    tastingMenus: [
      { name: { it: "Luce", en: "Light" }, courses: { it: "Cinque portate", en: "Five courses" }, price: "€95" },
      { name: { it: "Velaria", en: "Velaria" }, courses: { it: "Otto portate", en: "Eight courses" }, price: "€145" },
    ],
    galleryImages: [
      { src: "/clients/velaria/gallery/private-dining.png", alt: { it: "Sala privata Velaria", en: "Velaria private dining room" } },
      { src: "/clients/velaria/hero.png", alt: { it: "Sala principale Velaria", en: "Velaria main dining room" } },
    ],
  },
  legal: {},
};
