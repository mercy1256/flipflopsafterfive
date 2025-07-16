import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlipFlopsAfterFive',
  description: 'A travel blog for those who love to explore after work hours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary border-b border-secondary">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-text">FLIPFLOPSAFTERFIVE</Link>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-8">
                    <Link href="/places" className="text-text hover:text-text-light transition-colors">PLACES</Link>
                    <Link href="/experiences" className="text-text hover:text-text-light transition-colors">EXPERIENCES</Link>
                    <Link href="/blog" className="text-text hover:text-text-light transition-colors">BLOG</Link>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-primary border-t border-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Footer is intentionally left empty as per user request */}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 