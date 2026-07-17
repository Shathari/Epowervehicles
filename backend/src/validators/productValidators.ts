import { z } from 'zod'
import { PRODUCT_CATEGORIES } from '../types.ts'

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(120),
  category: z.enum(PRODUCT_CATEGORIES),
  description: z.string().trim().min(10).max(1000),
  imageUrl: z.string().trim().min(1),
  specLine: z.string().trim().max(200).optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
