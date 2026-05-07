'use client'

import { useEffect, useRef, useState } from 'react'

const NUM_LINES = 14
const STEPS = 220

interface TimelinePath {
  pts: [number, number][]
  hue: number
}

function buildPaths(W: number, H: number, lambda: number): TimelinePath[] {
  return Array.from({ length: NUM_LINES }, (_, i) => {
    const t0 = (i - NUM_LINES / 2) / (NUM_LINES / 2)  // -1 to +1
    const delta0 = t0 * 0.0006                          // tiny initial spread
    const pts: [number, number][] = []
    let y = H / 2
    let delta = delta0

    for (let s = 0; s < STEPS; s++) {
      const x = (s / (STEPS - 1)) * W
      pts.push([x, y])
      // Exponential divergence: δ(t) ≈ δ₀ · e^(λt)
      delta = delta0 * Math.exp(lambda * s * 0.04)
      // Add mild sinusoidal wander to each line
      y += Math.sin(s * 0.18 + i * 0.9) * 0.6 + delta * H * 0.9
      y = Math.max(H * 0.04, Math.min(H * 0.96, y))
    }

    // Color: near-blue for central lines → red for outer
    const hue = 220 - Math.abs(t0) * 195
    return { pts, hue }
  })
}

export function DivergingTimelines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [lambda, setLambda] = useState(0.8)
  const lambdaRef = useRef(0.8)

  useEffect(() => { lambdaRef.current = lambda }, [lambda])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height

    let animStep = 0
    let paths = buildPaths(W, H, lambdaRef.current)
    let lastLambda = lambdaRef.current

    const draw = () => {
      // Rebuild paths if lambda changed
      if (lambdaRef.current !== lastLambda) {
        paths = buildPaths(W, H, lambdaRef.current)
        lastLambda = lambdaRef.current
        animStep = 0
      }

      ctx.fillStyle = 'rgba(3,7,18,0.92)'
      ctx.fillRect(0, 0, W, H)

      const displaySteps = Math.min(animStep + 1, STEPS)

      // Draw convergence zone
      const convWidth = W * 0.12
      const convGrad = ctx.createLinearGradient(0, 0, convWidth, 0)
      convGrad.addColorStop(0, 'rgba(96,165,250,0.06)')
      convGrad.addColorStop(1, 'rgba(96,165,250,0)')
      ctx.fillStyle = convGrad
      ctx.fillRect(0, 0, convWidth, H)

      // Separator line
      if (displaySteps > 5) {
        ctx.strokeStyle = 'rgba(96,165,250,0.2)'
        ctx.lineWidth = 0.8
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(convWidth, 0)
        ctx.lineTo(convWidth, H)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Draw each timeline
      paths.forEach(({ pts, hue }) => {
        const outerFrac = Math.abs(hue - 220) / 195
        const alpha = 0.35 + outerFrac * 0.4
        ctx.strokeStyle = `hsla(${hue},75%,62%,${alpha})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        for (let s = 0; s < displaySteps; s++) {
          s === 0 ? ctx.moveTo(pts[s][0], pts[s][1]) : ctx.lineTo(pts[s][0], pts[s][1])
        }
        ctx.stroke()
      })

      // Labels (appear after animation settles)
      if (displaySteps > STEPS * 0.3) {
        ctx.fillStyle = 'rgba(147,197,253,0.55)'
        ctx.font = '9px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('δ₀ ≈ 10⁻³', convWidth / 2, H * 0.5 - 6)
        ctx.fillText('similar', convWidth / 2, H * 0.5 + 6)
      }
      if (displaySteps > STEPS * 0.7) {
        ctx.fillStyle = 'rgba(248,113,113,0.55)'
        ctx.font = '9px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('δ(t) ≫ δ₀', W * 0.82, H * 0.14)
        ctx.fillText('fully diverged', W * 0.82, H * 0.14 + 12)
      }

      // Advance animation, then pause and loop
      animStep += 3
      if (animStep > STEPS + 90) animStep = 0

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={580}
        height={210}
        className="w-full rounded-xl"
        aria-label="Animated timeline divergence showing how small initial differences grow under chaotic dynamics"
      />
      <div className="mt-3 flex items-center gap-4 flex-wrap">
        <label className="text-xs text-gray-400 font-mono whitespace-nowrap">
          Lyapunov &lambda; = <span className="text-white">{lambda.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min={0.1}
          max={2.0}
          step={0.1}
          value={lambda}
          onChange={(e) => setLambda(Number(e.target.value))}
          className="flex-1 accent-red-500"
          aria-label="Lyapunov exponent lambda"
        />
        <span className="text-[10px] font-mono text-gray-600">
          {lambda < 0.5 ? 'mild divergence' : lambda < 1.2 ? 'moderate chaos' : 'strong chaos'}
        </span>
      </div>
    </div>
  )
}
