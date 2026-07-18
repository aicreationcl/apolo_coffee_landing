import { test, expect } from "@playwright/test";

// En esta versión de Playwright, `reducedMotion` solo se aplica correctamente
// anidado en `contextOptions` — un `test.use({ reducedMotion: "reduce" })`
// de nivel superior es ignorado silenciosamente (confirmado empíricamente:
// `window.matchMedia('(prefers-reduced-motion: reduce)').matches` seguía
// devolviendo `false` hasta anidarlo así).
test.use({ contextOptions: { reducedMotion: "reduce" } });

test("con prefers-reduced-motion no hay pinning en el Roast Showcase", async ({ page }) => {
  await page.goto("/");
  await page.locator("#menu").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const showcase = page.getByTestId("roast-showcase");
  const topBefore = (await showcase.boundingBox())?.y ?? 0;

  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(100);
  }

  const topAfter = (await showcase.boundingBox())?.y ?? 0;
  // Sin pin, el contenedor se desplaza con el scroll normal del documento
  // en vez de quedar fijo en 0.
  expect(topAfter).not.toBe(topBefore);

  // Los tres tuestes deben quedar visibles apilados (markup estático, sin pin).
  await expect(page.getByText("Tueste Claro")).toBeVisible();
  await expect(page.getByText("Tueste Medio")).toBeVisible();
  await expect(page.getByText("Tueste Oscuro")).toBeVisible();
});

test("con prefers-reduced-motion no hay tilt 3D activo en las MenuCard", async ({ page }) => {
  await page.goto("/");
  await page.locator("#menu").scrollIntoViewIfNeeded();
  // Espera a que termine el reveal de entrada de las MenuCard (useStaggerReveal)
  // para no confundir su propio tween de montaje con el hover del tilt.
  await page.waitForTimeout(500);

  const card = page.locator("#menu h4").first().locator("../../..");
  const transformBefore = await card.evaluate((el) => getComputedStyle(el).transform);

  await card.hover();
  await page.waitForTimeout(200);

  // Bajo reduced-motion, useMagneticTilt nunca adjunta sus listeners de
  // pointermove, así que el hover no debe alterar el transform del card.
  const transformAfter = await card.evaluate((el) => getComputedStyle(el).transform);
  expect(transformAfter).toBe(transformBefore);
});
