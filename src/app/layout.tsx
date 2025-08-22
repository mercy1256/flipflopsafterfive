import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'FlipFlopsAfterFive - Travel Blog & Adventure Guides',
    template: '%s | FlipFlopsAfterFive'
  },
  description: 'Discover amazing travel destinations, adventure guides, and travel tips for working professionals. Explore Europe, Asia, and beyond with our comprehensive travel blog.',
  keywords: [
    'travel blog',
    'travel guides',
    'adventure travel',
    'Europe travel',
    'travel tips',
    'working professional travel',
    'weekend getaways',
    'travel photography',
    'budget travel',
    'solo travel',
    'iceland travel',
    'italy travel guide',
    'france travel',
    'spain travel',
    'portugal travel',
    'greece travel',
    'croatia travel',
    'austria travel',
    'slovenia travel',
    'norway travel',
    'finland travel',
    'thailand travel',
    'albania travel'
  ],
  authors: [{ name: 'Urvish Shah' }],
  creator: 'Urvish Shah',
  publisher: 'FlipFlopsAfterFive',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flipflopsafterfive.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flipflopsafterfive.com',
    siteName: 'FlipFlopsAfterFive',
    title: 'FlipFlopsAfterFive - Travel Blog & Adventure Guides',
    description: 'Discover amazing travel destinations, adventure guides, and travel tips for working professionals.',
    images: [
      {
        url: '/images/home.jpg',
        width: 1200,
        height: 630,
        alt: 'FlipFlopsAfterFive - Travel Adventures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlipFlopsAfterFive - Travel Blog & Adventure Guides',
    description: 'Discover amazing travel destinations, adventure guides, and travel tips for working professionals.',
    images: ['/images/home.jpg'],
    creator: '@flipflopsafterfive',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FlipFlopsAfterFive",
              "url": "https://flipflopsafterfive.com",
              "logo": "https://flipflopsafterfive.com/images/home.jpg",
              "description": "A travel blog for those who love to explore after work hours",
              "sameAs": [
                "https://twitter.com/flipflopsafterfive",
                "https://instagram.com/flipflopsafterfive"
              ]
            })
          }}
        />
      </head>
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
              <div className="text-center text-text-light">
                <p>&copy; {new Date().getFullYear()} FlipFlopsAfterFive. All rights reserved.</p>
                <p className="mt-2">Travel blog for working professionals who love adventure</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 