import { test, expect } from "@playwright/test";

test.describe("formulario de contacto", () => {
  test("muestra errores inline al enviar vacío, sin llamar a la API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/contact", (route) => {
      apiCalled = true;
      route.continue();
    });

    await page.goto("/");
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText("Ingresa tu nombre completo")).toBeVisible();
    await expect(page.getByText("Ingresa un correo válido")).toBeVisible();
    expect(apiCalled).toBe(false);
  });

  test("muestra toast de éxito cuando la API responde 200", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) })
    );

    await page.goto("/");
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.getByLabel("Nombre").fill("Camila Torres");
    await page.getByLabel("Email").fill("camila@example.com");
    await page.getByLabel("Mensaje").fill("Quisiera reservar una mesa para el sábado por la tarde.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText(/tu mensaje fue enviado/i)).toBeVisible();
  });

  test("muestra toast de error cuando la API responde 400", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ success: false, errors: {} }),
      })
    );

    await page.goto("/");
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.getByLabel("Nombre").fill("Camila Torres");
    await page.getByLabel("Email").fill("camila@example.com");
    await page.getByLabel("Mensaje").fill("Quisiera reservar una mesa para el sábado por la tarde.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText(/no pudimos enviar tu mensaje/i)).toBeVisible();
  });
});
