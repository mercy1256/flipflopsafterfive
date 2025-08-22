'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isOpen && !target.closest('.mobile-nav')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="mobile-nav relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-text p-2 hover:bg-secondary rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6 transition-transform duration-200"
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-16 right-0 w-full max-w-sm bg-primary border-l border-secondary shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="py-4">
          {/* Close button for mobile */}
          <div className="flex justify-end px-4 mb-4">
            <button
              onClick={closeMenu}
              className="text-text hover:text-text-light transition-colors p-2"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              href="/places"
              className="flex items-center px-6 py-4 text-lg font-medium text-text hover:bg-secondary hover:text-text-light transition-colors border-b border-secondary/20"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              PLACES
            </Link>
            
            <Link
              href="/experiences"
              className="flex items-center px-6 py-4 text-lg font-medium text-text hover:bg-secondary hover:text-text-light transition-colors border-b border-secondary/20"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              EXPERIENCES
            </Link>
            
            <Link
              href="/blog"
              className="flex items-center px-6 py-4 text-lg font-medium text-text hover:bg-secondary hover:text-text-light transition-colors border-b border-secondary/20"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              BLOG
            </Link>
          </nav>

          {/* Additional Mobile-Only Links */}
          <div className="px-6 py-4 border-t border-secondary/20">
            <Link
              href="/about"
              className="flex items-center py-3 text-text hover:text-text-light transition-colors"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              About
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center py-3 text-text hover:text-text-light transition-colors"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
