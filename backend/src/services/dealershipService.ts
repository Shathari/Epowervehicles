import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import type { CreateDealershipApplicationInput } from '../validators/dealershipValidators.ts'
import type { LeadStatus } from '../types.ts'

export function listDealershipApplications() {
  return prisma.dealershipApplication.findMany({ orderBy: { createdAt: 'desc' } })
}

export function createDealershipApplication(input: CreateDealershipApplicationInput) {
  return prisma.dealershipApplication.create({ data: input })
}

export async function updateDealershipApplicationStatus(id: string, status: LeadStatus) {
  const existing = await prisma.dealershipApplication.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Dealership application not found.')

  return prisma.dealershipApplication.update({ where: { id }, data: { status } })
}

export async function deleteDealershipApplication(id: string) {
  const existing = await prisma.dealershipApplication.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Dealership application not found.')

  await prisma.dealershipApplication.delete({ where: { id } })
}
