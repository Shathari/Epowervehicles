import { useEffect, useRef, useState } from 'react'
import { animate, useInView as useFramerInView } from 'framer-motion'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { useSiteStats } from '@/hooks/useSiteStats'

// Sample testimonials — clearly placeholder content until real customer stories are added.
const testimonials = [
  {
    name: 'Ramesh Kumar',
    role: 'E-Rickshaw Owner, Lucknow',
    quote:
      'My running cost dropped by more than half after switching to an EPOWER E-Rickshaw. Best decision for my daily income.',
    initials: 'RK',
  },
  {
    name: 'Sunita Devi',
    role: 'Dealer, Patna',
    quote:
      'Great after-sales support and genuine spare parts availability. My customers keep coming back for EPOWER vehicles.',
    initials: 'SD',
  },
  {
    name: 'Vikram Singh',
    role: 'E-Loader Fleet Operator, Jaipur',
    quote:
      'The E-Loader handles our daily cargo runs with zero fuss. Low maintenance and reliable in every season.',
    initials: 'VS',
  },
]

function useCountUp(target: number, durationSec = 1.6) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useFramerInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration: durationSec,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, target, durationSec])

  return { ref, value }
}

function StatCounter({ target, label }: { target: number; label: string }) {
  const { ref, value } = useCountUp(target)
  return (
    <div>
      <p ref={ref} className="text-4xl font-extrabold text-neon-400 sm:text-5xl">
        {value.toLocaleString()}+
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  )
}

export function HappyCustomers() {
  const { data: stats } = useSiteStats()

  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
            Happy Customers
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">
            Trusted By Thousands Across India
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="glass grid grid-cols-2 gap-8 rounded-2xl p-8 sm:grid-cols-3 lg:grid-cols-2">
              <StatCounter target={stats?.vehiclesSold ?? 0} label="Vehicles Sold" />
              <StatCounter target={stats?.dealersCount ?? 0} label="Dealers" />
              <StatCounter target={stats?.statesCovered ?? 0} label="States Covered" />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-4">
            {testimonials.map((testimonial, index) => (
              <RevealOnScroll key={testimonial.name} delayMs={index * 100}>
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neon-500/20 font-bold text-neon-400">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">"{testimonial.quote}"</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
