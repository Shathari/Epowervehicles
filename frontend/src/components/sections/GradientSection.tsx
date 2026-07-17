import type { ReactNode } from 'react'

type GradientTheme = 'hero' | 'range' | 'cta' | 'benefits'

const gradients: Record<GradientTheme, string> = {
  hero: 'bg-gradient-to-b from-amber-500/25 via-transparent to-transparent',
  range: 'bg-gradient-to-b from-orange-500/25 via-transparent to-transparent',
  cta: 'bg-gradient-to-b from-red-500/25 via-transparent to-transparent',
  benefits: 'bg-gradient-to-b from-emerald-500/25 via-transparent to-transparent',
}

interface GradientSectionProps {
  theme: GradientTheme
  children: ReactNode
  className?: string
}

export function GradientSection({ theme, children, className = '' }: GradientSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-ink-950 ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 ${gradients[theme]}`} />
      <div aria-hidden="true" className="absolute inset-0 bg-ink-950/40" />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
