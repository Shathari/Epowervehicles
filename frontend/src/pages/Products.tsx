import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { ProductCard } from '@/components/sections/ProductCard'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useProducts } from '@/hooks/useProducts'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { Product, ProductCategory } from '@/types/product'

const CATEGORY_ORDER: ProductCategory[] = [
  'rickshaw',
  'loader',
  'dumper',
  'scooty',
  'cart',
  'auto',
  'custom',
]

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  rickshaw: 'E-Rickshaw',
  loader: 'E-Loader',
  dumper: 'E-Dumper',
  scooty: 'E-Scooter',
  cart: 'E-Cart',
  auto: 'E-Auto',
  custom: 'Custom EV Solutions',
}

function groupByCategory(products: Product[]) {
  const groups = new Map<ProductCategory, Product[]>()
  for (const category of CATEGORY_ORDER) groups.set(category, [])
  for (const product of products) {
    groups.get(product.category)?.push(product)
  }
  return groups
}

export function Products() {
  const { data: products, isPending, isError, refetch } = useProducts()

  useDocumentTitle(
    'Our Range',
    'Explore the full EPOWER Vehicles EV lineup — E-Rickshaws, E-Loaders, E-Dumpers, E-Scooters, E-Carts, and E-Autos.',
  )

  const groups = products ? groupByCategory(products) : null

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <RevealOnScroll>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">Our Range</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Electric Vehicles For Every Need
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Discover our cutting-edge electric vehicles designed for efficiency, sustainability, and
            superior performance.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mt-10">
        {isPending && <Spinner label="Loading products…" tone="dark" />}
        {isError && (
          <ErrorState
            tone="dark"
            message="Couldn't load products right now."
            onRetry={() => refetch()}
          />
        )}
        {!isPending && !isError && products && products.length === 0 && (
          <EmptyState
            tone="dark"
            title="No products published yet"
            description="Our lineup is being updated — please check back soon."
          />
        )}
      </div>

      {groups &&
        CATEGORY_ORDER.map((category) => {
          const items = groups.get(category) ?? []
          if (items.length === 0) return null

          return (
            <section key={category} className="mt-14 first:mt-0">
              <RevealOnScroll>
                <h2 className="text-2xl font-bold text-white">{CATEGORY_LABELS[category]}</h2>
              </RevealOnScroll>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product, index) => (
                  <RevealOnScroll key={product.id} delayMs={index * 75}>
                    <ProductCard product={product} />
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          )
        })}
    </div>
  )
}
