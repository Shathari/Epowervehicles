import { WHATSAPP_PHONE_DISPLAY } from '@/config/contact'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 py-8 text-center text-slate-400">
      <p>&copy; {new Date().getFullYear()} EPOWER Vehicles Pvt Ltd. All Rights Reserved.</p>
      <p className="mt-1 text-sm">
        <a
          href={`tel:${WHATSAPP_PHONE_DISPLAY.replace(/\s+/g, '')}`}
          className="text-neon-400 hover:underline"
        >
          {WHATSAPP_PHONE_DISPLAY}
        </a>
      </p>
    </footer>
  )
}
