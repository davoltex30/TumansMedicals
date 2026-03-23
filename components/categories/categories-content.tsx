'use client'

import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, Scissors, FlaskConical, TestTube, Building2, Zap, Package } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { Section, SectionHeader } from '@/components/layout/section'
import { useCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors, FlaskConical, TestTube, Building2, Zap, Package
}

const bgMap: Record<string, string> = {
  surgical: 'from-red-50 to-red-100/50 border-red-200',
  laboratory: 'from-blue-50 to-blue-100/50 border-blue-200',
  diagnostic: 'from-purple-50 to-purple-100/50 border-purple-200',
  furniture: 'from-amber-50 to-amber-100/50 border-amber-200',
  emergency: 'from-orange-50 to-orange-100/50 border-orange-200',
  consumables: 'from-green-50 to-green-100/50 border-green-200',
}

const iconColorMap: Record<string, string> = {
  surgical: 'text-red-600 bg-red-100',
  laboratory: 'text-blue-600 bg-blue-100',
  diagnostic: 'text-purple-600 bg-purple-100',
  furniture: 'text-amber-600 bg-amber-100',
  emergency: 'text-orange-600 bg-orange-100',
  consumables: 'text-green-600 bg-green-100',
}

export function CategoriesContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { data: categories, isLoading } = useCategories()

  return (
    <>
      <section className="pt-32 pb-10 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Product Categories</h1>
          <p className="text-muted-foreground">Browse our full range of medical and laboratory equipment categories.</p>
        </div>
      </section>

      <Section>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(categories || []).map((cat) => {
            const Icon = iconMap[cat.icon] || Package
            const bg = bgMap[cat.id] || 'from-gray-50 to-gray-100/50 border-gray-200'
            const iconColor = iconColorMap[cat.id] || 'text-gray-600 bg-gray-100'

            return (
              <motion.div key={cat.id} variants={slideUp}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className={cn(
                    'group block rounded-2xl border bg-gradient-to-br p-8 hover:shadow-md transition-all duration-200',
                    bg
                  )}
                >
                  <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-5', iconColor)}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{cat.productCount} products</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>
    </>
  )
}
