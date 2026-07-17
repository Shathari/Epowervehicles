import { apiRequest } from '@/services/apiClient'
import type { Product, ProductInput } from '@/types/product'

export function listProducts(): Promise<Product[]> {
  return apiRequest<Product[]>('/products')
}

export function createProduct(input: ProductInput): Promise<Product> {
  return apiRequest<Product>('/products', { method: 'POST', body: input })
}

export function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`, { method: 'PATCH', body: input })
}

export function deleteProduct(id: string): Promise<null> {
  return apiRequest<null>(`/products/${id}`, { method: 'DELETE' })
}
