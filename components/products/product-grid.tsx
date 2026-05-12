'use client'

import { motion } from 'motion/react'
import { staggerContainer } from '@/lib/animations'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/schemas/product'
import { PackageSearch } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#e0e3e5] overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="flex flex-col flex-1 p-5 gap-2">
        <div className="h-3 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-4/5" />
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-3/4" />
        <div className="flex justify-end mt-1">
          <div className="h-3 bg-slate-100 rounded w-1/4" />
        </div>
        <div className="flex gap-2 mt-auto pt-2">
          <div className="flex-1 h-8 bg-slate-100 rounded-lg" />
          <div className="flex-1 h-8 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function ProductGrid({ products, isLoading, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
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
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
