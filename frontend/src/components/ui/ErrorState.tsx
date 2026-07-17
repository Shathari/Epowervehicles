import { Button } from '@/components/ui/Button'

type Tone = 'light' | 'dark'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  tone?: Tone
}

const toneClasses: Record<Tone, { wrapper: string; title: string; message: string }> = {
  light: {
    wrapper: 'border-red-200 bg-red-50',
    title: 'text-red-700',
    message: 'text-red-600',
  },
  dark: {
    wrapper: 'border-red-500/30 bg-red-950/30',
    title: 'text-red-300',
    message: 'text-red-200',
  },
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  onRetry,
  tone = 'light',
}: ErrorStateProps) {
  const styles = toneClasses[tone]
  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-3 rounded-xl border px-6 py-14 text-center ${styles.wrapper}`}
    >
      <h3 className={`text-lg font-semibold ${styles.title}`}>{title}</h3>
      <p className={`max-w-md text-sm ${styles.message}`}>{message}</p>
      {onRetry && (
        <Button variant="outline" tone={tone} onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
