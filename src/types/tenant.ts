export type RsvpMode = "whatsapp" | "netlify";
export type SectionType =
  | "countdown"
  | "story"
  | "locations"
  | "timeline"
  | "dressCode"
  | "gifts"
  | "rsvp"
  | "gallery"
  | "faq";

export type ButtonVariant = "outline" | "solid";
export type BackgroundMode = "default" | "preset" | "color" | "image";
export type BackgroundPreset = "surface" | "texture" | "ink";
export type LocationsMapMode = "button" | "iframe";

export type BankKey =
  | "pichincha"
  | "guayaquil"
  | "pacifico"
  | "produbanco"
  | "internacional"
  | "jep"
  | "solidario";

export type BankAccountType = "ahorros" | "corriente" | "otro";

export interface PageLink {
  label: string;
  target: string;
}

export interface ActionButton extends PageLink {
  variant: ButtonVariant;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface NavbarConfig {
  icon?: string;
  links?: PageLink[];
  buttons?: ActionButton[];
}

export interface HeroLayoutConfig {
  backgroundMode?: "default" | "color" | "image";
  backgroundColor?: string;
  backgroundImageUrl?: string;
  buttons?: ActionButton[];
}

export interface SectionBackgroundConfig {
  mode?: BackgroundMode;
  preset?: BackgroundPreset;
  color?: string;
  imageUrl?: string;
  parallax?: boolean;
}

export interface PageSection {
  type: SectionType;
  label: string;
  anchorId: string;
  background?: SectionBackgroundConfig;
}

export interface FooterConfig {
  message?: string;
  anchorId?: string;
}

export interface LocationsLayoutConfig {
  showCeremony?: boolean;
  showReception?: boolean;
  mapMode?: LocationsMapMode;
}

export interface BankAccount {
  bank?: BankKey;
  identification: string;
  name: string;
  accountNumber: string;
  accountType: BankAccountType;
}

export interface GiftsConfig {
  message: string;
  giftListUrl?: string;
  /** Backward compatible (old tenants). */
  bankTransferText?: string;
  accounts?: BankAccount[];
}

export interface PageConfig {
  navbar?: NavbarConfig;
  hero?: HeroLayoutConfig;
  sections?: PageSection[];
  footer?: FooterConfig;
  locations?: LocationsLayoutConfig;
}

export interface TenantConfig {
  coupleNames: string;
  dateISO: string;
  hero: {
    tagline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    ctaPrimaryTarget?: string;
    ctaSecondaryTarget?: string;
  };
  ceremony: {
    name: string;
    time: string;
    address: string;
    mapUrl: string;
  };
  reception: {
    name: string;
    time: string;
    address: string;
    mapUrl: string;
  };
  schedule: Array<{ time: string; title: string; description: string }>;
  dressCode: { title: string; description: string };
  gifts: GiftsConfig;
  rsvp: {
    mode: RsvpMode;
    enabled: boolean;
    deadlineISO: string;
    whatsappNumber: string;
    netlifyFormNameOptional?: string;
  };
  gallery: Array<{ src: string; alt: string }>;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    fontHeading: string;
    fontSubheading?: string;
    fontBody: string;
  };
  seo: { title: string; description: string; url: string; ogImage: string };
  page?: PageConfig;
  story?: { title: string; message: string };
  faq?: Array<{ question: string; answer: string }>;
  contactEmail?: string;
}

export function isTenantConfig(value: unknown): value is TenantConfig {
  if (!value || typeof value !== "object") return false;
  const v = value as TenantConfig;
  return Boolean(v.coupleNames && v.dateISO && v.hero && v.ceremony && v.reception && v.rsvp && v.seo);
}
