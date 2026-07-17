import { prisma } from '../config/prisma.ts'
import type { ContentItem, UpdateAboutInput } from '../validators/aboutValidators.ts'

function parseItems(json: string): ContentItem[] {
  try {
    const parsed: unknown = JSON.parse(json)
    return Array.isArray(parsed) ? (parsed as ContentItem[]) : []
  } catch {
    return []
  }
}

function toPublicShape(row: {
  id: string
  heroTitle: string
  heroSubtitle: string
  companyIntro: string
  missionText: string
  visionText: string
  coreValues: string
  servicesIntro: string
  services: string
  environmentalImpact: string
  updatedAt: Date
}) {
  return {
    id: row.id,
    heroTitle: row.heroTitle,
    heroSubtitle: row.heroSubtitle,
    companyIntro: row.companyIntro,
    missionText: row.missionText,
    visionText: row.visionText,
    coreValues: parseItems(row.coreValues),
    servicesIntro: row.servicesIntro,
    services: parseItems(row.services),
    environmentalImpact: row.environmentalImpact,
    updatedAt: row.updatedAt,
  }
}

async function getOrCreateAbout() {
  const existing = await prisma.aboutContent.findFirst()
  if (existing) return existing

  return prisma.aboutContent.create({ data: {} })
}

export async function getAbout() {
  const row = await getOrCreateAbout()
  return toPublicShape(row)
}

export async function updateAbout(input: UpdateAboutInput) {
  const existing = await getOrCreateAbout()

  const row = await prisma.aboutContent.update({
    where: { id: existing.id },
    data: {
      ...(input.heroTitle !== undefined ? { heroTitle: input.heroTitle } : {}),
      ...(input.heroSubtitle !== undefined ? { heroSubtitle: input.heroSubtitle } : {}),
      ...(input.companyIntro !== undefined ? { companyIntro: input.companyIntro } : {}),
      ...(input.missionText !== undefined ? { missionText: input.missionText } : {}),
      ...(input.visionText !== undefined ? { visionText: input.visionText } : {}),
      ...(input.coreValues !== undefined ? { coreValues: JSON.stringify(input.coreValues) } : {}),
      ...(input.servicesIntro !== undefined ? { servicesIntro: input.servicesIntro } : {}),
      ...(input.services !== undefined ? { services: JSON.stringify(input.services) } : {}),
      ...(input.environmentalImpact !== undefined
        ? { environmentalImpact: input.environmentalImpact }
        : {}),
    },
  })

  return toPublicShape(row)
}
