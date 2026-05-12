'use client'

import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { slideUp, staggerContainer } from '@/lib/animations'
import { Section } from '@/components/layout/section'
import { ProductCard } from '@/components/products/product-card'
import { ProductCardSkeleton } from '@/components/products/product-grid'
import { useProducts } from '@/hooks/use-products'

export function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { data, isLoading } = useProducts({ perPage: 6 })

  return (
    <Section className="bg-[#f7f9fb]">
      {/* Section header — Stitch pattern */}
      <div className="mb-12 text-center">
        <span className="text-[#c51611] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
          Featured Products
        </span>
        <h2 className="text-4xl font-extrabold text-[#191c1e] tracking-tight">
          Top-Quality Medical Equipment
        </h2>
        <p className="mt-4 text-[#444653] text-lg leading-relaxed max-w-2xl mx-auto">
          Explore our most popular surgical, laboratory, and diagnostic products trusted by healthcare professionals.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {(data?.data || []).slice(0, 6).map((product) => (
            <motion.div key={product.id} variants={slideUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 border border-[#c4c5d5] text-[#191c1e] px-8 py-3 rounded-lg font-bold text-sm hover:border-[#c51611] hover:text-[#c51611] transition-all"
        >
          View All Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  )
}
