export const CLINIC = {
  name: "Cabinet Dentaire Pool of Bethesa",
  sloganFr: "Votre sourire, notre signature.",
  sloganEn: "Your Smile, Our Signature.",
  address: "Quartier Non Glacé, lieu-dit ELF, Douala, Cameroun",
  mapsUrl: "https://maps.app.goo.gl/tuyMZL11MFFqopPZ7",
  phone: "+237 659 640 647",
  phoneRaw: "+237659640647",
  email: "myriamkengne85@gmail.com",
  whatsapp: "237659640647",
} as const;

export const ORANGE_MONEY = {
  number: "659640647",
  name: "MADJOUH OUMBE",
} as const;

// dayOfWeek: 0 = Dimanche ... 6 = Samedi
export const OPENING_HOURS = [
  { dayOfWeek: 0, isClosed: true, openTime: null, closeTime: null }, // Dimanche
  { dayOfWeek: 1, isClosed: false, openTime: "09:00", closeTime: "18:00" }, // Lundi
  { dayOfWeek: 2, isClosed: false, openTime: "09:00", closeTime: "18:00" }, // Mardi
  { dayOfWeek: 3, isClosed: false, openTime: "09:00", closeTime: "18:00" }, // Mercredi
  { dayOfWeek: 4, isClosed: false, openTime: "11:00", closeTime: "18:00" }, // Jeudi
  { dayOfWeek: 5, isClosed: false, openTime: "09:00", closeTime: "18:00" }, // Vendredi
  { dayOfWeek: 6, isClosed: false, openTime: "10:00", closeTime: "15:00" }, // Samedi
] as const;

export const DEFAULT_SLOT_DURATION_MIN = 30;
export const DEFAULT_MAX_PER_DAY = 20;

export const SERVICES_SLUGS = {
  CONSULTATION: "consultation",
  DETARTRAGE: "detartrage",
  EXTRACTION: "extraction",
  SOINS_CONSERVATEURS: "soins-conservateurs",
  PROTHESES: "protheses",
} as const;

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
