import type { ReactNode } from 'react'

export function ValueBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-[220px] flex-1 rounded-lg border border-neon-500/20 bg-ink-900/70 p-5 text-slate-200">
      <p>
        <strong className="text-neon-400">{title}:</strong> {children}
      </p>
    </div>
  )
}
