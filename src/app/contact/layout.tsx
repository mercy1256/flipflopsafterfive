import React from 'react'
import type { Metadata } from 'next'

// contact/page.tsx is a client component ('use client' for the form state), and client
// components cannot export `metadata`. Without this layout the route inherited the root
// layout's homepage title, description and canonical.
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions about an itinerary, collaboration ideas, or feedback on a guide? Get in touch with Urvish at Flip Flops After Five.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | FlipFlopsAfterFive',
    description:
      'Questions about an itinerary, collaboration ideas, or feedback on a guide? Get in touch.',
    type: 'website',
    url: 'https://flipflopsafterfive.com/contact',
    images: [{ url: '/images/home.jpg', width: 1200, height: 630, alt: 'Contact FlipFlopsAfterFive' }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
