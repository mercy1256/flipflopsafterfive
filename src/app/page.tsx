import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/home.jpg"
            alt="Epic Travel Experience"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover the World
            </h1>
            <p className="text-xl text-white mb-8">
              Travel guides, tips, and inspiration for your next adventure
            </p>
            <Link
              href="/places"
              className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100"
            >
              Explore Our Stories
            </Link>
          </div>
        </div>
      </section>

      {/* About Section (from About page, side by side layout) */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="w-64 h-64 relative overflow-hidden flex-shrink-0 mb-6 md:mb-0">
            <Image
              src="/images/profile.jpg"
              alt="Urvish Shah"
              fill
              className="object-cover"
            />
          </div>
          <div className="prose text-primary max-w-none">
            <h2 className="text-3xl font-bold mb-4 !text-primary">About Me</h2>
            <p className="text-xl mb-6">
              Hey there! I'm Urvish, your average 9-to-5 worker with a twist—I live for incredible adventures during my vacations. Every year, I embark on 3 to 4 major getaways and countless short trips. My passion? Traveling, exploring new places, and meeting fascinating people.
            </p>
            <p className="mb-6">
              I've created this site to share my travel tips, guides, and unforgettable experiences. If you're seeking ways to travel more efficiently, on a budget, and without missing out on the best spots, you've come to the right place. Let's make your travel dreams a reality!
            </p>
            <h3 className="text-2xl font-bold mb-2 mt-8 !text-primary">Let's work together on your next Travel project</h3>
            <p className="mb-6">
              Whether you're planning a solo adventure, a family vacation, or a group trip, I'm here to help you make the most of your travel experience. From budget planning to itinerary creation, I can provide personalized advice based on my extensive travel experience.
            </p>
            <a
              href="/contact"
              className="inline-block bg-secondary text-primary px-6 py-3 rounded-md hover:bg-accent transition-colors !no-underline"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </section>

    </div>
  )
} 