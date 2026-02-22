import { expect, test } from "@playwright/test";

test("sidebar link 'Listar clientes' navigates to clientes list", async ({ page }) => {
  await page.goto("/admin/login?next=/admin/dashboard");
  await page.getByLabel("Clave").fill("demo");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/admin\/dashboard/);
  await page.getByRole("link", { name: "Listar clientes" }).click();

  await expect(page).toHaveURL(/\/admin\/clientes$/);
  await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible();
});

test("sidebar link 'Agregar cliente' navigates to clientes nuevo", async ({ page }) => {
  await page.goto("/admin/login?next=/admin/dashboard");
  await page.getByLabel("Clave").fill("demo");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/admin\/dashboard/);
  await page.getByRole("link", { name: "Agregar cliente" }).click();

  await expect(page).toHaveURL(/\/admin\/clientes\/nuevo$/);
  await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible();
  await expect(page.getByText("Nuevo cliente")).toBeVisible();
});
