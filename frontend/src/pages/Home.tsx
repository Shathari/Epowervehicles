import { Link } from 'react-router-dom'
import { Hero } from '@/components/sections/Hero'
import { SectionGlow } from '@/components/sections/SectionGlow'
import { FeaturedProduct } from '@/components/sections/FeaturedProduct'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { HappyCustomers } from '@/components/sections/HappyCustomers'
import { FinancePartners } from '@/components/sections/FinancePartners'
import { ProductCarousel } from '@/components/sections/ProductCarousel'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useProducts } from '@/hooks/useProducts'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const whyFeatures = [
  {
    title: 'Advanced EV Technology',
    description:
      'Latest lithium-ion battery packs with BMS protection for long life and consistent performance.',
  },
  {
    title: 'Pan-India Service Network',
    description:
      'Extensive service centers across the country. Doorstep support and genuine spare parts availability.',
  },
  {
    title: 'Best-in-Class ROI',
    description:
      'Save up to 70% on running costs vs. petrol/diesel vehicles. Achieve breakeven in 12–18 months.',
  },
  {
    title: 'Easy Financing',
    description:
      'Tie-ups with leading NBFCs. Low down payment, competitive EMIs, and quick loan processing.',
  },
  {
    title: 'Zero Emissions',
    description:
      'Contribute to a cleaner India. All our vehicles are 100% electric with zero tailpipe emissions.',
  },
  {
    title: 'FAME II Subsidy Eligible',
    description:
      'All products qualify for government subsidies under the FAME II scheme for maximum savings.',
  },
]

export function Home() {
  const { data: products, isPending, isError, refetch } = useProducts()

  useDocumentTitle(
    'EPOWER Vehicles Pvt Ltd',
    'Cost-effective, sustainable electric vehicles for last-mile connectivity — E-Rickshaws, E-Loaders, E-Dumpers, E-Scooters, E-Carts, and E-Autos.',
  )

  return (
    <>
      <SectionGlow>
        <Hero />
      </SectionGlow>

      <FeaturedProduct />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">Our Range</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Electric Vehicles For Every Need
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              From passenger rickshaws to heavy-duty dumpers — we have the right electric vehicle
              for your business or personal use.
            </p>
          </RevealOnScroll>
          <div className="mt-8">
            {isPending && <Spinner label="Loading vehicles…" tone="dark" />}
            {isError && (
              <ErrorState tone="dark" message="Couldn't load vehicles." onRetry={() => refetch()} />
            )}
            {!isPending && !isError && products && products.length === 0 && (
              <EmptyState
                tone="dark"
                title="No vehicles to show yet"
                description="Check back soon."
              />
            )}
            {!isPending && !isError && products && products.length > 0 && (
              <ProductCarousel products={products} />
            )}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-1 font-semibold text-neon-400 hover:underline"
            >
              View Full Range →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
              Why EPOWERVehicles
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              The Smarter Choice for Electric Mobility
            </h2>
          </RevealOnScroll>
          <div className="mt-8">
            <FeatureGrid features={whyFeatures} />
          </div>
        </div>
      </section>

      <HappyCustomers />
      <FinancePartners />

      <section className="px-5 py-16">
        <RevealOnScroll>
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-2xl bg-neon-500 px-8 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
                Ready to Go Electric?
              </h2>
              <p className="mt-2 text-ink-900/80">
                Talk to our experts and get the best deal on electric vehicles.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton
                message="Hi EPOWER Vehicles, I want to speak with your sales team about electric vehicles."
                label="WhatsApp Now"
                variant="inverted"
              />
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink-950 px-6 py-3 font-semibold text-ink-950 transition-transform hover:scale-105"
              >
                Send Enquiry →
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  )
}
