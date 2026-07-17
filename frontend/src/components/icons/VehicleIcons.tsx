import type { ReactElement } from 'react'
import type { ProductCategory } from '@/types/product'

interface IconProps {
  className?: string
}

const strokeProps = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function RickshawIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M10 44V26a4 4 0 0 1 4-4h14v22" />
      <path d="M28 22h10a8 8 0 0 1 8 8v14" />
      <path d="M10 30h18" />
      <circle cx="18" cy="48" r="5" />
      <circle cx="46" cy="48" r="5" />
      <path d="M23 48h18" />
    </svg>
  )
}

export function LoaderIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <rect x="6" y="24" width="24" height="18" rx="2" />
      <path d="M30 30h12l8 8v4h-6" />
      <circle cx="16" cy="48" r="5" />
      <circle cx="44" cy="48" r="5" />
      <path d="M21 48h18" />
    </svg>
  )
}

export function DumperIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M8 40 20 24h14v16" />
      <path d="M34 32h10l8 8v6H34z" />
      <circle cx="18" cy="48" r="5" />
      <circle cx="46" cy="48" r="5" />
      <path d="M23 48h18" />
    </svg>
  )
}

export function ScootyIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M14 44V30h6l6 8h10" />
      <path d="M36 38h6a6 6 0 0 1 6 6" />
      <path d="M14 30v-6h4" />
      <circle cx="16" cy="46" r="5" />
      <circle cx="46" cy="46" r="5" />
    </svg>
  )
}

export function CartIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <rect x="12" y="28" width="30" height="14" rx="2" />
      <path d="M42 34h8l4 6v2h-6" />
      <circle cx="20" cy="48" r="5" />
      <circle cx="44" cy="48" r="5" />
    </svg>
  )
}

export function AutoIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M12 42V28a6 6 0 0 1 6-6h6l6 6h14a4 4 0 0 1 4 4v10" />
      <path d="M12 34h30" />
      <circle cx="18" cy="48" r="5" />
      <circle cx="44" cy="48" r="5" />
      <path d="M23 48h18" />
    </svg>
  )
}

export function CustomVehicleIcon({ className = 'h-16 w-16' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...strokeProps}>
      <rect x="10" y="26" width="44" height="16" rx="3" />
      <path d="M18 26v-4a3 3 0 0 1 3-3h6" strokeDasharray="3 3" />
      <circle cx="20" cy="46" r="5" />
      <circle cx="44" cy="46" r="5" />
      <path d="M25 46h14" />
    </svg>
  )
}

const iconByCategory: Record<ProductCategory, (props: IconProps) => ReactElement> = {
  rickshaw: RickshawIcon,
  loader: LoaderIcon,
  dumper: DumperIcon,
  scooty: ScootyIcon,
  cart: CartIcon,
  auto: AutoIcon,
  custom: CustomVehicleIcon,
}

export function VehicleIcon({
  category,
  className = 'h-16 w-16',
}: {
  category: ProductCategory
  className?: string
}) {
  const Icon = iconByCategory[category] ?? CustomVehicleIcon
  return <Icon className={className} />
}
