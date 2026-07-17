import { Link } from 'react-router-dom'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { VehicleIcon } from '@/components/icons/VehicleIcons'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { Spinner } from '@/components/ui/Spinner'
import { useFeaturedProduct } from '@/hooks/useProducts'

export function FeaturedProduct() {
  const { data: product, isPending } = useFeaturedProduct()

  if (isPending) {
    return (
      <section className="px-5 py-16">
        <Spinner tone="dark" label="Loading featured vehicle…" />
      </section>
    )
  }

  if (!product) return null

  const stats = [
    { label: 'Range', value: product.rangeText },
    { label: 'Payload / Capacity', value: product.capacityText },
    { label: 'Charge Time', value: product.chargeTimeText },
  ].filter((stat) => stat.value)

  return (
    <section className="px-5 py-16">
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
            Featured Vehicle
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">{product.name}</h2>

          <div className="glass mt-8 grid grid-cols-1 gap-8 rounded-2xl p-8 md:grid-cols-2 md:p-12">
            <div className="flex items-center justify-center overflow-hidden rounded-xl bg-ink-900">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full max-h-80 w-full object-cover"
                />
              ) : (
                <VehicleIcon category={product.category} className="h-32 w-32 text-neon-500" />
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-slate-300">{product.description}</p>

              {stats.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-center"
                    >
                      <p className="text-base font-bold text-neon-400">{stat.value}</p>
                      <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-neon-500 px-6 py-3 font-semibold text-ink-950 transition-transform duration-200 hover:scale-105 hover:bg-neon-400"
                >
                  Enquire
                </Link>
                <WhatsAppButton
                  message={`Hi! I'm interested in the ${product.name}. Please share price, availability and more details.`}
                  label="WhatsApp"
                />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
