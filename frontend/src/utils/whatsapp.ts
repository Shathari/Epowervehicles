import { WHATSAPP_PHONE_E164 } from '@/config/contact'

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string) {
  window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
}
