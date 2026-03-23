import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { FeaturedCategories } from '@/components/home/featured-categories'
import { FeaturedProducts } from '@/components/home/featured-products'
import { StatsSection } from '@/components/home/stats-section'
import { WhyUs } from '@/components/home/why-us'
import { CtaBanner } from '@/components/home/cta-banner'

export const metadata: Metadata = {
  title: 'Home',
  description: "Cameroon's leading medical and laboratory wholesaler. Browse 500+ products for surgical theaters, emergency departments, and diagnostic labs.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyUs />
      <CtaBanner />
    </>
  )
}
