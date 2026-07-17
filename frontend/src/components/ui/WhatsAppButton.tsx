import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { buildWhatsAppLink } from '@/utils/whatsapp'

interface WhatsAppButtonProps {
  message: string
  label?: string
  className?: string
}

export function WhatsAppButton({
  message,
  label = 'Chat on WhatsApp',
  className = '',
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-neon-500 px-6 py-3
        font-semibold text-ink-950 transition-transform duration-200 hover:scale-105 hover:bg-neon-400
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400
        ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  )
}
