import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { GradientSection } from '@/components/sections/GradientSection'
import { Card } from '@/components/ui/Card'
import { SalesPartnerForm } from '@/forms/SalesPartnerForm'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function SalesPartner() {
  useDocumentTitle(
    'Join As Sales Partner',
    'Become an EPOWER Vehicles sales partner — apply in minutes and start earning.',
  )

  return (
    <GradientSection theme="cta">
      <div className="mx-auto max-w-2xl px-5 py-12">
        <RevealOnScroll>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-neon-400">Join As Sales Partner</h1>
            <p className="mt-2 text-slate-300">
              Partner with EPOWER Vehicles and earn by selling India's most trusted electric
              vehicles in your city.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <Card tone="dark">
            <SalesPartnerForm />
          </Card>
        </RevealOnScroll>
      </div>
    </GradientSection>
  )
}
