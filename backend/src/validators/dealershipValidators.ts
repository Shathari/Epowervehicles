import { z } from 'zod'
import { LEAD_STATUSES } from '../types.ts'

const namePattern = /^[a-zA-Z\s'-]+$/
const phonePattern = /^[+]?[0-9\s-]{7,15}$/

export const createDealershipApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(namePattern),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phonePattern),
  city: z.string().trim().min(2).max(100),
  message: z.string().trim().min(10).max(2000),
})

export const updateDealershipApplicationSchema = z.object({
  status: z.enum(LEAD_STATUSES),
})

// PUT — full replace of the editable content, not just status.
export const replaceDealershipApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(namePattern),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phonePattern),
  city: z.string().trim().min(2).max(100),
  message: z.string().trim().min(10).max(2000),
  status: z.enum(LEAD_STATUSES).optional(),
})

export type CreateDealershipApplicationInput = z.infer<typeof createDealershipApplicationSchema>
export type ReplaceDealershipApplicationInput = z.infer<typeof replaceDealershipApplicationSchema>
