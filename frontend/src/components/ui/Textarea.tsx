import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react'

type Tone = 'light' | 'dark'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  tone?: Tone
  icon?: ReactNode
}

const fieldClasses: Record<
  Tone,
  { border: string; label: string; iconColor: string; error: string }
> = {
  light: {
    border: 'border-slate-300 focus:border-brand-teal-600 bg-white text-slate-900',
    label: 'text-slate-700',
    iconColor: 'text-slate-400',
    error: 'text-red-600',
  },
  dark: {
    border: 'border-white/15 focus:border-neon-500 bg-ink-900 text-white',
    label: 'text-slate-300',
    iconColor: 'text-neon-400',
    error: 'text-red-400',
  },
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, tone = 'light', icon, className = '', rows = 5, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const styles = fieldClasses[tone]

    return (
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor={inputId} className={`text-sm font-semibold ${styles.label}`}>
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className={`pointer-events-none absolute left-3 top-3 ${styles.iconColor}`}>
              {icon}
            </span>
          )}
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={`w-full rounded-lg border py-2.5 pr-4 text-base transition-colors focus:outline-none
              ${icon ? 'pl-10' : 'pl-4'} ${error ? 'border-red-500' : styles.border} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} role="alert" className={`text-sm ${styles.error}`}>
            {error}
          </p>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
