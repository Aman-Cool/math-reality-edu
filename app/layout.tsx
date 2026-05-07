import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: 'Mathematics, Information & the Modeling of Reality',
  description:
    'An educational exploration of how equations describe images, physical systems, uncertainty, and the fundamental limits of predictability in physics.',
  keywords: [
    'mathematics', 'physics', 'chaos theory', 'quantum mechanics',
    'Fourier transform', 'fractals', 'determinism', 'educational',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0f1e] text-gray-100 antialiased">{children}</body>
    </html>
  )
}
