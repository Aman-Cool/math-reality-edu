'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'

function CircleCanvas({ radius }: { radius: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const maxR = Math.min(W, H) / 2 - 20

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#030712'
    ctx.fillRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 0.5
    const step = maxR / 4
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath(); ctx.moveTo(0, cy + i * step); ctx.lineTo(W, cy + i * step); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx + i * step, 0); ctx.lineTo(cx + i * step, H); ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke()

    const rPx = (radius / 5) * maxR

    // Circle fill
    ctx.fillStyle = 'rgba(96,165,250,0.07)'
    ctx.beginPath()
    ctx.arc(cx, cy, rPx, 0, Math.PI * 2)
    ctx.fill()

    // Circle stroke
    ctx.strokeStyle = '#60a5fa'
    ctx.lineWidth = 2
    ctx.shadowColor = '#60a5fa'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.arc(cx, cy, rPx, 0, Math.PI * 2)
    ctx.stroke()
    ctx.shadowBlur = 0

    // Radius line
    const angle = -Math.PI / 4
    const rx = cx + rPx * Math.cos(angle)
    const ry = cy + rPx * Math.sin(angle)
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(rx, ry); ctx.stroke()

    ctx.fillStyle = '#fbbf24'
    ctx.font = '12px monospace'
    ctx.fillText(`r = ${radius}`, rx + 6, ry - 6)

    // Center dot
    ctx.fillStyle = '#ffffff'
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill()

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.font = '11px monospace'
    ctx.fillText('x', W - 16, cy - 6)
    ctx.fillText('y', cx + 6, 14)
  }, [radius])

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={320}
      className="w-full rounded-xl"
      aria-label={`Circle with radius ${radius}`}
    />
  )
}

export function GeometrySection() {
  const [radius, setRadius] = useState(3)

  return (
    <SectionWrapper id="geometry">
      <SectionHeading
        badge="Established Science · Analytic Geometry"
        title="Geometry and Shape Representation"
        subtitle="Geometric shapes are described by equations — constraints on coordinates that define which points belong to the shape."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            The most fundamental geometric objects are defined through{' '}
            <strong className="text-white">implicit equations</strong> — relationships between
            coordinates that must be satisfied. The circle with radius{' '}
            <InlineMath math="r" /> centred at the origin is defined implicitly as:
          </p>

          <EquationBlock
            math="x^2 + y^2 = r^2"
            label="Implicit circle equation"
            description="Every point (x, y) satisfying this equation lies exactly on the circle. The interior satisfies x² + y² < r²."
          />

          <p className="text-gray-300 leading-relaxed">
            Equivalently, this can be expressed{' '}
            <strong className="text-white">parametrically</strong> — as a map from a parameter
            domain to 2D coordinates:
          </p>

          <EquationBlock
            math="\begin{cases} x(t) = r\cos(t) \\ y(t) = r\sin(t) \end{cases} \quad t \in [0, 2\pi)"
            label="Parametric circle"
            description="As t sweeps from 0 to 2π, the point (x(t), y(t)) traces the circle exactly once. Parametric forms are essential for animation and rendering."
          />

          <div className="mt-4">
            <label className="text-sm text-yellow-300 font-mono">
              Radius r = <span className="text-white font-semibold">{radius}</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={4.8}
              step={0.1}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full mt-2 accent-yellow-500"
              aria-label="Circle radius slider"
            />
          </div>
        </div>

        <div>
          <CircleCanvas radius={radius} />
          <p className="mt-2 text-xs text-gray-600 text-center">
            Points satisfying x² + y² = {radius}² = {(radius * radius).toFixed(1)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <GlassCard accent="blue">
          <h4 className="text-sm font-semibold text-white mb-2">Signed Distance Fields (SDF)</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            A modern technique: define a shape as the zero-set of a distance function{' '}
            <InlineMath math="d(x,y)" />. Negative values are inside, positive values
            outside. SDFs enable smooth blending, anti-aliasing, and efficient GPU rendering
            of arbitrarily complex shapes.
          </p>
        </GlassCard>
        <GlassCard accent="blue">
          <h4 className="text-sm font-semibold text-white mb-2">Procedural Geometry</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Rendering engines evaluate shape equations across a coordinate grid — for every pixel,
            they test whether the pixel coordinate satisfies the shape&apos;s equation. This
            principle underlies shader-based rendering, CAD tools, and font rasterization.
          </p>
        </GlassCard>
      </div>

      <GlassCard>
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">Why it matters:</span> Computer graphics,
          simulation, and physical modelling all rely on the mathematical language of analytic
          geometry. Equations do not just describe shapes — they enable them to be manipulated,
          transformed, intersected, and rendered with precision.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
