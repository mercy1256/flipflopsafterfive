'use client'

import Image from 'next/image'

type Props = {
  slug: string
  name: string
  image: string
  snippet?: string
  expanded: boolean
  onToggle: () => void
}

export default function ExperienceTile({ name, image, snippet, expanded, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Hide' : 'Show'} best experience for ${name}`}
      className="group block w-full text-left rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-elevated transition-shadow"
    >
      <div className="relative h-44 bg-slate-100">
        <Image src={image} alt={name} fill className="object-cover img-tilt group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        {snippet && (
          <p
            className="text-sm text-gray-500 overflow-hidden transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: expanded ? '12rem' : '1.25rem' }}
          >
            {snippet}
          </p>
        )}
      </div>
    </button>
  )
}
