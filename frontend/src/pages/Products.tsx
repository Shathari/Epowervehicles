import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { ProductCard } from '@/components/sections/ProductCard'
import { GradientSection } from '@/components/sections/GradientSection'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useProducts } from '@/hooks/useProducts'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function Products() {
  const { data: products, isPending, isError, refetch } = useProducts()

  useDocumentTitle(
    'Our Range',
    'Explore the full EPOWER Vehicles EV lineup — E-Rickshaws, E-Loaders, E-Dumpers, E-Scooters, E-Carts, and E-Autos.',
  )

  return (
    <GradientSection theme="range">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <RevealOnScroll>
          <div className="mb-8 rounded-xl border border-white/10 bg-ink-900/60 p-10 text-center shadow-lg shadow-black/30">
            <h1 className="text-2xl font-bold text-neon-400">Our Advanced EV Lineup</h1>
            <p className="mt-2 text-slate-300">
              Discover our cutting-edge electric vehicles designed for efficiency, sustainability,
              and superior performance.
            </p>
          </div>
        </RevealOnScroll>

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
        {!isPending && !isError && products && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <RevealOnScroll key={product.id} delayMs={index * 75}>
                <ProductCard product={product} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </GradientSection>
  )
}
