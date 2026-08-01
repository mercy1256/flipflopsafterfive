'use client'

import Image from 'next/image'
import Link from 'next/link'

type Props = {
  slug: string
  name: string
  image: string
  href: string
  snippet?: string
  expanded: boolean
  onToggle: () => void
}

export default function ExperienceTile({ name, image, href, snippet, expanded, onToggle }: Props) {
  return (
    // A <div> wrapper, not a <button>, so the country link below can be a real anchor —
    // an <a> nested inside a <button> is invalid HTML and unreachable by keyboard.
    <div className="group rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-elevated transition-shadow">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Hide' : 'Show'} best experience for ${name}`}
        className="block w-full text-left"
      >
        <div className="relative h-44 bg-slate-100">
          <Image src={image} alt={name} fill className="object-cover img-tilt group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="px-4 pt-4">
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
      <div className="px-4 pb-4 pt-2">
        {expanded && (
          <Link href={href} className="text-sm font-semibold text-accent hover:underline">
            Explore {name} →
          </Link>
        )}
      </div>
    </div>
  )
}
