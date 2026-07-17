import type { ReactNode } from 'react'

export function ValueBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass min-w-[220px] flex-1 rounded-xl p-5 text-slate-200 transition-colors hover:border-neon-500/30">
      <p>
        <strong className="text-neon-400">{title}:</strong> {children}
      </p>
    </div>
  )
}
