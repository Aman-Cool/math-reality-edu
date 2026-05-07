import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { LorenzCanvas } from '../visualizations/LorenzCanvas'

export function DeterminismSection() {
  return (
    <SectionWrapper id="determinism">
      <SectionHeading
        badge="Historical and Philosophical Concept"
        badgeVariant="speculative"
        title="Determinism and Laplace's Demon"
        subtitle="A thought experiment from 1814 that shaped centuries of philosophical debate — and was ultimately challenged by modern physics."
      />

      {/* Prominent disclaimer */}
      <GlassCard accent="yellow" className="mb-10">
        <div className="flex items-start gap-3">
          <span className="speculative-badge mt-0.5 shrink-0">Philosophical Thought Experiment</span>
          <div>
            <p className="text-sm text-yellow-100 leading-relaxed">
              This section presents a historical philosophical concept — classical determinism and
              Laplace&apos;s Demon. It is <strong>not</strong> a description of how the universe
              actually works. Modern physics (quantum mechanics, chaos theory) significantly
              complicates or contradicts the classical deterministic picture.
              No scientific evidence supports the idea that exact futures of complex biological
              systems — including human lifespans — can be predicted from equations.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-white">Classical Determinism</h3>
          <p className="text-gray-300 leading-relaxed">
            Newtonian mechanics, as formulated in the 17th century, describes the motion of objects
            through differential equations that, given exact initial conditions, have a unique solution
            for all future times. From this, Pierre-Simon Laplace formulated a famous thought
            experiment in 1814.
          </p>

          <GlassCard accent="yellow">
            <p className="text-sm font-semibold text-yellow-200 mb-2">Laplace&apos;s Demon (1814)</p>
            <blockquote className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-yellow-500/40 pl-4">
              &ldquo;We ought then to regard the present state of the universe as the effect of its
              prior state and as the cause of the state that is to follow. An intellect which at a
              given moment knew all of the forces that animate Nature... would embrace in the same
              formula the movements of the greatest bodies of the universe and those of the lightest
              atom; nothing would be uncertain for it, and the future, as the past, would be present
              in its eyes.&rdquo;
            </blockquote>
            <p className="mt-2 text-xs text-gray-500">— Pierre-Simon Laplace, <em>A Philosophical Essay on Probabilities</em>, 1814</p>
          </GlassCard>

          <p className="text-gray-300 leading-relaxed">
            Within <em>classical</em> mechanics, this reasoning is internally consistent. If all
            positions and momenta were known exactly, and if the governing laws were{' '}
            <InlineMath math="F = ma" />, then in principle:
          </p>

          <EquationBlock
            math="\mathbf{x}(t) = \mathbf{x}_0 + \int_0^t \mathbf{v}(\tau)\, d\tau"
            label="Classical trajectory"
            description="In a classical system with known initial state x₀ and velocities, future positions are determined by integration. This is exact only for simple systems with known forces."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Why This Fails in Practice</h3>
          <div className="space-y-3">
            {[
              {
                title: 'Quantum mechanics',
                body: 'The universe is fundamentally probabilistic at small scales. Heisenberg\'s uncertainty principle prohibits exact simultaneous knowledge of position and momentum. A "demon" knowing all particle states exactly is forbidden by physics.',
                tag: 'Physical refutation',
                color: 'text-red-400',
              },
              {
                title: 'Chaos and exponential error growth',
                body: 'Even classically, tiny measurement errors grow exponentially in chaotic systems. Weather becomes unpredictable beyond ~2 weeks not because of quantum effects, but because of mathematical sensitivity to initial conditions.',
                tag: 'Mathematical limitation',
                color: 'text-orange-400',
              },
              {
                title: 'Computational irreducibility',
                body: 'Some systems cannot be predicted faster than they evolve. Even with perfect equations and perfect initial conditions, the only way to know the state at time t may be to simulate every step up to t.',
                tag: 'Computational limitation',
                color: 'text-yellow-400',
              },
              {
                title: 'Information acquisition',
                body: 'Measuring the state of a system with ~10⁸⁰ atoms, each requiring quantum-precise measurement, is physically impossible. The very act of measurement disturbs quantum systems.',
                tag: 'Practical impossibility',
                color: 'text-blue-400',
              },
            ].map(({ title, body, tag, color }) => (
              <GlassCard key={title}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-semibold text-white">{title}</h4>
                  <span className={`text-[10px] font-mono ${color}`}>{tag}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-3">
          Lorenz Attractor — Deterministic Yet Unpredictable
        </h3>
        <LorenzCanvas />
      </div>

      <GlassCard accent="yellow">
        <p className="text-sm text-gray-300 leading-relaxed">
          <span className="text-yellow-300 font-semibold">Historical significance:</span> Laplace&apos;s
          Demon was an important conceptual landmark — it made determinism explicit and testable.
          Subsequent physics systematically identified why it fails: quantum indeterminacy removes
          the premise of exact classical states, chaos theory shows that even classical systems are
          practically unpredictable, and computational complexity theory establishes limits on
          how fast predictions can be made. This progression is itself a model of how science works.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
