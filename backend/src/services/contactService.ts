import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import { parseListQuery, buildMeta } from '../utils/listQuery.ts'
import { MESSAGE_STATUSES } from '../types.ts'
import type {
  CreateContactMessageInput,
  ReplaceContactMessageInput,
} from '../validators/contactValidators.ts'
import type { MessageStatus } from '../types.ts'

export async function listContactMessages(query: Record<string, unknown>) {
  const { skip, take, orderBy, searchWhere, page, pageSize } = parseListQuery(query, {
    defaultSortBy: 'createdAt',
    allowedSortBy: ['createdAt', 'updatedAt', 'name', 'status'],
    searchableFields: ['name', 'email', 'phone', 'message'],
  })

  const where: Record<string, unknown> = { ...searchWhere }
  if (
    typeof query.status === 'string' &&
    (MESSAGE_STATUSES as readonly string[]).includes(query.status)
  ) {
    where.status = query.status
  }

  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, orderBy, skip, take }),
    prisma.contactMessage.count({ where }),
  ])

  return { items, meta: buildMeta(total, page, pageSize) }
}

export async function getContactMessageById(id: string) {
  const message = await prisma.contactMessage.findUnique({ where: { id } })
  if (!message) throw AppError.notFound('Contact message not found.')
  return message
}

export function createContactMessage(input: CreateContactMessageInput) {
  return prisma.contactMessage.create({ data: input })
}

export async function replaceContactMessage(id: string, input: ReplaceContactMessageInput) {
  const existing = await prisma.contactMessage.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Contact message not found.')

  return prisma.contactMessage.update({
    where: { id },
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      status: input.status ?? existing.status,
    },
  })
}

export async function updateContactMessageStatus(id: string, status: MessageStatus) {
  const existing = await prisma.contactMessage.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Contact message not found.')

  return prisma.contactMessage.update({ where: { id }, data: { status } })
}

export async function deleteContactMessage(id: string) {
  const existing = await prisma.contactMessage.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Contact message not found.')

  await prisma.contactMessage.delete({ where: { id } })
}
