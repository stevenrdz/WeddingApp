import type { PageSection, SectionType } from "../types/tenant";

export const sectionCatalog: Array<PageSection> = [
  { type: "countdown", label: "Cuenta regresiva", anchorId: "cuenta-regresiva" },
  { type: "story", label: "Historia", anchorId: "historia" },
  { type: "locations", label: "Ubicaciones", anchorId: "ubicaciones" },
  { type: "timeline", label: "Itinerario", anchorId: "itinerario" },
  { type: "dressCode", label: "Dress code", anchorId: "dress-code" },
  { type: "gifts", label: "Regalos", anchorId: "regalos" },
  { type: "rsvp", label: "RSVP", anchorId: "rsvp" },
  { type: "gallery", label: "Galería", anchorId: "galeria" },
  { type: "faq", label: "FAQ", anchorId: "faq" }
];

export function defaultSections(): PageSection[] {
  return sectionCatalog.map((section) => ({ ...section }));
}

export function resolveSectionDefaults(type: SectionType): PageSection {
  const found = sectionCatalog.find((section) => section.type === type);
  if (found) return { ...found };
  return { type, label: "Sección", anchorId: "seccion" };
}
