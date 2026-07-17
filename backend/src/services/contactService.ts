import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import type { CreateContactMessageInput } from '../validators/contactValidators.ts'
import type { MessageStatus } from '../types.ts'

export function listContactMessages() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
}

export function createContactMessage(input: CreateContactMessageInput) {
  return prisma.contactMessage.create({ data: input })
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
