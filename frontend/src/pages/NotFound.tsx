import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page Not Found')

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-ink-950 px-5 py-24 text-center">
      <h1 className="text-4xl font-bold text-neon-400">404</h1>
      <p className="text-slate-300">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="rounded-lg bg-neon-500 px-6 py-3 font-semibold text-ink-950 transition-transform hover:scale-105 hover:bg-neon-400"
      >
        Back to Home
      </Link>
    </div>
  )
}
