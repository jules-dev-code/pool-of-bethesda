import { test, expect } from "@playwright/test";

test.describe("Navigation publique", () => {
  test("la page d'accueil française se charge correctement", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pool of Bethesa/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("le changement de langue FR → EN fonctionne", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "EN" }).click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /smile/i
    );
  });

  test("la navigation vers la page Services fonctionne", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/services/);
  });

  test("la page 404 s'affiche pour une URL inconnue", async ({ page }) => {
    const response = await page.goto("/cette-page-n-existe-pas");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/n'existe pas|does not exist/i)).toBeVisible();
  });

  test("le bouton WhatsApp flottant est visible sur toutes les pages", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(page.getByLabel(/whatsapp/i)).toBeVisible();
  });
});
