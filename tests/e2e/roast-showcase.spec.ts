import { test, expect } from "@playwright/test";

test("el Roast Showcase se pinnea, transiciona Light -> Medium -> Dark y libera el pin", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#menu").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const showcase = page.getByTestId("roast-showcase");

  const topBefore = (await showcase.boundingBox())?.y ?? -1;
  expect(Math.round(topBefore)).toBe(0);

  // Scroll gradualmente varias veces y confirmar que el contenedor sigue
  // pinneado (top de su bounding box permanece en 0) mientras la sección
  // no ha terminado su scroll interno.
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(150);
  }
  const topDuring = (await showcase.boundingBox())?.y ?? -1;
  expect(Math.round(topDuring)).toBe(0);

  // El chip de "Tueste Medio" debe volverse visible en algún punto del scroll.
  await expect(page.getByText("Tueste Medio")).toBeVisible({ timeout: 5000 });

  // Continuar hasta el final del showcase — el chip "Tueste Oscuro" debe
  // quedar visible y el pin debe liberarse (el contenedor ya no está fijo).
  for (let i = 0; i < 24; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(150);
  }
  await expect(page.getByText("Tueste Oscuro")).toBeVisible({ timeout: 5000 });

  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(100);
  }
  const topAfter = (await showcase.boundingBox())?.y ?? 0;
  expect(topAfter).toBeLessThan(0);
});
