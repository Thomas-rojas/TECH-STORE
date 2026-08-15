import { CategoryCarousel } from '@/components/home/CategoryCarousel'
import { FeaturedBento } from '@/components/home/FeaturedBento'
import { HomeHero } from '@/components/home/HomeHero'
import { StatsBrands } from '@/components/home/StatsBrands'
import { Testimonials } from '@/components/home/Testimonials'

export function HomePage() {
  return (
    <div className="bg-ink-950">
      <HomeHero />
      <CategoryCarousel />
      <FeaturedBento />
      <StatsBrands />
      <Testimonials />
    </div>
  )
}
