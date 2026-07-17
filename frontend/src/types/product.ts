export type ProductCategory =
  'rickshaw' | 'loader' | 'dumper' | 'scooty' | 'cart' | 'auto' | 'custom'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  description: string
  imageUrl: string
  specLine?: string | null
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductInput {
  name: string
  category: ProductCategory
  description: string
  imageUrl: string
  specLine?: string
  order?: number
  isActive?: boolean
}
