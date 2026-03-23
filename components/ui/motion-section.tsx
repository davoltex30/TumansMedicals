'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { slideUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export function MotionSection({ children, className, delay = 0, stagger = false }: MotionSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={stagger ? staggerContainer : slideUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={slideUp} className={className}>
      {children}
    </motion.div>
  )
}
