export type RsvpMode = "whatsapp" | "netlify";

export interface TenantConfig {
  coupleNames: string;
  dateISO: string;
  hero: {
    tagline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
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
  gifts: { bankTransferText: string; giftListUrl: string; message: string };
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
    fontBody: string;
  };
  seo: { title: string; description: string; url: string; ogImage: string };
  story?: { title: string; message: string };
  faq?: Array<{ question: string; answer: string }>;
  contactEmail?: string;
}

export function isTenantConfig(value: unknown): value is TenantConfig {
  if (!value || typeof value !== "object") return false;
  const v = value as TenantConfig;
  return Boolean(v.coupleNames && v.dateISO && v.hero && v.ceremony && v.reception && v.rsvp && v.seo);
}
