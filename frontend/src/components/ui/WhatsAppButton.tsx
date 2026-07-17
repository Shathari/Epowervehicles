import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { buildWhatsAppLink } from '@/utils/whatsapp'

type Variant = 'solid' | 'inverted'

interface WhatsAppButtonProps {
  message: string
  label?: string
  className?: string
  variant?: Variant
  compact?: boolean
}

const variantClasses: Record<Variant, string> = {
  solid: 'bg-neon-500 text-ink-950 hover:bg-neon-400',
  // For use on top of a solid neon-colored background (e.g. the CTA band) where the default
  // neon-on-neon combination would have no contrast.
  inverted: 'bg-ink-950 text-white hover:bg-ink-900',
}

export function WhatsAppButton({
  message,
  label = 'Chat on WhatsApp',
  className = '',
  variant = 'solid',
  compact = false,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        transition-transform duration-200 hover:scale-105
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400
        ${compact ? 'px-4 py-2 text-sm' : 'px-6 py-3'} ${variantClasses[variant]} ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  )
}
