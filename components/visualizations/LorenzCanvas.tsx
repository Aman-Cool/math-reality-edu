'use client'

import { useEffect, useRef } from 'react'

function computeLorenz(steps: number): [number, number, number][] {
  const σ = 10, ρ = 28, β = 8 / 3, dt = 0.005
  const pts: [number, number, number][] = []
  let x = 0.1, y = 0, z = 0
  for (let i = 0; i < steps; i++) {
    const dx = σ * (y - x)
    const dy = x * (ρ - z) - y
    const dz = x * y - β * z
    x += dx * dt
    y += dy * dt
    z += dz * dt
    pts.push([x, y, z])
  }
  return pts
}

export function LorenzCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const N = 6000
    const points = computeLorenz(N)

    // Scale to canvas: project x-z plane with optional rotation
    const xMin = points.reduce((m, p) => Math.min(m, p[0]), Infinity)
    const xMax = points.reduce((m, p) => Math.max(m, p[0]), -Infinity)
    const zMin = points.reduce((m, p) => Math.min(m, p[2]), Infinity)
    const zMax = points.reduce((m, p) => Math.max(m, p[2]), -Infinity)

    const pad = 30
    const scaleX = (W - pad * 2) / (xMax - xMin)
    const scaleZ = (H - pad * 2) / (zMax - zMin)

    const toScreen = (px: number, pz: number): [number, number] => [
      pad + (px - xMin) * scaleX,
      H - pad - (pz - zMin) * scaleZ,
    ]

    let drawIdx = 0
    let phase = 0 // 0 = drawing, 1 = fading

    const draw = () => {
      if (phase === 0) {
        // Incrementally draw the attractor
        const batch = 30
        for (let i = 0; i < batch && drawIdx < N; i++, drawIdx++) {
          const [sx, sy] = toScreen(points[drawIdx][0], points[drawIdx][2])
          const t = drawIdx / N
          const r = Math.floor(30 + t * 90)
          const g = Math.floor(80 + t * 130)
          const b = Math.floor(180 + t * 75)
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillRect(sx, sy, 1.2, 1.2)
        }
        if (drawIdx >= N) {
          phase = 1
          setTimeout(() => {
            ctx.fillStyle = 'rgba(3,7,18,0.8)'
            ctx.fillRect(0, 0, W, H)
            drawIdx = 0
            phase = 0
          }, 2500)
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    ctx.fillStyle = '#030712'
    ctx.fillRect(0, 0, W, H)
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={520}
        height={300}
        className="w-full rounded-xl"
        aria-label="Lorenz attractor animation — x-z projection"
      />
      <p className="mt-2 text-xs text-gray-600 leading-relaxed">
        Lorenz attractor (x&ndash;z projection). Parameters: &sigma;=10, &rho;=28, &beta;=8/3.
        The trajectory never exactly repeats — bounded, deterministic, yet sensitively dependent on initial conditions.
      </p>
    </div>
  )
}
