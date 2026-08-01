import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Country } from '@/types/country'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import imageManifest from '@/data/imageManifest.json'
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
import vietnamData from '@/data/countries/vietnam.json'
import belgiumData from '@/data/countries/belgium.json'
import netherlandsData from '@/data/countries/netherlands.json'
import switzerlandData from '@/data/countries/switzerland.json'
import denmarkData from '@/data/countries/denmark.json'
import germanyData from '@/data/countries/germany.json'
import hungaryData from '@/data/countries/hungary.json'
import czechRepublicData from '@/data/countries/czech-republic.json'
import unitedKingdomData from '@/data/countries/united-kingdom.json'
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
  'vietnam': vietnamData,
  'belgium': belgiumData,
  'netherlands': netherlandsData,
  'switzerland': switzerlandData,
  'portugal': portugalData,
  'france': franceData,
  'denmark': denmarkData,
  'germany': germanyData,
  'hungary': hungaryData,
  'czech-republic': czechRepublicData,
  'united-kingdom': unitedKingdomData,
  // Add more country mappings as needed
}

const getCountryHeroImage = (country: string) =>
  (imageManifest as Record<string, { heroImage: string; tileImage: string }>)[country]?.heroImage || '/images/placeholder.svg'

const ASIA_COUNTRIES = new Set(['thailand', 'vietnam'])

export async function generateStaticParams() {
  return Object.keys(countryDataMap).map((country) => ({
    region: ASIA_COUNTRIES.has(country) ? 'asia' : 'europe',
    country,
  }))
}

// Only serve the region/country combos returned by generateStaticParams above —
// prevents request-time fs reads from arbitrary/unsanitized route segments.
export const dynamicParams = false

type ArticleCard = {
  title: string
  href: string
  description: string
  image: string
  date: string
  readTime: string
  author: string
}

function toCard(filePath: string, href: string): ArticleCard {
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  return {
    title: data.title,
    href,
    description: data.description || '',
    image: data.image,
    date: data.date,
    readTime: data.readTime,
    author: data.author,
  }
}

// Articles filed directly under src/content/articles/<country>/
function getCountryArticles(country: string): ArticleCard[] {
  const dir = path.join(process.cwd(), 'src/content/articles', country)

  try {
    return fs.readdirSync(dir)
      .filter(file => file.endsWith('.md'))
      .map(file => toCard(path.join(dir, file), `/blog/${country}/${file.replace('.md', '')}`))
  } catch (error) {
    // No dedicated folder yet — the country may be covered only by experiences.
    return []
  }
}

// Articles that live under src/content/articles/experiences/<type>/ but belong to
// a country. They stay where they are — the experiences hub groups them by activity
// — and declare their country via a `country:` frontmatter field, so they can be
// listed on the country page too without moving the file or changing its URL.
const EXPERIENCE_TYPES = ['cities', 'hiking', 'road-trips']

function getExperienceArticles(country: string): ArticleCard[] {
  const cards: ArticleCard[] = []

  for (const type of EXPERIENCE_TYPES) {
    const dir = path.join(process.cwd(), 'src/content/articles/experiences', type)
    let files: string[]
    try {
      files = fs.readdirSync(dir)
    } catch (error) {
      continue
    }

    for (const file of files) {
      if (!file.endsWith('.md')) continue
      const filePath = path.join(dir, file)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      if (data.country !== country) continue
      cards.push(toCard(filePath, `/blog/experiences/${type}/${file.replace('.md', '')}`))
    }
  }

  return cards
}

async function getArticles(country: string): Promise<ArticleCard[]> {
  return [...getCountryArticles(country), ...getExperienceArticles(country)]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function DestinationPage({ params }: { params: { region: string; country: string } }) {
  const countryData = countryDataMap[params.country]
  if (!countryData) {
    return <div>Country not found</div>
  }

  const country = countryData.name
  const region = params.region.charAt(0).toUpperCase() + params.region.slice(1)
  const articles = await getArticles(params.country)

  const heroImage = getCountryHeroImage(params.country)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative h-96 rounded-lg overflow-hidden mb-12">
        <Image
          src={heroImage}
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

            {/* Urvish's own pick for the country. Every country JSON carries one and
                until now only the map tooltip used it — it never appeared on the page. */}
            {countryData.bestExperience && (
              <blockquote className="not-prose border-l-4 border-accent bg-gray-800/40 rounded-r-lg px-5 py-4 my-6">
                <p className="text-lg leading-relaxed italic">{countryData.bestExperience}</p>
              </blockquote>
            )}

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
                <Link href={article.href} key={index} className="group">
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