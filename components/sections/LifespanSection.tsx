import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'

export function LifespanSection() {
  return (
    <SectionWrapper id="lifespan">
      <SectionHeading
        badge="Probabilistic Science — Handle Carefully"
        badgeVariant="careful"
        title="Can Human Lifespan Be Predicted Precisely?"
        subtitle="Modern science provides probabilistic models, not deterministic certainty. This distinction is not semantic — it has profound practical and ethical implications."
      />

      {/* Major disclaimer */}
      <GlassCard accent="red" className="mb-10">
        <div className="flex items-start gap-3">
          <span className="careful-badge shrink-0 mt-0.5">Scientific Position</span>
          <div className="space-y-2">
            <p className="text-sm text-red-100 font-semibold">
              No scientific method can predict an individual&apos;s exact lifespan from equations.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              This is not a temporary gap in technology. It reflects fundamental properties of
              biology: stochastic molecular events, chaotic dynamics in physiological systems,
              quantum-scale processes in biochemistry, and irreducible sensitivity to environmental
              and social conditions. Any claim to the contrary is not supported by scientific
              evidence.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-white">What Science Can Do: Population Statistics</h3>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Actuarial science</strong> and
            epidemiology provide well-validated probabilistic models for lifespan at the
            population level. The Gompertz-Makeham law models the age-specific mortality
            rate <InlineMath math="\mu(x)" /> empirically observed in human populations:
          </p>

          <EquationBlock
            math="\mu(x) = A + B\,e^{Cx}"
            label="Gompertz-Makeham mortality rate"
            description="A accounts for age-independent mortality (accidents). B·e^(Cx) captures the exponential rise in mortality risk with age — an empirical observation, not a derived law from first principles. Fitted from population data."
          />

          <p className="text-gray-300 leading-relaxed">
            This model describes <em>average</em> population behavior extremely well. It cannot
            tell us when a specific individual will die — only what fraction of a large cohort
            will survive to age <InlineMath math="x" />.
          </p>

          <EquationBlock
            math="S(x) = \exp\!\left(-\int_0^x \mu(t)\,dt\right)"
            label="Survival function S(x)"
            description="S(x) is the probability that a randomly selected individual survives to age x. This is a population statistic. For any individual, the actual outcome is a single Bernoulli draw from this distribution."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">What Science Cannot Do</h3>
          <div className="space-y-3">
            {[
              {
                title: 'Exact individual prediction',
                body: 'Even knowing all currently measurable biomarkers for an individual, prediction error remains large. Biological variability, stochastic gene expression, and environmental interactions dominate over known risk factors.',
                impossible: true,
              },
              {
                title: 'Circumventing stochasticity',
                body: 'DNA replication errors, oxidative damage, protein misfolding, and immune responses all involve quantum-scale stochastic processes. These introduce irreducible randomness into cellular aging.',
                impossible: true,
              },
              {
                title: 'Full causal modelling',
                body: "A human body contains ~37 trillion cells, ~10⁸ synaptic connections, and interacts continuously with a chaotic external environment. Modelling all interactions simultaneously is computationally infeasible even in principle.",
                impossible: true,
              },
            ].map(({ title, body, impossible }) => (
              <GlassCard key={title} accent={impossible ? 'red' : 'green'}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-semibold text-white">{title}</h4>
                  {impossible && (
                    <span className="text-[10px] font-mono text-red-400">Not currently possible</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-5">
        What Genetics and Biomarkers Can Inform
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            name: 'Polygenic risk scores',
            detail:
              'Genome-wide association studies identify genetic variants correlated with disease risk. Polygenic scores combine thousands of small-effect variants into a single score. They shift population-level probabilities — they do not determine individual outcomes.',
            capability: 'Population risk stratification',
          },
          {
            name: 'Epigenetic clocks',
            detail:
              'DNA methylation patterns at specific genomic sites correlate with biological age. Horvath\'s clock and similar models estimate "biological age" from blood samples — correlating with mortality risk, but with wide confidence intervals at the individual level.',
            capability: 'Biological age estimation (population)',
          },
          {
            name: 'Clinical biomarkers',
            detail:
              'Blood pressure, HbA1c, LDL cholesterol, and inflammation markers (CRP) predict 10-year cardiovascular event risk with validated models (Framingham, SCORE). Confidence intervals for individuals remain large even for well-calibrated models.',
            capability: 'Risk-adjusted probability estimates',
          },
        ].map(({ name, detail, capability }) => (
          <GlassCard key={name} accent="blue">
            <h4 className="text-sm font-semibold text-white mb-1.5">{name}</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">{detail}</p>
            <span className="text-[10px] font-mono text-green-400">{capability}</span>
          </GlassCard>
        ))}
      </div>

      <GlassCard accent="blue">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">
            The right conceptual frame: probabilistic forecasting
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            The appropriate analogy is not &ldquo;reading a predetermined future&rdquo; but
            &ldquo;estimating distributions.&rdquo; A model that says &ldquo;this patient has
            a 22% probability of a major cardiac event in the next decade&rdquo; is scientifically
            meaningful and clinically useful. A model claiming &ldquo;this person will die on
            March 14, 2047&rdquo; is not scientifically supportable and does not reflect the
            state of the field.
          </p>
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row gap-6 text-xs text-gray-500">
              <div>
                <span className="text-green-400 font-semibold block mb-1">Scientifically valid</span>
                <ul className="space-y-0.5">
                  <li>&#8594; Population survival curves</li>
                  <li>&#8594; 10-year risk probability estimates</li>
                  <li>&#8594; Confidence intervals for biomarker-adjusted risk</li>
                </ul>
              </div>
              <div>
                <span className="text-red-400 font-semibold block mb-1">Not scientifically valid</span>
                <ul className="space-y-0.5">
                  <li>&#8594; Exact predicted death date for an individual</li>
                  <li>&#8594; Deterministic lifespan from any equation set</li>
                  <li>&#8594; Claims of predicting personal fate from physics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </SectionWrapper>
  )
}
