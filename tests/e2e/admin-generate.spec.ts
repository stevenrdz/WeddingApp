import { expect, test } from "@playwright/test";

test("admin generate can save draft and shows toast", async ({ page }) => {
  await page.goto("/admin/login?next=/admin/generate");
  await page.getByLabel("Clave").fill("demo");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/admin\/generate/);
  await expect(page.getByRole("button", { name: "Guardar borrador" })).toBeVisible();

  await page.getByRole("button", { name: "Guardar borrador" }).click();

  await expect(page.getByText("Borrador guardado.")).toBeVisible();
});
