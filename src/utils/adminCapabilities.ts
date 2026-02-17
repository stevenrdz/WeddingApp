export async function canUseLocalAdminApi(path: string): Promise<boolean> {
  try {
    const res = await fetch(path, { method: "GET" });
    if (!res.ok) return false;
    const json = (await res.json()) as { ok?: boolean };
    return Boolean(json?.ok);
  } catch {
    return false;
  }
}

