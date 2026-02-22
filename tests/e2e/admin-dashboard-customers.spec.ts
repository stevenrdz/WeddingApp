import { expect, test } from "@playwright/test";

test("dashboard card 'Clientes' navigates to admin clientes list", async ({ page }) => {
  await page.goto("/admin/login?next=/admin/dashboard");
  await page.getByLabel("Clave").fill("demo");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL(/\/admin\/dashboard/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.getByRole("link", { name: /Clientes/i }).first().click();

  await expect(page).toHaveURL(/\/admin\/clientes/);
  await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible();
});
