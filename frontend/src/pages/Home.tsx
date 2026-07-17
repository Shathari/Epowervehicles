import { Hero } from '@/components/sections/Hero'
import { QuickLinksGrid } from '@/components/sections/QuickLinksGrid'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { ProductCarousel } from '@/components/sections/ProductCarousel'
import { StatsBand } from '@/components/sections/StatsBand'
import { GradientSection } from '@/components/sections/GradientSection'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useProducts } from '@/hooks/useProducts'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Eco-Friendly',
    description: 'Our vehicles reduce carbon footprint and promote green energy.',
  },
  {
    title: 'Affordable Maintenance',
    description: 'Low maintenance costs with easily available spare parts.',
  },
  {
    title: 'High Performance',
    description: 'Reliable and efficient electric vehicles with top-class battery technology.',
  },
  { title: '24/7 Customer Support', description: 'Dedicated support team to assist you anytime.' },
]

export function Home() {
  const { data: products, isPending, isError, refetch } = useProducts()

  useDocumentTitle(
    'EPOWER Vehicles Pvt Ltd',
    'Cost-effective, sustainable electric vehicles for last-mile connectivity — E-Rickshaws, E-Loaders, E-Dumpers, E-Scooters, E-Carts, and E-Autos.',
  )

  return (
    <>
      <GradientSection theme="hero">
        <Hero />
        <QuickLinksGrid />
      </GradientSection>

      <StatsBand />

      <GradientSection theme="benefits">
        <RevealOnScroll>
          <div className="px-5 py-12 text-center">
            <h2 className="text-2xl font-bold text-neon-400">Why EPOWER Vehicles</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              We are committed to providing cost-effective and sustainable electric vehicles that
              redefine last-mile connectivity.
            </p>
          </div>
        </RevealOnScroll>
        <FeatureGrid features={features} />
      </GradientSection>

      <GradientSection theme="range">
        <div className="px-5 py-12 text-center">
          <h2 className="text-2xl font-bold text-neon-400">Featured E-Vehicles</h2>
          <div className="mt-6">
            {isPending && <Spinner label="Loading featured vehicles…" tone="dark" />}
            {isError && (
              <ErrorState
                tone="dark"
                message="Couldn't load featured vehicles."
                onRetry={() => refetch()}
              />
            )}
            {!isPending && !isError && products && products.length === 0 && (
              <EmptyState
                tone="dark"
                title="No vehicles to show yet"
                description="Check back soon."
              />
            )}
            {!isPending && !isError && products && products.length > 0 && (
              <ProductCarousel products={products.slice(0, 4)} />
            )}
          </div>
        </div>
      </GradientSection>

      <GradientSection theme="cta">
        <div className="flex flex-col items-center gap-5 px-5 py-16 text-center">
          <h2 className="text-3xl font-bold text-neon-400">Ready to Go Electric?</h2>
          <p className="max-w-xl text-slate-300">
            Chat with our team on WhatsApp for instant answers, or send us an enquiry and we'll get
            back to you shortly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton message="Hi EPOWER Vehicles, I'd like to know more about your EVs." />
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neon-500 px-6 py-3 font-semibold text-neon-400 transition-all hover:scale-105 hover:bg-neon-500/10"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </GradientSection>
    </>
  )
}
