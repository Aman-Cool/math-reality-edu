import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'

export function InformationSection() {
  return (
    <SectionWrapper id="information">
      <SectionHeading
        badge="Established Science · Classical Mechanics"
        title="Information and Physical Systems"
        subtitle="Physical systems evolve according to mathematical laws. Understanding how state is represented and how it changes over time is the foundation of physics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            A physical system&apos;s <strong className="text-white">state</strong> is the minimal
            set of information required to fully describe it at a given instant. In classical
            mechanics, the state of a particle is its position and momentum:{' '}
            <InlineMath math="(q, p) \in \mathbb{R}^{2n}" /> for <InlineMath math="n" /> degrees
            of freedom. This space is called <strong className="text-white">phase space</strong>.
          </p>

          <EquationBlock
            math="\frac{dq_i}{dt} = \frac{\partial H}{\partial p_i}, \quad \frac{dp_i}{dt} = -\frac{\partial H}{\partial q_i}"
            label="Hamilton's equations of motion"
            description="H is the Hamiltonian (total energy). These coupled differential equations describe how positions q and momenta p evolve in time — the laws governing the trajectory through phase space."
          />

          <p className="text-gray-300 leading-relaxed">
            Hamilton&apos;s equations are <em>deterministic</em>: given exact initial conditions
            and the Hamiltonian, the future trajectory is uniquely determined. This is the
            mathematical basis of classical mechanics&apos; predictive power.
          </p>
        </div>

        <div className="space-y-4">
          <EquationBlock
            math="\frac{d^2x}{dt^2} = F(x,t)/m"
            label="Newton's second law (1D)"
            description="A second-order differential equation. Knowing the initial position x₀ and velocity v₀ = ẋ₀ uniquely determines x(t) for all future t — if F is known exactly."
          />

          <GlassCard accent="blue">
            <h4 className="text-sm font-semibold text-white mb-2">Phase Space and Trajectories</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Each point in phase space is a complete description of the system&apos;s instantaneous
              state. As time evolves, the system traces a <em>trajectory</em> — a continuous
              curve through this space. Two trajectories in classical mechanics <em>never
              cross</em> (uniqueness theorem), which is central to determinism.
            </p>
          </GlassCard>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-5">Systems of Increasing Complexity</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            name: 'Planetary motion',
            eqn: '\\ddot{\\mathbf{r}} = -\\frac{GM}{|\\mathbf{r}|^2}\\hat{\\mathbf{r}}',
            detail:
              "Newton's law of gravitation. The two-body problem has an exact closed-form solution (Kepler's orbits). The three-body problem has no general closed-form solution — trajectories must be computed numerically.",
            solvable: 'Analytically solvable (2 bodies)',
          },
          {
            name: 'Fluid dynamics',
            eqn: '\\rho\\left(\\frac{\\partial \\mathbf{u}}{\\partial t} + \\mathbf{u}\\cdot\\nabla\\mathbf{u}\\right) = -\\nabla p + \\mu\\,\\nabla^2\\mathbf{u}',
            detail:
              'Navier-Stokes equations describe viscous fluid flow. Whether smooth solutions always exist is an unsolved Millennium Prize Problem. Turbulent regimes require numerical simulation — analytical solutions are rare.',
            solvable: 'Numerically tractable (limited regimes)',
          },
          {
            name: 'Neural systems',
            eqn: 'C_m\\frac{dV}{dt} = -g_{\\text{Na}}m^3h(V-E_{\\text{Na}}) - g_K n^4(V-E_K) + I',
            detail:
              'Hodgkin-Huxley equations describe action potentials in neurons. A single neuron is a high-dimensional nonlinear dynamical system. Networks of ~86 billion neurons involve interactions that are computationally intractable to simulate fully.',
            solvable: 'Computationally very demanding',
          },
        ].map(({ name, eqn, detail, solvable }) => (
          <GlassCard key={name} accent="blue">
            <h4 className="text-sm font-semibold text-white mb-2">{name}</h4>
            <div className="text-xs overflow-x-auto mb-2 py-1">
              <EquationBlock math={eqn} display={false} />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">{detail}</p>
            <span className="text-[10px] font-mono text-blue-400">{solvable}</span>
          </GlassCard>
        ))}
      </div>

      <GlassCard accent="blue">
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">The modelling hierarchy:</span> All these
          systems are governed by well-defined equations. What differs is not the existence of
          governing laws, but the computational feasibility of solving them, the availability of
          precise initial conditions, and whether the equations capture all relevant physics at
          the scale of interest. Mathematics describes; practical prediction is another matter.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
