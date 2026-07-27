import ExperienceTileGrid from './ExperienceTileGrid'
import fs from 'fs'
import path from 'path'

type Country = {
  slug: string
  name: string
  image: string
  snippet?: string
}

export default function ExperienceMap() {
  const countriesDir = path.join(process.cwd(), 'src/data/countries')
  let files: string[] = []
  try {
    files = fs.readdirSync(countriesDir).filter((f) => f.endsWith('.json'))
  } catch (e) {
    files = []
  }

  const publicImagesDir = path.join(process.cwd(), 'public', 'images')

  const imageExists = (src: string) => fs.existsSync(path.join(publicImagesDir, ...src.replace(/^\/images\//, '').split('/')))

  const getCountryImage = (slug: string) => {
    const candidates = [
      { src: `/images/${slug}/main.jpg`, path: path.join(publicImagesDir, slug, 'main.jpg') },
      { src: `/images/${slug}/cover.jpg`, path: path.join(publicImagesDir, slug, 'cover.jpg') },
      { src: `/images/${slug}.jpg`, path: path.join(publicImagesDir, `${slug}.jpg`) },
    ]
    const found = candidates.find((candidate) => fs.existsSync(candidate.path))
    return found ? found.src : '/images/placeholder.svg'
  }

  const countries: Country[] = files.map((file) => {
    const slug = file.replace(/\.json$/, '')
    try {
      const raw = fs.readFileSync(path.join(countriesDir, file), 'utf8')
      const data = JSON.parse(raw)
      // Data-sourced image paths (articles/attractions) aren't guaranteed to exist on disk,
      // so verify before using them and fall back to the known-good country cover image.
      const articleImage = data.articles?.[0]?.image
      const attractionImage = data.attractions?.[0]?.image
      const image =
        (articleImage && imageExists(articleImage) && articleImage) ||
        (attractionImage && imageExists(attractionImage) && attractionImage) ||
        getCountryImage(slug)
      const snippet = data.bestExperience || data.about?.description || data.articles?.[0]?.description || data.attractions?.[0]?.description || ''
      return { slug, name: data.name || slug, image, snippet }
    } catch (err) {
      return { slug, name: slug, image: getCountryImage(slug), snippet: '' }
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
