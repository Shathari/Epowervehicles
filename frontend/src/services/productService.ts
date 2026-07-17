import { apiRequest } from '@/services/apiClient'
import type { Paginated } from '@/types/api'
import type { Product } from '@/types/product'

export function listProducts(params?: { pageSize?: number }): Promise<Paginated<Product>> {
  const pageSize = params?.pageSize ?? 100
  return apiRequest<Paginated<Product>>(`/products?pageSize=${pageSize}`)
}

export function getFeaturedProduct(): Promise<Product | null> {
  return apiRequest<Product | null>('/products/featured')
}
