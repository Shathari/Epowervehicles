import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
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

export function AppRouter() {
  return (
    <Suspense fallback={<Spinner label="Loading…" className="min-h-screen" />}>
      <Routes>
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
