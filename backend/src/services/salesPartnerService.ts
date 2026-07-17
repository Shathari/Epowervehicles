import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import { parseListQuery, buildMeta } from '../utils/listQuery.ts'
import { LEAD_STATUSES } from '../types.ts'
import type {
  CreateSalesPartnerApplicationInput,
  ReplaceSalesPartnerApplicationInput,
} from '../validators/salesPartnerValidators.ts'
import type { LeadStatus } from '../types.ts'

export async function listSalesPartnerApplications(query: Record<string, unknown>) {
  const { skip, take, orderBy, searchWhere, page, pageSize } = parseListQuery(query, {
    defaultSortBy: 'createdAt',
    allowedSortBy: ['createdAt', 'updatedAt', 'fullName', 'city', 'state', 'status'],
    searchableFields: ['fullName', 'whatsappNumber', 'email', 'city', 'state'],
  })

  const where: Record<string, unknown> = { ...searchWhere }
  if (
    typeof query.status === 'string' &&
    (LEAD_STATUSES as readonly string[]).includes(query.status)
  ) {
    where.status = query.status
  }

  const [items, total] = await Promise.all([
    prisma.salesPartnerApplication.findMany({ where, orderBy, skip, take }),
    prisma.salesPartnerApplication.count({ where }),
  ])

  return { items, meta: buildMeta(total, page, pageSize) }
}

export async function getSalesPartnerApplicationById(id: string) {
  const application = await prisma.salesPartnerApplication.findUnique({ where: { id } })
  if (!application) throw AppError.notFound('Sales partner application not found.')
  return application
}

export function createSalesPartnerApplication(input: CreateSalesPartnerApplicationInput) {
  return prisma.salesPartnerApplication.create({ data: input })
}

export async function replaceSalesPartnerApplication(
  id: string,
  input: ReplaceSalesPartnerApplicationInput,
) {
  const existing = await prisma.salesPartnerApplication.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Sales partner application not found.')

  return prisma.salesPartnerApplication.update({
    where: { id },
    data: {
      fullName: input.fullName,
      whatsappNumber: input.whatsappNumber,
      email: input.email || null,
      city: input.city,
      state: input.state,
      experience: input.experience,
      previousCompany: input.previousCompany || null,
      aboutYourself: input.aboutYourself || null,
      status: input.status ?? existing.status,
    },
  })
}

export async function updateSalesPartnerApplicationStatus(id: string, status: LeadStatus) {
  const existing = await prisma.salesPartnerApplication.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Sales partner application not found.')

  return prisma.salesPartnerApplication.update({ where: { id }, data: { status } })
}

export async function deleteSalesPartnerApplication(id: string) {
  const existing = await prisma.salesPartnerApplication.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Sales partner application not found.')

  await prisma.salesPartnerApplication.delete({ where: { id } })
}
