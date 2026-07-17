import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '@/assets/logo.webp'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/dealership', label: 'Dealership' },
  { to: '/sales-partner', label: 'Sales Partner' },
  { to: '/contact', label: 'Contact' },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `rounded px-3 py-2 text-base font-bold transition-colors hover:bg-white/5 ${
    isActive ? 'text-neon-400' : 'text-slate-200'
  }`
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-ink-950/95 backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="EPOWER Vehicles" className="h-10 w-auto" />
        </NavLink>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-neon-400 transition-transform ${
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-6 bg-neon-400 transition-opacity ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-4 block h-0.5 w-6 bg-neon-400 transition-transform ${
                isMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`overflow-hidden border-t border-white/10 bg-ink-950 transition-[max-height] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={navLinkClass}
                end={item.to === '/'}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
