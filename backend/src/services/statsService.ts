import { prisma } from '../config/prisma.ts'
import type { UpdateStatsInput } from '../validators/statsValidators.ts'

async function getOrCreateStats() {
  const existing = await prisma.siteStats.findFirst()
  if (existing) return existing

  return prisma.siteStats.create({ data: {} })
}

export async function getStats() {
  return getOrCreateStats()
}

export async function updateStats(input: UpdateStatsInput) {
  const existing = await getOrCreateStats()
  return prisma.siteStats.update({ where: { id: existing.id }, data: input })
}
