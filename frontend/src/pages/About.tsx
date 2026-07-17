import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Section } from '@/components/sections/Section'
import { ValueBox } from '@/components/sections/ValueBox'
import { SectionGlow } from '@/components/sections/SectionGlow'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { useAboutContent } from '@/hooks/useAboutContent'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function About() {
  useDocumentTitle(
    'About Us',
    'Learn about EPOWER Vehicles Pvt Ltd — our mission, vision, and core values.',
  )

  const { data: about, isPending, isError, refetch } = useAboutContent()

  return (
    <div>
      {isPending && <Spinner tone="dark" label="Loading…" className="min-h-[50vh]" />}
      {isError && (
        <ErrorState
          tone="dark"
          message="Couldn't load the About page content."
          onRetry={() => refetch()}
        />
      )}
      {about && (
        <>
          <SectionGlow>
            <RevealOnScroll>
              <div className="px-5 py-16 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
                  About Us
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  {about.heroTitle}
                </h1>
                <p className="mt-3 text-lg text-slate-300">{about.heroSubtitle}</p>
              </div>
            </RevealOnScroll>
          </SectionGlow>

          <div className="mx-auto max-w-5xl px-5 py-10">
            {about.companyIntro && (
              <Section title="About Our Company">
                <p>{about.companyIntro}</p>
              </Section>
            )}

            {(about.missionText || about.visionText) && (
              <Section title="Our Mission & Vision">
                {about.visionText && (
                  <p>
                    <strong className="text-white">Vision:</strong> {about.visionText}
                  </p>
                )}
                {about.missionText && (
                  <p>
                    <strong className="text-white">Mission:</strong> {about.missionText}
                  </p>
                )}
              </Section>
            )}

            {about.coreValues.length > 0 && (
              <Section title="Our Core Values">
                <div className="flex flex-wrap gap-4">
                  {about.coreValues.map((value) => (
                    <ValueBox key={value.title} title={value.title}>
                      {value.description}
                    </ValueBox>
                  ))}
                </div>
              </Section>
            )}

            {about.services.length > 0 && (
              <Section title="Services We Offer">
                {about.servicesIntro && <p className="mb-3">{about.servicesIntro}</p>}
                <ul className="list-disc space-y-3 pl-5">
                  {about.services.map((service) => (
                    <li key={service.title}>
                      <strong className="text-white">{service.title}:</strong> {service.description}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {about.environmentalImpact && (
              <Section title="Environmental & Social Impact">
                <p>{about.environmentalImpact}</p>
              </Section>
            )}
          </div>
        </>
      )}
    </div>
  )
}
