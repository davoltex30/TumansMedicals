'use client'

import { motion } from 'motion/react'
import { Skeleton } from 'boneyard-js/react'
import { staggerContainer } from '@/lib/animations'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/schemas/product'
import { PackageSearch } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

export function ProductGrid({ products, isLoading, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} name="product-card" loading={true}>
            <div />
          </Skeleton>
        ))}
      </div>
    )
  }

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
        <Skeleton key={product.id} name="product-card" loading={false}>
          <ProductCard product={product} />
        </Skeleton>
      ))}
    </motion.div>
  )
}
