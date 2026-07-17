import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { BankIcon } from '@/components/icons/BankIcon'

// Generic placeholder labels — swap in real partner names/logos when available, no code changes
// needed beyond editing this list.
const partners = [
  'Partner Bank',
  'Leading NBFC',
  'Regional Bank',
  'Rural Finance Partner',
  'Digital Lender',
  'Cooperative Bank',
]

export function FinancePartners() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
            Easy Financing
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">Our Finance Partners</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Tie-ups with leading banks and NBFCs for low down payments, competitive EMIs, and quick
            loan processing.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <RevealOnScroll key={partner} delayMs={index * 60}>
              <div className="glass flex h-full flex-col items-center justify-center gap-3 rounded-xl px-4 py-6 text-center transition-colors hover:border-neon-500/40">
                <BankIcon className="h-8 w-8 text-neon-400" />
                <p className="text-sm font-semibold text-slate-200">{partner}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
