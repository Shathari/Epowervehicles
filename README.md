# EPOWER Vehicles

Public website for EPOWER Vehicles Pvt Ltd — an EV manufacturer offering E-Rickshaws, E-Loaders,
E-Dumpers, E-Scooters, E-Carts, and E-Autos. Premium dark theme with neon-green accents,
glassmorphism cards, and Framer Motion animations, following the approved design reference
(`import-custom-45846873.figma.site`). WhatsApp-first enquiries alongside backend-persisted
Contact/Dealership/Sales-Partner submissions.

**No admin UI lives in this repo.** The backend exposes full REST APIs (with pagination,
filtering, search, and sorting) meant to be consumed by a separate external admin dashboard, using
the same JWT auth this API has always had.

This is an npm workspaces monorepo:

```
epowervehicles/
├── frontend/   React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion — the public site
├── backend/    Express + TypeScript + Prisma/Postgres (Neon) — auth + full REST APIs for an external dashboard
├── docs/       API.md — endpoint reference (query params, pagination, deployment notes)
└── .github/    GitHub Actions workflow that deploys frontend/ to GitHub Pages
```

## Frontend (`frontend/`)

```
src/
├── assets/        self-hosted images (logo)
├── components/
│   ├── layout/    Navbar (Home/Products/Dealership/Join as Sales Partner/About Us/Chat-Enquire),
│   │              Footer, Layout
│   ├── ui/        Button, Input, Textarea, Select, Spinner, EmptyState, ErrorState, Card,
│   │              WhatsAppButton (solid/inverted variants for use on light vs dark backgrounds)
│   ├── icons/     hand-drawn inline SVGs — form fields, WhatsApp, bank/finance, and a
│   │              per-category VehicleIcons set used as the product image placeholder whenever a
│   │              product has no photo — no icon-library dependency
│   └── sections/  Hero, SectionGlow (soft glow + grid texture, used sparingly), FeaturedProduct,
│                  HappyCustomers (animated stat counters + testimonials), FinancePartners,
│                  ProductCard (category-accent gradient border), FeatureGrid, RevealOnScroll
│                  (Framer Motion whileInView entrance animation), …
├── pages/         Home, About, Products, Dealership, Contact, SalesPartner
├── forms/         ContactForm, DealershipForm, SalesPartnerForm + zod schemas (react-hook-form)
├── hooks/         useDocumentTitle, useFeaturedProduct, and a TanStack Query hook per public
│                  GET/POST the frontend actually calls
├── services/      typed fetch wrapper + one module per API resource (read/submit only — no
│                  create/update/delete calls live here, that's the external dashboard's job)
├── router/        route definitions, lazy-loaded pages (no protected routes — public-only app)
├── utils/         whatsapp.ts — builds prefilled wa.me links
└── types/         shared DTO types mirroring the backend
```

Every public page (Home, About, Products, Dealership, Contact, Sales Partner) uses the same dark/
neon-green system: near-black backgrounds throughout, one soft lime glow behind the hero/page
headers (`SectionGlow`), and color variety expressed narrowly via a gradient accent bar per product
category (green/orange/red/amber/cyan/purple) rather than large flat-colored section washes.
Products, Contact messages, Dealership/Sales-Partner applications, and the About page's entire
content are all served from the backend — nothing is hardcoded. The Home page leads with a premium
hero (headline, CTAs, trust badges, a compact featured-vehicle glass card — no large static hero
image), followed immediately by a full **Featured Product** section (image, description, range/
capacity/charge-time stat boxes, Enquire + WhatsApp), the product range, "Why EPOWER", **Happy
Customers** (animated stats + sample testimonials — clearly placeholder until real ones are added),
**Finance Partners** (placeholder logo cards), and a solid neon CTA band. The Products page groups
every product by category (E-Rickshaw/E-Loader/E-Dumper/E-Scooter/E-Cart/E-Auto/Custom) rather than
one flat grid. Products with no photo render a local per-category SVG icon instead of a broken
image or a fabricated stock photo — setting a real image later (via the external dashboard's
upload/URL) swaps it in automatically, no code change.

## Backend (`backend/`)

