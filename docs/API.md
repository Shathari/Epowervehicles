# EPOWER Vehicles API

Base URL: `http://localhost:4000/api` in development (see `backend/.env.example`).

**This app has no admin UI** — the frontend in this repo is public-only. All admin/CRUD
operations are meant to be driven by an external dashboard calling these endpoints directly with
its own JWT (via `/auth/login`). The auth system itself (JWT access/refresh + ADMIN role) is
unchanged from before and is what that external dashboard authenticates against.

All responses use one of two shapes:

```jsonc
// success
{ "success": true, "data": /* T */ }

// failure
{ "success": false, "message": "Human-readable message", "errors": { "field": ["reason"] } }
```

`errors` is only present for validation failures (HTTP 400).

## Auth

Access tokens are short-lived JWTs (default 15 min) returned in the response body and expected
on subsequent requests as `Authorization: Bearer <token>`. Refresh tokens are httpOnly cookies
scoped to `/api/auth`, issued on login and rotated on every refresh — never exposed to JS.

| Method | Path            | Auth | Description                                              |
| ------ | --------------- | ---- | ---------------------------------------------------------- |
| POST   | `/auth/login`   | none | `{ email, password }` → `{ user, accessToken }` + sets refresh cookie |
| POST   | `/auth/refresh` | refresh cookie | Rotates the refresh cookie → `{ user, accessToken }` |
| POST   | `/auth/logout`  | none | Clears the refresh cookie |

Rate limited to 20 requests / 15 min per IP.

## List query parameters (Products, Contact Messages, Dealership & Sales Partner Applications)

These four resources share one query-parsing helper (`backend/src/utils/listQuery.ts`) and all
`GET` list endpoints accept:

| Param       | Default             | Notes                                                              |
| ----------- | -------------------- | -------------------------------------------------------------------- |
| `page`      | `1`                  | 1-indexed                                                            |
| `pageSize`  | `100`                | capped at `100`                                                      |
| `sortBy`    | resource-specific     | must be one of the resource's allowed sortable fields, else ignored  |
| `sortOrder` | `desc`               | `asc` \| `desc`                                                      |
| `search`    | —                    | free-text, case-insensitive `contains` across a resource's searchable text fields |

List responses return `{ items: T[], total, page, pageSize, totalPages }` as `data` — **not** a
bare array (this is a breaking shape change from the previous version of this API).

## Products

| Method | Path                | Auth            | Description                                                        |
| ------ | ------------------- | --------------- | -------------------------------------------------------------------- |
| GET    | `/products`         | none (optional) | List (paginated/filterable, see above). Active-only for anonymous callers; all products (incl. inactive) with a valid ADMIN token. Extra filters: `category`, `isActive=true\|false`, `isFeatured=true\|false` |
| GET    | `/products/featured` | none            | Returns the single `isFeatured` active product (falls back to the lowest-`order` active product if none is flagged), or `null` |
| GET    | `/products/:id`     | none (optional) | Single product by id |
| POST   | `/products`         | ADMIN           | Create a product |
| POST   | `/products/upload`  | ADMIN           | `multipart/form-data`, field `image` (png/jpeg/webp/svg, max 5 MB) → `{ url }`, an absolute URL under `/uploads` ready to use as `imageUrl` |
| PUT    | `/products/:id`     | ADMIN           | Full replace — omitted optional fields reset to their defaults (unlike PATCH) |
| PATCH  | `/products/:id`     | ADMIN           | Partially update a product |
| DELETE | `/products/:id`     | ADMIN           | Delete a product |

Product shape: `{ id, name, category, description, imageUrl, specLine, rangeText, capacityText,
chargeTimeText, isFeatured, order, isActive, createdAt, updatedAt }`. `category` is one of
`rickshaw | loader | dumper | scooty | cart | auto | custom`. `rangeText` / `capacityText` /
`chargeTimeText` are flexible display strings (e.g. `"80–100 km"`, `"3 Passengers"` or `"500 kg"`,
`"6–8 hrs"`) shown as the three stat boxes on product cards and the Featured Product section.
`imageUrl` is optional — when absent, the frontend renders a local per-category SVG icon
(`frontend/src/components/icons/VehicleIcons.tsx`) instead of a broken image or a fabricated stock
photo; setting a real `imageUrl` (via upload or a direct URL) swaps it in automatically with no
layout or code change. Sortable fields: `order` (default), `name`, `createdAt`, `updatedAt`.
Searchable fields: `name`, `description`.

## Dealership applications

| Method | Path                            | Auth  | Description                          |
| ------ | -------------------------------- | ----- | --------------------------------------- |
| GET    | `/dealership-applications`       | ADMIN | List (paginated/filterable). Extra filter: `status` |
| GET    | `/dealership-applications/:id`   | ADMIN | Single application by id |
| POST   | `/dealership-applications`       | none  | Submit an application (rate limited: 10 / 15 min per IP) |
| PUT    | `/dealership-applications/:id`   | ADMIN | Full replace of `{ name, email, phone, city, message, status? }` |
| PATCH  | `/dealership-applications/:id`   | ADMIN | Update `{ status }` — `pending \| contacted \| approved \| rejected` |
| DELETE | `/dealership-applications/:id`   | ADMIN | Delete an application |

Sortable: `createdAt` (default), `updatedAt`, `name`, `city`, `status`. Searchable: `name`,
`email`, `phone`, `city`, `message`.

## Contact messages

