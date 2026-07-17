import { Link } from 'react-router-dom'
import type { Product, ProductCategory } from '@/types/product'
import { VehicleIcon } from '@/components/icons/VehicleIcons'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

const categoryAccent: Record<ProductCategory, { bar: string; text: string }> = {
  rickshaw: { bar: 'from-emerald-400 to-emerald-600', text: 'text-emerald-400' },
  loader: { bar: 'from-orange-400 to-orange-600', text: 'text-orange-400' },
  dumper: { bar: 'from-red-400 to-red-600', text: 'text-red-400' },
  scooty: { bar: 'from-cyan-400 to-cyan-600', text: 'text-cyan-400' },
  cart: { bar: 'from-purple-400 to-purple-600', text: 'text-purple-400' },
  auto: { bar: 'from-amber-400 to-amber-600', text: 'text-amber-400' },
  custom: { bar: 'from-neon-400 to-neon-600', text: 'text-neon-400' },
}

export function ProductCard({ product }: { product: Product }) {
  const accent = categoryAccent[product.category]
  const stats = [
    { label: 'Range', value: product.rangeText },
    { label: 'Capacity', value: product.capacityText },
    { label: 'Charge Time', value: product.chargeTimeText },
  ].filter((stat) => stat.value)

  return (
    <div className="glass overflow-hidden rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />
      <div className="p-5">
        <div className="overflow-hidden rounded-lg">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              decoding="async"
              width={300}
              height={200}
              className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center bg-ink-900">
              <VehicleIcon category={product.category} className={accent.text} />
            </div>
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold text-white">{product.name}</h3>
        {product.specLine && (
          <p className={`mt-1 text-sm font-semibold ${accent.text}`}>{product.specLine}</p>
        )}
        <p className="mt-2 text-sm text-slate-300">{product.description}</p>

        {stats.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-2"
              >
                <p className="text-sm font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex gap-2">
          <WhatsAppButton
            message={`Hi! I want to know about the ${product.name}.`}
            label="Enquire"
            compact
            className="flex-1"
          />
          <Link
            to="/contact"
            className="flex-1 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-neon-500/40 hover:text-neon-400"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  )
}
