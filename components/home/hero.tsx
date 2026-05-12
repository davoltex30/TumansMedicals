'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Award, TrendingUp } from 'lucide-react'
import { slideUp, staggerContainer } from '@/lib/animations'

const HERO_IMAGE = '/Hero.jpg'

const stats = [
  { icon: Shield, value: '15+', label: 'Years Experience' },
  { icon: Award, value: '500+', label: 'Products' },
  { icon: TrendingUp, value: '200+', label: 'Happy Clients' },
]

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Healthcare professionals with medical equipment"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay — dark left, fades right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.88) 45%, rgba(2,6,23,0.60) 75%, rgba(2,6,23,0.35) 100%)',
        }}
      />

      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#f7f9fb] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={slideUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Cameroon&apos;s Leading Medical Wholesaler
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={slideUp}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            Equipping Healthcare.{' '}
            <span className="text-[#fca5a5]">Empowering Lives.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={slideUp}
            className="text-xl text-white/70 leading-relaxed mb-10 max-w-xl"
          >
            Tumans Medicals SARL supplies world-class surgical, laboratory, and diagnostic
            equipment to hospitals, clinics, and research institutions across Cameroon and the region.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={slideUp} className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#c51611] hover:bg-[#a01210] text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all shadow-lg shadow-blue-900/40"
            >
              Browse Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-3.5 rounded-lg font-bold text-base hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Request a Quote
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-white/15"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={slideUp} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0">
                  <stat.icon className="w-5 h-5 text-[#fca5a5]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-none">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-linear-to-b from-white/30 to-transparent"
        />
      </div>
    </section>
  )
}
