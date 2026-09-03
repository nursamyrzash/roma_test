import type { RestaurantConfig } from "@/config/types";

/**
 * Il Corallo demo. Address, phone, map link and Facebook page come from
 * the restaurant-leads workbook. Opening hours are cross-checked against
 * current public listings. Menu items and prices are demo content and must
 * be approved by the restaurant before publication.
 */
export const ilCorallo: RestaurantConfig = {
  id: "il-corallo",
  restaurantName: "Il Corallo",
  tagline: {
    it: "Cucina romana, pizza e sapori di mare a due passi da Piazza Navona",
    en: "Roman cooking, pizza and seafood steps from Piazza Navona",
  },
  logo: "/clients/il-corallo/logo.png",
  heroImage: "/clients/il-corallo/hero.png",
  deployedUrl: "https://roma-tavola-il-corallo.vercel.app",

  style: "modern-italian",
  styleOverrides: {
    primaryColor: "#C9142D",
    accentColor: "#747474",
  },
  languages: ["it", "en"],

  phone: "+39 06 6830 7703",

  locations: [
    {
      id: "via-del-corallo",
      label: "Via del Corallo",
      area: "Centro Storico · Piazza Navona",
      address: "Via del Corallo, 10-11, 00186 Roma RM, Italy",
      googleMapsUrl:
        "https://maps.google.com/?cid=13232075430849788676&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA",
      hours: "Lun–Ven 12:00–15:30 / 18:30–23:30 · Sab–Dom 12:00–16:00 / 18:30–23:30",
      landmarks: [
        { it: "A due passi da Piazza Navona", en: "Steps from Piazza Navona" },
        { it: "Nel cuore del centro storico di Roma", en: "In Rome's historic centre" },
      ],
    },
  ],
  primaryLocationId: "via-del-corallo",

  openingHours: [
    { dayKey: "mon", hours: "12:00–15:30 / 18:30–23:30" },
    { dayKey: "tue", hours: "12:00–15:30 / 18:30–23:30" },
    { dayKey: "wed", hours: "12:00–15:30 / 18:30–23:30" },
    { dayKey: "thu", hours: "12:00–15:30 / 18:30–23:30" },
    { dayKey: "fri", hours: "12:00–15:30 / 18:30–23:30" },
    { dayKey: "sat", hours: "12:00–16:00 / 18:30–23:30" },
    { dayKey: "sun", hours: "12:00–16:00 / 18:30–23:30" },
  ],
  hoursLastUpdated: "2026-09-04",

  whyUs: [
    {
      icon: "🍕",
      title: { it: "Ristorante e Pizzeria", en: "Restaurant & Pizzeria" },
      body: {
        it: "Pizza, pasta e classici italiani preparati per ogni momento della giornata.",
        en: "Pizza, pasta and Italian classics for lunch and dinner.",
      },
    },
    {
      icon: "🦐",
      title: { it: "Sapori di Mare", en: "Seafood Flavours" },
      body: {
        it: "Primi di mare e fritti fragranti nel cuore di Roma.",
        en: "Seafood pasta and crisp fried favourites in the heart of Rome.",
      },
    },
    {
      icon: "📍",
      title: { it: "Vicino a Piazza Navona", en: "Near Piazza Navona" },
      body: {
        it: "Una sosta accogliente tra i vicoli del centro storico.",
        en: "A welcoming stop among the lanes of the historic centre.",
      },
    },
  ],

  signatureDishes: [
    {
      id: "pizza-margherita",
      name: "Pizza Margherita",
      desc: { it: "Pomodoro, fior di latte e basilico", en: "Tomato, fior di latte and basil" },
      price: "€12",
      flag: "SIGNATURE",
      image: "/clients/il-corallo/dishes/pizza-margherita.png",
    },
    {
      id: "spaghetti-vongole",
      name: "Spaghetti alle Vongole",
      desc: { it: "Vongole veraci, aglio, prezzemolo e vino bianco", en: "Clams, garlic, parsley and white wine" },
      price: "€18",
      image: "/clients/il-corallo/dishes/spaghetti-vongole.png",
    },
    {
      id: "fritto-misto",
      name: "Fritto Misto di Mare",
      desc: { it: "Calamari, gamberi e pesce del giorno", en: "Calamari, prawns and fish of the day" },
      price: "€20",
      image: "/clients/il-corallo/dishes/fritto-misto.png",
    },
    {
      id: "tiramisu",
      name: "Tiramisù della Casa",
      desc: { it: "Mascarpone, caffè e cacao", en: "Mascarpone, coffee and cocoa" },
      price: "€8",
      image: "/clients/il-corallo/dishes/tiramisu.png",
    },
  ],

  menuCategories: [
    {
      id: "antipasti",
      label: { it: "Antipasti", en: "Starters" },
      items: [
        { id: "bruschetta", name: "Bruschetta al Pomodoro", desc: { it: "Pomodoro fresco, basilico e olio EVO", en: "Fresh tomato, basil and extra-virgin olive oil" }, price: "€7" },
        { id: "suppli", name: "Supplì Romano", desc: { it: "Riso al ragù e mozzarella filante", en: "Ragù rice croquette with melted mozzarella" }, price: "€6" },
        { id: "fritto-misto-menu", name: "Fritto Misto di Mare", desc: { it: "Calamari, gamberi e pesce del giorno", en: "Calamari, prawns and fish of the day" }, price: "€20" },
      ],
    },
    {
      id: "primi",
      label: { it: "Primi", en: "Pasta" },
      items: [
        { id: "vongole-menu", name: "Spaghetti alle Vongole", desc: { it: "Vongole veraci, aglio e prezzemolo", en: "Clams, garlic and parsley" }, price: "€18" },
        { id: "cacio-e-pepe", name: "Cacio e Pepe", desc: { it: "Pecorino romano e pepe nero", en: "Pecorino romano and black pepper" }, price: "€14" },
        { id: "amatriciana", name: "Amatriciana", desc: { it: "Guanciale, pomodoro e pecorino", en: "Guanciale, tomato and pecorino" }, price: "€15" },
      ],
    },
    {
      id: "pizze",
      label: { it: "Pizze", en: "Pizza" },
      items: [
        { id: "margherita-menu", name: "Margherita", desc: { it: "Pomodoro, fior di latte e basilico", en: "Tomato, fior di latte and basil" }, price: "€12" },
        { id: "diavola", name: "Diavola", desc: { it: "Pomodoro, mozzarella e salame piccante", en: "Tomato, mozzarella and spicy salami" }, price: "€14" },
        { id: "capricciosa", name: "Capricciosa", desc: { it: "Pomodoro, mozzarella, prosciutto, funghi, olive e carciofi", en: "Tomato, mozzarella, ham, mushrooms, olives and artichokes" }, price: "€15" },
      ],
    },
    {
      id: "dolci",
      label: { it: "Dolci", en: "Desserts" },
      items: [
        { id: "tiramisu-menu", name: "Tiramisù della Casa", desc: { it: "Mascarpone, caffè e cacao", en: "Mascarpone, coffee and cocoa" }, price: "€8" },
        { id: "panna-cotta", name: "Panna Cotta", desc: { it: "Con frutti di bosco", en: "With mixed berries" }, price: "€7" },
      ],
    },
  ],
  menuNote: {
    it: "Menù dimostrativo e prezzi indicativi — da confermare con il ristorante prima della pubblicazione.",
    en: "Demo menu and indicative prices — confirm with the restaurant before publishing.",
  },

  reservation: {
    enabled: true,
    channel: "phone",
  },

  social: {
    facebook: "https://www.facebook.com/p/IL-CORALLO-100063739955639/",
  },

  seo: {
    title: {
      it: "Il Corallo — Ristorante e Pizzeria vicino Piazza Navona",
      en: "Il Corallo — Restaurant & Pizzeria near Piazza Navona",
    },
    description: {
      it: "Cucina romana, pizza e piatti di mare in Via del Corallo, nel centro storico di Roma.",
      en: "Roman cooking, pizza and seafood on Via del Corallo in Rome's historic centre.",
    },
  },

  legal: {},
};
