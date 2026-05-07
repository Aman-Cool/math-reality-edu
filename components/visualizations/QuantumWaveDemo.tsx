'use client'

import { useEffect, useRef, useState } from 'react'

export function QuantumWaveDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      if (!pausedRef.current) {
        const W = canvas.width
        const H = canvas.height
        const t = timeRef.current
        const N = W

        // Gaussian wave packet parameters
        const sigma = 0.10          // spatial width
        const k0 = 8 * Math.PI      // central wavenumber
        const vGroup = 0.012        // group velocity (normalized)
        // Dispersion: σ spreads as σ(t) = sqrt(σ² + ħt²/2mσ²) — we approximate
        const sigmaT = Math.sqrt(sigma * sigma + (t * 0.00004) * (t * 0.00004) / (sigma * sigma))
        const center = ((0.15 + vGroup * t * 0.01) % 1.0 + 1.0) % 1.0

        ctx.fillStyle = 'rgba(3,7,18,0.88)'
        ctx.fillRect(0, 0, W, H)

        // Axis
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(0, H * 0.72)
        ctx.lineTo(W, H * 0.72)
        ctx.stroke()

        // Probability density |ψ|²
        const probDensity = new Float64Array(N)
        let maxP = 0
        for (let px = 0; px < N; px++) {
          const x = px / N
          const env = Math.exp(-((x - center) ** 2) / (2 * sigmaT * sigmaT))
          probDensity[px] = env * env
          if (probDensity[px] > maxP) maxP = probDensity[px]
        }

        // Filled area under |ψ|²
        const grad = ctx.createLinearGradient(0, H * 0.12, 0, H * 0.72)
        grad.addColorStop(0, 'rgba(96,165,250,0.45)')
        grad.addColorStop(1, 'rgba(96,165,250,0.02)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(0, H * 0.72)
        for (let px = 0; px < N; px++) {
          const y = H * 0.72 - (probDensity[px] / maxP) * H * 0.56
          px === 0 ? ctx.lineTo(px, y) : ctx.lineTo(px, y)
        }
        ctx.lineTo(N, H * 0.72)
        ctx.closePath()
        ctx.fill()

        // |ψ|² curve
        ctx.strokeStyle = '#93c5fd'
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let px = 0; px < N; px++) {
          const y = H * 0.72 - (probDensity[px] / maxP) * H * 0.56
          px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y)
        }
        ctx.stroke()

        // Real part Re[ψ] — oscillating inside envelope
        ctx.strokeStyle = 'rgba(110,231,183,0.65)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        for (let px = 0; px < N; px++) {
          const x = px / N
          const env = Math.exp(-((x - center) ** 2) / (2 * sigmaT * sigmaT))
          const real = env * Math.cos(k0 * x - t * 0.08)
          const y = H * 0.72 - (real + 1.0) * H * 0.24 + H * 0.04
          px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y)
        }
        ctx.stroke()

        // Labels
        ctx.font = '11px monospace'
        ctx.fillStyle = '#93c5fd'
        ctx.fillText('|ψ(x,t)|²  — probability density', 10, 18)
        ctx.fillStyle = 'rgba(110,231,183,0.75)'
        ctx.fillText('Re[ψ(x,t)]  — oscillating carrier', 10, 36)

        // Width annotation
        const spreadPct = (sigmaT * 100).toFixed(1)
        ctx.fillStyle = 'rgba(255,255,255,0.18)'
        ctx.font = '10px monospace'
        ctx.fillText(`σ(t) ≈ ${spreadPct}%  width`, W - 130, 18)

        timeRef.current += 1
      }
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="w-full rounded-xl"
        aria-label="Gaussian quantum wave packet animation showing probability density and real part"
      />
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-4 text-xs text-gray-500">
          <span><span className="text-blue-300 font-bold">━</span> |&psi;(x,t)|&sup2;</span>
          <span><span className="text-emerald-300/70 font-bold">━</span> Re[&psi;(x,t)]</span>
        </div>
        <button
          onClick={() => setPaused((v) => !v)}
          className="px-3 py-1.5 text-xs bg-white/[0.05] hover:bg-white/[0.10] text-gray-400 hover:text-gray-200 rounded-lg border border-white/[0.08] transition-all font-mono"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-600 leading-relaxed">
        Gaussian wave packet in free space. The packet drifts (group velocity) while spreading over
        time due to quantum dispersion — a consequence of the uncertainty principle.
        The probability density |&psi;|&sup2; gives the likelihood of finding the particle at each location.
      </p>
    </div>
  )
}
