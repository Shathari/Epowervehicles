import { z } from 'zod'
import { LEAD_STATUSES } from '../types.ts'

const namePattern = /^[a-zA-Z\s'-]+$/
const phonePattern = /^[+]?[0-9\s-]{7,15}$/

export const createSalesPartnerApplicationSchema = z.object({
  fullName: z.string().trim().min(2).max(100).regex(namePattern),
  whatsappNumber: z.string().trim().regex(phonePattern),
  email: z.union([z.string().trim().email(), z.literal('')]).optional(),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  experience: z.string().trim().min(1).max(100),
  previousCompany: z.string().trim().max(150).optional(),
  aboutYourself: z.string().trim().max(1000).optional(),
})

// PUT — full replace, reuses the create shape.
export const replaceSalesPartnerApplicationSchema = createSalesPartnerApplicationSchema.extend({
  status: z.enum(LEAD_STATUSES).optional(),
})

export const updateSalesPartnerApplicationSchema = z.object({
  status: z.enum(LEAD_STATUSES),
})

export type CreateSalesPartnerApplicationInput = z.infer<typeof createSalesPartnerApplicationSchema>
export type ReplaceSalesPartnerApplicationInput = z.infer<
  typeof replaceSalesPartnerApplicationSchema
>
