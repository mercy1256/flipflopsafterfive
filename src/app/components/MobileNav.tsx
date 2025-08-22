'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-text p-2 hover:bg-secondary rounded-md transition-colors"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-primary border border-secondary rounded-md shadow-lg z-50">
          <div className="py-2">
            <Link
              href="/places"
              className="block px-4 py-2 text-text hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              PLACES
            </Link>
            <Link
              href="/experiences"
              className="block px-4 py-2 text-text hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              EXPERIENCES
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-text hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              BLOG
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
