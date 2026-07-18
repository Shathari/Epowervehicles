import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from './env.ts'

// Prisma 7's generated client always requires a driver adapter — `new PrismaClient()` with no
// options throws `PrismaClientInitializationError` unconditionally, for every provider, not just
// SQLite. `env` is imported (rather than reading `process.env` directly) so dotenv has already
// loaded and Zod has already validated DATABASE_URL by the time the adapter is constructed.
const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })

export const prisma = new PrismaClient({ adapter })
