import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import { parseListQuery, buildMeta } from '../utils/listQuery.ts'
import { LEAD_STATUSES } from '../types.ts'
import type {
  CreateDealershipApplicationInput,
  ReplaceDealershipApplicationInput,
} from '../validators/dealershipValidators.ts'
import type { LeadStatus } from '../types.ts'

export async function listDealershipApplications(query: Record<string, unknown>) {
  const { skip, take, orderBy, searchWhere, page, pageSize } = parseListQuery(query, {
    defaultSortBy: 'createdAt',
    allowedSortBy: ['createdAt', 'updatedAt', 'name', 'city', 'status'],
    searchableFields: ['name', 'email', 'phone', 'city', 'message'],
  })

  const where: Record<string, unknown> = { ...searchWhere }
  if (
    typeof query.status === 'string' &&
    (LEAD_STATUSES as readonly string[]).includes(query.status)
  ) {
    where.status = query.status
  }

  const [items, total] = await Promise.all([
    prisma.dealershipApplication.findMany({ where, orderBy, skip, take }),
    prisma.dealershipApplication.count({ where }),
  ])

  return { items, meta: buildMeta(total, page, pageSize) }
}

export async function getDealershipApplicationById(id: string) {
  const application = await prisma.dealershipApplication.findUnique({ where: { id } })
  if (!application) throw AppError.notFound('Dealership application not found.')
  return application
}

export function createDealershipApplication(input: CreateDealershipApplicationInput) {
  return prisma.dealershipApplication.create({ data: input })
}

export async function replaceDealershipApplication(
  id: string,
  input: ReplaceDealershipApplicationInput,
) {
  const existing = await prisma.dealershipApplication.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Dealership application not found.')

  return prisma.dealershipApplication.update({
    where: { id },
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      city: input.city,
      message: input.message,
      status: input.status ?? existing.status,
    },
  })
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
