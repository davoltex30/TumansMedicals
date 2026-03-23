'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight, Scissors, FlaskConical, TestTube, Building2, Zap, Package } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { Section } from '@/components/layout/section'
import { useCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors, FlaskConical, TestTube, Building2, Zap, Package
}

const colorMap: Record<string, string> = {
  surgical: 'bg-red-100 text-red-600',
  laboratory: 'bg-blue-100 text-blue-600',
  diagnostic: 'bg-purple-100 text-purple-600',
  furniture: 'bg-amber-100 text-amber-600',
  emergency: 'bg-orange-100 text-orange-600',
  consumables: 'bg-green-100 text-green-600',
}

export function FeaturedCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { data: categories, isLoading } = useCategories()

  return (
    <Section className="bg-[#f7f9fb]">
      {/* Section header */}
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

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {(categories || []).map((cat) => {
          const Icon = iconMap[cat.icon] || Package
          const colorClass = colorMap[cat.id] || 'bg-gray-100 text-gray-600'

          return (
            <motion.div key={cat.id} variants={slideUp}>
              <Link
                href={`/products?category=${cat.id}`}
                className="group flex flex-col h-full bg-[#f2f4f6] rounded-xl p-8 md:p-10 hover:bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0', colorClass)}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-[#00288e] font-bold tracking-[0.2em] text-xs uppercase mb-2">
                  {cat.name}
                </div>
                <h3 className="text-xl font-bold text-[#191c1e] mb-3">
                  {cat.name}
                </h3>
                <p className="text-[#444653] text-sm leading-relaxed mb-5 flex-1">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#757684]">{cat.productCount} products</span>
                  <span className="text-[#00288e] font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                    Explore Category <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
