import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { FractalViewer } from '../visualizations/FractalViewer'

export function FractalsSection() {
  return (
    <SectionWrapper id="fractals">
      <SectionHeading
        badge="Established Science · Nonlinear Dynamics"
        title="Fractals and Emergent Complexity"
        subtitle="A remarkably short equation can generate structures of unbounded visual complexity — a phenomenon that surprised even mathematicians."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            The <strong className="text-white">Mandelbrot set</strong> is defined by the behaviour
            of the iteration of a single complex-valued equation. For each complex number{' '}
            <InlineMath math="c \in \mathbb{C}" />, we iterate:
          </p>

          <EquationBlock
            math="z_{n+1} = z_n^2 + c \quad z_0 = 0"
            label="Mandelbrot iteration"
            description="A point c belongs to the Mandelbrot set if and only if |z_n| remains bounded (≤ 2) for all n. Points that escape to infinity are coloured by their escape speed."
          />

          <p className="text-gray-300 leading-relaxed">
            The resulting boundary is infinitely detailed at every scale —
            a property called <strong className="text-white">self-similarity</strong>. Zooming into
            any region reveals structures resembling the whole set, at every level of magnification.
          </p>

          <GlassCard accent="blue">
            <h4 className="text-sm font-semibold text-white mb-2">What fractal dimension means</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ordinary curves have dimension 1 and surfaces have dimension 2. Fractal boundaries
              have a non-integer Hausdorff dimension — the Mandelbrot boundary has dimension 2.
              This is a rigorously defined measure of how much detail exists at smaller and
              smaller scales.
            </p>
          </GlassCard>
        </div>

        <div>
          <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-3">
            Interactive Mandelbrot Set
          </h3>
          <FractalViewer />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-5">
          Fractal-Like Patterns in Nature
        </h3>
        <GlassCard accent="yellow" className="mb-4">
          <div className="flex items-start gap-3">
            <span className="speculative-badge mt-0.5">NOTE</span>
            <p className="text-sm text-gray-300 leading-relaxed">
              Natural systems are <strong>not</strong> perfect mathematical fractals. Real coastlines,
              trees, and blood vessels exhibit fractal-like statistical scaling over a limited range
              of scales — they eventually reach physical limits (molecules, cells). The
              mathematical definition requires infinite self-similarity, which no physical object
              achieves.
            </p>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Coastlines', detail: 'Irregular perimeters exhibit scale-dependent length, consistent with fractal geometry across measurable scales.' },
            { name: 'Vascular trees', detail: 'Branching networks in lungs and circulatory systems approximate self-similar structures, optimizing surface area.' },
            { name: 'Lightning', detail: 'Electrical discharge follows the path of least resistance, producing statistically self-similar branching.' },
            { name: 'Mountain terrain', detail: 'Height profiles of mountain ranges show power-law spatial correlations — a signature of fractal-like statistics.' },
          ].map(({ name, detail }) => (
            <GlassCard key={name}>
              <h4 className="text-sm font-semibold text-white mb-1.5">{name}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard>
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">The deep implication:</span> Complexity
          does not require complex rules. Iterating <InlineMath math="z_{n+1} = z_n^2 + c" /> — a
          formula that fits on one line — produces structure that cannot be fully described without
          infinite information. This demonstrates that the relationship between description
          length and emergent complexity is highly non-linear.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
