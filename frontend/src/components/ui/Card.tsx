import type { HTMLAttributes } from 'react'

type Tone = 'light' | 'dark'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
}

const toneClasses: Record<Tone, string> = {
  light: 'bg-white shadow-md shadow-slate-900/5',
  dark: 'bg-ink-900/70 border border-white/10 shadow-lg shadow-black/40 backdrop-blur',
}

export function Card({ tone = 'light', className = '', ...props }: CardProps) {
  return <div className={`rounded-xl p-6 ${toneClasses[tone]} ${className}`} {...props} />
}
