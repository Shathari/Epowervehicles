import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma.ts'
import type { Role } from '../types.ts'

export interface PublicUser {
  id: string
  email: string
  role: Role
}

function toPublicUser(user: { id: string; email: string; role: string }): PublicUser {
  return { id: user.id, email: user.email, role: user.role as Role }
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<PublicUser | null> {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) return null

  return toPublicUser(user)
}

export async function getUserById(id: string): Promise<PublicUser | null> {
  const user = await prisma.user.findUnique({ where: { id } })
  return user ? toPublicUser(user) : null
}
