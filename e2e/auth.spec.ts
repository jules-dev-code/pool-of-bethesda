import { test, expect } from "@playwright/test";

test.describe("Authentification admin", () => {
  test("un accès non authentifié au dashboard redirige vers /login", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("la page de login affiche le formulaire attendu", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /se connecter/i })).toBeVisible();
  });

  test("une tentative de connexion avec des identifiants invalides échoue proprement", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel(/email/i).fill("inconnu@example.com");
    await page.getByLabel(/mot de passe/i).fill("mauvaispassword");
    await page.getByRole("button", { name: /se connecter/i }).click();
    await expect(page.getByText(/identifiants incorrects/i)).toBeVisible();
  });

  test("une connexion avec les identifiants du seed redirige vers le dashboard", async ({
    page,
  }) => {
    // ⚠️ Suppose que `npx prisma db seed` a été exécuté sur l'environnement de test
    await page.goto("/login");
    await page.getByLabel(/email/i).fill("myriamkengne85@gmail.com");
    await page.getByLabel(/mot de passe/i).fill("ChangeMe123!");
    await page.getByRole("button", { name: /se connecter/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
    await expect(page.getByText(/bonjour/i)).toBeVisible();
  });
});
