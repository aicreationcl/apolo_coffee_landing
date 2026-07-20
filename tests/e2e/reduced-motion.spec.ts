import { test, expect } from "@playwright/test";

// En esta versión de Playwright, `reducedMotion` solo se aplica correctamente
// anidado en `contextOptions` — un `test.use({ reducedMotion: "reduce" })`
// de nivel superior es ignorado silenciosamente (confirmado empíricamente:
// `window.matchMedia('(prefers-reduced-motion: reduce)').matches` seguía
// devolviendo `false` hasta anidarlo así).
test.use({ contextOptions: { reducedMotion: "reduce" } });

test("con prefers-reduced-motion no hay parallax en el Origin Showcase", async ({ page }) => {
  await page.goto("/");
  const image = page.getByTestId("origin-showcase-image");
  await image.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const transformBefore = await image.evaluate((el) => getComputedStyle(el).transform);

  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(100);
  }

  // Bajo reduced-motion, el efecto de GSAP nunca crea el tween de scrub, así
  // que el transform de la imagen no debe cambiar con el scroll.
  const transformAfter = await image.evaluate((el) => getComputedStyle(el).transform);
  expect(transformAfter).toBe(transformBefore);
});

test("con prefers-reduced-motion el reveal en cascada de la carta es inmediato", async ({ page }) => {
  await page.goto("/");
  await page.locator("#menu").scrollIntoViewIfNeeded();
  // Bajo reduced-motion, useStaggerReveal (MenuGrid) colapsa stagger/duration
  // a ~0 en vez de animar la entrada en cascada — las filas deben quedar
  // visibles casi de inmediato, sin depender de esperar el tween completo.
  await page.waitForTimeout(200);

  const firstRow = page.locator("#menu h4").first().locator("xpath=../../..");
  const opacity = await firstRow.evaluate((el) => Number(getComputedStyle(el).opacity));
  expect(opacity).toBe(1);
});
