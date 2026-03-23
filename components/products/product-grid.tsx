'use client'

import { motion } from 'motion/react'
import { staggerContainer } from '@/lib/animations'
import { ProductCard } from './product-card'
import { ProductGridSkeleton } from './product-skeleton'
import type { Product } from '@/lib/schemas/product'
import { PackageSearch } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

export function ProductGrid({ products, isLoading, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton />

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
