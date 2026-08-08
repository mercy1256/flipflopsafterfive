import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BASE_URL = 'https://flipflopsafterfive.com'

// Bump by hand when the copy on /about or /contact actually changes. These pages have no
// underlying content file to date them from, and a hardcoded date is more honest than a
// build timestamp — see the note on lastModified below.
const STATIC_PAGE_LAST_MODIFIED = new Date('2026-08-08')

// Every `lastmod` in this file is derived from content, never from `new Date()`.
// Stamping the build time meant each deploy told Google that all 34 non-article URLs had
// just changed; once lastmod is provably wrong it stops being trusted and stops helping
// the pages that genuinely did change get recrawled.

// Recursively get all markdown files in a directory
function getAllMarkdownFiles(dir: string): string[] {
  let results: string[] = []
  try {
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllMarkdownFiles(filePath))
      } else if (file.endsWith('.md')) {
        results.push(filePath)
      }
    })
  } catch (error) {
    console.error('Error reading directory:', dir, error)
  }
  return results
}

function parseDate(value: unknown): Date | null {
  if (!value) return null
  const parsed = new Date(value as string)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function newest(dates: Date[], fallback: Date): Date {
  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : fallback
}

type Article = {
  url: string
  lastModified: Date
  /**
   * The country a post belongs to. For posts filed under src/content/articles/<country>/
   * this is the folder name; posts under experiences/<type>/ declare it in frontmatter
   * instead, because they are grouped by activity rather than by place.
   */
  country: string | null
}

function collectArticles(articlesDir: string): Article[] {
  if (!fs.existsSync(articlesDir)) return []

  return getAllMarkdownFiles(articlesDir)
    .map((filePath): Article | null => {
      try {
        const { data } = matter(fs.readFileSync(filePath, 'utf8'))
        const relPath = path
          .relative(articlesDir, filePath)
          .replace(/\\/g, '/')
          .replace(/\.md$/, '')
        const topSegment = relPath.split('/')[0]

        return {
          url: `${BASE_URL}/blog/${relPath}`,
          lastModified: parseDate(data.date) ?? STATIC_PAGE_LAST_MODIFIED,
          country: topSegment === 'experiences' ? (data.country ?? null) : topSegment,
        }
      } catch (error) {
        console.error('Error processing file for sitemap:', filePath, error)
        return null
      }
    })
    .filter((article): article is Article => article !== null)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articlesDir = path.join(process.cwd(), 'src/content/articles')
  const articles = collectArticles(articlesDir)

  // Hub pages change when the posts they list change, so date them from their newest post.
  const newestOverall = newest(
    articles.map((a) => a.lastModified),
    STATIC_PAGE_LAST_MODIFIED
  )

  const newestByCountry = new Map<string, Date>()
  for (const article of articles) {
    if (!article.country) continue
    const current = newestByCountry.get(article.country)
    if (!current || article.lastModified > current) {
      newestByCountry.set(article.country, article.lastModified)
    }
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: newestOverall, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: newestOverall, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/places`, lastModified: newestOverall, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/experiences`, lastModified: newestOverall, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: STATIC_PAGE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: STATIC_PAGE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: article.url,
    lastModified: article.lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Country/region pages.
  // Derived from src/data/countries/*.json rather than hand-listed, because the
  // hand-listed version drifted: it had missed belgium/netherlands/switzerland/vietnam
  // and filed thailand under /europe/, a URL that 404s. This must stay in step with
  // the countryDataMap and ASIA_COUNTRIES in places/[region]/[country]/page.tsx.
  const ASIA_COUNTRIES = new Set(['thailand', 'vietnam'])
  let countryPages: MetadataRoute.Sitemap = []

  try {
    countryPages = fs
      .readdirSync(path.join(process.cwd(), 'src/data/countries'))
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const country = file.replace(/\.json$/, '')
        const region = ASIA_COUNTRIES.has(country) ? 'asia' : 'europe'
        return {
          url: `${BASE_URL}/places/${region}/${country}`,
          lastModified: newestByCountry.get(country) ?? STATIC_PAGE_LAST_MODIFIED,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }
      })
  } catch (error) {
    console.error('Error generating country sitemap:', error)
  }

  // /blog/collections/* is deliberately absent. Those pages render ~60 words and link to
  // articles that are already in this sitemap, and they now send noindex (see the note in
  // blog/collections/[collection]/page.tsx). Restore them here — and drop the `robots`
  // block there — once they carry enough of their own copy to stand as pages.
  return [...staticPages, ...articlePages, ...countryPages]
}
