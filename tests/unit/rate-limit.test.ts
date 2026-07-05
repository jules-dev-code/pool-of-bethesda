import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/security/rate-limit";

describe("rateLimit", () => {
  it("autorise les requêtes tant que la limite n'est pas atteinte", () => {
    const key = `test-${Date.now()}-a`;
    for (let i = 0; i < 3; i++) {
      const result = rateLimit(key, { limit: 3, windowMs: 60_000 });
      expect(result.success).toBe(true);
    }
  });

  it("bloque la requête une fois la limite dépassée", () => {
    const key = `test-${Date.now()}-b`;
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    const third = rateLimit(key, { limit: 2, windowMs: 60_000 });
    expect(third.success).toBe(false);
  });

  it("réinitialise le compteur après expiration de la fenêtre", async () => {
    const key = `test-${Date.now()}-c`;
    rateLimit(key, { limit: 1, windowMs: 10 });
    await new Promise((resolve) => setTimeout(resolve, 20));
    const result = rateLimit(key, { limit: 1, windowMs: 10 });
    expect(result.success).toBe(true);
  });
});
