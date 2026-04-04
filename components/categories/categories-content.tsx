'use client'

import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { Section } from '@/components/layout/section'
import { useCategories } from '@/hooks/use-categories'

export function CategoriesContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { data: categories, isLoading } = useCategories()
  const [search, setSearch] = useState('')

  const filtered = (categories || []).filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <section className="pt-32 pb-10 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Product Categories</h1>
          <p className="text-muted-foreground">Browse our full range of medical and laboratory equipment categories.</p>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 h-11 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00288e] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <Section>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-slate-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No categories found for &ldquo;{search}&rdquo;.</p>
        ) : (
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cat) => (
              <motion.div key={cat.id} variants={slideUp}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group block rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  {/* Image — only shown if category has one */}
                  {cat.image && cat.image !== '/No_Image_Available.jpg' && (
                    <div className="relative w-full h-40 overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-[#00288e] transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {cat.productCount} products
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-[#00288e] opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Section>
    </>
  )
}
