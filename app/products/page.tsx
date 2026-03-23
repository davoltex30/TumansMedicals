import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductsContent } from '@/components/products/products-content'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our complete range of medical and laboratory equipment. Filter by category and find the right equipment for your healthcare facility.',
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  )
}
