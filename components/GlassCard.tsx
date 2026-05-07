interface GlassCardProps {
  children: React.ReactNode
  className?: string
  accent?: 'blue' | 'yellow' | 'green' | 'red' | 'none'
}

const accentStyles: Record<string, string> = {
  blue: 'border-blue-500/20 bg-blue-500/[0.04]',
  yellow: 'border-yellow-500/20 bg-yellow-500/[0.04]',
  green: 'border-green-500/20 bg-green-500/[0.04]',
  red: 'border-red-500/20 bg-red-500/[0.04]',
  none: 'border-white/[0.07] bg-white/[0.03]',
}

export function GlassCard({ children, className = '', accent = 'none' }: GlassCardProps) {
  return (
    <div
      className={`
        backdrop-blur-sm border rounded-2xl p-6
        ${accentStyles[accent]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
