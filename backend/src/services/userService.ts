import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma.ts'
import { Prisma } from '@prisma/client'
import { AppError } from '../utils/AppError.ts'
import { toPublicUser, type PublicUser } from './authService.ts'
import type {
  CreateUserInput,
  ReplaceUserInput,
  UpdateUserInput,
} from '../validators/userValidators.ts'

async function withEmailConflictHandling<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw AppError.conflict('A user with that email already exists.')
    }
    throw error
  }
}

export async function listUsers(): Promise<PublicUser[]> {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })
  return users.map(toPublicUser)
}

export async function createUser(input: CreateUserInput): Promise<PublicUser> {
  const passwordHash = await bcrypt.hash(input.password, 12)
  const user = await withEmailConflictHandling(() =>
    prisma.user.create({ data: { email: input.email, passwordHash, role: input.role } }),
  )
  return toPublicUser(user)
}

async function requireUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw AppError.notFound('User not found.')
  return user
}

export async function replaceUser(id: string, input: ReplaceUserInput): Promise<PublicUser> {
  await requireUser(id)
  const passwordHash = input.password ? await bcrypt.hash(input.password, 12) : undefined

  const user = await withEmailConflictHandling(() =>
    prisma.user.update({
      where: { id },
      data: { email: input.email, role: input.role, ...(passwordHash ? { passwordHash } : {}) },
    }),
  )
  return toPublicUser(user)
}

export async function updateUser(id: string, input: UpdateUserInput): Promise<PublicUser> {
  await requireUser(id)
  const passwordHash = input.password ? await bcrypt.hash(input.password, 12) : undefined

  const user = await withEmailConflictHandling(() =>
    prisma.user.update({
      where: { id },
      data: {
        ...(input.email ? { email: input.email } : {}),
        ...(input.role ? { role: input.role } : {}),
        ...(passwordHash ? { passwordHash } : {}),
      },
    }),
  )
  return toPublicUser(user)
}

export async function deleteUser(id: string, requestingUserId: string): Promise<void> {
  await requireUser(id)

  if (id === requestingUserId) {
    throw AppError.conflict('You cannot delete your own account while logged in as it.')
  }

  const totalUsers = await prisma.user.count()
  if (totalUsers <= 1) {
    throw AppError.conflict('Cannot delete the last remaining user.')
  }

  await prisma.user.delete({ where: { id } })
}
