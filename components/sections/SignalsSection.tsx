import { SectionWrapper, SectionHeading } from '../SectionWrapper'
import { EquationBlock, InlineMath } from '../EquationBlock'
import { GlassCard } from '../GlassCard'
import { FourierVisualization } from '../visualizations/FourierVisualization'

export function SignalsSection() {
  return (
    <SectionWrapper id="signals">
      <SectionHeading
        badge="Established Science · Signal Processing"
        title="Signals, Waves, and Reconstruction"
        subtitle="Physical information about the world is often encoded in waves. Mathematics provides the tools to decompose, transmit, and reconstruct that information."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            Any well-behaved signal <InlineMath math="f(t)" /> can be decomposed into a sum of
            sinusoids — functions of different frequencies and amplitudes. The{' '}
            <strong className="text-white">Fourier transform</strong> makes this decomposition
            exact and invertible:
          </p>

          <EquationBlock
            math="F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-i\omega t}\, dt"
            label="Continuous Fourier Transform"
            description="F(ω) gives the amplitude and phase of frequency ω present in f(t). The inverse transform reconstructs f(t) from F(ω) exactly."
          />

          <p className="text-gray-300 leading-relaxed">
            The interactive diagram shows how a square wave — a signal with sharp discontinuities
            — is progressively approximated by summing sinusoidal harmonics. More terms
            improve fidelity, particularly near the discontinuities (Gibbs phenomenon).
          </p>

          <EquationBlock
            math="f(t) = \sum_{n=1}^{\infty} \frac{4}{\pi(2n-1)} \sin\!\bigl((2n-1)t\bigr)"
            label="Fourier series of a square wave"
            description="Each term is a sinusoid at an odd harmonic frequency (2n-1). The coefficients 4/π(2n-1) decrease, so higher harmonics matter less."
          />
        </div>

        <div>
          <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-3">
            Interactive Fourier Reconstruction
          </h3>
          <FourierVisualization />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-5">Real-World Applications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            name: 'MRI Imaging',
            detail:
              'Magnetic resonance imaging acquires Fourier-domain (k-space) data. Inverse Fourier transforms reconstruct the spatial image of tissue from radio-frequency signals emitted by hydrogen nuclei.',
          },
          {
            name: 'CT Reconstruction',
            detail:
              'Computed tomography uses the Radon transform (a variant of Fourier analysis) to reconstruct 3D density maps from X-ray projections taken at different angles.',
          },
          {
            name: 'Radio Astronomy',
            detail:
              'Aperture synthesis (VLBI) combines signals from geographically separated telescopes. Fourier reconstruction produces radio images with effective resolution matching the baseline between telescopes.',
          },
          {
            name: 'Audio Compression',
            detail:
              'MP3 and AAC codecs use the discrete cosine transform (related to Fourier analysis) to discard frequency content that human hearing is insensitive to, reducing file size.',
          },
        ].map(({ name, detail }) => (
          <GlassCard key={name} accent="blue">
            <h4 className="text-sm font-semibold text-white mb-2">{name}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{detail}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-blue-300 font-semibold">The conceptual link:</span> Information
          about physical objects can be encoded into waves, transmitted through space, and then
          mathematically reconstructed into useful representations. This is not a theoretical
          curiosity — it is the operational basis of modern medical imaging, communications,
          and observational astronomy.
        </p>
      </GlassCard>
    </SectionWrapper>
  )
}
