type Tone = 'light' | 'dark'

interface SpinnerProps {
  label?: string
  className?: string
  tone?: Tone
}

const toneClasses: Record<Tone, { ring: string; label: string }> = {
  light: { ring: 'border-brand-teal-100 border-t-brand-teal-600', label: 'text-slate-500' },
  dark: { ring: 'border-white/10 border-t-neon-500', label: 'text-slate-300' },
}

export function Spinner({ label = 'Loading…', className = '', tone = 'light' }: SpinnerProps) {
  const styles = toneClasses[tone]
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-16 ${className}`}
      role="status"
    >
      <span className={`h-10 w-10 animate-spin rounded-full border-4 ${styles.ring}`} />
      <span className={`text-sm font-medium ${styles.label}`}>{label}</span>
    </div>
  )
}
