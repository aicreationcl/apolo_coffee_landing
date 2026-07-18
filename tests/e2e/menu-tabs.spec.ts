import { test, expect } from "@playwright/test";

test("las tabs de categoría filtran el menú y mueven el indicador", async ({ page }) => {
  await page.goto("/");
  await page.locator("#menu").scrollIntoViewIfNeeded();

  const grid = page.locator("#menu h4");
  await expect(grid.first()).toBeVisible();

  const initialNames = await grid.allTextContents();
  expect(initialNames).toContain("Espresso Apolo");

  const filtradoTab = page.getByRole("button", { name: "Filtrado" });
  const indicator = page.getByTestId("category-indicator");
  const widthBefore = await indicator.evaluate((el) => el.getBoundingClientRect().x);

  await filtradoTab.click();
  await expect(page.locator("#menu h4", { hasText: "V60 Finca La Esperanza" })).toBeVisible();
  await expect(page.locator("#menu h4", { hasText: "Espresso Apolo" })).toHaveCount(0);

  const especialesTab = page.getByRole("button", { name: "Especiales" });
  await especialesTab.click();
  await expect(page.locator("#menu h4", { hasText: "Flat White Apolo" })).toBeVisible();
  await expect(page.locator("#menu h4", { hasText: "V60 Finca La Esperanza" })).toHaveCount(0);

  await page.waitForTimeout(450); // deja terminar el tween del indicador
  const widthAfter = await indicator.evaluate((el) => el.getBoundingClientRect().x);
  expect(widthAfter).not.toBe(widthBefore);
});
