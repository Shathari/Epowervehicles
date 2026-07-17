import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

type Tone = 'light' | 'dark'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  tone?: Tone
  icon?: ReactNode
  floating?: boolean
}

const fieldClasses: Record<
  Tone,
  { border: string; text: string; label: string; iconColor: string; error: string }
> = {
  light: {
    border: 'border-slate-300 focus:border-brand-teal-600 bg-white text-slate-900',
    text: 'text-slate-700',
    label: 'text-slate-700',
    iconColor: 'text-slate-400',
    error: 'text-red-600',
  },
  dark: {
    border: 'border-white/15 focus:border-neon-500 bg-ink-900 text-white',
    text: 'text-slate-300',
    label: 'text-slate-300',
    iconColor: 'text-neon-400',
    error: 'text-red-400',
  },
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, tone = 'light', icon, floating = false, className = '', ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const styles = fieldClasses[tone]

    const inputEl = (
      <input
        ref={ref}
        id={inputId}
        placeholder={floating ? ' ' : props.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`peer w-full rounded-lg border text-base transition-colors focus:outline-none
          ${icon ? 'pl-10' : 'pl-4'} ${floating ? 'pt-5 pb-2' : 'py-2.5'} pr-4
          ${error ? 'border-red-500' : styles.border} ${className}`}
        {...props}
      />
    )

    return (
      <div className="flex flex-col gap-1.5 text-left">
        {!floating && (
          <label htmlFor={inputId} className={`text-sm font-semibold ${styles.label}`}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${styles.iconColor}`}
            >
              {icon}
            </span>
          )}
          {inputEl}
          {floating && (
            <label
              htmlFor={inputId}
              className={`pointer-events-none absolute top-2 text-xs transition-all ${styles.label}
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
                peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-neon-400
                ${icon ? 'left-10' : 'left-4'}`}
            >
              {label}
            </label>
          )}
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
Input.displayName = 'Input'
