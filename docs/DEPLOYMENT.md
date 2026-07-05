# Guide de déploiement — Vercel

## 1. Prérequis

- Un compte [Vercel](https://vercel.com)
- Un projet [Supabase](https://supabase.com) (base PostgreSQL + Auth)
- Un compte [Resend](https://resend.com) (envoi d'emails transactionnels)
- Un compte [Cloudinary](https://cloudinary.com) (stockage/optimisation d'images)
- Un nom de domaine (optionnel mais recommandé)

## 2. Créer la base de données Supabase

1. Créez un nouveau projet sur [supabase.com](https://supabase.com)
2. Dans **Project Settings → Database**, copiez la **Connection String** (mode `Transaction` recommandé pour Prisma + Vercel serverless)
3. Dans **Project Settings → API**, copiez `URL` et `anon public key`

## 3. Configurer Resend

1. Créez un compte sur [resend.com](https://resend.com)
2. Vérifiez votre domaine d'envoi (obligatoire pour la production — sinon utilisez `onboarding@resend.dev` en test)
3. Générez une clé API

## 4. Configurer Cloudinary

1. Créez un compte sur [cloudinary.com](https://cloudinary.com)
2. Récupérez `Cloud Name`, `API Key` et `API Secret` depuis le dashboard

## 5. Déployer sur Vercel

### Option A — via l'interface Vercel

1. Poussez ce projet sur un dépôt GitHub/GitLab
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt
3. Vercel détecte automatiquement Next.js — laissez les réglages par défaut (`vercel.json` fournit déjà `buildCommand: prisma generate && next build`)
4. Renseignez les **variables d'environnement** (voir section suivante)
5. Cliquez sur **Deploy**

### Option B — via la CLI Vercel

```bash
npm install -g vercel
vercel login
vercel link
vercel env pull .env   # si les variables sont déjà configurées côté dashboard
vercel --prod
```

## 6. Variables d'environnement à renseigner sur Vercel

Copiez chaque variable de `.env.example` dans **Project Settings → Environment Variables** :

| Variable | Où la trouver |
|---|---|
| `DATABASE_URL` | Supabase → Settings → Database (connection string, mode Transaction) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `NEXTAUTH_SECRET` | Générez avec `openssl rand -base64 32` |
| `RESEND_API_KEY` | Resend → API Keys |
| `EMAIL_FROM` | Adresse vérifiée sur Resend |
| `EMAIL_CLINIC_NOTIFICATIONS` | `myriamkengne85@gmail.com` |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_SECRET` | Cloudinary → Dashboard |
| `NEXT_PUBLIC_SITE_URL` | URL finale du site (ex: `https://pool-of-bethesda.com`) |

## 7. Initialiser la base de données en production

Une fois le premier déploiement terminé, exécutez **une seule fois** depuis votre machine locale (avec `DATABASE_URL` pointant vers la base de production) :

```bash
npx prisma db push
npx prisma db seed
```

Cela crée les tables, les services par défaut, les horaires, les paramètres et le compte admin (`myriamkengne85@gmail.com` / `ChangeMe123!`).

**⚠️ Connectez-vous immédiatement au dashboard et changez ce mot de passe.**

## 8. Configurer le domaine personnalisé

1. Dans Vercel → **Project → Settings → Domains**, ajoutez votre domaine
2. Suivez les instructions DNS fournies (enregistrements A/CNAME chez votre registrar)
3. Mettez à jour `NEXT_PUBLIC_SITE_URL` avec le domaine final et redéployez

## 9. Vérifications post-déploiement

- [ ] Le site se charge en français (`/`) et anglais (`/en`)
- [ ] La réservation d'un rendez-vous fonctionne de bout en bout (email reçu)
- [ ] La connexion admin fonctionne (`/login` → `/dashboard`)
- [ ] Le mot de passe admin par défaut a été changé
- [ ] `sitemap.xml` et `robots.txt` sont accessibles
- [ ] Les images uploadées dans la galerie apparaissent bien (test Cloudinary)
- [ ] Lighthouse : Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95

## 10. Maintenance courante

```bash
# Voir les migrations en attente
npx prisma migrate status

# Appliquer une migration en production
npx prisma migrate deploy

# Ouvrir Prisma Studio pour inspecter les données
npx prisma studio
```
