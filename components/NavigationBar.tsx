'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'images', label: 'Images' },
  { id: 'geometry', label: 'Geometry' },
  { id: 'fractals', label: 'Fractals' },
  { id: 'signals', label: 'Signals' },
  { id: 'information', label: 'Information' },
  { id: 'determinism', label: 'Determinism' },
  { id: 'quantum', label: 'Quantum' },
  { id: 'chaos', label: 'Chaos' },
  { id: 'lifespan', label: 'Lifespan' },
  { id: 'limits', label: 'Limits' },
]

export function NavigationBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.25 }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/[0.06] shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-blue-400 font-mono text-sm font-semibold tracking-[0.15em] hover:text-blue-300 transition-colors"
        >
          MATH:REALITY
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                activeSection === id
                  ? 'bg-blue-500/15 text-blue-300'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.05]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-400 hover:text-gray-200 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-t border-white/[0.06] px-4 py-3 grid grid-cols-3 gap-2">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 text-xs font-medium rounded-lg text-center transition-all duration-150 ${
                activeSection === id
                  ? 'bg-blue-500/15 text-blue-300'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.05]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  )
}
