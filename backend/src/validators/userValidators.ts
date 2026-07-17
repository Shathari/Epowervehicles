import { z } from 'zod'
import { ROLES } from '../types.ts'

export const createUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(ROLES).default('ADMIN'),
})

// PUT — full replace. Password is optional here: omit it to keep the existing one.
export const replaceUserSchema = z.object({
  email: z.string().trim().email(),
  role: z.enum(ROLES),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
})

export const updateUserSchema = z.object({
  email: z.string().trim().email().optional(),
  role: z.enum(ROLES).optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type ReplaceUserInput = z.infer<typeof replaceUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
