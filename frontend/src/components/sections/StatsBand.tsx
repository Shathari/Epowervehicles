import { useSiteStats } from '@/hooks/useSiteStats'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'

const items = (stats: { vehiclesSold: number; dealersCount: number; statesCovered: number }) => [
  { label: 'Vehicles Sold', value: stats.vehiclesSold },
  { label: 'Dealers', value: stats.dealersCount },
  { label: 'States Covered', value: stats.statesCovered },
]

export function StatsBand() {
  const { data: stats, isPending, isError } = useSiteStats()

  if (isPending || isError || !stats) return null

  return (
    <section className="border-y border-white/10 bg-ink-900 px-5 py-10">
      <div className="mx-auto flex max-w-4xl flex-wrap justify-around gap-6 text-center">
        {items(stats).map((item, index) => (
          <RevealOnScroll key={item.label} delayMs={index * 75}>
            <p className="text-4xl font-extrabold text-neon-500">{item.value.toLocaleString()}+</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
              {item.label}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
