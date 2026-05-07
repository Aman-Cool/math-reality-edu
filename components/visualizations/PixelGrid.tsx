'use client'

import { useEffect, useRef, useState } from 'react'

const GRID_SIZES = [8, 12, 20] as const

export function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gridSize, setGridSize] = useState<number>(12)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const G = gridSize
    const cellW = W / G
    const cellH = H / G

    ctx.clearRect(0, 0, W, H)

    for (let gy = 0; gy < G; gy++) {
      for (let gx = 0; gx < G; gx++) {
        // Circular gradient: I(x,y) = max(0, 1 - 2*dist_from_center)
        const nx = gx / (G - 1) - 0.5
        const ny = gy / (G - 1) - 0.5
        const dist = Math.sqrt(nx * nx + ny * ny) * 2
        const intensity = Math.max(0, 1 - dist)

        const r = Math.floor(intensity * 60 + (1 - intensity) * 5)
        const g = Math.floor(intensity * 130 + (1 - intensity) * 10)
        const b = Math.floor(intensity * 240 + (1 - intensity) * 30)

        const px = gx * cellW
        const py = gy * cellH

        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(px + 1, py + 1, cellW - 2, cellH - 2)

        // Show intensity value if cells are large enough
        if (cellW >= 28) {
          const val = Math.floor(intensity * 255)
          ctx.fillStyle = intensity > 0.55 ? 'rgba(0,0,0,0.65)' : 'rgba(200,220,255,0.45)'
          ctx.font = `bold ${Math.floor(cellW * 0.32)}px monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(val.toString(), px + cellW / 2, py + cellH / 2)
        }
      }
    }

    // Grid overlay
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= G; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellW, 0)
      ctx.lineTo(i * cellW, H)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * cellH)
      ctx.lineTo(W, i * cellH)
      ctx.stroke()
    }

    // Axis labels
    ctx.fillStyle = 'rgba(147,197,253,0.55)'
    ctx.font = '11px monospace'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText('x →', W - 4, H - 4)
    ctx.save()
    ctx.translate(14, H - 10)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = 'right'
    ctx.fillText('y →', 0, 0)
    ctx.restore()
  }, [gridSize])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={420}
        height={320}
        className="w-full rounded-xl bg-[#030712]"
      />
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span className="text-xs text-gray-500 font-mono">Grid resolution:</span>
        {GRID_SIZES.map((g) => (
          <button
            key={g}
            onClick={() => setGridSize(g)}
            className={`px-3 py-1 text-xs rounded-md font-mono transition-all ${
              gridSize === g
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-white/[0.04] text-gray-500 border border-white/[0.06] hover:text-gray-300'
            }`}
          >
            {g}&times;{g}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-600 leading-relaxed">
        Each cell represents one pixel. Numbers show the intensity value I(x,y) &isin; [0,&thinsp;255].
        A continuous circular function is discretized into a finite sample grid.
      </p>
    </div>
  )
}
