import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
    }
  }).filter(Boolean)
}

export default function BlogPage() {
  let articles = getAllArticles().filter((a) => a !== null)
  // Sort by date descending (latest first)
  articles = articles.sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Travel Blog</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover travel tips, guides, and unforgettable experiences from around the world.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link key={article.link} href={article.link} className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white">
            <div className="relative h-48 w-full">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <div className="text-xs text-gray-400">{article.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 