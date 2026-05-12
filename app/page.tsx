import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Hero } from '@/components/home/hero'
import { FeaturedCategories } from '@/components/home/featured-categories'
import { FeaturedProducts } from '@/components/home/featured-products'
import { StatsSection } from '@/components/home/stats-section'
import { WhyUs } from '@/components/home/why-us'
import { CtaBanner } from '@/components/home/cta-banner'
import { fetchCategories, fetchProducts } from '@/lib/api/server'

export const metadata: Metadata = {
  title: 'Home',
  description: "Cameroon's leading medical and laboratory wholesaler. Browse 500+ products for surgical theaters, emergency departments, and diagnostic labs.",
}

export default async function HomePage() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['categories'], queryFn: fetchCategories }),
    queryClient.prefetchQuery({ queryKey: ['products', { perPage: 6 }], queryFn: () => fetchProducts({ perPage: 6 }) }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hero />
      <StatsSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyUs />
      <CtaBanner />
    </HydrationBoundary>
  )
}
