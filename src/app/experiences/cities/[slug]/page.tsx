import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content/articles/experiences/cities');
  const files = fs.readdirSync(dir);
  return files.map((file) => ({ slug: file.replace(/\.md$/, '') }));
}

// Only serve the slugs returned by generateStaticParams above — prevents
// request-time fs reads from arbitrary/unsanitized slug segments.
export const dynamicParams = false

export default async function CityBreakPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/content/articles/experiences/cities', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      {data.image && (
        <div className="relative w-full h-80 mb-6">
          <Image src={data.image} alt={data.title} fill className="object-cover rounded-lg" />
        </div>
      )}
      <p className="text-lg text-gray-600 mb-8">{data.description}</p>
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            img: ({ node, ...props }) => {
              const src = (props.src as string) || ''
              const rawAlt = (props.alt as string) || ''
              const fallback = src.split('/').pop()?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || data.title
              const altText = rawAlt || fallback || data.title
              return <img src={src} alt={altText} loading="lazy" className="rounded-md" />
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
} 