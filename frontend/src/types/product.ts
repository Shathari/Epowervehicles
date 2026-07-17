export type ProductCategory =
  'rickshaw' | 'loader' | 'dumper' | 'scooty' | 'cart' | 'auto' | 'custom'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  description: string
  imageUrl?: string | null
  specLine?: string | null
  rangeText?: string | null
  capacityText?: string | null
  chargeTimeText?: string | null
  isFeatured: boolean
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