| Method | Path                     | Auth  | Description                          |
| ------ | ------------------------ | ----- | --------------------------------------- |
| GET    | `/contact-messages`      | ADMIN | List (paginated/filterable). Extra filter: `status` |
| GET    | `/contact-messages/:id`  | ADMIN | Single message by id |
| POST   | `/contact-messages`      | none  | Submit a message (rate limited: 10 / 15 min per IP) |
| PUT    | `/contact-messages/:id`  | ADMIN | Full replace of `{ name, email, phone, message, status? }` |
| PATCH  | `/contact-messages/:id`  | ADMIN | Update `{ status }` — `unread \| read \| responded` |
| DELETE | `/contact-messages/:id`  | ADMIN | Delete a message |

Sortable: `createdAt` (default), `updatedAt`, `name`, `status`. Searchable: `name`, `email`,
`phone`, `message`.

On a new dealership application or contact message, the API also attempts to send an SMTP
notification email (see `SMTP_*` / `NOTIFY_TO_EMAIL` in `.env`) — it silently no-ops if SMTP
isn't configured, so this is optional.

## Sales Partner applications

The "Join As Sales Partner" page (`/sales-partner`) both persists the application AND opens a
prefilled `wa.me` link with the applicant's details (same WhatsApp-first flow as the Home/Contact
"Chat on WhatsApp" buttons, see `frontend/src/utils/whatsapp.ts`) — the WhatsApp handoff still
happens even if the backend save fails, so a backend hiccup never blocks the user-facing flow.

| Method | Path                              | Auth  | Description                          |
| ------ | ---------------------------------- | ----- | --------------------------------------- |
| GET    | `/sales-partner-applications`      | ADMIN | List (paginated/filterable). Extra filter: `status` |
| GET    | `/sales-partner-applications/:id`  | ADMIN | Single application by id |
| POST   | `/sales-partner-applications`      | none  | Submit an application (rate limited: 10 / 15 min per IP) |
| PUT    | `/sales-partner-applications/:id`  | ADMIN | Full replace (all applicant fields + optional `status`) |
| PATCH  | `/sales-partner-applications/:id`  | ADMIN | Update `{ status }` — `pending \| contacted \| approved \| rejected` |
| DELETE | `/sales-partner-applications/:id`  | ADMIN | Delete an application |

Sortable: `createdAt` (default), `updatedAt`, `fullName`, `city`, `state`, `status`. Searchable:
`fullName`, `whatsappNumber`, `email`, `city`, `state`.

## Users

Admin-only management of who can authenticate against this API. Not paginated (not named in the
"full REST" requirement, and the list is small/internal). Every response strips `passwordHash`.

| Method | Path         | Auth  | Description                          |
| ------ | ------------ | ----- | --------------------------------------- |
| GET    | `/users`     | ADMIN | List all users |
| POST   | `/users`     | ADMIN | Create a user — `{ email, password, role }` |
| PUT    | `/users/:id` | ADMIN | Full replace — `{ email, role, password? }` (omit password to keep the current one) |
| PATCH  | `/users/:id` | ADMIN | Partial update, same shape as PUT |
| DELETE | `/users/:id` | ADMIN | Delete a user — rejected with 409 if you're deleting your own currently-logged-in account, or the last remaining user (prevents an admin lockout) |

## Site stats

Singleton resource (not paginated) powering the Home page's "Vehicles Sold / Dealers / States
Covered" figures.

| Method | Path     | Auth  | Description                                                    |
| ------ | -------- | ----- | ------------------------------------------------------------------ |
| GET    | `/stats` | none  | Returns `{ id, vehiclesSold, dealersCount, statesCovered, updatedAt }` |
| PATCH  | `/stats` | ADMIN | Update any subset of `{ vehiclesSold, dealersCount, statesCovered }` |

## About page content

Singleton resource (not paginated) behind the public About page — fully admin-editable so none of
it is hardcoded in the frontend.

| Method | Path      | Auth  | Description                                                    |
| ------ | --------- | ----- | ------------------------------------------------------------------ |
| GET    | `/about`  | none  | Returns `{ id, heroTitle, heroSubtitle, companyIntro, missionText, visionText, coreValues, servicesIntro, services, environmentalImpact, updatedAt }` — `coreValues`/`services` are arrays of `{ title, description }` |
| PATCH  | `/about`  | ADMIN | Update any subset of the same fields |

## Database

Postgres (hosted on [Neon](https://neon.tech)) in every environment, via Prisma's
`@prisma/adapter-pg` driver adapter (`backend/src/config/prisma.ts`) — Prisma 7's generated client
always requires an explicit driver adapter, there's no adapter-less fallback for any provider.
`DATABASE_URL` is Neon's pooled connection string (the `-pooler` host, works fine with the
standard `pg` driver over PgBouncer). To point at a different Postgres host, just change
`DATABASE_URL`; the datasource provider and adapter don't need to change since any standard
Postgres connection string works the same way.

## Deployment

- **Frontend**: `.github/workflows/deploy.yml` builds `frontend/` and publishes it to GitHub
  Pages on every push to `main`. One-time manual step: in the repo's Settings → Pages, set
  "Source" to **GitHub Actions** (it was previously "Deploy from a branch"). Set a repository
  variable `VITE_API_BASE_URL` to your deployed backend's URL (e.g.
  `https://api.epowervehicles.com/api`) so the production build points at the real API instead
  of `localhost`.
- **Backend**: not deployed by this repo's automation — GitHub Pages only serves static files.
  `backend/Dockerfile` builds a runnable image; deploy it to any Node-friendly host (Render,
  Railway, Fly.io, a VPS, etc.) with the environment variables from `backend/.env.example`.
  Remember to set `CORS_ORIGIN` to the deployed frontend's origin **and** the origin of whatever
  external admin dashboard will call these APIs.
