import { prisma } from '../config/prisma.ts'
import { AppError } from '../utils/AppError.ts'
import type { CreateProductInput, UpdateProductInput } from '../validators/productValidators.ts'

export function listProducts(includeInactive = false) {
  return prisma.product.findMany({
    where: includeInactive ? undefined : { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
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

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw AppError.notFound('Product not found.')

  await prisma.product.delete({ where: { id } })
}
