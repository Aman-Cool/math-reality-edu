'use client'

import { useEffect, useRef, useState } from 'react'

// Logistic map: x_{n+1} = r * x_n * (1 - x_n)
function logisticMap(x: number, r: number): number {
  return r * x * (1 - x)
}

export function ChaosSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [r, setR] = useState(3.8)
  const [delta, setDelta] = useState(1e-6)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const N = 60
    const margin = { left: 40, right: 20, top: 20, bottom: 30 }
    const plotW = W - margin.left - margin.right
    const plotH = H - margin.top - margin.bottom

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#030712'
    ctx.fillRect(0, 0, W, H)

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 0.5
    // y-axis ticks at 0, 0.25, 0.5, 0.75, 1.0
    ;[0, 0.25, 0.5, 0.75, 1.0].forEach((v) => {
      const y = margin.top + plotH * (1 - v)
      ctx.beginPath()
      ctx.moveTo(margin.left - 4, y)
      ctx.lineTo(margin.left + plotW, y)
      ctx.stroke()
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.font = '9px monospace'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.fillText(v.toFixed(2), margin.left - 6, y)
    })

    // x-axis
    ctx.beginPath()
    ctx.moveTo(margin.left, margin.top + plotH)
    ctx.lineTo(margin.left + plotW, margin.top + plotH)
    ctx.stroke()

    // Compute two trajectories
    let x1 = 0.5
    let x2 = 0.5 + delta
    const pts1: [number, number][] = []
    const pts2: [number, number][] = []

    for (let i = 0; i < N; i++) {
      pts1.push([margin.left + (i / (N - 1)) * plotW, margin.top + plotH * (1 - x1)])
      pts2.push([margin.left + (i / (N - 1)) * plotW, margin.top + plotH * (1 - x2)])
      x1 = logisticMap(x1, r)
      x2 = logisticMap(x2, r)
    }

    // Draw trajectory 2 (red)
    ctx.strokeStyle = 'rgba(248,113,113,0.85)'
    ctx.lineWidth = 1.8
    ctx.beginPath()
    pts2.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)))
    ctx.stroke()
    ctx.fillStyle = 'rgba(248,113,113,0.7)'
    pts2.forEach(([px, py]) => {
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill()
    })

    // Draw trajectory 1 (blue)
    ctx.strokeStyle = 'rgba(96,165,250,0.9)'
    ctx.lineWidth = 1.8
    ctx.beginPath()
    pts1.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)))
    ctx.stroke()
    ctx.fillStyle = 'rgba(96,165,250,0.75)'
    pts1.forEach(([px, py]) => {
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill()
    })

    // x-axis label
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.font = '10px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('iteration n', margin.left + plotW / 2, H - margin.bottom + 8)
  }, [r, delta])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={580}
        height={280}
        className="w-full rounded-xl"
        aria-label="Chaos simulation: two trajectories of the logistic map diverging from nearly identical starting points"
      />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 font-mono">
            Growth rate r = <span className="text-white">{r.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min={2.8}
            max={4.0}
            step={0.01}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full mt-1 accent-blue-500"
            aria-label="Logistic map growth rate r"
          />
          <div className="flex justify-between text-[10px] text-gray-700 font-mono mt-0.5">
            <span>2.8</span><span className="text-yellow-600">chaos &gt; 3.57</span><span>4.0</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 font-mono">
            Initial separation &delta; = <span className="text-white">{delta.toExponential(0)}</span>
          </label>
          <select
            value={delta}
            onChange={(e) => setDelta(Number(e.target.value))}
            className="mt-1 w-full bg-[#0d1427] border border-white/[0.08] rounded-lg text-xs text-gray-300 px-2 py-1.5"
          >
            <option value={1e-2}>10&#8315;&#178; (visible)</option>
            <option value={1e-4}>10&#8315;&#8308;</option>
            <option value={1e-6}>10&#8315;&#8310;</option>
            <option value={1e-9}>10&#8315;&#8313;</option>
          </select>
        </div>
      </div>
      <div className="mt-3 flex gap-5 text-xs text-gray-500">
        <span><span className="text-blue-400 font-bold">━</span> x&#8320; = 0.5</span>
        <span><span className="text-red-400 font-bold">━</span> x&#8320; = 0.5 + &delta;</span>
      </div>
      <p className="mt-2 text-xs text-gray-600 leading-relaxed">
        Logistic map: x&#8345;&#8330;&#8321; = r&thinsp;x&#8345;(1&nbsp;&minus;&nbsp;x&#8345;).
        With r &gt; 3.57 the system becomes chaotic — a tiny difference in starting conditions
        grows exponentially and the trajectories diverge completely.
      </p>
    </div>
  )
}
