'use client'

import { motion } from 'framer-motion'
import { ParticleBackground } from './ParticleBackground'

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      <ParticleBackground />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0f1e] to-transparent pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Label chip */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono font-semibold tracking-widest mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            EDUCATIONAL RESOURCE
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-7">
            Mathematics,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
              Information
            </span>
            ,
            <br />
            and the Modeling of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              Reality
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            An educational exploration of how equations describe images, physical systems,
            uncertainty, and the fundamental limits of predictability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#images"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40"
            >
              Explore Concepts
            </a>
            <a
              href="#determinism"
              className="px-8 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] text-gray-200 font-semibold rounded-xl border border-white/[0.10] transition-all duration-200"
            >
              View Equations
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-600 font-mono tracking-widest">SCROLL</span>
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
