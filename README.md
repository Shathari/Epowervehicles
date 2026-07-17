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
├── backend/    Express + TypeScript + Prisma/SQLite — auth + full REST APIs for an external dashboard
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
├── config/       zod-validated env, Prisma client (SQLite via better-sqlite3 adapter)
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
uploads/          admin-uploaded product images (gitignored — runtime data, like dev.db)
```

See [`docs/API.md`](docs/API.md) for the full endpoint + query-parameter reference. Products,
Contact Messages, Dealership Applications, and Sales Partner Applications all support
`GET`/`GET :id`/`POST`/`PUT`/`PATCH`/`DELETE` with `page`/`pageSize`/`sortBy`/`sortOrder`/`search`
on their list endpoints — built for an external dashboard to consume directly.

## Getting started

```bash
npm install                       # installs both workspaces
cp backend/.env.example backend/.env   # then fill in JWT secrets + ADMIN_PASSWORD
npm run --workspace backend prisma:migrate  # creates backend/dev.db
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
