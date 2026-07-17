import { z } from 'zod'
import { MESSAGE_STATUSES } from '../types.ts'

const namePattern = /^[a-zA-Z\s'-]+$/
const phonePattern = /^[+]?[0-9\s-]{7,15}$/

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(namePattern),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phonePattern),
  message: z.string().trim().min(10).max(2000),
})

export const updateContactMessageSchema = z.object({
  status: z.enum(MESSAGE_STATUSES),
})

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>
