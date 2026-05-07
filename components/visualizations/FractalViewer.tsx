'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

function mandelbrotIter(cx: number, cy: number, maxIter: number): number {
  let x = 0, y = 0
  for (let i = 0; i < maxIter; i++) {
    const x2 = x * x
    const y2 = y * y
    if (x2 + y2 > 4) return i
    y = 2 * x * y + cy
    x = x2 - y2 + cx
  }
  return maxIter
}

// Smooth iteration count for anti-banding
function mandelbrotSmooth(cx: number, cy: number, maxIter: number): number {
  let x = 0, y = 0
  for (let i = 0; i < maxIter; i++) {
    const x2 = x * x
    const y2 = y * y
    if (x2 + y2 > 4) {
      return i - Math.log2(Math.log2(x2 + y2)) + 4
    }
    y = 2 * x * y + cy
    x = x2 - y2 + cx
  }
  return maxIter
}

function iterToColor(iter: number, maxIter: number): [number, number, number] {
  if (iter >= maxIter) return [0, 0, 0]
  const t = iter / maxIter
  // Smooth blue-cyan palette
  const r = Math.floor(9 * (1 - t) * t * t * t * 255)
  const g = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255)
  const b = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255)
  return [r, g, b]
}

interface ViewState {
  cx: number
  cy: number
  zoom: number
}

export function FractalViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [view, setView] = useState<ViewState>({ cx: -0.5, cy: 0, zoom: 1 })
  const [rendering, setRendering] = useState(false)
  const renderIdRef = useRef(0)

  const render = useCallback((v: ViewState) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const maxIter = Math.min(80 + v.zoom * 20, 200)
    const scale = 3.0 / (v.zoom * Math.min(W, H))

    setRendering(true)
    const currentId = ++renderIdRef.current
    const imageData = ctx.createImageData(W, H)

    // Render in chunks using setTimeout to avoid blocking UI
    let row = 0
    const renderChunk = () => {
      if (currentId !== renderIdRef.current) return
      const chunkRows = 20
      for (let py = row; py < Math.min(row + chunkRows, H); py++) {
        for (let px = 0; px < W; px++) {
          const cx = (px - W / 2) * scale + v.cx
          const cy = (py - H / 2) * scale + v.cy
          const iter = mandelbrotSmooth(cx, cy, maxIter)
          const [r, g, b] = iterToColor(iter, maxIter)
          const idx = (py * W + px) * 4
          imageData.data[idx] = r
          imageData.data[idx + 1] = g
          imageData.data[idx + 2] = b
          imageData.data[idx + 3] = 255
        }
      }
      row += chunkRows
      if (row < H) {
        // Show partial result
        ctx.putImageData(imageData, 0, 0)
        setTimeout(renderChunk, 0)
      } else {
        ctx.putImageData(imageData, 0, 0)
        if (currentId === renderIdRef.current) setRendering(false)
      }
    }
    renderChunk()
  }, [])

  useEffect(() => {
    render(view)
  }, [view, render])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (rendering) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const W = canvas.width
    const H = canvas.height
    const scale = 3.0 / (view.zoom * Math.min(W, H))
    const mx = (e.clientX - rect.left) * (W / rect.width)
    const my = (e.clientY - rect.top) * (H / rect.height)
    const newCx = (mx - W / 2) * scale + view.cx
    const newCy = (my - H / 2) * scale + view.cy
    setView({ cx: newCx, cy: newCy, zoom: view.zoom * 2.5 })
  }

  const reset = () => setView({ cx: -0.5, cy: 0, zoom: 1 })

  return (
    <div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={560}
          height={360}
          onClick={handleClick}
          className="w-full rounded-xl cursor-crosshair"
          style={{ background: '#000' }}
          aria-label="Interactive Mandelbrot set. Click to zoom."
        />
        {rendering && (
          <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-300 font-mono">rendering…</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 text-xs font-mono text-white/40">
          Zoom: {view.zoom.toFixed(1)}x &nbsp;| center ({view.cx.toFixed(4)}, {view.cy.toFixed(4)})
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-gray-600">
          Click to zoom into any region. Each pixel&apos;s color encodes how many iterations z&#8317;&#8348;&#8314;&#185;&#8318; = z&#8319;&#178; + c takes to diverge.
        </p>
        <button
          onClick={reset}
          className="px-3 py-1.5 text-xs bg-white/[0.05] hover:bg-white/[0.10] text-gray-400 hover:text-gray-200 rounded-lg border border-white/[0.08] transition-all font-mono"
        >
          Reset view
        </button>
      </div>
    </div>
  )
}
