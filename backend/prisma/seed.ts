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
  // real per-product photos are added via the external dashboard. Spec figures (range/capacity/
  // charge time) and descriptions are carried over from the approved design reference
  // (import-custom-45846873.figma.site) as realistic starter content, not invented numbers.
  await prisma.product.createMany({
    data: [
      {
        name: 'E-Rickshaw',
        category: 'rickshaw',
        description:
          'Urban & rural passenger transport with zero emissions and ultra-low running cost. ' +
          'Maximum comfort for daily commuters.',
        specLine: 'Passenger 3-Wheeler · 80–100 km range',
        imageUrl: '/erickshaw.webp',
        rangeText: '80–100 km',
        capacityText: '3 Passengers',
        chargeTimeText: '6–8 hrs',
        isFeatured: true,
        order: 0,
      },
      {
        name: 'E-Loader',
        category: 'loader',
        description:
          'Heavy-duty electric loader for efficient goods & cargo transportation. Built for ' +
          'commercial use.',
        specLine: 'Cargo Transport · 70–90 km range',
        imageUrl: '/erickshaw.webp',
        rangeText: '70–90 km',
        capacityText: '500 kg',
        chargeTimeText: '7–9 hrs',
        order: 1,
      },
      {
        name: 'E-Dumper',
        category: 'dumper',
        description:
          'Powerful electric dumper for construction sites, mining, and heavy material transport.',
        specLine: 'Construction Vehicle · 60–80 km range',
        rangeText: '60–80 km',
        capacityText: '1.5 Ton',
        chargeTimeText: '8–10 hrs',
        order: 2,
      },
      {
        name: 'E-Scooter',
        category: 'scooty',
        description:
          'Sleek and efficient electric scooter for daily commuting. Smart connectivity and ' +
          'premium build.',
        specLine: 'Personal Mobility · 100–120 km range',
        rangeText: '100–120 km',
        capacityText: '60 km/h',
        chargeTimeText: '3–4 hrs',
        order: 3,
      },
      {
        name: 'E-Cart',
        category: 'cart',
        description:
          'Perfect for last-mile delivery and vendor use. Compact, agile, and economical for ' +
          'city streets.',
        specLine: 'Last-Mile Delivery · 80–100 km range',
        imageUrl: '/erickshaw.webp',
        rangeText: '80–100 km',
        capacityText: '300 kg',
        chargeTimeText: '5–7 hrs',
        order: 4,
      },
      {
        name: 'E-Auto',
        category: 'auto',
        description:
          'Commercial electric auto for taxi and goods transport. Higher capacity and longer range.',
        specLine: 'Commercial 3-Wheeler · 100–130 km range',
        rangeText: '100–130 km',
        capacityText: '4+1 Seats',
        chargeTimeText: '6–8 hrs',
        order: 5,
      },
      {
        name: 'Custom EV Solutions',
        category: 'custom',
        description:
          'Tailored electric vehicle solutions to meet specific commercial and industrial needs.',
        imageUrl: '/erickshaw.webp',
        order: 6,
      },
    ],
  })
  logger.info('Seeded 7 initial products (one per category).')
}

async function seedSiteStats() {
  const existing = await prisma.siteStats.findFirst()
  if (existing) {
    logger.info('Site stats already seeded — skipping.')
    return
  }

  // Starter figures from the design reference — update via PATCH /api/stats with real numbers.
  await prisma.siteStats.create({
    data: { vehiclesSold: 5000, dealersCount: 200, statesCovered: 18 },
  })
  logger.info('Seeded site stats with reference starter figures — update via PATCH /api/stats.')
}

async function seedAboutContent() {
  const existing = await prisma.aboutContent.findFirst()
  if (existing) {
    logger.info('About content already seeded — skipping.')
    return
  }

  await prisma.aboutContent.create({
    data: {
      heroTitle: 'Welcome to EPOWER Vehicles Pvt Ltd',
      heroSubtitle: 'Driving the Future of Sustainable Mobility',
      companyIntro:
        'EPOWER VEHICLES PRIVATE LIMITED, established in 2015, has significantly advanced ' +
        'last-mile connectivity through our range of E-Rickshaws and E-Loaders. With a focus on ' +
        'quality and affordability, our products are designed to enhance your journeys while ' +
        'reducing environmental impact. Boasting over a decade of expertise in the EV industry, ' +
        'we leverage technology and innovation to deliver reliable solutions. Committed to ' +
        'sustainability, we offer cost-effective and low maintenance vehicles, driven by our ' +
        'dedication to a greener future. Join us in shaping a cleaner and more efficient ' +
        'transportation landscape.',
      visionText:
        'Our vision at EPOWER VEHICLES PRIVATE LIMITED is to become a global leader in electric ' +
        'mobility, renowned for our cutting-edge technology, trusted quality, and dedication to ' +
        'environmental stewardship. We envision a future where our vehicles are the preferred ' +
        'choice for efficient and eco-friendly transportation, driving positive change for ' +
        'communities worldwide.',
      missionText:
        'Our mission is to revolutionize last-mile connectivity by providing high-quality, ' +
        'cost-effective electric vehicles that empower individuals and businesses while reducing ' +
        'environmental impact. We aim to lead the transition towards sustainable transportation ' +
        'solutions through innovation, reliability, and commitment to excellence.',
      coreValues: JSON.stringify([
        {
          title: 'Sustainability',
          description:
            'We prioritize environmental responsibility in all aspects of our operations, ' +
            'striving to minimize our carbon footprint and promote a greener future.',
        },
        {
          title: 'Quality',
          description:
            'We are committed to delivering high-quality products and services that exceed ' +
            'customer expectations, ensuring reliability and durability in every vehicle we produce.',
        },
        {
          title: 'Innovation',
          description:
            'We embrace innovation and continuous improvement, leveraging technology to drive ' +
            'advancements in electric mobility and enhance the user experience.',
        },
        {
          title: 'Integrity',
          description:
            'We uphold the highest standards of integrity and ethical conduct in our interactions ' +
            'with customers, partners, and stakeholders, fostering trust and transparency.',
        },
      ]),
      services: JSON.stringify([
        {
          title: 'Vehicle Sales',
          description:
            'Offer a diverse range of electric vehicles, including E-Rickshaws and E-Loaders, ' +
            'tailored to various transportation needs. Provide options for customization to meet ' +
            'specific requirements and preferences of customers.',
        },
        {
          title: 'Maintenance and Repair',
          description:
            'Conduct routine servicing and inspections to ensure the efficient operation and ' +
            'safety of electric vehicles. Offer diagnostic services and repair solutions for ' +
            'issues related to batteries, motors, electronics, and other components. Provide ' +
            'genuine spare parts and accessories for electric vehicles, ensuring quality and ' +
            'compatibility.',
        },
      ]),
      environmentalImpact:
        'Electric vehicles (EVs) offer significant economic, environmental, and social benefits. ' +
        'Economically, they stimulate job creation, reduce operating costs for owners, and foster ' +
        'economic growth through investments. Environmentally, EVs cut emissions, conserve ' +
        'resources, and contribute to climate change mitigation. Socially, they enhance ' +
        'accessibility to transportation, promote public health by reducing pollution, and foster ' +
        'community engagement, ultimately contributing to a more inclusive and sustainable society.',
    },
  })
  logger.info('Seeded About page content.')
}

async function main() {
  await seedAdminUser()
  await seedProducts()
  await seedSiteStats()
  await seedAboutContent()
}

main()
  .catch((error) => {
    logger.error({ error }, 'Seed failed')
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
