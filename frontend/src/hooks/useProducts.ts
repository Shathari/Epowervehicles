import { useQuery } from '@tanstack/react-query'
import { getFeaturedProduct, listProducts } from '@/services/productService'

export function useProducts() {
  return useQuery({
    queryKey: ['products'] as const,
    queryFn: () => listProducts(),
    select: (data) => data.items,
  })
}

export function useFeaturedProduct() {
  return useQuery({
    queryKey: ['products', 'featured'] as const,
    queryFn: getFeaturedProduct,
  })
}
