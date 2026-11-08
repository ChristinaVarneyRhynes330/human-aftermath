import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = { title: 'The Human Aftermath™', description: 'A trauma-literacy course for people and for the professionals who support them.' }
export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-white focus:p-2">Skip to content</a>
        <header className="border-b border-slate/30 bg-white">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3" aria-label="Main">
            <Link href="/" className="font-semibold text-ink-blue">The Human Aftermath™</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/dashboard" className="underline-offset-4 hover:underline">My course</Link>
              <Link href="/lab" className="underline-offset-4 hover:underline">Learning Lab</Link>
              <Link href="/certificate" className="underline-offset-4 hover:underline">Certificate</Link>
            </div>
          </nav>
        </header>
        <main id="main" className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
