'use client'

import { useState } from 'react'
import ExperienceTile from './ExperienceTile'

type Country = {
  slug: string
  name: string
  image: string
  snippet?: string
}

export default function ExperienceTileGrid({ countries }: { countries: Country[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {countries.map((c) => (
        <div key={c.slug} className="tile-float">
          <ExperienceTile
            slug={c.slug}
            name={c.name}
            image={c.image}
            snippet={c.snippet}
            expanded={expandedSlug === c.slug}
            onToggle={() => setExpandedSlug((prev) => (prev === c.slug ? null : c.slug))}
          />
        </div>
      ))}
    </div>
  )
}
