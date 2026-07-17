import { RevealOnScroll } from '@/components/sections/RevealOnScroll'

interface Feature {
  title: string
  description: string
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section className="flex flex-wrap justify-center gap-5 px-5 py-10">
      {features.map((feature, index) => (
        <RevealOnScroll key={feature.title} delayMs={index * 75} className="w-full sm:w-[45%]">
          <div className="h-full rounded-xl border border-white/10 bg-ink-800/60 p-6 text-center shadow-lg shadow-black/30 backdrop-blur transition-colors hover:border-neon-500/40">
            <h3 className="text-lg font-bold text-neon-400">{feature.title}</h3>
            <p className="mt-2 text-slate-300">{feature.description}</p>
          </div>
        </RevealOnScroll>
      ))}
    </section>
  )
}
