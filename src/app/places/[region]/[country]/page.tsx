import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Country } from '@/types/country'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import italyData from '@/data/countries/italy.json'
import spainData from '@/data/countries/spain.json'
import icelandData from '@/data/countries/iceland.json'
import finlandData from '@/data/countries/finland.json'
import norwayData from '@/data/countries/norway.json'
import greeceData from '@/data/countries/greece.json'
import albaniaData from '@/data/countries/albania.json'
import croatiaData from '@/data/countries/croatia.json'
import austriaData from '@/data/countries/austria.json'
import sloveniaData from '@/data/countries/slovenia.json'
import thailandData from '@/data/countries/thailand.json'
import portugalData from '@/data/countries/portugal.json'
import franceData from '@/data/countries/france.json'
// Add more country imports as needed

const countryDataMap: Record<string, Country> = {
  'italy': italyData,
  'spain': spainData,
  'iceland': icelandData,
  'finland': finlandData,
  'norway': norwayData,
  'greece': greeceData,
  'albania': albaniaData,
  'croatia': croatiaData,
  'austria': austriaData,
  'slovenia': sloveniaData,
  'thailand': thailandData,
  'portugal': portugalData,
  'france': franceData,
  // Add more country mappings as needed
}

async function getArticles(country: string) {
  const articlesDirectory = path.join(process.cwd(), 'src/content/articles', country)
  
  try {
    const files = fs.readdirSync(articlesDirectory)
    const articles = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(articlesDirectory, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)
        const slug = file.replace('.md', '')
        
        return {
          title: data.title,
          slug: slug,
          description: data.description || '',
          image: data.image,
          date: data.date,
          readTime: data.readTime,
          author: data.author
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
  } catch (error) {
    console.error(`Error reading articles for ${country}:`, error)
    return []
  }
}

export default async function DestinationPage({ params }: { params: { region: string; country: string } }) {
  const countryData = countryDataMap[params.country]
  if (!countryData) {
    return <div>Country not found</div>
  }

  const country = countryData.name
  const region = params.region.charAt(0).toUpperCase() + params.region.slice(1)
  const articles = await getArticles(params.country)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative h-96 rounded-lg overflow-hidden mb-12">
        <Image
          src={`/images/${params.country}/main.jpg`}
          alt={country}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{country}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="prose prose-invert max-w-none">
            <h2>About {country}</h2>
            <p>{countryData.about.description}</p>
            <ul>
              {countryData.about.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <h3>Travel Tips</h3>
            <ul>
              <li>Best time to visit: {countryData.travelTips.bestTimeToVisit}</li>
              <li>Currency: {countryData.currency}</li>
              <li>Language: {countryData.languages.join(', ')}</li>
              <li>Transportation: {countryData.travelTips.transportation.join(', ')}</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Link href={`/articles/${params.country}/${article.slug}`} key={index} className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{String(article.date)}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{article.title}</h3>
                    <p className="text-text-light line-clamp-2">{article.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg mb-8 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Capital:</span> {countryData.capital}
              </li>
              <li>
                <span className="font-semibold">Time Zone:</span> {countryData.timeZone}
              </li>
              <li>
                <span className="font-semibold">Visa Requirements:</span> {countryData.visaRequirements}
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Cultural Notes</h3>
            <ul className="space-y-3">
              {countryData.travelTips.culturalNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
} 