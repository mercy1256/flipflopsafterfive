import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Generate metadata for individual blog posts
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const relPath = params.slug.join('/')
  const filePath = path.join(process.cwd(), 'src/content/articles', `${relPath}.md`)

  if (!fs.existsSync(filePath)) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)

  const fullTitle = data.title || relPath
  const description = data.description || `Read about ${fullTitle} on FlipFlopsAfterFive travel blog.`
  const imageUrl = data.image ? `https://flipflopsafterfive.com${data.image}` : 'https://flipflopsafterfive.com/images/home.jpg'
  const articleUrl = `https://flipflopsafterfive.com/blog/${relPath}`

  return {
    title: fullTitle,
    description,
    keywords: data.tags || [],
    authors: [{ name: data.author || 'Urvish Shah' }],
    openGraph: {
      title: fullTitle,
      description,
      type: 'article',
      url: articleUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      publishedTime: data.date,
      modifiedTime: data.date,
      authors: [data.author || 'Urvish Shah'],
      section: relPath.split('/')[0],
      tags: data.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/blog/${relPath}`,
    },
  }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), 'src/content/articles')
  const articles: { slug: string[] }[] = []

  function getAllMarkdownFiles(dir: string, basePath: string = '') {
    try {
      const list = fs.readdirSync(dir)
      list.forEach((file) => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat && stat.isDirectory()) {
          getAllMarkdownFiles(filePath, path.join(basePath, file))
        } else if (file.endsWith('.md')) {
          const relPath = path.join(basePath, file.replace(/\.md$/, '')).replace(/\\/g, '/')
          articles.push({ slug: relPath.split('/') })
        }
      })
    } catch (error) {
      console.error('Error reading directory:', dir, error)
    }
  }

  getAllMarkdownFiles(articlesDir)
  return articles
}

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  // Join the slug array to get the relative path to the markdown file
  const relPath = params.slug.join('/')
  const filePath = path.join(process.cwd(), 'src/content/articles', `${relPath}.md`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  const articleUrl = `https://flipflopsafterfive.com/blog/${relPath}`
  const imageUrl = data.image ? `https://flipflopsafterfive.com${data.image}` : 'https://flipflopsafterfive.com/images/home.jpg'

  return (
    <>
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": data.title,
            "description": data.description,
            "image": imageUrl,
            "author": {
              "@type": "Person",
              "name": data.author || "Urvish Shah"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FlipFlopsAfterFive",
              "logo": {
                "@type": "ImageObject",
                "url": "https://flipflopsafterfive.com/images/home.jpg"
              }
            },
            "datePublished": data.date,
            "dateModified": data.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": articleUrl
            },
            "url": articleUrl,
            "articleSection": relPath.split('/')[0],
            "keywords": data.tags || []
          })
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link href="/blog" className="text-text-light hover:text-text transition-colors">
            ← Back to Blog
          </Link>
        </nav>

        <article className="prose prose-invert max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <div className="flex items-center space-x-4 text-text-light mb-4">
              {data.author && <span>By {data.author}</span>}
              {data.author && <span>•</span>}
              {data.date && <time dateTime={data.date}>{data.date}</time>}
            </div>
            {data.description && (
              <p className="text-xl text-text-light leading-relaxed">{data.description}</p>
            )}
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {data.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 text-sm bg-primary text-text rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {data.image && (
            <div className="relative h-96 rounded-lg overflow-hidden mb-12">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="space-y-8">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="text-center text-text-light">
              <p>Written by {data.author || 'Urvish Shah'}</p>
              <p className="mt-2">
                <Link href="/blog" className="text-primary hover:underline">
                  Explore more travel stories →
                </Link>
              </p>
            </div>
          </footer>
        </article>
      </div>
    </>
  )
} 