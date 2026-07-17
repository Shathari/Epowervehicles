import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SkipToContent } from '@/components/layout/SkipToContent'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950 text-slate-100">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1 pt-[60px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
