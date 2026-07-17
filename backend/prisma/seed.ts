import bcrypt from 'bcryptjs'
import { prisma } from '../src/config/prisma.ts'
import { env } from '../src/config/env.ts'
import { logger } from '../src/utils/logger.ts'

async function seedAdminUser() {
  const existing = await prisma.user.findUnique({ where: { email: env.ADMIN_EMAIL } })
  if (existing) {
    logger.info(`Admin user already exists (${env.ADMIN_EMAIL}) — skipping.`)
    return
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12)
  await prisma.user.create({
    data: { email: env.ADMIN_EMAIL, passwordHash, role: 'ADMIN' },
  })
  logger.info(`Created admin user: ${env.ADMIN_EMAIL}`)
}

async function seedProducts() {
  const count = await prisma.product.count()
  if (count > 0) {
    logger.info(`Products already seeded (${count} found) — skipping.`)
    return
  }

  // Real photography only exists for the E-Rickshaw today — reused across every card until
  // real per-product photos are added via the admin Products screen. specLine is left unset
  // (no invented range/payload/charge-time figures).
  await prisma.product.createMany({
    data: [
      {
        name: 'E-Rickshaw',
        category: 'rickshaw',
        description:
          'Reliable, efficient, and eco-friendly transportation solutions for urban commuting.',
        imageUrl: '/erickshaw.webp',
        order: 0,
      },
      {
        name: 'E-Loader',
        category: 'loader',
        description:
          'Heavy-duty electric cargo solutions for businesses, ensuring cost-effectiveness and sustainability.',
        imageUrl: '/erickshaw.webp',
        order: 1,
      },
      {
        name: 'E-Cart',
        category: 'cart',
        description: 'Compact electric carts built for short-haul goods and passenger movement.',
        imageUrl: '/erickshaw.webp',
        order: 2,
      },
      {
        name: 'Custom EV Solutions',
        category: 'custom',
        description:
          'Tailored electric vehicle solutions to meet specific commercial and industrial needs.',
        imageUrl: '/erickshaw.webp',
        order: 3,
      },
    ],
  })
  logger.info('Seeded 4 initial products.')
}

async function seedSiteStats() {
  const existing = await prisma.siteStats.findFirst()
  if (existing) {
    logger.info('Site stats already seeded — skipping.')
    return
  }

  await prisma.siteStats.create({ data: {} })
  logger.info('Seeded site stats (all zero — update from /admin/stats).')
}

async function main() {
  await seedAdminUser()
  await seedProducts()
  await seedSiteStats()
}

main()
  .catch((error) => {
    logger.error({ error }, 'Seed failed')
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
