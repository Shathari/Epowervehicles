import { forwardRef, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'
type Tone = 'light' | 'dark'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  tone?: Tone
  isLoading?: boolean
}

const variantClasses: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: 'bg-brand-teal-700 text-white hover:bg-brand-teal-800',
    secondary: 'bg-brand-navy-600 text-white hover:bg-brand-navy-500',
    outline: 'border-2 border-brand-teal-700 text-brand-teal-700 hover:bg-brand-teal-50',
  },
  dark: {
    primary: 'bg-neon-500 text-ink-950 hover:bg-neon-400 hover:scale-105',
    secondary:
      'bg-ink-700 text-neon-400 border border-neon-500/40 hover:bg-ink-800 hover:scale-105',
    outline: 'border-2 border-neon-500 text-neon-400 hover:bg-neon-500/10 hover:scale-105',
  },
}

const spinnerClasses: Record<Tone, string> = {
  light: 'border-white/40 border-t-white',
  dark: 'border-ink-950/30 border-t-ink-950',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      tone = 'light',
      isLoading,
      className = '',
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold
          transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100
          ${variantClasses[tone][variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span
            className={`h-4 w-4 animate-spin rounded-full border-2 ${spinnerClasses[tone]}`}
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
