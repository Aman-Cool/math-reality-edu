import { NavigationBar } from '@/components/NavigationBar'
import { HeroSection } from '@/components/HeroSection'
import { ProgressIndicator } from '@/components/ProgressIndicator'
import { ImageMathSection } from '@/components/sections/ImageMathSection'
import { GeometrySection } from '@/components/sections/GeometrySection'
import { FractalsSection } from '@/components/sections/FractalsSection'
import { SignalsSection } from '@/components/sections/SignalsSection'
import { InformationSection } from '@/components/sections/InformationSection'
import { DeterminismSection } from '@/components/sections/DeterminismSection'
import { QuantumSection } from '@/components/sections/QuantumSection'
import { ChaosSection } from '@/components/sections/ChaosSection'
import { LifespanSection } from '@/components/sections/LifespanSection'
import { FinalSection } from '@/components/sections/FinalSection'

export default function Home() {
  return (
    <main className="bg-[#0a0f1e] min-h-screen">
      <NavigationBar />
      <ProgressIndicator />
      <HeroSection />

      <div className="section-divider" />
      <ImageMathSection />

      <div className="section-divider" />
      <GeometrySection />

      <div className="section-divider" />
      <FractalsSection />

      <div className="section-divider" />
      <SignalsSection />

      <div className="section-divider" />
      <InformationSection />

      <div className="section-divider" />
      <DeterminismSection />

      <div className="section-divider" />
      <QuantumSection />

      <div className="section-divider" />
      <ChaosSection />

      <div className="section-divider" />
      <LifespanSection />

      <div className="section-divider" />
      <FinalSection />

      <footer className="text-center py-12 text-gray-600 text-sm font-mono border-t border-white/5">
        <p>Educational resource · Scientifically reviewed content</p>
        <p className="mt-1 text-gray-700">
          Speculative sections are clearly labelled. No pseudoscientific claims.
        </p>
      </footer>
    </main>
  )
}
