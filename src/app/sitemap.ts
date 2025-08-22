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
          
          const splitPath = filePath.split('src/content/articles/')
          if (splitPath.length < 2) return null
          
          const relPath = splitPath[1].replace(/\\/g, '/').replace(/\.md$/, '')
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

  // Country/region pages
  const countryPages = [
    'iceland', 'italy', 'france', 'spain', 'portugal', 'greece', 'croatia', 
    'austria', 'slovenia', 'norway', 'finland', 'thailand', 'albania'
  ].map(country => ({
    url: `${baseUrl}/places/europe/${country}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...articlePages, ...countryPages]
}
