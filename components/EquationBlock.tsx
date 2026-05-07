'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import { GlassCard } from './GlassCard'

interface EquationBlockProps {
  math: string
  display?: boolean
  label?: string
  description?: string
  className?: string
}

export function EquationBlock({
  math,
  display = true,
  label,
  description,
  className = '',
}: EquationBlockProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    try {
      katex.render(math, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
        strict: false,
        macros: {
          '\\hbar': '\\hslash',
        },
      })
    } catch {
      if (ref.current) ref.current.textContent = math
    }
  }, [math, display])

  if (!display) {
    return <span ref={ref} className={`inline-block ${className}`} />
  }

  return (
    <GlassCard accent="blue" className={`my-6 ${className}`}>
      {label && (
        <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">
          {label}
        </p>
      )}
      <div
        ref={ref}
        className="overflow-x-auto text-blue-100 py-2"
        aria-label={`Equation: ${math}`}
      />
      {description && (
        <p className="mt-3 text-sm text-gray-400 leading-relaxed">{description}</p>
      )}
    </GlassCard>
  )
}

export function InlineMath({ math }: { math: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    try {
      katex.render(math, ref.current, {
        displayMode: false,
        throwOnError: false,
        strict: false,
      })
    } catch {
      if (ref.current) ref.current.textContent = math
    }
  }, [math])
  return <span ref={ref} className="inline-block align-middle" />
}
