import { CategoryCarousel } from '@/components/home/CategoryCarousel'
import { FeaturedBento } from '@/components/home/FeaturedBento'
import { HomeHero } from '@/components/home/HomeHero'
import { Testimonials } from '@/components/home/Testimonials'
import { TrustPillars } from '@/components/home/TrustPillars'
import { TrustStrip } from '@/components/home/TrustStrip'
import { UniverseShowcase } from '@/components/home/UniverseShowcase'
import { WholesaleBanner } from '@/components/home/WholesaleBanner'

export function HomePage() {
  return (
    <div className="bg-white">
      <HomeHero />
      <TrustStrip />
      <UniverseShowcase />
      <CategoryCarousel />
      <FeaturedBento />
      <TrustPillars />
      <Testimonials />
      <WholesaleBanner />
    </div>
  )
}
