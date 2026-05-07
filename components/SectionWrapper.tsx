'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 px-4 md:px-8 max-w-6xl mx-auto ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

interface SectionHeadingProps {
  badge?: string
  badgeVariant?: 'science' | 'speculative' | 'careful'
  title: string
  subtitle?: string
}

export function SectionHeading({ badge, badgeVariant = 'science', title, subtitle }: SectionHeadingProps) {
  const badgeClass =
    badgeVariant === 'speculative'
      ? 'speculative-badge'
      : badgeVariant === 'careful'
      ? 'careful-badge'
      : 'science-badge'

  return (
    <div className="mb-12">
      {badge && (
        <div className="mb-4">
          <span className={badgeClass}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-400 max-w-3xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
