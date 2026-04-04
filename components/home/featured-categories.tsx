'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { Section } from '@/components/layout/section'
import { useCategories } from '@/hooks/use-categories'

export function FeaturedCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { data: categories, isLoading } = useCategories()

  const displayed = (categories || []).slice(0, 6)

  return (
    <Section className="bg-[#f7f9fb]">
      <div className="mb-12 text-center">
        <span className="text-[#00288e] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
          Product Range
        </span>
        <h2 className="text-4xl font-extrabold text-[#191c1e] tracking-tight">
          Comprehensive Medical Categories
        </h2>
        <p className="mt-4 text-[#444653] text-lg leading-relaxed max-w-2xl mx-auto">
          From surgical theaters to diagnostic labs — we supply every department with the equipment it needs.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayed.map((cat) => (
            <motion.div key={cat.id} variants={slideUp}>
              <Link
                href={`/products?category=${cat.id}`}
                className="group flex flex-col h-full bg-white rounded-xl border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image — only shown if category has one */}
                {cat.image && cat.image !== '/No_Image_Available.jpg' && (
                  <div className="relative w-full h-36 overflow-hidden flex-shrink-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-bold text-[#191c1e] mb-2 group-hover:text-[#00288e] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[#444653] text-sm leading-relaxed flex-1 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {cat.productCount} products
                    </span>
                    <span className="text-[#00288e] font-bold text-xs uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center mt-10">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 border border-[#c4c5d5] text-[#191c1e] px-8 py-3 rounded-lg font-bold text-sm hover:border-[#00288e] hover:text-[#00288e] transition-all"
        >
          View All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  )
}