```
src/
├── config/       zod-validated env, Prisma client (Postgres via @prisma/adapter-pg)
├── controllers/  request/response glue — thin, delegate to services
├── services/     business logic + Prisma queries
├── middleware/   authenticate, requireRole, validate (zod), rateLimiter, errorHandler, upload (multer)
├── validators/   zod schemas per resource
├── routes/       one router per resource, mounted under /api
└── utils/        logger (pino), AppError, JWT helpers, listQuery.ts (shared pagination/sort/search parsing)
prisma/
├── schema.prisma User / Product / DealershipApplication / ContactMessage / SiteStats /
│                 SalesPartnerApplication / AboutContent
└── seed.ts       admin user, 7 starter products (one per category, marked E-Rickshaw as featured),
                  starter SiteStats/About content matching the design reference
uploads/          admin-uploaded product images (gitignored runtime data)
```

See [`docs/API.md`](docs/API.md) for the full endpoint + query-parameter reference. Products,
Contact Messages, Dealership Applications, and Sales Partner Applications all support
`GET`/`GET :id`/`POST`/`PUT`/`PATCH`/`DELETE` with `page`/`pageSize`/`sortBy`/`sortOrder`/`search`
on their list endpoints — built for an external dashboard to consume directly.

## Getting started

```bash
npm install                       # installs both workspaces
cp backend/.env.example backend/.env   # then fill in DATABASE_URL, JWT secrets + ADMIN_PASSWORD
npm run --workspace backend prisma:migrate  # applies migrations to your Postgres database
npm run --workspace backend seed            # admin user + starter products/content

npm run dev:backend               # http://localhost:4000
npm run dev:frontend              # http://localhost:5173
```

The `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `backend/.env` are for your external dashboard to
log in with via `POST /api/auth/login` — there's no login page in this repo.

## Scripts (root)

- `npm run dev:frontend` / `npm run dev:backend` — start each dev server
- `npm run build:frontend` — production build of the frontend
- `npm run typecheck` / `npm run lint` — run across both workspaces

## Deployment

The frontend auto-deploys to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`).
The backend is not auto-deployed — see [`docs/API.md`](docs/API.md#deployment) for the one-time
GitHub Pages setting change needed and backend hosting notes.

### Deployment environment variables

The backend validates all of these at startup (`backend/src/config/env.ts`, via Zod) and refuses
to boot with a clear error if a required one is missing or invalid — see `backend/.env.example`
for placeholder values. On a platform like Render, set these as real environment variables in the
service's dashboard; do **not** upload or bake in a `.env` file (the Dockerfile's `.dockerignore`
excludes it from the build on purpose).

| Variable                   | Required?             | Purpose                                                                 |
| --------------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `NODE_ENV`                  | No (default `development`) | `development` \| `test` \| `production` |
| `PORT`                      | No (default `4000`)   | Port the Express server listens on |
| `CORS_ORIGIN`               | **Yes**                | Origin allowed to call the API with credentials — the deployed frontend's URL in production |
| `DATABASE_URL`              | **Yes**                | Postgres connection string (Neon in production, or any Postgres for local dev) |
| `JWT_ACCESS_SECRET`         | **Yes**                | Signs short-lived JWT access tokens. Long, random, unique — e.g. `openssl rand -hex 32` |
| `JWT_REFRESH_SECRET`        | **Yes**                | Signs the httpOnly rotating refresh cookie. Must differ from `JWT_ACCESS_SECRET` |
| `ACCESS_TOKEN_TTL_MINUTES`  | No (default `15`)     | Access token lifetime, in minutes |
| `REFRESH_TOKEN_TTL_DAYS`    | No (default `7`)      | Refresh cookie lifetime, in days |
| `ADMIN_EMAIL`               | **Yes**                | Email of the first admin user, created once by `prisma/seed.ts` |
| `ADMIN_PASSWORD`            | **Yes**                | Password of that first admin user (min. 8 characters) — change it after first login |
| `SMTP_HOST`                 | No                     | SMTP server host for new-submission notification emails |
| `SMTP_PORT`                 | No (default `587`)    | SMTP server port |
| `SMTP_USER`                 | No                     | SMTP auth username |
| `SMTP_PASS`                 | No                     | SMTP auth password |
| `SMTP_FROM`                 | No                     | "From" address for notification emails |
| `NOTIFY_TO_EMAIL`           | No                     | Address that receives new contact/dealership/sales-partner notification emails |

The six `SMTP_*`/`NOTIFY_TO_EMAIL` variables are entirely optional and independent of each other's
requiredness — leaving all of them unset simply disables email notifications
(`isSmtpConfigured` in `env.ts` becomes `false`); every other feature works normally without them.
