'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { Section } from '@/components/layout/section'

const stats = [
  { value: '15+', label: 'Years in Business', desc: 'Trusted since 2009' },
  { value: '500+', label: 'Products Available', desc: 'Across 6 categories' },
  { value: '200+', label: 'Healthcare Clients', desc: 'Hospitals & clinics' },
  { value: '100%', label: 'Quality Assured', desc: 'WHO-approved suppliers' },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section className="bg-[#f7f9fb]" container={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={slideUp} className="text-center lg:text-left">
              <div className="text-4xl lg:text-5xl font-black text-[#00288e] mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-[#191c1e] mt-1 font-semibold">{stat.label}</div>
              <div className="text-sm text-[#757684] mt-1">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
