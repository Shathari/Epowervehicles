import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { useProducts } from '@/hooks/useProducts'
import { useDealershipApplications } from '@/hooks/useDealershipApplications'
import { useContactMessages } from '@/hooks/useContactMessages'

export function AdminDashboard() {
  const products = useProducts()
  const leads = useDealershipApplications()
  const messages = useContactMessages()

  const tiles = [
    { label: 'Products', to: '/admin/products', count: products.data?.length },
    {
      label: 'Pending Dealership Leads',
      to: '/admin/leads',
      count: leads.data?.filter((lead) => lead.status === 'pending').length,
    },
    {
      label: 'Unread Messages',
      to: '/admin/messages',
      count: messages.data?.filter((message) => message.status === 'unread').length,
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-teal-700">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.label} to={tile.to}>
            <Card className="transition-shadow hover:shadow-lg">
              <p className="text-sm font-semibold text-slate-500">{tile.label}</p>
              <p className="mt-2 text-3xl font-bold text-brand-teal-700">{tile.count ?? '—'}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
