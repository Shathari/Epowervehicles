import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import { parseListQuery, buildMeta } from '../utils/listQuery.ts'
import { PRODUCT_CATEGORIES } from '../types.ts'
import type {
  CreateProductInput,
  ReplaceProductInput,
  UpdateProductInput,
} from '../validators/productValidators.ts'

function isValidCategory(value: unknown): value is (typeof PRODUCT_CATEGORIES)[number] {
  return typeof value === 'string' && (PRODUCT_CATEGORIES as readonly string[]).includes(value)
}

export async function listProducts(query: Record<string, unknown>, includeInactive: boolean) {
  const { skip, take, orderBy, searchWhere, page, pageSize } = parseListQuery(query, {
    defaultSortBy: 'order',
    allowedSortBy: ['order', 'name', 'createdAt', 'updatedAt'],
    searchableFields: ['name', 'description'],
  })

  const where: Record<string, unknown> = { ...searchWhere }

  if (!includeInactive) {
    where.isActive = true
  }
  if (query.isActive === 'true') where.isActive = true
  if (query.isActive === 'false') where.isActive = false
  if (query.isFeatured === 'true') where.isFeatured = true
  if (query.isFeatured === 'false') where.isFeatured = false
  if (isValidCategory(query.category)) where.category = query.category

  const [items, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take }),
    prisma.product.count({ where }),
  ])

  return { items, meta: buildMeta(total, page, pageSize) }
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw AppError.notFound('Product not found.')
  return product
}

export async function getFeaturedProduct() {
  const featured = await prisma.product.findFirst({
    where: { isActive: true, isFeatured: true },
    orderBy: { order: 'asc' },
  })
  if (featured) return featured

  return prisma.product.findFirst({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })
}

export async function createProduct(input: CreateProductInput) {
  return prisma.product.create({
    data: {
      name: input.name,
      category: input.category,
      description: input.description,
      imageUrl: input.imageUrl,
      specLine: input.specLine,
      rangeText: input.rangeText,
      capacityText: input.capacityText,
      chargeTimeText: input.chargeTimeText,
      isFeatured: input.isFeatured ?? false,
      order: input.order ?? 0,
      isActive: input.isActive ?? true,
    },
  })
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Product not found.')

  return prisma.product.update({ where: { id }, data: input })
}

// PUT — full replace: fields omitted from the payload reset to their defaults instead of
// being left untouched, unlike the partial-merge behavior of PATCH.
export async function replaceProduct(id: string, input: ReplaceProductInput) {
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Product not found.')

  return prisma.product.update({
    where: { id },
    data: {
      name: input.name,
      category: input.category,
      description: input.description,
      imageUrl: input.imageUrl ?? null,
      specLine: input.specLine ?? null,
      rangeText: input.rangeText ?? null,
      capacityText: input.capacityText ?? null,
      chargeTimeText: input.chargeTimeText ?? null,
      isFeatured: input.isFeatured ?? false,
      order: input.order ?? 0,
      isActive: input.isActive ?? true,
    },
  })
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Product not found.')

  await prisma.product.delete({ where: { id } })
}
