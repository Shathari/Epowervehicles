import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Section } from '@/components/sections/Section'
import { SectionGlow } from '@/components/sections/SectionGlow'
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
    <div>
      <SectionGlow>
        <RevealOnScroll>
          <div className="px-5 py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
              Dealership
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Become a Dealer</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Partner with us for a successful dealership experience with great benefits.
            </p>
          </div>
        </RevealOnScroll>
      </SectionGlow>

      <div className="mx-auto max-w-4xl px-5 py-10">
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
    </div>
  )
}
