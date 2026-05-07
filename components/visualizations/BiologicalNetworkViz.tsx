'use client'

import { useEffect, useRef } from 'react'

interface BioNode {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  category: string
  phase: number
  pulse: number
}

const CATEGORIES = [
  { color: '#818cf8', label: 'Neuronal',  count: 10 },
  { color: '#34d399', label: 'Immune',    count: 9  },
  { color: '#f87171', label: 'Metabolic', count: 8  },
  { color: '#fbbf24', label: 'Genetic',   count: 7  },
  { color: '#38bdf8', label: 'Cellular',  count: 10 },
]

export function BiologicalNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height

    const nodes: BioNode[] = []
    CATEGORIES.forEach(({ color, label, count }) => {
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * (W - 20) + 10,
          y: Math.random() * (H - 20) + 10,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 3.5 + 3.5,
          color,
          category: label,
          phase: Math.random() * Math.PI * 2,
          pulse: Math.random(),
        })
      }
    })

    let time = 0

    const draw = () => {
      ctx.fillStyle = 'rgba(3,7,18,0.88)'
      ctx.fillRect(0, 0, W, H)

      // Edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 75) {
            const alpha = (1 - dist / 75) * 0.28
            ctx.strokeStyle = `rgba(96,165,250,${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const p = Math.sin(time * 2.8 + n.phase) * 0.3 + 0.7

        // Glow halo
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.8)
        grd.addColorStop(0, `${n.color}${Math.floor(p * 80).toString(16).padStart(2, '0')}`)
        grd.addColorStop(1, `${n.color}00`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 2.8, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = n.color + Math.floor(p * 220).toString(16).padStart(2, '0')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * p * 0.75, 0, Math.PI * 2)
        ctx.fill()

        // Movement
        n.x += n.vx
        n.y += n.vy
        if (n.x < n.r * 2 || n.x > W - n.r * 2) n.vx *= -1
        if (n.y < n.r * 2 || n.y > H - n.r * 2) n.vy *= -1
      })

      // Legend
      const legendY = H - 14
      let legendX = 8
      CATEGORIES.forEach(({ color, label }) => {
        ctx.fillStyle = color + 'cc'
        ctx.beginPath()
        ctx.arc(legendX + 4, legendY, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(148,163,184,0.55)'
        ctx.font = '8px monospace'
        ctx.textAlign = 'left'
        ctx.fillText(label, legendX + 11, legendY + 3)
        legendX += label.length * 5.8 + 18
      })

      time += 0.016
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={580}
      height={200}
      className="w-full rounded-xl"
      aria-label="Animated biological complexity network showing interacting cellular systems"
    />
  )
}
