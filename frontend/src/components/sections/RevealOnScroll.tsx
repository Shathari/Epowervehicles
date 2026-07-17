import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function RevealOnScroll({ children, className = '', delayMs = 0 }: RevealOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transform transition-all duration-700 ease-out
        ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}
