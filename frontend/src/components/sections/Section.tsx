import type { ReactNode } from 'react'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'

interface SectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function Section({ title, children, className = '' }: SectionProps) {
  return (
    <RevealOnScroll>
      <section
        className={`mb-10 rounded-xl border border-white/10 bg-ink-800/60 p-6 shadow-lg shadow-black/30 backdrop-blur md:p-8 ${className}`}
      >
        <h2 className="mb-3 text-2xl font-bold text-neon-400">{title}</h2>
        <div className="space-y-4 text-left leading-relaxed text-slate-300">{children}</div>
      </section>
    </RevealOnScroll>
  )
}
