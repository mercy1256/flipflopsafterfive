import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  // Join the slug array to get the relative path to the markdown file
  const relPath = params.slug.join('/')
  const filePath = path.join(process.cwd(), 'src/content/articles', `${relPath}.md`)

  if (!fs.existsSync(filePath)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    )
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-text-light hover:text-text transition-colors">
          ← Back to Blog
        </Link>
      </div>

      <article className="prose prose-invert max-w-none">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <div className="flex items-center space-x-4 text-text-light">
            {data.author && <span>By {data.author}</span>}
            {data.author && <span>•</span>}
            {data.date && <span>{data.date}</span>}
          </div>
        </header>

        {data.image && (
          <div className="relative h-96 rounded-lg overflow-hidden mb-12">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-8">
          {/* You can use a markdown renderer here if you want to render the content as HTML */}
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      </article>
    </div>
  )
} 