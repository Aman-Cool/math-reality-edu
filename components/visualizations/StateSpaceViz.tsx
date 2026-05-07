'use client'

import { useEffect, useRef } from 'react'

interface SystemNode {
  x: number
  y: number
  label: string
  sublabel: string
  r: number
  phase: number
  color: string
  connections: number[]
}

interface FlowParticle {
  fromIdx: number
  toIdx: number
  t: number
  speed: number
}

export function StateSpaceViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2

    // Nodes arranged in a rough body topology
    const nodes: SystemNode[] = [
      { x: cx,            y: H * 0.07, label: 'Neural',      sublabel: '~86B neurons',  r: 16, phase: 0.0, color: '#818cf8', connections: [1, 2, 3] },
      { x: cx - W * 0.16, y: H * 0.22, label: 'Sensory',     sublabel: 'input streams', r: 10, phase: 1.1, color: '#60a5fa', connections: [0, 3, 4] },
      { x: cx + W * 0.16, y: H * 0.22, label: 'Endocrine',   sublabel: 'hormonal',      r: 10, phase: 2.3, color: '#a78bfa', connections: [0, 3, 6] },
      { x: cx,            y: H * 0.34, label: 'Cardiac',     sublabel: '~3B beats/life', r: 13, phase: 0.6, color: '#f87171', connections: [0, 1, 2, 4, 5, 6] },
      { x: cx - W * 0.18, y: H * 0.46, label: 'Immune',      sublabel: '~2T cells',     r: 11, phase: 3.1, color: '#34d399', connections: [1, 3, 5, 7] },
      { x: cx + W * 0.18, y: H * 0.46, label: 'Metabolic',   sublabel: '~37T cells',    r: 11, phase: 1.7, color: '#fbbf24', connections: [2, 3, 4, 7] },
      { x: cx,            y: H * 0.56, label: 'Cellular',    sublabel: 'stochastic',    r: 12, phase: 2.9, color: '#38bdf8', connections: [2, 3, 5, 7, 8] },
      { x: cx - W * 0.14, y: H * 0.70, label: 'Genetic',     sublabel: '~3B base pairs', r: 12, phase: 0.3, color: '#c084fc', connections: [4, 5, 6, 8] },
      { x: cx + W * 0.14, y: H * 0.70, label: 'Environment', sublabel: 'external',      r: 10, phase: 1.5, color: '#94a3b8', connections: [5, 6, 7] },
      { x: cx,            y: H * 0.85, label: 'Quantum',     sublabel: 'decoherence',   r: 9,  phase: 4.0, color: '#67e8f9', connections: [6, 7, 8] },
    ]

    // Build flow particles along connections
    const particles: FlowParticle[] = []
    nodes.forEach((n, i) => {
      n.connections.forEach((j) => {
        if (j > i) {
          particles.push({ fromIdx: i, toIdx: j, t: Math.random(), speed: 0.004 + Math.random() * 0.005 })
          if (Math.random() > 0.5) {
            particles.push({ fromIdx: j, toIdx: i, t: Math.random(), speed: 0.003 + Math.random() * 0.004 })
          }
        }
      })
    })

    let time = 0

    const draw = () => {
      ctx.fillStyle = 'rgba(3,7,18,0.88)'
      ctx.fillRect(0, 0, W, H)

      // Connection lines
      nodes.forEach((n, i) => {
        n.connections.forEach((j) => {
          if (j > i) {
            const to = nodes[j]
            const grad = ctx.createLinearGradient(n.x, n.y, to.x, to.y)
            grad.addColorStop(0, `${n.color}18`)
            grad.addColorStop(1, `${to.color}18`)
            ctx.strokeStyle = grad
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(to.x, to.y)
            ctx.stroke()
          }
        })
      })

      // Flowing particles
      particles.forEach((p) => {
        p.t = (p.t + p.speed) % 1
        const from = nodes[p.fromIdx]
        const to = nodes[p.toIdx]
        const px = from.x + (to.x - from.x) * p.t
        const py = from.y + (to.y - from.y) * p.t
        const alpha = Math.sin(p.t * Math.PI) * 0.85
        ctx.fillStyle = `${from.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(px, py, 1.8, 0, Math.PI * 2)
        ctx.fill()
      })

      // Nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(time * 2.2 + n.phase) * 0.3 + 0.7

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3)
        grd.addColorStop(0, `${n.color}${Math.floor(pulse * 70).toString(16).padStart(2, '0')}`)
        grd.addColorStop(1, `${n.color}00`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core circle
        ctx.fillStyle = `${n.color}${Math.floor(pulse * 220).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 0.55, 0, Math.PI * 2)
        ctx.fill()

        // Ring
        ctx.strokeStyle = `${n.color}${Math.floor(pulse * 200).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.stroke()

        // Label
        const rightSide = n.x > cx + 20
        const leftSide = n.x < cx - 20
        ctx.fillStyle = `rgba(226,232,240,${0.45 + pulse * 0.35})`
        ctx.font = 'bold 9px monospace'
        ctx.textAlign = rightSide ? 'left' : leftSide ? 'right' : 'center'
        const lx = rightSide ? n.x + n.r + 5 : leftSide ? n.x - n.r - 5 : n.x
        const ly = rightSide || leftSide ? n.y + 3 : n.y - n.r - 6
        ctx.fillText(n.label, lx, ly)
        ctx.fillStyle = `rgba(148,163,184,${0.35 + pulse * 0.2})`
        ctx.font = '8px monospace'
        const sly = rightSide || leftSide ? n.y + 12 : n.y - n.r - 16
        ctx.fillText(n.sublabel, lx, sly)
      })

      // Floating state-space label
      ctx.fillStyle = 'rgba(96,165,250,0.12)'
      ctx.font = '9px monospace'
      ctx.textAlign = 'left'
      ctx.fillText('STATE SPACE: ℝ^N', 8, H - 10)
      ctx.textAlign = 'right'
      ctx.fillText('N → incomprehensibly large', W - 8, H - 10)

      time += 0.016
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={480}
      className="w-full max-w-xs mx-auto rounded-xl block"
      aria-label="Animated diagram of interconnected body systems representing a hypothetical complete state model"
    />
  )
}
