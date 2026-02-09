import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

function repoPath(...parts: string[]) {
  return path.join(process.cwd(), ...parts);
}

test("sites page can delete a site (and we restore it)", async ({ page, request }) => {
  const slug = "mi-boda";
  const tenantPath = repoPath("src", "tenants", "data", `${slug}.json`);
  const originalTenant = JSON.parse(fs.readFileSync(tenantPath, "utf8")) as unknown;

  async function restore() {
    // Best-effort restore so local dev workspace isn't left broken if the test fails.
    await request.post("/__admin/tenants/save", {
      data: {
        slug,
        tenant: originalTenant
      }
    });
  }

  try {
    await page.goto("/admin/login?next=/admin/sites");
    await page.getByLabel("Clave").fill("demo");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/\/admin\/sites/);
    await expect(page.getByRole("heading", { name: "Sitios" })).toBeVisible();

    // Find the row by slug text.
    const row = page.locator("div").filter({ hasText: "Slug:" }).filter({ hasText: slug }).first();
    await expect(row).toBeVisible();

    page.once("dialog", (dialog) => dialog.accept());
    const deleteBtn = row.getByRole("button", { name: "Eliminar" });
    await expect(deleteBtn).toBeVisible();

    const waitDelete = page.waitForResponse((res) => {
      return res.request().method() === "POST" && res.url().includes("/__admin/tenants/delete");
    });
    await deleteBtn.click();
    const res = await waitDelete;
    const payload = (await res.json()) as { ok?: boolean; error?: string };
    expect(payload.ok).toBe(true);

    await page.getByRole("button", { name: "Recargar" }).click();
    await expect(page.getByText(`Slug: ${slug}`)).toHaveCount(0);
  } finally {
    await restore();
  }
});
