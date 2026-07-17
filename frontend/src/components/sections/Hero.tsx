import heroImage from '@/assets/hero.webp'

export function Hero() {
  return (
    <div className="relative text-center">
      <img
        src={heroImage}
        alt="EPOWER Vehicles latest launch"
        className="h-[400px] w-full object-cover opacity-90 md:h-[600px]"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
