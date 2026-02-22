import gallery from "../admin/unsplash-gallery.json";

export type UnsplashLibraryPhoto = {
  src: string;
  alt?: string;
  authorName?: string;
  authorUrl?: string;
  sourceUrl?: string;
};

function normalizePhoto(item: unknown): UnsplashLibraryPhoto | null {
  if (typeof item === "string") {
    const src = item.trim();
    return src ? { src } : null;
  }
  if (!item || typeof item !== "object") return null;

  const obj = item as Record<string, unknown>;
  const src = String(obj.src ?? obj.url ?? "").trim();
  if (!src) return null;

  return {
    src,
    alt: String(obj.alt ?? "").trim() || undefined,
    authorName: String(obj.authorName ?? "").trim() || undefined,
    authorUrl: String(obj.authorUrl ?? "").trim() || undefined,
    sourceUrl: String(obj.sourceUrl ?? "").trim() || undefined
  };
}

const normalized = Array.isArray(gallery) ? gallery.map(normalizePhoto).filter((item): item is UnsplashLibraryPhoto => Boolean(item)) : [];
const deduped = new Map<string, UnsplashLibraryPhoto>();
for (const photo of normalized) deduped.set(photo.src, photo);

export const unsplashGallery = Array.from(deduped.values());
