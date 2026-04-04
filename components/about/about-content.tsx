'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { staggerContainer, slideUp, slideIn } from '@/lib/animations'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'

const values = [
  { title: 'Quality First', desc: 'We only source from WHO-approved, internationally certified manufacturers.' },
  { title: 'Customer Trust', desc: "Built on years of reliable service to Cameroon's healthcare sector." },
  { title: 'Expert Knowledge', desc: 'Our team has deep expertise in medical and laboratory equipment.' },
  { title: 'Nationwide Reach', desc: 'Serving hospitals, clinics, and labs across Cameroon and Tchad from our 4 branches.' },
]

const milestones = [
  { year: '2009', event: 'Tumans Medicals SARL founded in Douala, Cameroon' },
  { year: '2012', event: 'Expanded product range to include laboratory equipment' },
  { year: '2016', event: 'Became official distributor for leading international brands' },
  { year: '2020', event: 'Opened branches in Douala and Maroua to serve more regions' },
  { year: '2023', event: 'Extended operations to Tchad; launched digital catalog' },
]

export function AboutContent() {
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const timelineRef = useRef(null)
  const missionInView = useInView(missionRef, { once: true, margin: '-80px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span variants={slideUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#00288e]">
              About Us
            </motion.span>
            <motion.h1 variants={slideUp} className="text-5xl font-black tracking-tighter text-[#191c1e] mt-3 mb-4">
              Powering Cameroon&apos;s Healthcare Infrastructure
            </motion.h1>
            <motion.div variants={slideUp} className="h-1.5 w-24 bg-[#00288e] rounded-full mt-4 mb-6" />
            <motion.p variants={slideUp} className="text-lg text-[#444653] leading-relaxed">
              Since 2009, Tumans Medicals SARL has been Cameroon&apos;s trusted partner for medical and laboratory equipment.
              Headquartered in Douala, with branches in Yaounde, Maroua, and Tchad, we work closely with hospitals, clinics, and research institutions
              to ensure they have the tools they need to save lives.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <Section className="bg-white">
        <motion.div
          ref={missionRef}
          variants={staggerContainer}
          initial="hidden"
          animate={missionInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={slideIn}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00288e]">
              Our Mission
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#191c1e] mt-3 mb-6">
              Equipping Every Healthcare Facility to Perform at Its Best
            </h2>
            <p className="text-[#444653] leading-relaxed mb-6">
              We believe that every patient deserves access to quality healthcare. Our mission is to make
              world-class medical and laboratory equipment accessible to healthcare providers of all sizes
              across Cameroon and the region.
            </p>
            <ul className="space-y-3">
              {['Sourcing from WHO-approved manufacturers', 'Competitive wholesale pricing', 'Technical support & after-sales service', 'Fast nationwide delivery'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006d2f] flex-shrink-0" />
                  <span className="text-sm text-[#191c1e]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={slideUp} className="relative aspect-[4/3] bg-[#1e40af] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <div className="text-5xl font-black text-white mb-2">15+</div>
                <div className="text-white/70 text-lg">Years of excellence in medical supply</div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-black text-white">200+</div>
                    <div className="text-white/60 text-sm mt-1">Clients across Cameroon &amp; Tchad</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">100+</div>
                    <div className="text-white/60 text-sm mt-1">Healthcare facilities</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Values */}
      <Section className="bg-[#f2f4f6]">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00288e]">Our Values</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#191c1e] mt-3">What Drives Us</h2>
        </div>
        <motion.div
          ref={valuesRef}
          variants={staggerContainer}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={slideUp}
              className="bg-white rounded-xl p-6 border border-[#e0e3e5]"
            >
              <h3 className="font-bold text-lg text-[#191c1e] mb-2">{v.title}</h3>
              <p className="text-sm text-[#444653] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Timeline */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00288e]">Our Journey</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#191c1e] mt-3">Milestones That Define Us</h2>
        </div>
        <motion.div
          ref={timelineRef}
          variants={staggerContainer}
          initial="hidden"
          animate={timelineInView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[#c4c5d5]" />
            {milestones.map((m) => (
              <motion.div key={m.year} variants={slideUp} className="flex gap-6 mb-8 last:mb-0 relative">
                <div className="w-[72px] flex-shrink-0 flex justify-end pr-4">
                  <span className="text-sm font-black text-[#00288e]">{m.year}</span>
                </div>
                <div className="relative flex items-start pt-0.5">
                  <div className="w-3 h-3 rounded-full bg-[#00288e] border-2 border-white absolute -left-[26px] top-1" />
                  <p className="text-sm text-[#191c1e] leading-relaxed pl-1">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#131b2e]">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#dde1ff]">Work With Us</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mt-3 mb-4">Ready to Work With Us?</h2>
          <p className="text-white/60 leading-relaxed mb-10">
            Contact our team to discuss your equipment needs and get a customised quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#1e40af] hover:bg-[#00288e] text-white border-0 rounded-xl font-bold px-8">
              <Link href="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white bg-transparent hover:bg-white/10 rounded-xl font-bold px-8">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
