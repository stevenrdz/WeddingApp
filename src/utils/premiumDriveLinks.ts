type PremiumDriveConfig = {
  uploadWebAppUrl: string;
  driveFolderId: string;
  uploadToken?: string;
};

function getEnvString(key: string): string {
  const value = (import.meta as any)?.env?.[key];
  return typeof value === "string" ? value.trim() : "";
}

export function getPremiumDriveConfig(): PremiumDriveConfig | null {
  const uploadWebAppUrl = getEnvString("VITE_PREMIUM_UPLOAD_WEBAPP_URL");
  const driveFolderId = getEnvString("VITE_PREMIUM_DRIVE_FOLDER_ID");
  const uploadToken = getEnvString("VITE_PREMIUM_UPLOAD_TOKEN");

  if (!uploadWebAppUrl || !driveFolderId) return null;
  return { uploadWebAppUrl, driveFolderId, uploadToken: uploadToken || undefined };
}

export function buildPremiumUploadUrl(config: PremiumDriveConfig, slug: string): string {
  const url = new URL(config.uploadWebAppUrl);
  url.searchParams.set("slug", slug);
  if (config.uploadToken) url.searchParams.set("token", config.uploadToken);
  return url.toString();
}

export function buildPremiumDriveEmbedUrl(config: PremiumDriveConfig): string {
  // Public folder embed view (grid). Requires the Drive folder to be shared "Anyone with the link".
  return `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(config.driveFolderId)}#grid`;
}

