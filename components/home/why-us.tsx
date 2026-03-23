'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { ShieldCheck, Truck, HeadphonesIcon, Award, Users, Globe } from 'lucide-react'
import { staggerContainer, slideUp } from '@/lib/animations'
import { Section } from '@/components/layout/section'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'WHO-Approved Suppliers',
    desc: 'All products sourced from internationally certified and WHO-approved manufacturers.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    desc: 'Fast, reliable delivery to hospitals and clinics across Cameroon and the region.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    desc: 'Dedicated technical support team to help you choose the right equipment.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    desc: 'Every product meets international medical standards and quality certifications.',
  },
  {
    icon: Users,
    title: 'Trusted by 200+ Clients',
    desc: 'Long-term relationships with leading hospitals, clinics, and research centers.',
  },
  {
    icon: Globe,
    title: 'Global Brands',
    desc: 'Official distributor for world-leading medical equipment brands.',
  },
]

export function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section className="bg-white">
      {/* Section header */}
      <div className="mb-12 text-center">
        <span className="text-[#00288e] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
          Why Tumans Medical
        </span>
        <h2 className="text-4xl font-extrabold text-[#191c1e] tracking-tight">
          Your Trusted Healthcare Partner
        </h2>
        <p className="mt-4 text-[#444653] text-lg leading-relaxed max-w-2xl mx-auto">
          We go beyond supplying equipment. We build partnerships that empower healthcare delivery.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((b) => (
          <motion.div
            key={b.title}
            variants={slideUp}
            className="flex gap-4 p-6 rounded-xl bg-[#f2f4f6] hover:bg-white hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1e40af] flex items-center justify-center flex-shrink-0 mt-0.5">
              <b.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#191c1e] mb-1">{b.title}</h3>
              <p className="text-sm text-[#444653] leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
