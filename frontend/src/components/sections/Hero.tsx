import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { VehicleIcon } from '@/components/icons/VehicleIcons'
import { Spinner } from '@/components/ui/Spinner'
import { useFeaturedProduct } from '@/hooks/useProducts'
import { useSiteStats } from '@/hooks/useSiteStats'

const trustBadges = ['Zero Emissions', 'FAME II Eligible', 'Low Running Cost']

export function Hero() {
  const { data: featured, isPending: isFeaturedPending } = useFeaturedProduct()
  const { data: stats } = useSiteStats()

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-neon-500/30 bg-neon-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-neon-400">
          ⚡ 100% Electric Vehicles
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Power The
          <br />
          <span className="text-neon-400">Future</span>
          <br />
          Of Mobility
        </h1>

        <p className="mt-5 max-w-xl text-lg text-slate-300">
          India's trusted source for E-Rickshaws, E-Loaders, E-Dumpers, Scooters and more.
          Affordable, reliable, and built for Indian roads.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neon-500 px-6 py-3 font-semibold text-ink-950 transition-transform duration-200 hover:scale-105 hover:bg-neon-400"
          >
            Enquire Now →
          </Link>
          <WhatsAppButton message="Hi EPOWER Vehicles, I'd like to know more about your electric vehicles." />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
            >
              {badge}
            </span>
          ))}
        </div>

        {stats && (
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-3xl font-extrabold text-neon-400">
                {stats.vehiclesSold.toLocaleString()}+
              </p>
              <p className="text-sm text-slate-400">Vehicles Sold</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-neon-400">
                {stats.dealersCount.toLocaleString()}+
              </p>
              <p className="text-sm text-slate-400">Dealers</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-neon-400">{stats.statesCovered}</p>
              <p className="text-sm text-slate-400">States Covered</p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        className="glass rounded-2xl p-8 text-center shadow-2xl shadow-black/40"
      >
        {isFeaturedPending && <Spinner tone="dark" label="Loading featured vehicle…" />}
        {!isFeaturedPending && featured && (
          <>
            <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl bg-ink-900">
              {featured.imageUrl ? (
                <img
                  src={featured.imageUrl}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <VehicleIcon category={featured.category} className="h-20 w-20 text-neon-500" />
              )}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-neon-400">{featured.name}</h2>
            {featured.specLine && <p className="mt-1 text-slate-300">{featured.specLine}</p>}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {badge}
                </span>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
