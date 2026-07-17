# EPOWER Vehicles API

Base URL: `http://localhost:4000/api` in development (see `backend/.env.example`).

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

## Products

| Method | Path             | Auth        | Description                                                        |
| ------ | ---------------- | ----------- | -------------------------------------------------------------------- |
| GET    | `/products`      | none (optional) | Active products only for anonymous callers; all products (including inactive) when called with a valid ADMIN access token |
| POST   | `/products`      | ADMIN       | Create a product |
| PATCH  | `/products/:id`  | ADMIN       | Partially update a product |
| DELETE | `/products/:id`  | ADMIN       | Delete a product |

Product shape: `{ id, name, category, description, imageUrl, specLine, order, isActive, createdAt, updatedAt }`.
`category` is one of `rickshaw | loader | dumper | scooty | cart | auto | custom`. `specLine` is an
optional free-text line (e.g. `"80 km range · 4 passengers · 4–5 hr charge"`) shown on the product
card when present.

## Dealership applications

| Method | Path                          | Auth  | Description                          |
| ------ | ----------------------------- | ----- | -------------------------------------- |
| GET    | `/dealership-applications`    | ADMIN | List all applications |
| POST   | `/dealership-applications`    | none  | Submit an application (rate limited: 10 / 15 min per IP) |
| PATCH  | `/dealership-applications/:id`| ADMIN | Update `{ status }` — `pending \| contacted \| approved \| rejected` |
| DELETE | `/dealership-applications/:id`| ADMIN | Delete an application |

## Contact messages

| Method | Path                     | Auth  | Description                          |
| ------ | ------------------------ | ----- | --------------------------------------- |
| GET    | `/contact-messages`      | ADMIN | List all messages |
| POST   | `/contact-messages`      | none  | Submit a message (rate limited: 10 / 15 min per IP) |
| PATCH  | `/contact-messages/:id`  | ADMIN | Update `{ status }` — `unread \| read \| responded` |
| DELETE | `/contact-messages/:id`  | ADMIN | Delete a message |

On a new dealership application or contact message, the API also attempts to send an SMTP
notification email (see `SMTP_*` / `NOTIFY_TO_EMAIL` in `.env`) — it silently no-ops if SMTP
isn't configured, so this is optional.

## Site stats

Singleton resource powering the Home page's "Vehicles Sold / Dealers / States Covered" band —
managed from `/admin/stats`, not hardcoded.

| Method | Path     | Auth  | Description                                                    |
| ------ | -------- | ----- | ------------------------------------------------------------------ |
| GET    | `/stats` | none  | Returns `{ id, vehiclesSold, dealersCount, statesCovered, updatedAt }` |
| PATCH  | `/stats` | ADMIN | Update any subset of `{ vehiclesSold, dealersCount, statesCovered }` |

## Sales Partner applications

The "Join As Sales Partner" page (`/sales-partner`) has no backend endpoint by design — on submit
it validates client-side (react-hook-form + zod) and opens a prefilled `wa.me` link with the
applicant's details, the same WhatsApp-first flow used by the Home/Contact "Chat on WhatsApp"
buttons (see `frontend/src/utils/whatsapp.ts`).

## Database

Local dev uses SQLite (`backend/dev.db`, via Prisma + `@prisma/adapter-better-sqlite3`) so there's
nothing to provision to get started. For production, swap `datasource.provider` in
`backend/prisma/schema.prisma` to `postgresql`, set `DATABASE_URL` to a Postgres connection
string, and replace the `PrismaBetterSqlite3` adapter in `backend/src/config/prisma.ts` with
`@prisma/adapter-pg` (or your driver of choice) — the rest of the code (services, controllers,
routes) is unaffected since it only talks to the Prisma client, not the database directly.

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
  Remember to set `CORS_ORIGIN` to the deployed frontend's origin.
