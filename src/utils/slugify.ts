export function slugify(input: string): string {
  const raw = String(input || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return raw
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

export function makeCoupleSlug(groomName: string, brideName: string): string {
  const groom = slugify(groomName.split(/\s+/).filter(Boolean)[0] || groomName);
  const bride = slugify(brideName.split(/\s+/).filter(Boolean)[0] || brideName);
  const base = [groom, bride].filter(Boolean).join("-");
  return base || "nueva-boda";
}

