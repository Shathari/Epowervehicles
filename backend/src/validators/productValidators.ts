import { z } from 'zod'
import { PRODUCT_CATEGORIES } from '../types.ts'

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(120),
  category: z.enum(PRODUCT_CATEGORIES),
  description: z.string().trim().min(10).max(1000),
  imageUrl: z.string().trim().optional(),
  specLine: z.string().trim().max(200).optional(),
  rangeText: z.string().trim().max(60).optional(),
  capacityText: z.string().trim().max(60).optional(),
  chargeTimeText: z.string().trim().max(60).optional(),
  isFeatured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

export const updateProductSchema = createProductSchema.partial()

// PUT — full replace. Reuses the create shape (fields not sent still fall back to their
// defaults, same as creating fresh) rather than a separate schema.
export const replaceProductSchema = createProductSchema

export const listProductsQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
  category: z.enum(PRODUCT_CATEGORIES).optional(),
  isActive: z.enum(['true', 'false']).optional(),
  isFeatured: z.enum(['true', 'false']).optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ReplaceProductInput = z.infer<typeof replaceProductSchema>
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>
