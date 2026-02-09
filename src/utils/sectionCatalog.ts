import type { PageSection, SectionType } from "../types/tenant";

export const sectionCatalog: Array<PageSection> = [
  { type: "countdown", label: "Cuenta regresiva", anchorId: "cuenta-regresiva", background: { mode: "default" } },
  { type: "story", label: "Historia", anchorId: "historia", background: { mode: "default" } },
  { type: "locations", label: "Ubicaciones", anchorId: "ubicaciones", background: { mode: "default" } },
  { type: "timeline", label: "Itinerario", anchorId: "itinerario", background: { mode: "default" } },
  { type: "dressCode", label: "Dress code", anchorId: "dress-code", background: { mode: "default" } },
  { type: "gifts", label: "Regalos", anchorId: "regalos", background: { mode: "default" } },
  { type: "rsvp", label: "RSVP", anchorId: "rsvp", background: { mode: "default" } },
  { type: "gallery", label: "Galería", anchorId: "galeria", background: { mode: "default" } },
  { type: "faq", label: "FAQ", anchorId: "faq", background: { mode: "default" } }
];

export function defaultSections(): PageSection[] {
  return sectionCatalog.map((section) => ({ ...section }));
}

export function resolveSectionDefaults(type: SectionType): PageSection {
  const found = sectionCatalog.find((section) => section.type === type);
  if (found) return { ...found };
  return { type, label: "Sección", anchorId: "seccion", background: { mode: "default" } };
}
