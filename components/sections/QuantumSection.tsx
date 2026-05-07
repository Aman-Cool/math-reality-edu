import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { QuantumWaveDemo } from '../visualizations/QuantumWaveDemo'

export function QuantumSection() {
  return (
    <SectionWrapper id="quantum">
      <SectionHeading
        badge="Established Science · Quantum Mechanics"
        title="Quantum Mechanics and Fundamental Uncertainty"
        subtitle="At the quantum scale, nature is not merely difficult to predict — it is inherently probabilistic. This is a structural feature of physical law, not a measurement limitation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            Quantum mechanics replaces the classical trajectory <InlineMath math="\mathbf{x}(t)" />{' '}
            with a <strong className="text-white">wavefunction</strong>{' '}
            <InlineMath math="\Psi(\mathbf{x},t)" />, which encodes a probability amplitude.
            The probability of finding the particle in region <InlineMath math="[a,b]" /> is:
          </p>

          <EquationBlock
            math="P(a \leq x \leq b) = \int_a^b |\Psi(x,t)|^2\, dx"
            label="Born rule"
            description="The squared modulus |Ψ|² is the probability density. This is not uncertainty about what we know — it is the complete physical description. Before measurement, the particle has no definite position."
          />

          <p className="text-gray-300 leading-relaxed">
            Wavefunctions evolve deterministically according to the{' '}
            <strong className="text-white">Schrödinger equation</strong>:
          </p>

          <EquationBlock
            math="i\hbar \frac{\partial \Psi}{\partial t} = \hat{H}\,\Psi"
            label="Time-dependent Schrödinger equation"
            description="ℏ is the reduced Planck constant. Ĥ is the Hamiltonian operator. The wavefunction evolves deterministically — but measurement outcomes remain probabilistic."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-2">
            Quantum Wave Packet
          </h3>
          <QuantumWaveDemo />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-5">The Uncertainty Principle</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <EquationBlock
              math="\Delta x \, \Delta p \;\geq\; \frac{\hbar}{2}"
              label="Heisenberg uncertainty principle"
              description="Δx is the standard deviation in position; Δp in momentum. Their product has a minimum value of ℏ/2 ≈ 5.3 × 10⁻³⁵ J·s. This bound is exact and experimentally verified."
            />

            <GlassCard accent="red">
              <div className="flex items-start gap-2">
                <span className="careful-badge mt-0.5 shrink-0">Common Misconception</span>
              </div>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                The uncertainty principle is <strong className="text-white">not</strong> about
                clumsy measurement disturbing the system. It is a fundamental property of quantum
                states: a state with precisely defined momentum necessarily has completely
                undefined position, and vice versa. Improving our instruments does not
                reduce this uncertainty.
              </p>
            </GlassCard>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Energy-time uncertainty',
                eqn: '\\Delta E \\, \\Delta t \\geq \\dfrac{\\hbar}{2}',
                body: 'Short-lived quantum states (small Δt) have inherently broad energy distributions (large ΔE). This is why unstable particles have energy line-widths, not sharp spectral lines.',
              },
              {
                title: 'Quantum decoherence',
                body: 'Quantum superpositions rapidly become "classical" when systems interact with their environment. This process (decoherence) occurs on timescales of 10⁻²⁰ s for large objects — explaining why macroscopic objects obey classical mechanics.',
              },
              {
                title: 'Implications for determinism',
                body: 'Quantum mechanics removes the classical assumption that all physical quantities simultaneously have definite values. This is not a philosophical choice — it is required by experimental results including Bell inequality violations.',
              },
            ].map(({ title, eqn, body }) => (
              <GlassCard key={title} accent="blue">
                <h4 className="text-sm font-semibold text-white mb-1.5">{title}</h4>
                {eqn && (
                  <div className="mb-1.5">
                    <EquationBlock math={eqn} display={false} />
                  </div>
                )}
                <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <GlassCard>
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">The measured reality:</span> Quantum
          mechanics is the most precisely tested physical theory in history — predictions match
          experiments to better than one part in 10 billion. Its probabilistic nature is not a
          gap in our understanding; it is the understanding. The universe at the quantum scale
          does not have hidden definite values waiting to be uncovered.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
