import { expect, test } from "@playwright/test";

test("admin generate can save draft and shows toast", async ({ page }) => {
  await page.goto("/admin/login?next=/admin/generate");
  await page.getByLabel("Clave").fill("demo");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/admin\/generate/);
  await page.getByRole("button", { name: "Herramientas" }).click();
  await expect(page.getByRole("button", { name: "Guardar borrador" })).toBeVisible();

  await page.getByRole("button", { name: "Guardar borrador" }).click();

  await expect(page.getByText("Borrador guardado.")).toBeVisible();
});

test("drafts page can delete a draft", async ({ page }) => {
  await page.goto("/admin/login?next=/admin/generate");
  await page.getByLabel("Clave").fill("demo");
  await page.getByRole("button", { name: "Entrar" }).click();

  await page.getByRole("button", { name: "Herramientas" }).click();
  await page.getByRole("button", { name: "Guardar borrador" }).click();
  await expect(page.getByText("Borrador guardado.")).toBeVisible();

  await page.goto("/admin/drafts");
  await expect(page.getByRole("heading", { name: "Borradores" })).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /^Eliminar$/ }).first().click();
  await expect(page.getByText("Borrador eliminado.")).toBeVisible();
});
