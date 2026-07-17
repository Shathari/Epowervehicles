import { Outlet } from 'react-router-dom'
import { AdminNav } from '@/components/layout/AdminNav'

export function AdminLayout() {
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </div>
    </div>
  )
}
