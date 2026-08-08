import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import ExperienceMap from '../../components/ExperienceMap'

export const metadata: Metadata = {
  title: 'Travel Experiences',
  description:
    'Handpicked city breaks, road trips and hiking adventures for busy professionals — from Alpine trails and Nordic drives to two-day European city escapes.',
  alternates: {
    canonical: '/experiences',
  },
  openGraph: {
    title: 'Travel Experiences | FlipFlopsAfterFive',
    description:
      'Handpicked city breaks, road trips and hiking adventures for busy professionals.',
    type: 'website',
    url: 'https://flipflopsafterfive.com/experiences',
    images: [{ url: '/images/home.jpg', width: 1200, height: 630, alt: 'Travel experiences' }],
  },
}

function getExperiences(dir: string, urlPrefix: string) {
  const dirPath = path.join(process.cwd(), 'src/content/articles/experiences', dir)
  const files = fs.readdirSync(dirPath)
  return files.map((file) => {
    const filePath = path.join(dirPath, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    // Remove extension for slug
    const slug = file.replace(/\.md$/, '')
    return {
      title: data.title || slug,
      image: data.image || '/images/placeholder.svg',
      link: `/blog/experiences/${urlPrefix}/${slug}`,
      description: data.description || '',
    }
  })
}

export default function Experiences() {
  const cityBreaks = getExperiences('cities', 'cities')
  const roadTrips = getExperiences('road-trips', 'road-trips')
  const hikingAdventures = getExperiences('hiking', 'hiking')

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-accent text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Travel Experiences</h1>
          <p className="text-xl text-accent-light max-w-2xl mx-auto">
            Handpicked adventures for busy professionals seeking unforgettable moments
          </p>
        </div>
      </section>

      <div className="container-max py-20">
          {/* Interactive Visited Map */}
          <ExperienceMap />

        {/* Cities Section */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl font-display font-bold mb-3">City Breaks & Day Trips</h2>
            <p className="text-text-muted text-lg">
              Discover vibrant cities with must-see attractions, hidden gems, and authentic local experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityBreaks.map((experience) => (
              <Link
                key={experience.title}
                href={experience.link}
                className="group"
              >
                <div className="relative h-96 overflow-hidden rounded-2xl mb-4 shadow-card hover:shadow-elevated transition-all">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold font-display text-white mb-2">{experience.title}</h3>
                    <p className="text-white/90 line-clamp-2">{experience.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform">
                  <span className="font-medium text-text">Explore {experience.title}</span>
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Road Trips Section - Commented but styled ready */}
        {roadTrips.length > 0 && (
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-4xl font-display font-bold mb-3">Road Trips</h2>
              <p className="text-text-muted text-lg">
                Epic multi-day driving adventures through stunning landscapes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roadTrips.map((experience) => (
                <Link
                  key={experience.title}
                  href={experience.link}
                  className="group"
                >
                  <div className="relative h-96 overflow-hidden rounded-2xl mb-4 shadow-card hover:shadow-elevated transition-all">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-3xl font-bold font-display text-white mb-2">{experience.title}</h3>
                      <p className="text-white/90 line-clamp-2">{experience.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform">
                    <span className="font-medium text-text">Explore {experience.title}</span>
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Hiking Section - Commented but styled ready */}
        {hikingAdventures.length > 0 && (
          <section>
            <div className="mb-12">
              <h2 className="text-4xl font-display font-bold mb-3">Hiking Adventures</h2>
              <p className="text-text-muted text-lg">
                Breathtaking trails and summits for all skill levels.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hikingAdventures.map((experience) => (
                <Link
                  key={experience.title}
                  href={experience.link}
                  className="group"
                >
                  <div className="relative h-96 overflow-hidden rounded-2xl mb-4 shadow-card hover:shadow-elevated transition-all">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-3xl font-bold font-display text-white mb-2">{experience.title}</h3>
                      <p className="text-white/90 line-clamp-2">{experience.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform">
                    <span className="font-medium text-text">Explore {experience.title}</span>
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
} 