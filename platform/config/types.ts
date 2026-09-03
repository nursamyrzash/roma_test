export type Lang = "it" | "en" | "es";

export interface LocalizedText {
  it: string;
  en: string;
  es?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  desc?: LocalizedText;
  price: string;
  flag?: string;
  image?: string;
}

export interface SignatureDish extends MenuItem {
  image: string;
}

export interface MenuCategory {
  id: string;
  label: LocalizedText;
  items: MenuItem[];
}

export interface Location {
  id: string;
  label: string;
  area?: string;
  address: string;
  googleMapsUrl: string;
  hours: string;
  walkInOnly?: boolean;
  walkInNote?: LocalizedText;
  landmarks?: LocalizedText[];
}

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface OpeningHoursRow {
  dayKey: DayKey;
  /** Display hours for this day, e.g. "12:00–15:00 / 19:00–23:00". Empty string = closed. */
  hours: string;
}

export interface WhyUsCard {
  icon: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface ReservationConfig {
  enabled: boolean;
  /** Defaults to WhatsApp for backwards compatibility. */
  channel?: "whatsapp" | "phone";
  whatsappNumber?: string;
  messageTemplate?: LocalizedText;
}

export type StylePreset = "roman-classic" | "modern-italian" | "night-aperitivo";

export interface StyleOverrides {
  primaryColor?: string;
  accentColor?: string;
}

export interface SocialLinks {
  instagram?: { handle: string; url: string };
  facebook?: string;
  tripadvisor?: string;
}

export interface AnalyticsConfig {
  plausibleDomain?: string;
  gaMeasurementId?: string;
}

export interface RestaurantConfig {
  id: string;
  restaurantName: string;
  legalName?: string;
  tagline: LocalizedText;
  logo: string;
  heroImage: string;
  /** Live URL this config is deployed at, e.g. "https://tonnarello.romatavola.app" — used for QR + SEO canonical. */
  deployedUrl: string;

  style: StylePreset;
  styleOverrides?: StyleOverrides;

  /** First entry is the default language. IT+EN mandatory, ES optional. */
  languages: Lang[];

  phone?: string;
  whatsapp?: string;
  email?: string;

  locations: Location[];
  primaryLocationId?: string;

  openingHours: OpeningHoursRow[];
  hoursLastUpdated: string;

  whyUs: WhyUsCard[];

  signatureDishes: SignatureDish[];
  menuCategories: MenuCategory[];
  menuNote?: LocalizedText;

  reservation: ReservationConfig;

  social: SocialLinks;
  instagramTeaserImages?: string[];

  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };

  analytics?: AnalyticsConfig;

  legal: {
    privacyPolicyContent?: LocalizedText;
    cookiePolicyContent?: LocalizedText;
  };
}
