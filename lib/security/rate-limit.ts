/**
 * Rate limiter en mémoire, basé sur une fenêtre glissante simple.
 *
 * ⚠️ Limitation connue : ce store en mémoire est local à chaque instance de
 * serveur (non partagé entre lambdas Vercel). Pour une protection robuste en
 * production à fort trafic, remplacer par Upstash Redis (@upstash/ratelimit)
 * qui fonctionne nativement avec Vercel Edge Functions.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  /** Nombre maximum de requêtes autorisées dans la fenêtre */
  limit: number;
  /** Durée de la fenêtre en millisecondes */
  windowMs: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count };
}

// Nettoyage périodique pour éviter une fuite mémoire sur les process longue durée
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }, 5 * 60 * 1000);
}
