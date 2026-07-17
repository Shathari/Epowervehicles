# EPOWER Vehicles

Website and admin backend for EPOWER Vehicles Pvt Ltd — an EV manufacturer offering E-Rickshaws,
E-Loaders, E-Dumpers, E-Scooters, E-Carts, and E-Autos. Dark theme with neon-green accents, soft
per-section gradient themes, and WhatsApp-first enquiries alongside the backend-managed contact
flow.

This is an npm workspaces monorepo:

```
epowervehicles/
├── frontend/   React 19 + TypeScript + Vite + Tailwind CSS v4 — the public site + admin panel
├── backend/    Express + TypeScript + Prisma/SQLite — auth, products, leads, messages API
├── docs/       API.md — endpoint reference and deployment notes
└── .github/    GitHub Actions workflow that deploys frontend/ to GitHub Pages
```

## Frontend (`frontend/`)

```
src/
├── assets/        self-hosted images
├── components/
│   ├── layout/    Navbar (dark theme, real mobile hamburger menu), Footer, Layout, AdminLayout
│   ├── ui/        Button, Input, Textarea, Select, Spinner, EmptyState, ErrorState, Card,
│   │              WhatsAppButton — the 7 form/state atoms take an additive `tone: 'light'|'dark'`
│   │              prop (default 'light') so the admin panel keeps its own separate light theme
│   ├── icons/     hand-drawn inline SVG icons (form field icons, WhatsApp) — no icon-library dep
│   └── sections/  Hero, GradientSection (the 4 gradient section themes), StatsBand, FeatureGrid,
│                  ProductCard, ValueBox, RevealOnScroll (scroll-in animation), …
├── pages/         Home, About, Products, Dealership, Contact, SalesPartner, admin/*
├── forms/         ContactForm, DealershipForm, SalesPartnerForm + zod schemas (react-hook-form)
├── hooks/         useAuth, useInView, useDocumentTitle, and TanStack Query hooks per API resource
├── services/      typed fetch wrapper + one module per API resource
├── context/       AuthContext (silent session restore via httpOnly refresh cookie)
├── router/        route definitions, lazy-loaded pages, ProtectedRoute for /admin/*
├── utils/         whatsapp.ts — builds prefilled wa.me links
└── types/         shared DTO types mirroring the backend
```

Public pages (Home, About, Products, Dealership, Contact, and the new Sales Partner page) use a
dark theme with neon-green accents and soft per-section gradients (yellow=hero, orange=range,
red=CTA, green=benefits). Products are served from the backend, and the Contact/Dealership forms
submit to the backend (with validation, loading states, and toast notifications) — WhatsApp is
offered alongside as a fast-path, not a replacement. The Sales Partner form is WhatsApp-only by
design: it validates, then opens a prefilled `wa.me` link and shows a success banner. `/admin` is a
protected panel (JWT login, kept on the original light theme) for managing products (incl. the new
categories and an optional per-product spec line), dealership leads, contact messages, and the
Home page's stats band numbers.

## Backend (`backend/`)

```
src/
├── config/       zod-validated env, Prisma client (SQLite via better-sqlite3 adapter)
├── controllers/  request/response glue — thin, delegate to services
├── services/     business logic + Prisma queries
├── middleware/   authenticate, requireRole, validate (zod), rateLimiter, errorHandler
├── validators/   zod schemas per resource
├── routes/       one router per resource, mounted under /api
└── utils/        logger (pino), AppError, JWT helpers
prisma/
├── schema.prisma User / Product / DealershipApplication / ContactMessage / SiteStats
└── seed.ts       creates the admin user, the 4 original products, and a zeroed SiteStats row
```

See [`docs/API.md`](docs/API.md) for the full endpoint reference.

## Getting started

```bash
npm install                       # installs both workspaces
cp backend/.env.example backend/.env   # then fill in JWT secrets + ADMIN_PASSWORD
npm run --workspace backend prisma:migrate  # creates backend/dev.db
npm run --workspace backend seed            # admin user + starter products

npm run dev:backend               # http://localhost:4000
npm run dev:frontend              # http://localhost:5173
```

Log into `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `backend/.env`.

## Scripts (root)

- `npm run dev:frontend` / `npm run dev:backend` — start each dev server
- `npm run build:frontend` — production build of the frontend
- `npm run typecheck` / `npm run lint` — run across both workspaces

## Deployment

The frontend auto-deploys to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`).
The backend is not auto-deployed — see [`docs/API.md`](docs/API.md#deployment) for the one-time
GitHub Pages setting change needed and backend hosting notes.
