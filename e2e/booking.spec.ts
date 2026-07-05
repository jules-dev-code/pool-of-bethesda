import { test, expect } from "@playwright/test";

test.describe("Parcours de réservation", () => {
  test("un visiteur peut naviguer les étapes du wizard jusqu'au résumé", async ({
    page,
  }) => {
    await page.goto("/booking");

    // Étape 1 : Service
    await expect(page.getByText("Consultation")).toBeVisible();
    await page.getByText("Détartrage").click();

    // Étape 2 : Date — sélectionne un jour disponible dans le calendrier
    await expect(page.getByText(/mois précédent|mois suivant/i).first()).toBeVisible;
    const availableDay = page
      .locator("button")
      .filter({ hasNotText: /^$/ })
      .and(page.locator(":not([disabled])"))
      .first();
    await availableDay.click();

    // Étape 3 : Heure — attend le chargement des créneaux puis en choisit un
    await page.waitForResponse((res) =>
      res.url().includes("/api/appointments/availability")
    );
    const firstSlot = page.locator("button", { hasText: /^\d{2}:\d{2}$/ }).first();
    if (await firstSlot.isVisible().catch(() => false)) {
      await firstSlot.click();
    }

    // Étape 4 : Informations personnelles
    await page.getByLabel(/nom complet/i).fill("Marie Test");
    await page.getByLabel(/téléphone/i).fill("659000000");
    await page.getByLabel(/^email$/i).fill("marie.test@example.com");
    await page.getByRole("button", { name: /suivant/i }).click();

    // Étape 5 : Paiement
    await expect(page.getByText(/mode de paiement/i)).toBeVisible();
    await page.getByText("Paiement sur place").click();
    await page.getByRole("button", { name: /suivant/i }).click();

    // Étape 6 : Résumé
    await expect(page.getByText(/résumé de votre rendez-vous/i)).toBeVisible();
    await expect(page.getByText("Marie Test")).toBeVisible();
  });

  test("le sélecteur de service pré-remplit via l'URL", async ({ page }) => {
    await page.goto("/booking?service=extraction");
    // Le wizard doit démarrer directement à l'étape 2 (date) si le service est pré-sélectionné
    await expect(page.getByText(/date/i).first()).toBeVisible();
  });
});
