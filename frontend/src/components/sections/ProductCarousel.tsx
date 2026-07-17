import type { Product } from '@/types/product'
import { ProductCard } from '@/components/sections/ProductCard'

export function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-4">
      {products.map((product) => (
        <div key={product.id} className="w-[280px] flex-none snap-center">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
