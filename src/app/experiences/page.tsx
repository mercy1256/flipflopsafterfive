import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
      image: data.image || '',
      link: `/experiences/${urlPrefix}/${slug}`,
      description: data.description || '',
    }
  })
}

export default function Experiences() {
  const cityBreaks = getExperiences('cities', 'cities')
  const roadTrips = getExperiences('road-trips', 'road-trips')
  const hikingAdventures = getExperiences('hiking', 'hiking')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-text mb-8">Travel Experiences</h1>

      {/* Cities Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-6">City Breaks/ Daytrips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cityBreaks.map((experience) => (
            <Link
              key={experience.title}
              href={experience.link}
              className="group relative h-96 overflow-hidden rounded-lg"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                <p className="text-white text-opacity-90">{experience.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Road Trips Section */}
      {/*
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-6">Road Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadTrips.map((experience) => (
            <Link
              key={experience.title}
              href={experience.link}
              className="group relative h-96 overflow-hidden rounded-lg"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                <p className="text-white text-opacity-90">{experience.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      */}

      {/* Hiking Section */}
      {/*
      <section>
        <h2 className="text-2xl font-bold text-text mb-6">Hiking Adventures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hikingAdventures.map((experience) => (
            <Link
              key={experience.title}
              href={experience.link}
              className="group relative h-96 overflow-hidden rounded-lg"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                <p className="text-white text-opacity-90">{experience.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      */}
    </div>
  )
} 