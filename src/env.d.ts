/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_ADMIN_PREVIEW_KEY?: string;
  readonly VITE_UNSPLASH_ACCESS_KEY?: string;

  // Premium: Drive + Apps Script (no backend)
  readonly VITE_PREMIUM_UPLOAD_WEBAPP_URL?: string;
  readonly VITE_PREMIUM_DRIVE_FOLDER_ID?: string;
  readonly VITE_PREMIUM_UPLOAD_TOKEN?: string;
}
