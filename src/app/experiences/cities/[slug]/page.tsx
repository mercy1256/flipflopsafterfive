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
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
} 