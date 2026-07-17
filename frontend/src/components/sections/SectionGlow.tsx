import type { ReactNode } from 'react'

interface SectionGlowProps {
  children: ReactNode
  className?: string
}

// A soft lime radial glow + fine grid texture over the near-black background — used sparingly
// (hero, and other standout bands) rather than washing every section in a flat color, matching
// the approved design reference.
export function SectionGlow({ children, className = '' }: SectionGlowProps) {
  return (
    <section className={`relative overflow-hidden bg-grid ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[550px] bg-gradient-to-b from-neon-500/20 via-transparent to-transparent"
      />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
