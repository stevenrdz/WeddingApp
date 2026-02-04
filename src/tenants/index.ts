import type { TenantConfig } from "../types/tenant";

export interface ITenantAdapter {
  listTenants(): Promise<string[]>;
  getTenant(slug: string): Promise<TenantConfig | null>;
}