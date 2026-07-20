import { test, expect } from "@playwright/test";

test("el toggle de tema cambia el logo y los colores", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  const logo = page.locator("header img").first();
  const toggle = page.getByRole("button", { name: /modo oscuro|modo claro/i });

  await expect(html).not.toHaveClass(/dark/);
  await expect(logo).toHaveAttribute("src", /akita_inu_for_bg_white\.png/);

  const bgBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await toggle.click();

  await expect(html).toHaveClass(/dark/);
  await expect(logo).toHaveAttribute("src", /akita_inu_for_bg_dark\.png/);

  const bgAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bgAfter).not.toBe(bgBefore);
});
