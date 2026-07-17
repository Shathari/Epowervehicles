import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { Spinner } from '@/components/ui/Spinner'

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Products = lazy(() => import('@/pages/Products').then((m) => ({ default: m.Products })))
const Dealership = lazy(() => import('@/pages/Dealership').then((m) => ({ default: m.Dealership })))
const SalesPartner = lazy(() =>
  import('@/pages/SalesPartner').then((m) => ({ default: m.SalesPartner })),
)
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

const AdminLogin = lazy(() =>
  import('@/pages/admin/Login').then((m) => ({ default: m.AdminLogin })),
)
const AdminDashboard = lazy(() =>
  import('@/pages/admin/Dashboard').then((m) => ({ default: m.AdminDashboard })),
)
const AdminProducts = lazy(() =>
  import('@/pages/admin/ProductsAdmin').then((m) => ({ default: m.ProductsAdmin })),
)
const AdminLeads = lazy(() =>
  import('@/pages/admin/LeadsAdmin').then((m) => ({ default: m.LeadsAdmin })),
)
const AdminMessages = lazy(() =>
  import('@/pages/admin/MessagesAdmin').then((m) => ({ default: m.MessagesAdmin })),
)
const AdminStats = lazy(() =>
  import('@/pages/admin/AdminStats').then((m) => ({ default: m.AdminStats })),
)

export function AppRouter() {
  return (
    <Suspense fallback={<Spinner label="Loading…" className="min-h-screen" />}>
      <Routes>
        {/* Admin routes are intentionally NOT nested under the public dark-themed Layout —
            the admin panel keeps its own separate light theme via AdminLayout only. */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/leads" element={<AdminLeads />} />
            <Route path="admin/messages" element={<AdminMessages />} />
            <Route path="admin/stats" element={<AdminStats />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="dealership" element={<Dealership />} />
          <Route path="sales-partner" element={<SalesPartner />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
