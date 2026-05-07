import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { PixelGrid } from '../visualizations/PixelGrid'

export function ImageMathSection() {
  return (
    <SectionWrapper id="images">
      <SectionHeading
        badge="Established Science · Computer Vision"
        title="Images as Mathematical Functions"
        subtitle="A digital image is not merely a picture — it is a precisely defined mathematical function mapping spatial coordinates to intensity values."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            A <strong className="text-white">grayscale image</strong> can be rigorously defined as a
            function <InlineMath math="I : \mathbb{R}^2 \to [0, 255]" />, where each point
            in the domain is a spatial coordinate and the output is a scalar intensity value.
            In a continuous model, we write:
          </p>

          <EquationBlock
            math="I(x, y) = c"
            label="Grayscale intensity function"
            description="I(x, y) returns the brightness at coordinate (x, y). For a uniform gray, c is constant across the domain."
          />

          <p className="text-gray-300 leading-relaxed">
            Color images extend this to three channels. The RGB model represents each pixel as a
            vector-valued function:
          </p>

          <EquationBlock
            math="\mathbf{I}(x,y) = \begin{pmatrix} R(x,y) \\ G(x,y) \\ B(x,y) \end{pmatrix}"
            label="RGB image function"
            description="Each channel (Red, Green, Blue) is an independent intensity function. Their combination encodes color perception."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-200">Interactive: Discrete Sampling</h3>
          <PixelGrid />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <GlassCard accent="blue">
          <h4 className="text-sm font-semibold text-white mb-2">Continuous vs. Discrete</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Real-world light fields are continuous functions. Digital cameras <em>sample</em> this
            field at a finite grid of sensor sites (pixels), converting analog intensity into
            discrete integer values. This is called rasterization.
          </p>
        </GlassCard>
        <GlassCard accent="blue">
          <h4 className="text-sm font-semibold text-white mb-2">Sampling Theorem</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Shannon–Nyquist: to faithfully reconstruct a signal with maximum frequency{' '}
            <InlineMath math="f_{\max}" />, you must sample at rate{' '}
            <InlineMath math="f_s \geq 2 f_{\max}" />. Below this rate, aliasing occurs —
            high-frequency detail folds into low-frequency artifacts.
          </p>
        </GlassCard>
        <GlassCard accent="blue">
          <h4 className="text-sm font-semibold text-white mb-2">Vector vs. Raster</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Raster graphics store sampled grids. Vector graphics store mathematical descriptions
            (equations, curves) that are evaluated at render time — resolution-independent
            because the underlying functions are continuous.
          </p>
        </GlassCard>
      </div>

      <GlassCard>
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">Key insight:</span> The function
          abstraction is not merely convenient — it is the foundation of image processing, computer
          vision, and signal theory. Operations like blurring, sharpening, and edge detection are
          mathematically defined transformations applied to <InlineMath math="I(x,y)" />.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
