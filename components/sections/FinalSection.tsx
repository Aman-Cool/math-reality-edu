import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'

export function FinalSection() {
  return (
    <SectionWrapper id="limits">
      <SectionHeading
        badge="Synthesis · Philosophy of Science"
        title="Where Mathematics Ends and Uncertainty Begins"
        subtitle="Mathematics is an extraordinarily powerful language for describing reality. But power of description is not the same as power of prediction."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        {[
          {
            title: 'Mathematics as a modelling language',
            body: "Mathematics does not describe the universe itself — it describes our models of the universe. The equations of physics are the best descriptions we have, validated by experiment. But a map, however accurate, is not the territory.",
            icon: '∫',
          },
          {
            title: 'Limits of measurement',
            body: 'The Heisenberg uncertainty principle sets a hard lower bound on joint measurement precision. Every measurement disturbs quantum systems. And any finite-precision instrument leaves residual uncertainty that can grow exponentially in chaotic systems.',
            icon: 'Δ',
          },
          {
            title: 'Computational irreducibility',
            body: "Stephen Wolfram's computational irreducibility principle: for some systems, no shortcut to the future state exists. The only way to determine where a system will be at time t is to simulate every step from 0 to t — at the speed of the system itself.",
            icon: '∞',
          },
        ].map(({ title, body, icon }) => (
          <GlassCard key={title} accent="blue" className="relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl font-mono text-blue-500/15 select-none">
              {icon}
            </div>
            <h3 className="text-base font-semibold text-white mb-2 pr-8">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-white">Emergence</h3>
          <p className="text-gray-300 leading-relaxed">
            Complex behavior can arise from simple rules in ways that are not easily predicted
            from those rules alone. Temperature is not a property of any single molecule — it
            emerges from the collective statistics of <InlineMath math="\sim 10^{23}" /> particles.
            Consciousness, as best understood, emerges from neural activity — but predicting
            experience from ion channel equations remains far beyond current science.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Emergence is not mystical — it has mathematical structure (statistical mechanics,
            renormalization group theory). But it means that description at one level does not
            automatically yield prediction at another level.
          </p>
          <GlassCard accent="blue">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-blue-300 font-semibold">Philip Anderson (1972):</span>{' '}
              &ldquo;More is different.&rdquo; The laws governing large assemblies of particles
              are qualitatively, not merely quantitatively, different from the laws governing
              individual particles. Each level of complexity requires its own concepts and
              descriptions.
            </p>
          </GlassCard>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-white">The Three Limits</h3>
          <div className="space-y-3">
            {[
              {
                limit: 'Quantum limit',
                desc: 'Fundamental probabilistic indeterminacy at the microscale. Cannot be reduced by better instruments or better theories within QM.',
                eqn: '\\Delta x \\Delta p \\geq \\hbar/2',
              },
              {
                limit: 'Chaos limit',
                desc: 'Exponential amplification of initial errors in nonlinear systems. Practical prediction horizon is finite even for classical deterministic systems.',
                eqn: '\\delta(t) \\sim \\delta_0 e^{\\lambda t}',
              },
              {
                limit: 'Computational limit',
                desc: 'Some computations cannot be accelerated beyond real-time simulation. Knowing the equations is not sufficient for prediction.',
                eqn: 'T_{\\text{predict}} \\geq T_{\\text{evolve}}',
              },
            ].map(({ limit, desc, eqn }) => (
              <GlassCard key={limit} className="flex gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white mb-1">{limit}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2">{desc}</p>
                  <EquationBlock math={eqn} display={false} />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Closing reflection */}
      <div className="max-w-3xl mx-auto text-center space-y-6 py-10">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
        <p className="text-xl text-gray-300 leading-relaxed font-light">
          Mathematics is the most precise language humans have developed for describing the
          natural world. That precision has enabled everything from GPS systems to MRI machines
          to semiconductor chips.
        </p>
        <p className="text-xl text-gray-300 leading-relaxed font-light">
          And yet: the universe is not obligated to be fully predictable from within it.
          Quantum mechanics, chaos, and computational irreducibility each set boundaries on what
          knowing the equations can tell us about the future — not as failures of science, but
          as hard-won scientific results.
        </p>
        <p className="text-lg text-blue-300 leading-relaxed">
          Understanding where the limits lie is not a reason for humility about mathematics —
          it is one of mathematics&apos; most important contributions.
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
      </div>

      {/* Summary table */}
      <h3 className="text-xl font-semibold text-white mb-5 text-center">
        What the Evidence Actually Supports
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left">
              <th className="py-3 px-4 text-blue-300 font-mono font-semibold text-xs uppercase tracking-wider border-b border-white/10">
                Domain
              </th>
              <th className="py-3 px-4 text-green-300 font-mono font-semibold text-xs uppercase tracking-wider border-b border-white/10">
                What is predictable
              </th>
              <th className="py-3 px-4 text-red-300 font-mono font-semibold text-xs uppercase tracking-wider border-b border-white/10">
                Fundamental limits
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Planetary orbits', 'Centuries ahead (2-body)', 'N-body chaos (>3 bodies)'],
              ['Weather', '~2 weeks (numerical models)', 'Chaotic atmosphere — Lyapunov divergence'],
              ['Quantum particles', 'Statistical distributions', 'Individual measurement outcomes'],
              ['Human disease risk', 'Population probabilities, risk scores', 'Exact individual outcomes, date of death'],
              ['Images / signals', 'Exactly (Fourier / sampling)', 'Resolution limited by bandwidth / pixel count'],
            ].map(([domain, predictable, limits]) => (
              <tr key={domain} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 text-gray-200 font-medium">{domain}</td>
                <td className="py-3 px-4 text-gray-400">{predictable}</td>
                <td className="py-3 px-4 text-gray-500">{limits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  )
}
