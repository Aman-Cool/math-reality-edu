import { SectionWrapper } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { StateSpaceViz } from '../visualizations/StateSpaceViz'
import { BiologicalNetworkViz } from '../visualizations/BiologicalNetworkViz'
import { DivergingTimelines } from '../visualizations/DivergingTimelines'

function SubsectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="text-2xl font-bold font-mono text-yellow-500/40">{num}</span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
  )
}

export function TheoreticalLifespanSection() {
  return (
    /* Outer shell with yellow left-border accent to visually separate from established-science sections */
    <div className="border-l-2 border-yellow-500/30 ml-0">
      <SectionWrapper id="state-model">

        {/* ── TOP HEADER ── */}
        <div className="mb-14">
          {/* Multi-line disclaimer banner */}
          <div className="bg-yellow-500/[0.06] border border-yellow-500/25 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="speculative-badge">Theoretical Exploration</span>
              <span className="speculative-badge">Not Established Science</span>
              <span className="speculative-badge">Not Medical Advice</span>
            </div>
            <p className="text-sm text-yellow-100/80 leading-relaxed">
              <strong className="text-yellow-300">What follows is a philosophical and theoretical exploration</strong>,
              not a description of any existing scientific system or capability. The purpose is to
              reason carefully about what determinism, information theory, chaos, and quantum mechanics
              say about the hypothetical limits of biological prediction. Every speculative claim is
              labelled. No part of this section should be interpreted as medical guidance or as
              implying that exact lifespan prediction is scientifically achievable.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Theoretical Lifespan Prediction Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">
              Complete State Modeling
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            If a complete mathematical description of a human body and its environment existed,
            what could dynamical systems theory say about modeling future biological outcomes?
            This question has no settled answer — but carefully examining it illuminates
            determinism, chaos, quantum limits, and computational complexity.
          </p>
        </div>

        {/* ── SUBSECTION 1: THE TOTAL STATE MODEL ── */}
        <div className="mb-16">
          <SubsectionLabel num="01" title="The Hypothetical &ldquo;Total State&rdquo; Model" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="space-y-5">
              <GlassCard accent="yellow">
                <p className="text-xs font-mono text-yellow-400 uppercase tracking-wider mb-2">
                  Theoretical Premise
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  In principle, a physical system&apos;s future evolution is determined by its
                  current state and governing laws. A hypothetical &ldquo;total state vector&rdquo;
                  for a living organism would need to encode every relevant physical degree of
                  freedom.
                </p>
              </GlassCard>

              <p className="text-gray-300 leading-relaxed">
                Such a state, if it could exist, would formally be a point in a phase space of
                enormous dimension. Conceptually, denote the state of an organism plus its
                environment at time <InlineMath math="t" /> as a vector:
              </p>

              <EquationBlock
                math="\mathbf{S}(t) \in \mathbb{R}^N, \quad N \approx 10^{28}\text{ degrees of freedom}"
                label="Hypothetical total state vector"
                description="N is an estimate for the number of classically distinct degrees of freedom in ~37 trillion cells, each with ~10⁶ molecules. This dimension is incomprehensibly large — but within classical mechanics, the concept is formally defined."
              />

              <p className="text-gray-300 leading-relaxed">
                Such a state would need to capture: particle positions and momenta for every
                atom in every cell; neural connectivity and firing patterns; gene expression states
                across all ~20,000 protein-coding genes; immune system cell inventories;
                environmental forcing functions; and temporal boundary conditions.
              </p>

              <GlassCard accent="red">
                <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
                  Scientific Position
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-white">No such model currently exists and is unlikely to ever
                  be practically achievable.</strong> Quantum mechanics, measurement limits,
                  computational irreducibility, and the chaotic nature of biological systems each
                  independently prevent this from being realized. The total state concept is a
                  philosophical thought-experiment, not a roadmap.
                </p>
              </GlassCard>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-mono text-yellow-400 uppercase tracking-wider self-start">
                Conceptual system map (hypothetical)
              </p>
              <StateSpaceViz />
              <p className="text-xs text-gray-600 text-center max-w-xs">
                Each node represents a biological subsystem. Edges represent information exchange.
                Real coupling is vastly more complex and stochastic than any diagram can show.
              </p>
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 2: CLASSICAL DETERMINISM ── */}
        <div className="mb-16">
          <SubsectionLabel num="02" title="Classical Determinism — The Historical Framework" />

          <GlassCard accent="yellow" className="mb-6">
            <span className="speculative-badge mb-3 inline-flex">Historical / Philosophical — Not Modern Physics</span>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Newtonian mechanics, as formalized in the 17th–18th centuries, was deterministic:
              given exact initial conditions and complete knowledge of all forces, future states
              are uniquely determined by the equations of motion. This gave rise to Laplace&apos;s
              Demon (1814) — the thought experiment that a sufficiently complete intelligence
              could compute the entire future of the universe.
            </p>
          </GlassCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Within classical mechanics, the governing equations are ordinary differential
                equations with a unique solution for given initial data (Picard–Lindelöf theorem).
                For a system with Hamiltonian <InlineMath math="H" />:
              </p>
              <EquationBlock
                math="\dot{\mathbf{q}} = \nabla_{\mathbf{p}}\, H, \qquad \dot{\mathbf{p}} = -\nabla_{\mathbf{q}}\, H"
                label="Hamilton's equations — classical determinism"
                description="Given (q₀, p₀) at t = 0, the trajectory (q(t), p(t)) is uniquely determined for all t > 0 — provided H is well-behaved (Lipschitz continuous). This is the mathematical basis of classical determinism."
              />
              <p className="text-gray-300 leading-relaxed">
                Applied naively to biology: if the body&apos;s full state at birth (or any moment)
                were classically known, and if biology were purely Newtonian, future states
                would in principle be calculable. Both conditions fail in practice, as the
                subsequent subsections explain.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: 'Two-body problem', result: 'Exact closed-form solution exists (Kepler orbits)', ok: true },
                { title: 'Three-body problem', result: 'No general closed-form solution; chaos typical for most initial conditions', ok: false },
                { title: 'N-body (N large)', result: 'Only statistical mechanics is tractable; individual trajectories are not', ok: false },
                { title: 'Biological organism', result: 'N ~ 10²⁸; nonlinear; quantum; stochastic — classical determinism inapplicable', ok: false },
              ].map(({ title, result, ok }) => (
                <GlassCard key={title} className="flex items-start gap-3">
                  <span className={`mt-0.5 text-sm font-bold ${ok ? 'text-green-400' : 'text-red-400'}`}>
                    {ok ? '✓' : '✗'}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{result}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 3: BIOLOGICAL COMPLEXITY ── */}
        <div className="mb-16">
          <SubsectionLabel num="03" title="Biological Complexity — Why Living Systems Resist Modeling" />

          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">
            Even setting aside quantum effects, living organisms are among the most complex
            nonlinear dynamical systems known. Several properties make them qualitatively
            different from, say, a planetary system:
          </p>

          <div className="mb-6">
            <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">
              Animated biological interaction network
            </p>
            <BiologicalNetworkViz />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                stat: '~37 trillion',
                label: 'human cells',
                detail: 'Each a complex dynamical system with ~10,000 distinct molecular species in continuous reaction.',
              },
              {
                stat: '~86 billion',
                label: 'neurons',
                detail: 'Connected by ~10¹⁵ synapses. Firing patterns encode state in high-dimensional temporal signals.',
              },
              {
                stat: '~10,000',
                label: 'metabolic reactions',
                detail: 'Coupled reaction networks in every cell. Perturbations in one pathway cascade through the system.',
              },
              {
                stat: 'Stochastic',
                label: 'gene expression',
                detail: 'Even genetically identical cells differ significantly due to random fluctuations in transcription.',
              },
              {
                stat: 'Adaptive',
                label: 'immune system',
                detail: 'Learns and reconfigures dynamically. No two immune repertoires are alike, even in twins.',
              },
              {
                stat: 'Emergent',
                label: 'phenotype',
                detail: 'Macroscopic behavior (health, cognition, aging) is not simply readable from molecular state — emergence makes it qualitatively different.',
              },
            ].map(({ stat, label, detail }) => (
              <GlassCard key={label} accent="blue">
                <div className="text-lg font-bold text-blue-300 font-mono mb-0.5">{stat}</div>
                <div className="text-xs font-semibold text-white uppercase tracking-wide mb-2">{label}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard>
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-blue-300 font-semibold">Emergent behavior:</span> Many
              biological properties — consciousness, immune memory, aging trajectories —
              are emergent: they arise from interactions at lower levels but cannot be directly
              read off from the lower-level state without effectively simulating the entire system.
              Philip Anderson&apos;s &ldquo;More is Different&rdquo; (1972) formalized this insight:
              each organizational level requires its own effective description, and is not
              simply derivable from equations at the level below.
            </p>
          </GlassCard>
        </div>

        {/* ── SUBSECTION 4: CHAOS THEORY LIMITATIONS ── */}
        <div className="mb-16">
          <SubsectionLabel num="04" title="Chaos Theory — Determinism Without Predictability" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="space-y-5">
              <p className="text-gray-300 leading-relaxed">
                Even if a biological system were governed by purely classical, deterministic
                equations, chaos theory establishes that practical long-term prediction may be
                impossible. Positive Lyapunov exponents mean that any measurement error
                <InlineMath math="\delta_0" /> grows exponentially:
              </p>

              <EquationBlock
                math="\delta(t) \approx \delta_0\, e^{\lambda t}"
                label="Lyapunov divergence"
                description="λ > 0 defines a chaotic system. A measurement error of δ₀ = 10⁻⁶ doubles every ln(2)/λ time units. For biological systems with many coupled chaotic subsystems, the effective λ may be very large."
              />

              <p className="text-gray-300 leading-relaxed">
                The predictability horizon — the time after which prediction accuracy becomes
                comparable to no-information baseline — is fundamentally bounded:
              </p>

              <EquationBlock
                math="T_{\max} \approx \frac{1}{\lambda}\ln\!\left(\frac{\Delta_{\text{tol}}}{\delta_0}\right)"
                label="Predictability horizon"
                description="Δ_tol is the acceptable error threshold. Even if measurement precision improves by 10⁶ (δ₀ → 10⁻¹²), T_max increases only additively by ln(10⁶)/λ — a modest gain against exponential divergence."
              />

              <GlassCard accent="yellow">
                <p className="text-xs font-mono text-yellow-400 uppercase tracking-wider mb-1">Theoretical implication</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Biological systems couple oscillators across timescales (millisecond neural
                  firing to decades-long epigenetic drift). A theoretical complete-state model
                  would still face exponential error amplification, fundamentally limiting
                  long-range forecasting regardless of computational resources.
                </p>
              </GlassCard>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
                Interactive timeline divergence
              </p>
              <DivergingTimelines />
              <p className="text-xs text-gray-600 leading-relaxed">
                Lines begin nearly identical (δ₀ ≈ 10⁻³). Under positive Lyapunov dynamics,
                they fan out exponentially. Adjust λ to see how the divergence rate changes.
              </p>
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 5: QUANTUM LIMITATIONS ── */}
        <div className="mb-16">
          <SubsectionLabel num="05" title="Quantum Limitations — Fundamental Indeterminacy" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="space-y-5">
              <p className="text-gray-300 leading-relaxed">
                Classical mechanics' determinism depends on the premise that particles have
                definite positions and momenta at all times. Quantum mechanics removes this
                premise. The Heisenberg uncertainty principle is not an engineering limitation
                — it is a theorem about the mathematical structure of quantum states:
              </p>

              <EquationBlock
                math="\Delta x\, \Delta p \;\geq\; \frac{\hbar}{2}"
                label="Heisenberg uncertainty principle"
                description="Δx and Δp are standard deviations of position and momentum over repeated measurements of identically prepared systems. The bound ℏ/2 ≈ 5.27 × 10⁻³⁵ J·s is fundamental — not reducible by better instruments."
              />

              <p className="text-gray-300 leading-relaxed">
                For macroscopic objects (billiard balls, planets), ℏ/2 is negligible compared
                to classical scales, so classical determinism is an excellent approximation.
                For biological processes at the molecular level — electron transfer in enzymes,
                proton tunneling in DNA replication, radical reactions in photosynthesis —
                quantum effects are measurable and consequential.
              </p>

              <EquationBlock
                math="|\Psi(t)\rangle = \hat{U}(t)\,|\Psi(0)\rangle, \quad \hat{U} = e^{-i\hat{H}t/\hbar}"
                label="Quantum time evolution"
                description="The wavefunction evolves deterministically under the unitary operator Û. But individual measurement outcomes are probabilistic — no hidden variable theory consistent with QM can restore classical determinism (Bell's theorem, 1964)."
              />
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Quantum biology',
                  body: 'Enzymatic catalysis involves quantum tunneling of hydrogen atoms across energy barriers — a non-classical process. Photosynthetic energy transfer exhibits quantum coherence. These are not hypothetical; they are measured.',
                  established: true,
                },
                {
                  title: 'Decoherence timescales',
                  body: 'Quantum superpositions decohere on timescales of ~10⁻²⁰ s for typical cellular objects at body temperature. Macroscopic biological behavior is thus largely classical — but the stochastic outcomes of quantum events (e.g., DNA damage by cosmic rays) feed forward into classical dynamics.',
                  established: true,
                },
                {
                  title: 'Bell inequality violations',
                  body: 'Experiments (Aspect 1982; Hensen et al. 2015) confirm quantum mechanics is fundamentally non-local and probabilistic. No classical hidden-variable theory can reproduce its predictions. The total-state premise of classical determinism is therefore not recoverable.',
                  established: true,
                },
                {
                  title: 'Quantum mind hypothesis',
                  body: 'The claim that quantum effects are directly relevant to cognition or consciousness (e.g., Penrose-Hameroff Orch-OR) is speculative and not established. Quantum effects in the brain at the molecular scale are real; their proposed relevance to consciousness is not empirically confirmed.',
                  established: false,
                },
              ].map(({ title, body, established }) => (
                <GlassCard key={title} accent={established ? 'blue' : 'yellow'}>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-sm font-semibold text-white">{title}</h4>
                    <span className={`text-[10px] font-mono ${established ? 'text-green-400' : 'text-yellow-400'}`}>
                      {established ? 'Established' : 'Speculative'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 6: REAL-WORLD LIFESPAN PREDICTION ── */}
        <div className="mb-16">
          <SubsectionLabel num="06" title="Current Real-World Approaches — What Science Actually Achieves" />

          <GlassCard accent="green" className="mb-6">
            <span className="science-badge mb-3 inline-flex">Established Science</span>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              This subsection returns to established, evidence-based methods. Real predictive systems
              produce <strong className="text-white">probability distributions and risk estimates</strong>,
              not deterministic outcomes. The gap between current science and the hypothetical
              total-state model is not a matter of incremental improvement — it is categorical.
            </p>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Actuarial and Epidemiological Models</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                The Gompertz-Makeham law describes the empirically observed age-specific mortality
                rate in human populations — not individuals:
              </p>
              <EquationBlock
                math="\mu(x) = A + B\,e^{Cx}"
                label="Gompertz-Makeham mortality rate"
                description="A, B, C are fitted from actuarial data. This describes population-level averages with high accuracy. It says nothing determinate about any individual's outcome."
              />
              <p className="text-sm text-gray-400 leading-relaxed">
                The survival function derived from this gives the probability that a randomly
                selected individual from the modeled population survives to age x. Life insurance
                companies use these for pricing — not for predicting when any person will die.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white">Precision Medicine Approaches</h4>
              {[
                { name: 'Polygenic risk scores', desc: 'Genome-wide variant aggregation. Predicts relative risk (e.g., ×1.8 for cardiovascular disease), not absolute lifespan.', accuracy: 'Risk stratification (population)' },
                { name: 'Epigenetic clocks', desc: "Horvath's clock estimates biological age from DNA methylation. Correlated with mortality hazard but wide individual confidence intervals.", accuracy: 'Biological age estimate' },
                { name: 'ML clinical risk models', desc: 'Framingham, SCORE2, ACC/AHA — validated 10-year event probability estimates from blood panels + history.', accuracy: '10-year probability estimate' },
                { name: 'Wearable biometrics', desc: 'Continuous physiological monitoring improves short-term anomaly detection. Does not extend predictive horizon to decades.', accuracy: 'Short-term monitoring' },
              ].map(({ name, desc, accuracy }) => (
                <GlassCard key={name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{name}</span>
                    <span className="text-[10px] font-mono text-green-400">{accuracy}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 7: COMPUTATIONAL LIMITS ── */}
        <div className="mb-16">
          <SubsectionLabel num="07" title="Computational Limits — The Final Barrier" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="space-y-5">
              <p className="text-gray-300 leading-relaxed">
                Suppose, hypothetically, that all physical limitations were somehow overcome:
                perfect quantum measurement, complete initial state, exact governing equations.
                A further mathematical barrier remains:
                <strong className="text-white"> computational irreducibility</strong>.
              </p>

              <GlassCard accent="blue">
                <h4 className="text-sm font-semibold text-white mb-2">Computational irreducibility</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  For many dynamical systems, no algorithm can compute the state at time{' '}
                  <InlineMath math="t" /> faster than simulating every intermediate step at
                  the system&apos;s natural rate. The only shortcut <em>is</em> the system
                  evolving in real time. This result, formalized by Wolfram (1985) and related
                  to Gödel incompleteness, means that even perfect physics knowledge may not
                  enable faster-than-real-time biological forecasting.
                </p>
              </GlassCard>

              <EquationBlock
                math="T_{\text{compute}}(t) \geq T_{\text{physical}}(t)"
                label="Computational irreducibility bound"
                description="For computationally irreducible systems, the time to predict the state at future time t is at least as long as t itself. No amount of parallel computing bypasses this for such systems."
              />
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Information density',
                  body: 'Storing the classical state of 10²⁸ degrees of freedom at floating-point precision requires ~10²⁹ bits. The observable universe contains ~10⁸⁰ atoms. A computer to hold this state would need to be larger than the solar system.',
                },
                {
                  title: 'Exponential complexity',
                  body: 'The number of possible interaction combinations grows exponentially with N. Even with quantum computers, many-body simulation of biological-scale systems remains intractable for the foreseeable future.',
                },
                {
                  title: 'Halting problem analogy',
                  body: "By Rice's theorem, no general algorithm can determine in finite time whether an arbitrary program will eventually halt. Analogously, predicting whether a biological system will survive an arbitrary future event may be undecidable in principle.",
                },
                {
                  title: 'Measurement back-action',
                  body: 'Measuring a quantum system disturbs it. To acquire the 10²⁸ degrees of freedom requires 10²⁸ measurements, each disturbing the system. The state one is trying to capture does not survive the act of capturing it.',
                },
              ].map(({ title, body }) => (
                <GlassCard key={title} accent="blue">
                  <h4 className="text-sm font-semibold text-white mb-1.5">{title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 8: PHILOSOPHICAL CONCLUSION ── */}
        <div className="mb-6">
          <SubsectionLabel num="08" title="Philosophical Conclusion" />

          <div className="max-w-3xl space-y-5 mb-8">
            <p className="text-gray-300 leading-relaxed">
              The thought experiment of complete state modeling is useful not because it is
              achievable, but because examining each barrier to its achievement illuminates
              real physics. The barriers are:
            </p>

            <div className="space-y-3">
              {[
                {
                  name: 'Quantum barrier',
                  desc: 'The universe does not simultaneously possess definite values for all observables. The total-state premise fails at the foundation. (Bell, 1964; Aspect, 1982)',
                  verdict: 'Physical impossibility',
                  color: 'text-red-400',
                },
                {
                  name: 'Chaos barrier',
                  desc: 'Even classical systems with positive Lyapunov exponents become practically unpredictable on timescales of T_max ≈ ln(Δ_tol/δ₀)/λ. Biological systems have many coupled chaotic subsystems.',
                  verdict: 'Mathematical impossibility (long-range)',
                  color: 'text-orange-400',
                },
                {
                  name: 'Complexity barrier',
                  desc: 'Biological emergence means macro-scale outcomes are not simply readable from micro-scale state without simulating all intermediate levels.',
                  verdict: 'Epistemological barrier',
                  color: 'text-yellow-400',
                },
                {
                  name: 'Computational barrier',
                  desc: 'For computationally irreducible systems, prediction cannot be faster than real-time evolution. No quantity of hardware resolves this.',
                  verdict: 'Computational impossibility',
                  color: 'text-blue-400',
                },
              ].map(({ name, desc, verdict, color }) => (
                <GlassCard key={name} className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-semibold text-white">{name}</h4>
                      <span className={`text-[10px] font-mono ${color}`}>{verdict}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Closing reflection */}
          <div className="border border-yellow-500/20 bg-yellow-500/[0.04] rounded-2xl p-8 max-w-3xl">
            <p className="text-base text-gray-300 leading-relaxed mb-4">
              The universe may be partially deterministic at some levels of description, fundamentally
              probabilistic at the quantum level, computationally irreducible for many complex
              systems, and practically unpredictable beyond short time horizons due to chaos.
            </p>
            <p className="text-base text-gray-300 leading-relaxed mb-4">
              What current science <em>can</em> do is provide probabilistic risk estimates validated
              against population data — a genuinely useful and scientifically rigorous form of
              prediction that should not be confused with deterministic certainty.
            </p>
            <p className="text-yellow-300/80 text-sm leading-relaxed">
              The intellectual honesty required here is to resist the temptation to extrapolate
              from &ldquo;deterministic equations exist&rdquo; to &ldquo;futures are computable.&rdquo;
              The distance between those two statements is where physics, mathematics,
              and philosophy do their most important work.
            </p>
          </div>
        </div>

      </SectionWrapper>
    </div>
  )
}
