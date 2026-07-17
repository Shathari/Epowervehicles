import type { ReactNode } from 'react'

type Tone = 'light' | 'dark'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  tone?: Tone
}

const toneClasses: Record<Tone, { wrapper: string; title: string; description: string }> = {
  light: {
    wrapper: 'border-slate-300 bg-white',
    title: 'text-slate-700',
    description: 'text-slate-500',
  },
  dark: {
    wrapper: 'border-white/15 bg-ink-900/50',
    title: 'text-white',
    description: 'text-slate-400',
  },
}

export function EmptyState({ title, description, action, tone = 'light' }: EmptyStateProps) {
  const styles = toneClasses[tone]
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-14 text-center ${styles.wrapper}`}
    >
      <h3 className={`text-lg font-semibold ${styles.title}`}>{title}</h3>
      {description && <p className={`max-w-md text-sm ${styles.description}`}>{description}</p>}
      {action}
    </div>
  )
}
