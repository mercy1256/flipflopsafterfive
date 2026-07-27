import fs from 'fs'
import path from 'path'
import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content/experiences')
  const files = fs.readdirSync(dir)
  return files.filter((file) => file.endsWith('.md')).map((file) => ({ country: file.replace(/\.md$/, '') }))
}

// Only serve the countries returned by generateStaticParams above — prevents
// request-time fs reads from arbitrary/unsanitized country segments.
export const dynamicParams = false

export async function generateMetadata({ params }: { params: { country: string } }) {
  const mdPath = path.join(process.cwd(), 'src/content/experiences', `${params.country}.md`)
  if (!fs.existsSync(mdPath)) return { title: 'Experience' }
  const raw = fs.readFileSync(mdPath, 'utf8')
  const { data } = matter(raw)
  return { title: data.title || params.country, description: data.description || '' }
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const mdPath = path.join(process.cwd(), 'src/content/experiences', `${params.country}.md`)
  if (!fs.existsSync(mdPath)) {
    notFound()
  }
  const raw = fs.readFileSync(mdPath, 'utf8')
  const { data, content } = matter(raw)

  return (
    <div className="container-max py-20">
      <nav className="mb-8">
        <Link href="/experiences" className="text-text-muted hover:underline">← Back to Experiences</Link>
      </nav>

      <article className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-card">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        {data.image && (
          <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
            <Image src={data.image} alt={data.title} fill className="object-cover" />
          </div>
        )}
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
