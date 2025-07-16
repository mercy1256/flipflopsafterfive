import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

interface ArticlePageProps {
  params: {
    country: string
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { country, slug } = params
  const filePath = path.join(process.cwd(), 'src/content/articles', country, `${slug}.md`)

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(fileContent)
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <div className="flex items-center space-x-4 text-text-light">
              <span>By {data.author}</span>
              <span>•</span>
              <span>{data.date}</span>
              <span>•</span>
              <span>{data.readTime}</span>
            </div>
          </header>
          <MDXRemote source={content} />
        </article>
      </div>
    )
  } catch (error) {
    notFound()
  }
} 