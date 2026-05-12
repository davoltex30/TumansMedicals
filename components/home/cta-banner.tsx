'use client'

import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { slideUp, staggerContainer } from '@/lib/animations'
import { Section } from '@/components/layout/section'

export function CtaBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section className="bg-[#c51611]">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.h2 variants={slideUp} className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Ready to Equip Your Facility?
        </motion.h2>
        <motion.p variants={slideUp} className="text-white/70 text-lg mb-10 leading-relaxed">
          Get in touch with our team for product inquiries, pricing, and customised supply solutions.
        </motion.p>
        <motion.div variants={slideUp} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/237699000001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-lg font-bold text-base hover:bg-white/10 transition-all"
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  )
}
