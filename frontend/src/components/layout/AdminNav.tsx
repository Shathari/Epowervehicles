import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/leads', label: 'Dealership Leads' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/stats', label: 'Site Stats' },
]

export function AdminNav() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <nav className="flex flex-wrap gap-1" aria-label="Admin">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-sm font-semibold ${
                  isActive
                    ? 'bg-brand-teal-100 text-brand-teal-800'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>{user?.email}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded px-3 py-2 font-semibold text-brand-teal-700 hover:bg-brand-teal-50"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}
