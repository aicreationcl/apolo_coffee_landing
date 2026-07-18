import { test, expect } from "@playwright/test";

test("la home carga y todas las secciones son visibles al hacer scroll", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Apolo Coffee/);

  const sectionIds = ["#hero", "#menu", "#nosotros", "#ubicacion", "#contacto"];
  for (const id of sectionIds) {
    const section = page.locator(id);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  }
});
