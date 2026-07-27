import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home.jpg"
            alt="Epic Travel Experience - Journey Around the World"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-3xl mx-auto px-6 z-10 text-white animate-fade-in-up">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/80 rounded-full">
            <span className="text-sm font-medium">Travel Inspired</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Discover Unforgettable Adventures
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl leading-relaxed">
            Expert travel guides, insider tips, and inspiring stories for working professionals seeking meaningful adventures around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/places"
              className="inline-block px-8 py-4 bg-gradient-accent text-white font-semibold rounded-lg hover:shadow-elevated transition-all hover:scale-105"
            >
              Explore Destinations →
            </Link>
            <Link
              href="/blog"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Read Travel Stories
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container-max py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">What We Offer</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Carefully curated travel experiences and guides to inspire your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Destinations Card */}
          <Link href="/places" className="group">
            <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
              <Image
                src="/images/europe.jpg"
                alt="Explore Destinations Around the World"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-accent transition-colors">Destinations</h3>
            <p className="text-text-muted">Discover 12+ countries with detailed guides, hidden gems, and local insights.</p>
          </Link>

          {/* Experiences Card */}
          <Link href="/experiences" className="group">
            <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
              <Image
                src="/images/experiences/cities/prague-city-break.jpg"
                alt="Unforgettable Travel Experiences"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-accent transition-colors">Experiences</h3>
            <p className="text-text-muted">City breaks, hiking adventures, and road trips tailored for busy professionals.</p>
          </Link>

          {/* Blog Card */}
          <Link href="/blog" className="group">
            <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
              <Image
                src="/images/asia.jpg"
                alt="Travel Blog - Tips and Stories"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-accent transition-colors">Blog</h3>
            <p className="text-text-muted">Travel tips, itineraries, budgeting advice, and insider knowledge shared weekly.</p>
          </Link>
        </div>
      </section>

      {/* New Europe Destinations */}
      <section className="container-max py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">New Europe Destinations</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Explore Belgium, the Netherlands, and Switzerland with fresh itineraries and scenic escapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/places/europe/belgium" className="group">
            <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
              <Image
                src="/images/belgium.jpg"
                alt="Visit Belgium"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-accent transition-colors">Belgium</h3>
            <p className="text-text-muted">Ghent, Bruges, Antwerp, and Brussels in one weekend.</p>
          </Link>

          <Link href="/places/europe/netherlands" className="group">
            <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
              <Image
                src="/images/netherlands.jpg"
                alt="Visit Netherlands"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-accent transition-colors">Netherlands</h3>
            <p className="text-text-muted">Amsterdam, tulip gardens, and canal villages in three days.</p>
          </Link>

          <Link href="/places/europe/switzerland" className="group">
            <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
              <Image
                src="/images/switzerland.jpg"
                alt="Visit Switzerland"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-accent transition-colors">Switzerland</h3>
            <p className="text-text-muted">Alpine lakes, mountain villages, and unforgettable hikes.</p>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-secondary py-20">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-elevated">
                <Image
                  src="/images/profile.jpg"
                  alt="Urvish Shah - Travel Blogger"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="w-full md:w-3/5">
              <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-accent font-medium">About The Author</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Hey, I'm Urvish! 👋</h2>
              <p className="text-lg text-text-muted mb-4 leading-relaxed">
                I'm your average 9-to-5 professional with an extraordinary passion for travel. Every year, I embark on 3-4 major adventures and countless short trips across Europe, Asia, and beyond.
              </p>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                I created Flip Flops After Five to share my travel expertise, prove that you don't need to quit your job to travel, and help working professionals like you make the most of your vacations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 bg-text text-white rounded-lg hover:shadow-elevated transition-all font-medium inline-block"
                >
                  Read My Story
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border-2 border-text rounded-lg hover:bg-text hover:text-white transition-all font-medium inline-block"
                >
                  Let's Work Together
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-accent text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl text-accent-light mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who are discovering amazing destinations and making memories that last a lifetime.
          </p>
          <Link
            href="/places"
            className="inline-block px-8 py-4 bg-white text-accent font-semibold rounded-lg hover:shadow-elevated transition-all hover:scale-105"
          >
            Start Your Journey Now →
          </Link>
        </div>
      </section>
    </div>
  )
} 