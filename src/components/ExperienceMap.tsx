import ExperienceTileGrid from './ExperienceTileGrid'
import fs from 'fs'
import path from 'path'
import imageManifest from '@/data/imageManifest.json'

type Country = {
  slug: string
  name: string
  image: string
  href: string
  snippet?: string
}

// Keep in step with ASIA_COUNTRIES in app/places/[region]/[country]/page.tsx.
const ASIA_COUNTRIES = new Set(['thailand', 'vietnam'])
const countryHref = (slug: string) =>
  `/places/${ASIA_COUNTRIES.has(slug) ? 'asia' : 'europe'}/${slug}`

export default function ExperienceMap() {
  const countriesDir = path.join(process.cwd(), 'src/data/countries')
  let files: string[] = []
  try {
    files = fs.readdirSync(countriesDir).filter((f) => f.endsWith('.json'))
  } catch (e) {
    files = []
  }

  const countries: Country[] = files.map((file) => {
    const slug = file.replace(/\.json$/, '')
    try {
      const raw = fs.readFileSync(path.join(countriesDir, file), 'utf8')
      const data = JSON.parse(raw)
      const image = (imageManifest as Record<string, { heroImage: string; tileImage: string }>)[slug]?.tileImage || '/images/placeholder.svg'
      const snippet = data.bestExperience || data.about?.description || data.articles?.[0]?.description || data.attractions?.[0]?.description || ''
      return { slug, name: data.name || slug, image, href: countryHref(slug), snippet }
    } catch (err) {
      return { slug, name: slug, image: '/images/placeholder.svg', href: countryHref(slug), snippet: '' }
    }
  })

  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-4xl font-display font-bold mb-2">Visited Map</h2>
        <p className="text-text-muted">The single best moment from each trip.</p>
      </div>

      <ExperienceTileGrid countries={countries} />
    </section>
  )
}
