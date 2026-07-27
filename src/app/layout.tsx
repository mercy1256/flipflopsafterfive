import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MobileNav from './components/MobileNav'

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
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD: Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FlipFlopsAfterFive",
              "url": "https://flipflopsafterfive.com",
              "logo": "https://flipflopsafterfive.com/images/home.jpg",
              "description": "A premium travel blog for those who love to explore after work hours",
              "sameAs": [
                "https://twitter.com/flipflopsafterfive",
                "https://instagram.com/flipflopsafterfive"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-text`}> 
        <a href="#content" className="skip-link">Skip to main content</a>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-primary border-b border-gray-100 sticky top-0 z-50">
            <nav className="container-max">
              <div className="flex justify-between items-center h-20">
                <Link href="/" className="flex items-center gap-2 group">
                  <span className="text-2xl font-display font-bold text-text group-hover:text-accent transition-colors">
                    Flip Flops After Five
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                  <Link href="/places" className="text-text-muted hover:text-accent transition-colors font-medium link-underline">Places</Link>
                  <Link href="/experiences" className="text-text-muted hover:text-accent transition-colors font-medium link-underline">Experiences</Link>
                  <Link href="/blog" className="text-text-muted hover:text-accent transition-colors font-medium link-underline">Blog</Link>
                  <Link href="/about" className="text-text-muted hover:text-accent transition-colors font-medium link-underline">About</Link>
                  <Link href="/contact" className="px-5 py-2 bg-gradient-accent text-white rounded-md hover:shadow-elevated transition-all font-medium link-underline">
                    Get In Touch
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                  <MobileNav />
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main id="content" className="flex-grow page-transition">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-text text-primary mt-20">
            <div className="container-max py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand */}
                <div>
                  <h3 className="font-display text-xl font-bold mb-4 text-accent-light">Flip Flops After Five</h3>
                  <p className="text-text-light mb-4">Travel inspiration for busy professionals who love adventure.</p>
                </div>

                {/* Explore */}
                <div>
                  <h4 className="font-bold mb-4">Explore</h4>
                  <ul className="space-y-2 text-text-light">
                    <li><Link href="/places" className="hover:text-accent-light transition-colors">Places</Link></li>
                    <li><Link href="/experiences" className="hover:text-accent-light transition-colors">Experiences</Link></li>
                    <li><Link href="/blog" className="hover:text-accent-light transition-colors">Blog</Link></li>
                    <li><Link href="/about" className="hover:text-accent-light transition-colors">About</Link></li>
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="font-bold mb-4">Connect</h4>
                  <ul className="space-y-2 text-text-light">
                    <li><Link href="/contact" className="hover:text-accent-light transition-colors">Contact</Link></li>
                    <li><a href="https://twitter.com/flipflopsafterfive" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">Twitter</a></li>
                    <li><a href="https://instagram.com/flipflopsafterfive" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">Instagram</a></li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h4 className="font-bold mb-4">Stay Updated</h4>
                  <p className="text-text-light text-sm mb-4">Get travel tips and new guides delivered to your inbox.</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 pt-8">
                <p className="text-center text-text-light text-sm">
                  &copy; {new Date().getFullYear()} Flip Flops After Five. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 