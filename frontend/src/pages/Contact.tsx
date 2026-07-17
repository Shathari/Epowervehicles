import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Section } from '@/components/sections/Section'
import { InfoBox } from '@/components/sections/InfoBox'
import { SectionGlow } from '@/components/sections/SectionGlow'
import { ContactForm } from '@/forms/ContactForm'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function Contact() {
  useDocumentTitle('Chat/Enquire', 'Get in touch with EPOWER Vehicles by form or WhatsApp.')

  return (
    <div>
      <SectionGlow>
        <RevealOnScroll>
          <div className="px-5 py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-neon-400">
              Chat/Enquire
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Get In Touch</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Reach us by form, or chat instantly on WhatsApp.
            </p>
          </div>
        </RevealOnScroll>
      </SectionGlow>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <Section title="Our Contact Information">
          <div className="flex flex-wrap justify-between gap-4">
            <InfoBox title="Head Office">
              <p>
                <a href="tel:+917060014470" className="text-neon-400 hover:underline">
                  +91 7060014470
                </a>
              </p>
              <p>
                <a
                  href="mailto:salesenquiryamit@gmail.com"
                  className="text-neon-400 hover:underline"
                >
                  salesenquiryamit@gmail.com
                </a>
              </p>
            </InfoBox>
            <InfoBox title="Working Hours">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </InfoBox>
          </div>
        </Section>

        <Section title="Chat with us instantly">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>Skip the form — message us directly on WhatsApp for the fastest response.</p>
            <WhatsAppButton message="Hi EPOWER Vehicles, I have a question about your vehicles." />
          </div>
        </Section>

        <Section title="Send Us a Message">
          <ContactForm />
        </Section>

        <RevealOnScroll>
          <iframe
            title="EPOWER Vehicles location"
            src="https://www.google.com/maps?q=EPOWER+Vehicles+Pvt+Ltd&output=embed"
            className="h-[300px] w-full rounded-xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealOnScroll>
      </div>
    </div>
  )
}
