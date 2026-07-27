// Precomputes which images exist on disk for each country, at build time.
//
// Why this exists: components used to call fs.existsSync() at request time with
// dynamically-built paths (e.g. `/images/${country}/main.jpg`) to pick a cover image.
// Next's build tracer can't resolve a dynamic fs path, so it conservatively bundles
// the ENTIRE public/images directory (hundreds of MB) into the server function —
// which is what broke the Netlify deploy ("request body too large" uploading the
// serverless function). Resolving everything here, once, at build time, and writing
// a plain JSON file means the app code never touches fs for this at runtime.
const fs = require('fs')
const path = require('path')

const countriesDir = path.join(process.cwd(), 'src/data/countries')
const publicImagesDir = path.join(process.cwd(), 'public/images')
const outFile = path.join(process.cwd(), 'src/data/imageManifest.json')

function exists(relativeSrc) {
  const cleaned = relativeSrc.replace(/^\/images\//, '')
  return fs.existsSync(path.join(publicImagesDir, ...cleaned.split('/')))
}

function resolveHeroImage(slug) {
  const candidates = [`/images/${slug}/main.jpg`, `/images/${slug}/cover.jpg`, `/images/${slug}.jpg`]
  return candidates.find(exists) || '/images/placeholder.svg'
}

const files = fs.existsSync(countriesDir) ? fs.readdirSync(countriesDir).filter((f) => f.endsWith('.json')) : []

const manifest = {}
for (const file of files) {
  const slug = file.replace(/\.json$/, '')
  const raw = fs.readFileSync(path.join(countriesDir, file), 'utf8')
  const data = JSON.parse(raw)

  const heroImage = resolveHeroImage(slug)
  const articleImage = data.articles?.[0]?.image
  const attractionImage = data.attractions?.[0]?.image
  const tileImage =
    (articleImage && exists(articleImage) && articleImage) ||
    (attractionImage && exists(attractionImage) && attractionImage) ||
    heroImage

  manifest[slug] = { heroImage, tileImage }
}

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Wrote image manifest for ${Object.keys(manifest).length} countries to ${path.relative(process.cwd(), outFile)}`)
