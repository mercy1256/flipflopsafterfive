import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://flipflopsafterfive.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic article pages
  const articlesDir = path.join(process.cwd(), 'src/content/articles')
  let articlePages: MetadataRoute.Sitemap = []
  
  try {
    if (fs.existsSync(articlesDir)) {
      const files = getAllMarkdownFiles(articlesDir)
      
      articlePages = files.map((filePath) => {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data } = matter(fileContent)
          
          const relPath = path.relative(articlesDir, filePath).replace(/\\/g, '/').replace(/\.md$/, '')
          const url = `${baseUrl}/blog/${relPath}`
          
          return {
            url,
            lastModified: data.date ? new Date(data.date) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          }
        } catch (error) {
          console.error('Error processing file for sitemap:', filePath, error)
          return null
        }
      }).filter(Boolean) as MetadataRoute.Sitemap
    }
  } catch (error) {
    console.error('Error generating article sitemap:', error)
  }

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
          url: `${baseUrl}/places/${region}/${country}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }
      })
  } catch (error) {
    console.error('Error generating country sitemap:', error)
  }

  // Blog collection ("playlist") pages linked from /blog
  const collectionPages = [
    'weekend-in-europe',
    'city-essentials',
    'mountain-lake-escapes',
    'coastal-highlights',
    'food-culture-trails',
    'solo-traveler-guides',
  ].map((collection) => ({
    url: `${baseUrl}/blog/collections/${collection}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...countryPages, ...collectionPages]
}
