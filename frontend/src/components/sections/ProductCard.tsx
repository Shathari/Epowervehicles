import type { Product } from '@/types/product'

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-800/60 p-5 text-center shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-500/50 hover:shadow-neon-500/10">
      <div className="overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={300}
          height={200}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-xl font-bold text-neon-400">{product.name}</h3>
      <p className="mt-2 text-slate-300">{product.description}</p>
      {product.specLine && (
        <p className="mt-3 text-sm font-semibold text-neon-500">{product.specLine}</p>
      )}
    </div>
  )
}
