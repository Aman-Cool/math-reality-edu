import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { ChaosSimulation } from '../visualizations/ChaosSimulation'
import { LorenzCanvas } from '../visualizations/LorenzCanvas'

export function ChaosSection() {
  return (
    <SectionWrapper id="chaos">
      <SectionHeading
        badge="Established Science · Nonlinear Dynamics"
        title="Chaos Theory: Determinism Without Predictability"
        subtitle="Deterministic equations can produce behavior that is, in practice, impossible to predict. This is not a failure of mathematics — it is a mathematical result."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            A <strong className="text-white">chaotic system</strong> is one that is:
          </p>
          <ul className="space-y-2 text-gray-300">
            {[
              'Governed by deterministic equations',
              'Sensitive to initial conditions',
              'Topologically mixing (trajectories become entangled)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-gray-300 leading-relaxed">
            Sensitivity to initial conditions means that two trajectories starting{' '}
            <InlineMath math="\delta_0" /> apart diverge exponentially:
          </p>

          <EquationBlock
            math="\delta(t) \approx \delta_0 \, e^{\lambda t}"
            label="Lyapunov exponent divergence"
            description="λ (Lyapunov exponent) measures the rate of divergence. If λ > 0, the system is chaotic. A measurement error of δ₀ = 10⁻⁶ doubles roughly every ln(2)/λ time units — quickly overwhelming any initial precision."
          />

          <p className="text-gray-300 leading-relaxed">
            This means that practical forecasting has a fundamental time horizon determined by
            the Lyapunov exponent and measurement precision — regardless of computational power.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-3">
            Interactive: Diverging Trajectories
          </h3>
          <ChaosSimulation />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-5">The Lorenz System</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Edward Lorenz discovered deterministic chaos in 1963 while modelling atmospheric
              convection. The Lorenz system — three coupled differential equations — produces
              trajectories that never repeat but remain bounded:
            </p>

            <EquationBlock
              math="\begin{cases} \dot{x} = \sigma(y - x) \\ \dot{y} = x(\rho - z) - y \\ \dot{z} = xy - \beta z \end{cases}"
              label="Lorenz equations"
              description="Standard parameters: σ = 10 (Prandtl), ρ = 28 (Rayleigh), β = 8/3. The resulting strange attractor has fractal structure — the Lyapunov exponent λ₁ ≈ 0.91."
            />

            <GlassCard accent="blue">
              <h4 className="text-sm font-semibold text-white mb-1.5">
                Predictability horizon
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                For the Lorenz system with <InlineMath math="\lambda \approx 0.91" /> and initial
                error <InlineMath math="\delta_0 = 10^{-6}" />, the divergence reaches order-1
                amplitude in about{' '}
                <InlineMath math="t \approx \ln(\delta_0^{-1})/\lambda \approx 15" /> time units.
                After this, trajectories are effectively uncorrelated. In atmospheric models,
                this corresponds to roughly 2 weeks.
              </p>
            </GlassCard>
          </div>
          <div>
            <LorenzCanvas />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-5">Chaotic Systems in Nature</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { name: 'Weather', detail: '2-week forecast horizon from Lyapunov exponent of atmospheric dynamics.' },
          { name: 'Turbulence', detail: 'High-Reynolds flow becomes chaotic, making exact prediction of vortex positions impossible.' },
          { name: 'Population ecology', detail: 'Predator-prey models with logistic growth can exhibit period-doubling and chaos.' },
          { name: 'Cardiac arrhythmia', detail: 'Certain heart rhythm disorders correspond to chaotic electrical dynamics in cardiac tissue.' },
        ].map(({ name, detail }) => (
          <GlassCard key={name}>
            <h4 className="text-sm font-semibold text-white mb-1.5">{name}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">The key distinction:</span> Chaos theory
          does not say that chaotic systems lack governing equations — they have precise ones. It
          says that exact long-term prediction is practically impossible because any finite
          measurement error grows without bound. This is a theorem, not a limitation of current
          technology.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
