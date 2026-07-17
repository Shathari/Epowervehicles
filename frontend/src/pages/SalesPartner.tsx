import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { SectionGlow } from '@/components/sections/SectionGlow'
import { Card } from '@/components/ui/Card'
import { SalesPartnerForm } from '@/forms/SalesPartnerForm'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function SalesPartner() {
  useDocumentTitle(
    'Join As Sales Partner',
    'Become an EPOWER Vehicles sales partner — apply in minutes and start earning.',
  )

  return (
    <div>
      <SectionGlow>
        <RevealOnScroll>
          <div className="px-5 py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
              Sales Partner
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Join As Sales Partner
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Partner with EPOWER Vehicles and earn by selling India's most trusted electric
              vehicles in your city.
            </p>
          </div>
        </RevealOnScroll>
      </SectionGlow>

      <div className="mx-auto max-w-2xl px-5 py-12">
        <RevealOnScroll>
          <Card tone="dark">
            <SalesPartnerForm />
          </Card>
        </RevealOnScroll>
      </div>
    </div>
  )
}
