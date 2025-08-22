import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from 'next'

// Recursively get all markdown files in a directory
function getAllMarkdownFiles(dir: string): string[] {
  let results: string[] = []
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
  return results
}

// Get all articles with frontmatter
function getAllArticles() {
  const articlesDir = path.join(process.cwd(), 'src/content/articles')
  const files = getAllMarkdownFiles(articlesDir)
  return files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    // Build a link based on the file path after 'src/content/articles/'
    const splitPath = filePath.split('src/content/articles/')
    if (splitPath.length < 2) return null // skip if not found
    const relPath = splitPath[1].replace(/\\/g, '/').replace(/\.md$/, '')
    return {
      title: data.title || relPath,
      image: data.image || '',
      description: data.description || '',
      date: data.date || '',
      link: `/blog/${relPath}`,
      category: relPath.split('/')[0],
      tags: data.tags || [],
      readTime: data.readTime || '',
      author: data.author || 'Urvish Shah'
    }
  }).filter(Boolean)
}

// Generate metadata for the blog page
export async function generateMetadata(): Promise<Metadata> {
  const articles = getAllArticles()
  
  return {
    title: 'Travel Blog - Adventure Guides & Travel Tips',
    description: 'Explore our comprehensive collection of travel guides, adventure stories, and travel tips. Discover destinations in Europe, Asia, and beyond with detailed itineraries and insider knowledge.',
    keywords: [
      'travel blog',
      'travel guides',
      'adventure travel',
      'Europe travel guide',
      'travel tips',
      'travel itineraries',
      'budget travel',
      'solo travel',
      'weekend getaways',
      'travel photography'
    ],
    openGraph: {
      title: 'Travel Blog - Adventure Guides & Travel Tips',
      description: 'Explore our comprehensive collection of travel guides, adventure stories, and travel tips.',
      type: 'website',
      url: 'https://flipflopsafterfive.com/blog',
      images: [
        {
          url: '/images/home.jpg',
          width: 1200,
          height: 630,
          alt: 'Travel Blog - FlipFlopsAfterFive',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Travel Blog - Adventure Guides & Travel Tips',
      description: 'Explore our comprehensive collection of travel guides, adventure stories, and travel tips.',
      images: ['/images/home.jpg'],
    },
    alternates: {
      canonical: '/blog',
    },
  }
}

export default function BlogPage() {
  let articles = getAllArticles().filter((a) => a !== null)
  // Sort by date descending (latest first)
  articles = articles.sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <>
      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "FlipFlopsAfterFive Travel Blog",
            "description": "Travel blog featuring adventure guides, travel tips, and destination guides",
            "url": "https://flipflopsafterfive.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "FlipFlopsAfterFive"
            },
            "blogPost": articles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.description,
              "author": {
                "@type": "Person",
                "name": article.author
              },
              "datePublished": article.date,
              "url": `https://flipflopsafterfive.com${article.link}`,
              "image": article.image ? `https://flipflopsafterfive.com${article.image}` : undefined
            }))
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Travel Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover travel tips, guides, and unforgettable experiences from around the world.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {articles.length} articles to inspire your next adventure
          </p>
        </header>
        
        <section aria-label="All travel articles">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.link} className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <Link href={article.link} className="block">
                  <div className="relative h-48 w-full">
                    {article.image && (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {article.category?.charAt(0).toUpperCase() + article.category?.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    {article.description && (
                      <p className="text-gray-600 mb-3 line-clamp-3">{article.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{article.date}</span>
                      {article.readTime && <span>{article.readTime}</span>}
                    </div>
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
} 