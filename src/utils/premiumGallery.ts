export type PremiumPhoto = {
  id: string;
  createdAt: string;
  dataUrl: string;
};

function storageKey(slug: string) {
  return `provenza:premium_gallery:${slug}`;
}

function channelKey(slug: string) {
  return `provenza:premium_gallery_channel:${slug}`;
}

export function listPremiumPhotos(slug: string): PremiumPhoto[] {
  try {
    const raw = localStorage.getItem(storageKey(slug));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PremiumPhoto[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((p) => p && typeof p.id === "string" && typeof p.createdAt === "string" && typeof p.dataUrl === "string")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export function savePremiumPhotos(slug: string, next: PremiumPhoto[]) {
  localStorage.setItem(storageKey(slug), JSON.stringify(next.slice(0, 200)));
}

export function addPremiumPhoto(slug: string, photo: PremiumPhoto) {
  const current = listPremiumPhotos(slug);
  current.unshift(photo);
  savePremiumPhotos(slug, current);
  broadcastPremiumGalleryUpdate(slug);
}

export function removePremiumPhoto(slug: string, id: string) {
  const next = listPremiumPhotos(slug).filter((p) => p.id !== id);
  savePremiumPhotos(slug, next);
  broadcastPremiumGalleryUpdate(slug);
}

export function broadcastPremiumGalleryUpdate(slug: string) {
  try {
    const channel = new BroadcastChannel(channelKey(slug));
    channel.postMessage({ type: "updated" });
    channel.close();
  } catch {
    // ignore
  }
}

export function subscribePremiumGallery(slug: string, onUpdate: () => void) {
  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(channelKey(slug));
    channel.onmessage = () => onUpdate();
  } catch {
    channel = null;
  }
  return () => {
    try {
      channel?.close();
    } catch {
      // ignore
    }
  };
}

export async function fileToJpegDataUrl(file: File, maxWidth = 1600, quality = 0.82): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

