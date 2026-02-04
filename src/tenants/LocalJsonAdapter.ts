import type { ITenantAdapter } from "./index";
import type { TenantConfig } from "../types/tenant";
import { isTenantConfig } from "../types/tenant";

const tenantModules = import.meta.glob("./data/*.json");

export class LocalJsonAdapter implements ITenantAdapter {
  async listTenants(): Promise<string[]> {
    const manifest = await import("./tenants.manifest.json");
    return Array.isArray(manifest.default) ? manifest.default : [];
  }

  async getTenant(slug: string): Promise<TenantConfig | null> {
    const slugs = await this.listTenants();
    if (!slugs.includes(slug)) return null;

    const path = `./data/${slug}.json`;
    const loader = tenantModules[path];
    if (!loader) return null;

    const mod = (await loader()) as { default: TenantConfig };
    if (!isTenantConfig(mod.default)) return null;
    return mod.default;
  }
}