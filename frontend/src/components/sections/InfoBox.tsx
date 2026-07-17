import type { ReactNode } from 'react'

export function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full rounded-lg border border-white/10 bg-ink-900/70 p-5 md:w-[48%]">
      <h3 className="mb-2 text-lg font-bold text-neon-400">{title}</h3>
      <div className="space-y-1 text-slate-300">{children}</div>
    </div>
  )
}
