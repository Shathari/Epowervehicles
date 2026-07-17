import { Link } from 'react-router-dom'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'

const quickLinks = [
  { title: 'Apply for Dealership', linkLabel: 'CLICK HERE', to: '/dealership' },
  { title: 'Call Us', linkLabel: '+91 7060014470', href: 'tel:+917060014470' },
  {
    title: 'Email Us',
    linkLabel: 'salesenquiryamit@gmail.com',
    href: 'mailto:salesenquiryamit@gmail.com',
  },
  { title: 'Our Products', linkLabel: 'EXPLORE NOW', to: '/products' },
]

export function QuickLinksGrid() {
  return (
    <section className="flex flex-wrap justify-center gap-5 px-5 py-10">
      {quickLinks.map((item, index) => (
        <RevealOnScroll
          key={item.title}
          delayMs={index * 75}
          className="w-full sm:w-[45%] lg:w-[22%]"
        >
          <div className="h-full rounded-xl border border-white/10 bg-ink-800/60 p-5 text-center shadow-lg shadow-black/30 backdrop-blur transition-colors hover:border-neon-500/40">
            <h3 className="mb-2 text-xl font-bold text-neon-400">{item.title}</h3>
            {item.to ? (
              <Link
                to={item.to}
                className="font-bold text-white underline-offset-2 hover:text-neon-400 hover:underline"
              >
                {item.linkLabel}
              </Link>
            ) : (
              <a
                href={item.href}
                className="font-bold text-white underline-offset-2 hover:text-neon-400 hover:underline"
              >
                {item.linkLabel}
              </a>
            )}
          </div>
        </RevealOnScroll>
      ))}
    </section>
  )
}
