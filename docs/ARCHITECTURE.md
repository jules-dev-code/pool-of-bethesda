# Architecture — Cabinet Dentaire Pool of Bethesa

## Vue d'ensemble

Application web bilingue (FR/EN) construite avec **Next.js 15 (App Router)**, combinant :
- Un **site public** de présentation et de réservation en ligne
- Un **dashboard administrateur** protégé pour la gestion opérationnelle du cabinet

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Server Actions) |
| Langage | TypeScript strict |
| UI | TailwindCSS + Radix UI (primitives Shadcn-style) |
| Animations | Framer Motion |
| Formulaires | React Hook Form + Zod |
| Base de données | PostgreSQL (via Supabase) |
| ORM | Prisma |
| Authentification admin | Session JWT maison (`jose`), cookies httpOnly |
| Emails | Resend + React Email |
| Stockage images | Cloudinary |
| i18n | next-intl |
| Graphiques | Recharts |
| Déploiement | Vercel |

## Arborescence des routes

```
app/
├── (fr)/                  Route group — français, servi à la racine "/"
│   ├── page.tsx           Accueil
│   ├── about/
│   ├── services/
│   │   └── [slug]/        Détail service (généré statiquement)
│   ├── faq/
│   ├── contact/
│   └── booking/           Wizard de réservation
├── en/                    Segment réel — anglais, préfixé "/en"
│   └── (même structure que (fr))
├── dashboard/             Espace admin (protégé par middleware)
│   ├── page.tsx           Accueil dashboard (stats)
│   ├── appointments/
│   ├── availability/
│   ├── services/
│   ├── gallery/
│   ├── testimonials/
│   ├── faq/
│   ├── analytics/
│   ├── logs/
│   ├── settings/
│   └── profile/
├── login/                 Connexion admin
├── api/
│   └── appointments/availability/   Endpoint créneaux disponibles
├── sitemap.ts / robots.ts / manifest.ts
└── layout.tsx              Layout racine (UNIQUE <html>/<body> de l'app)
```

### ⚠️ Point d'attention structurel important

Next.js n'autorise **qu'une seule paire `<html>/<body>`** dans toute l'application.
Le layout racine (`app/layout.tsx`) est le seul à définir ces balises. Tous les
layouts imbriqués (`app/(fr)/layout.tsx`, `app/en/layout.tsx`, `app/dashboard/layout.tsx`)
ne retournent que des fragments/providers. L'attribut `lang` du `<html>` est mis à jour
dynamiquement côté client via le composant `SetHtmlLang`.

Si vous ajoutez de nouveaux layouts, **ne réintroduisez jamais `<html>`/`<body>`** dans un
layout imbriqué : cela casserait le rendu (balises dupliquées, erreurs d'hydratation).

## Flux de données

### Site public
Les pages utilisent des **Server Components** pour le rendu initial (SEO, performance),
avec `revalidate = 3600` (ISR) sur les pages de contenu semi-statique.

### Réservation
1. Le client sélectionne un service (donnée statique `lib/data/services.ts`)
2. Le calendrier interroge `/api/appointments/availability?date=...` (route API)
3. La disponibilité est calculée par `lib/services/availability.ts` en croisant :
   - les horaires d'ouverture (`OpeningHour`)
   - les rendez-vous existants (`Appointment`)
   - les blocages admin (`BlockedSlot`)
4. La soumission finale passe par la **Server Action** `createAppointment` qui :
   - valide les données (Zod)
   - vérifie l'absence de conflit dans une **transaction Prisma atomique**
   - envoie les emails de confirmation (patient + cabinet) via Resend

### Dashboard admin
Toutes les mutations passent par des **Server Actions** dans `lib/actions/*-admin.ts`,
protégées par vérification de session (`getSession()`), avec traçabilité systématique
via `logActivity()` (table `ActivityLog`).

## Sécurité

- Session admin : JWT signé (HS256), cookie `httpOnly` + `secure` + `sameSite: lax`
- Vérification cryptographique du JWT dans le **middleware** (Edge Runtime, via `jose`)
- Rate limiting en mémoire sur les endpoints publics sensibles (réservation, contact)
- Content-Security-Policy + headers HTTP durcis (`next.config.mjs`)
- Validation Zod systématique côté serveur (jamais de confiance aveugle au client)

## Modèle de données

Voir `prisma/schema.prisma` pour le schéma complet. Points clés :
- `Appointment.status` : `PENDING → CONFIRMED/CANCELLED → COMPLETED`
- `Service.slug` est la clé publique utilisée par le site (jamais l'`id` Prisma)
- `Settings` est un singleton (`id: "settings"`)
- `ActivityLog` trace toutes les actions admin (connexions, CRUD)
