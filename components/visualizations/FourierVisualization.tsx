'use client'

import { useEffect, useRef, useState } from 'react'

export function FourierVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const [numTerms, setNumTerms] = useState(5)
  const numTermsRef = useRef(5)

  useEffect(() => {
    numTermsRef.current = numTerms
  }, [numTerms])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const N = numTermsRef.current
      const t = timeRef.current
      const mid = H / 2

      ctx.fillStyle = 'rgba(3, 7, 18, 0.92)'
      ctx.fillRect(0, 0, W, H)

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 0.5
      for (let xi = 0; xi < W; xi += W / 8) {
        ctx.beginPath(); ctx.moveTo(xi, 0); ctx.lineTo(xi, H); ctx.stroke()
      }
      ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke()

      // Fourier series of a square wave: f(t) = Σ (4/π) sin((2n-1)t) / (2n-1)
      const amplitude = H * 0.32

      // Individual harmonics (dim)
      for (let n = 1; n <= N; n++) {
        const k = 2 * n - 1
        const a = 4 / (Math.PI * k)
        ctx.strokeStyle = `hsla(${200 + n * 15}, 65%, 58%, 0.22)`
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let px = 0; px < W; px++) {
          const x = (px / W) * 4 * Math.PI
          const y = mid - a * Math.sin(k * x + t) * amplitude
          px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y)
        }
        ctx.stroke()
      }

      // Ideal target signal (dashed yellow)
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.28)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 6])
      ctx.beginPath()
      for (let px = 0; px < W; px++) {
        const x = (px / W) * 4 * Math.PI + t
        const y = mid - Math.sign(Math.sin(x)) * amplitude
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Reconstruction (bright blue)
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      for (let px = 0; px < W; px++) {
        const x = (px / W) * 4 * Math.PI
        let val = 0
        for (let n = 1; n <= N; n++) {
          const k = 2 * n - 1
          val += (4 / (Math.PI * k)) * Math.sin(k * x + t)
        }
        const y = mid - val * amplitude
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y)
      }
      ctx.stroke()

      // Labels
      ctx.font = '11px monospace'
      ctx.fillStyle = '#60a5fa'
      ctx.fillText(`Reconstruction (${N} term${N > 1 ? 's' : ''})`, 10, 18)
      ctx.fillStyle = 'rgba(253,224,71,0.6)'
      ctx.fillText('Target (square wave)', 10, 34)

      timeRef.current += 0.012
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
        height={240}
        className="w-full rounded-xl"
        aria-label="Animated Fourier series reconstruction of a square wave"
      />
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-sm text-blue-300 font-mono whitespace-nowrap">
          Harmonic terms: <span className="text-white font-semibold">{numTerms}</span>
        </label>
        <input
          type="range"
          min={1}
          max={25}
          value={numTerms}
          onChange={(e) => setNumTerms(Number(e.target.value))}
          className="flex-1 accent-blue-500 w-full sm:w-auto"
          aria-label="Number of Fourier terms"
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
        <span><span className="text-blue-400 font-bold">━</span> Fourier reconstruction</span>
        <span><span className="text-yellow-400/60 font-bold">╌</span> Target square wave</span>
        <span><span className="text-blue-300/30 font-bold">━</span> Individual harmonics</span>
      </div>
    </div>
  )
}
