import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const collections = {
  'weekend-in-europe': {
    title: 'Weekend in Europe',
    description: 'Easy Europe getaways that pair city highlights with nearby countryside escapes.',
    copy: 'A playlist built around quick weekend routes and fast European escapes. Each card links to a travel article or future collection note for planning your next short trip.',
    cards: [
      {
        title: '2 Days in Paris',
        description: 'Classic Paris weekend with museums, the Seine, and Versailles.',
        href: '/blog/france/2-days-in-paris',
        image: '/images/france/articles/2-days-in-paris.jpg'
      },
      {
        title: 'Mont St. Michel + Etretat',
        description: 'Normandy coastal weekend with dramatic cliffs and medieval charm.',
        href: '/blog/france/mont-st-michel-and-etretat-trip',
        image: '/images/france/articles/mont-st-michel-etretat-trip.jpg'
      }
    ]
  },
  'city-essentials': {
    title: 'City Essentials',
    description: 'Urban playlists for the best city breaks in Europe and beyond.',
    copy: 'Discover short city-based routes that combine iconic attractions, local food, and culture.',
    cards: [
      {
        title: '2 Days in Paris',
        description: 'Paris highlights for a compact city visit.',
        href: '/blog/france/2-days-in-paris',
        image: '/images/france/articles/2-days-in-paris.jpg'
      },
      {
        title: '2 Days in Belgium',
        description: 'Ghent, Bruges, Antwerp, and Brussels in a relaxed city loop.',
        href: '/blog/belgium/2-days-in-belgium',
        image: '/images/belgium/articles/2-days-in-belgium.jpg'
      }
    ]
  },
  'mountain-lake-escapes': {
    title: 'Mountain & Lake Escapes',
    description: 'Alpine and lakeside travel playlists built for fresh air and dramatic views.',
    copy: 'Plan your next nature escape with mountain villages, high lakes, and scenic Swiss trails.',
    cards: [
      {
        title: '3 Days in Switzerland',
        description: 'Lauterbrunnen, Interlaken, Grindelwald, and lake hikes.',
        href: '/blog/switzerland/3-days-in-switzerland',
        image: '/images/switzerland/articles/3-days-in-switzerland.jpg'
      }
    ]
  },
  'coastal-highlights': {
    title: 'Coastal Highlights',
    description: 'Seaside playlists for ocean views, cliffs, and charming ports.',
    copy: 'A coastal collection with story-driven routes and seaside stops for your next shoreline escape.',
    cards: [
      {
        title: 'Mont St. Michel + Etretat',
        description: 'Normandy’s dramatic coast and historic island destination.',
        href: '/blog/france/mont-st-michel-and-etretat-trip',
        image: '/images/france/articles/mont-st-michel-etretat-trip.jpg'
      }
    ]
  },
  'food-culture-trails': {
    title: 'Food & Culture Trails',
    description: 'Travel playlists that highlight local cuisine, markets, and cultural neighborhoods.',
    copy: 'Explore culinary city breaks and cultural routes that pair food with unforgettable local experiences.',
    cards: [
      {
        title: '2 Days in Belgium',
        description: 'Belgian classics, chocolate, beer, and medieval city charm.',
        href: '/blog/belgium/2-days-in-belgium',
        image: '/images/belgium/articles/2-days-in-belgium.jpg'
      },
      {
        title: '3 Days in Netherlands',
        description: 'Amsterdam art, tulip gardens, and storybook canals.',
        href: '/blog/netherlands/3-days-in-netherlands',
        image: '/images/netherlands/articles/3-days-in-netherlands.jpg'
      }
    ]
  },
  'solo-traveler-guides': {
    title: 'Solo Traveler Guides',
    description: 'Playlists made for independent travelers who want safe, flexible routes.',
    copy: 'Building solo-friendly trips with easy logistics, memorable stops, and authentic local flavor.',
    cards: [
      {
        title: '14 Days in Vietnam',
        description: 'A complete solo loop from Ho Chi Minh City to Ha Long Bay and the northern highlands.',
        href: '/blog/vietnam/solotrip-itinerary-14-days-in-vietnam',
        image: '/images/vietnam/articles/solotrip-itinerary-14-days-in-vietnam.jpg'
      }
    ]
  }
}

export async function generateMetadata({ params }: { params: { collection: string } }): Promise<Metadata> {
  const collection = collections[params.collection as keyof typeof collections]
  return {
    title: `${collection?.title || 'Adventure Collection'} | FlipFlopsAfterFive`,
    description: collection?.description || 'A future playlist collection for travel inspiration.',
    alternates: {
      canonical: `/blog/collections/${params.collection}`
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(collections).map((collection) => ({ collection }))
}

// Anything not in `collections` is a real 404, not a page. Previously an unknown
// slug rendered a styled "Collection not found" body with a 200 status — a soft 404,
// which search engines index as a thin page.
export const dynamicParams = false

export default function CollectionPage({ params }: { params: { collection: string } }) {
  const collection = collections[params.collection as keyof typeof collections]

  if (!collection) {
    notFound()
  }

  return (
    <div className="container-max py-20">
      <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-card mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-accent mb-4">Adventure collection</p>
        <h1 className="text-5xl font-bold mb-6">{collection.title}</h1>
        <p className="text-xl text-text-muted max-w-3xl leading-relaxed mb-8">{collection.description}</p>
        <p className="text-text-light leading-relaxed max-w-3xl">{collection.copy}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {collection.cards.map((card) => (
          <Link key={card.href} href={card.href} className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-text">{card.title}</h2>
              <p className="text-text-muted mb-5 leading-relaxed">{card.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Read article →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/blog" className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark">
          Back to Adventure Library
        </Link>
      </div>
    </div>
  )
}
