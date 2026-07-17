import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Section } from '@/components/sections/Section'
import { GradientSection } from '@/components/sections/GradientSection'
import { DealershipForm } from '@/forms/DealershipForm'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd4HbYd4hJkG1YIivDWUvFXBTG0qmqEOZHvLHSA4vX7mhwVPA/viewform?usp=sharing'

export function Dealership() {
  useDocumentTitle(
    'Become a Dealer',
    'Partner with EPOWER Vehicles — apply for a dealership today.',
  )

  return (
    <GradientSection theme="cta">
      <div className="mx-auto max-w-4xl px-5 py-10">
        <RevealOnScroll>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-neon-400">Become a Dealer</h1>
            <p className="mt-2 text-slate-300">
              Partner with us for a successful dealership experience with great benefits.
            </p>
          </div>
        </RevealOnScroll>

        <Section title="Why Choose Us?">
          <p>We offer extensive support, high-quality products, and exclusive dealer benefits.</p>
        </Section>

        <Section title="Benefits of Our Dealership">
          <ul className="list-disc space-y-2 pl-5">
            <li>Competitive pricing and profit margins</li>
            <li>Marketing and promotional support</li>
            <li>Wide range of high-demand products</li>
            <li>Dedicated account management</li>
            <li>Training and onboarding assistance</li>
          </ul>
        </Section>

        <Section title="Apply for Dealership">
          <p>Fill out the form below and our team will get back to you shortly.</p>
          <DealershipForm />
          <p className="text-sm text-slate-400">
            Prefer Google Forms?{' '}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-neon-400 underline"
            >
              Apply via Google Form instead
            </a>
            .
          </p>
        </Section>
      </div>
    </GradientSection>
  )
}
