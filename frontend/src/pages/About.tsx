import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import { Section } from '@/components/sections/Section'
import { ValueBox } from '@/components/sections/ValueBox'
import { GradientSection } from '@/components/sections/GradientSection'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function About() {
  useDocumentTitle(
    'About Us',
    'Learn about EPOWER Vehicles Pvt Ltd — our mission, vision, and core values.',
  )

  return (
    <GradientSection theme="benefits">
      <RevealOnScroll>
        <div className="px-5 py-16 text-center">
          <h1 className="text-3xl font-bold text-neon-400">Welcome to EPOWER Vehicles Pvt Ltd</h1>
          <p className="mt-2 text-lg text-slate-300">Driving the Future of Sustainable Mobility</p>
        </div>
      </RevealOnScroll>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <Section title="About Our Company">
          <p>
            EPOWER VEHICLES PRIVATE LIMITED, established in 2015, has significantly advanced
            last-mile connectivity through our range of E-Rickshaws and E-Loaders. With a focus on
            quality and affordability, our products are designed to enhance your journeys while
            reducing environmental impact. Boasting over a decade of expertise in the EV industry,
            we leverage technology and innovation to deliver reliable solutions. Committed to
            sustainability, we offer cost-effective and low maintenance vehicles, driven by our
            dedication to a greener future. Join us in shaping a cleaner and more efficient
            transportation landscape.
          </p>
        </Section>

        <Section title="Our Mission & Vision">
          <p>
            <strong>Vision:</strong> Our vision at EPOWER VEHICLES PRIVATE LIMITED is to become a
            global leader in electric mobility, renowned for our cutting-edge technology, trusted
            quality, and dedication to environmental stewardship. We envision a future where our
            vehicles are the preferred choice for efficient and eco-friendly transportation, driving
            positive change for communities worldwide.
          </p>
          <p>
            <strong>Mission:</strong> Our mission is to revolutionize last-mile connectivity by
            providing high-quality, cost-effective electric vehicles that empower individuals and
            businesses while reducing environmental impact. We aim to lead the transition towards
            sustainable transportation solutions through innovation, reliability, and commitment to
            excellence.
          </p>
        </Section>

        <Section title="Our Core Values">
          <div className="flex flex-wrap gap-4">
            <ValueBox title="Sustainability">
              We prioritize environmental responsibility in all aspects of our operations, striving
              to minimize our carbon footprint and promote a greener future.
            </ValueBox>
            <ValueBox title="Quality">
              We are committed to delivering high-quality products and services that exceed customer
              expectations, ensuring reliability and durability in every vehicle we produce.
            </ValueBox>
            <ValueBox title="Innovation">
              We embrace innovation and continuous improvement, leveraging technology to drive
              advancements in electric mobility and enhance the user experience.
            </ValueBox>
            <ValueBox title="Integrity">
              We uphold the highest standards of integrity and ethical conduct in our interactions
              with customers, partners, and stakeholders, fostering trust and transparency.
            </ValueBox>
          </div>
        </Section>

        <Section title="Services We Offer">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Vehicle Sales:</strong> Offer a diverse range of electric vehicles, including
              E-Rickshaws and E-Loaders, tailored to various transportation needs. Provide options
              for customization to meet specific requirements and preferences of customers.
            </li>
            <li>
              <strong>Maintenance and Repair:</strong> Conduct routine servicing and inspections to
              ensure the efficient operation and safety of electric vehicles. Offer diagnostic
              services and repair solutions for issues related to batteries, motors, electronics,
              and other components. Provide genuine spare parts and accessories for electric
              vehicles, ensuring quality and compatibility.
            </li>
          </ul>
        </Section>

        <Section title="Environmental & Social Impact">
          <p>
            Electric vehicles (EVs) offer significant economic, environmental, and social benefits.
            Economically, they stimulate job creation, reduce operating costs for owners, and foster
            economic growth through investments. Environmentally, EVs cut emissions, conserve
            resources, and contribute to climate change mitigation. Socially, they enhance
            accessibility to transportation, promote public health by reducing pollution, and foster
            community engagement, ultimately contributing to a more inclusive and sustainable
            society.
          </p>
        </Section>
      </div>
    </GradientSection>
  )
}
