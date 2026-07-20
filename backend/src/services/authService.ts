import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma.ts'
import { env } from '../config/env.ts'
import type { Role } from '../types.ts'

export interface PublicUser {
  id: string
  email: string
  role: Role
  name?: string
}

export function toPublicUser(user: { id: string; email: string; role: string }): PublicUser {
  return { id: user.id, email: user.email, role: user.role as Role }
}

// Virtual admin, sourced from env instead of Prisma — see ADMIN_PASSWORD_HASH in config/env.ts.
// This lets a single administrator log in even when the users table is empty or unavailable.
const VIRTUAL_ADMIN_ID = 'admin'

function virtualAdminUser(): PublicUser {
  return { id: VIRTUAL_ADMIN_ID, email: env.ADMIN_EMAIL, role: 'ADMIN', name: 'Administrator' }
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<PublicUser | null> {
  if (env.ADMIN_PASSWORD_HASH && email === env.ADMIN_EMAIL) {
    const isValid = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH)
    return isValid ? virtualAdminUser() : null
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) return null

  return toPublicUser(user)
}

export async function getUserById(id: string): Promise<PublicUser | null> {
  if (id === VIRTUAL_ADMIN_ID) {
    return env.ADMIN_PASSWORD_HASH ? virtualAdminUser() : null
  }

  const user = await prisma.user.findUnique({ where: { id } })
  return user ? toPublicUser(user) : null
}
