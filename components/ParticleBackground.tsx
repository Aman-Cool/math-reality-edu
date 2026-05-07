'use client'

import { useEffect, useRef } from 'react'

const MATH_SYMBOLS = ['∫', 'Σ', 'π', 'ψ', 'Δ', 'λ', '∞', '∂', '∇', 'ħ', 'φ', '⊕', 'θ', 'ω', 'α']

interface Symbol {
  x: number
  y: number
  vx: number
  vy: number
  char: string
  opacity: number
  size: number
}

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const symbols: Symbol[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      char: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
      opacity: Math.random() * 0.18 + 0.04,
      size: Math.random() * 14 + 14,
    }))

    const dots: Dot[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.4,
    }))

    let animId: number

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Connections between nearby dots
      ctx.lineWidth = 0.5
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.07
            ctx.strokeStyle = `rgba(96,165,250,${alpha})`
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }

      // Dots
      dots.forEach((d) => {
        ctx.fillStyle = 'rgba(96,165,250,0.35)'
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1
      })

      // Math symbols
      symbols.forEach((s) => {
        ctx.font = `${s.size}px monospace`
        ctx.fillStyle = `rgba(147,197,253,${s.opacity})`
        ctx.fillText(s.char, s.x, s.y)
        s.x += s.vx
        s.y += s.vy
        if (s.x < -40) s.x = W + 40
        if (s.x > W + 40) s.x = -40
        if (s.y < -40) s.y = H + 40
        if (s.y > H + 40) s.y = -40
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
