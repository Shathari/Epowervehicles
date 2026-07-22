import 'dotenv/config'
import { z } from 'zod'

// Every variable consumed by the app, validated up front so a misconfigured deployment fails
// fast with a clear message instead of crashing unpredictably later. See `.env.example` for
// placeholder values and README.md#deployment-environment-variables for what each one is for.
const envSchema = z.object({
  // --- Core ---
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  // Origin(s) allowed to call this API with credentials — the deployed frontend's URL in production.
  CORS_ORIGIN: z.string().min(1, 'CORS_ORIGIN is required'),
  // Postgres connection string (Neon in production) — see the Database section of docs/API.md.
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // --- Auth (JWT) — required in every environment, including production ---
  JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 characters'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 characters'),
  ACCESS_TOKEN_TTL_MINUTES: z.coerce.number().int().positive().default(15),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(7),

  // --- Admin account ---
  // ADMIN_EMAIL is required in every environment — it's the identity for both the virtual
  // env-admin (authService.ts, via ADMIN_PASSWORD_HASH below) and the Prisma-seeded admin row.
  ADMIN_EMAIL: z
    .string()
    .min(1, 'ADMIN_EMAIL is required')
    .email('ADMIN_EMAIL must be a valid email address'),
  // Plaintext password used only by `prisma/seed.ts` to create the initial ADMIN row. Optional
  // here so app startup doesn't require it when only the env-admin (ADMIN_PASSWORD_HASH) is in
  // use; seed.ts validates its own presence at seed time since only seeding needs it.
  ADMIN_PASSWORD: z.string().optional(),

  // --- Optional: env-defined admin login (authService.ts) — a bcrypt hash of the admin
  // password. When set, ADMIN_EMAIL authenticates as a virtual admin against this hash instead
  // of the users table, so login works even with an empty/missing users table. Generate with
  // `node -e "console.log(require('bcryptjs').hashSync('yourPassword', 12))"`. Leave unset to
  // rely on the Prisma-seeded user only (existing behavior).
  ADMIN_PASSWORD_HASH: z.string().optional(),

  // --- Optional: SMTP notification email on new contact/dealership/sales-partner submissions.
  // Leave every one of these unset to disable notifications entirely — the app works fine
  // without them (see isSmtpConfigured below). ---
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  NOTIFY_TO_EMAIL: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const fieldErrors = parsed.error.flatten().fieldErrors
  console.error(
    'Invalid environment configuration — the following variables are missing or invalid:',
  )
  console.error(fieldErrors)
  console.error(
    'Set them in your deployment platform (e.g. Render → Environment) or in backend/.env locally. ' +
      'See backend/.env.example for the full list of variables and README.md#deployment-environment-variables ' +
      'for what each one is used for.',
  )
  throw new Error('Invalid environment configuration — see errors above.')
}

export const env = parsed.data

export const isProduction = env.NODE_ENV === 'production'

export const isSmtpConfigured = Boolean(
  env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.SMTP_FROM && env.NOTIFY_TO_EMAIL,
)
