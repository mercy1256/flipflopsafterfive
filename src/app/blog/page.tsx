import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

const playlists = [
  {
    title: 'Weekend in Europe',
    subtitle: 'Short escapes for busy travelers',
    description: 'Two-to-four-day journeys through iconic cities and scenic countryside routes.',
    image: '/images/austria/articles/hallstatt.jpg',
    tag: 'Quick Trips',
    href: '/blog/collections/weekend-in-europe'
  },
  {
    title: 'City Essentials',
    subtitle: 'Culture, food, and urban vibes',
    description: 'Curated city playlists that pair local eats, landmarks, and unforgettable neighborhoods.',
    image: '/images/experiences/cities/prague-city-break.jpg',
    tag: 'City Guide',
    href: '/blog/collections/city-essentials'
  },
  {
    title: 'Mountain & Lake Escapes',
    subtitle: 'Fresh air and scenic views',
    description: 'Routes built for alpine hikes, lakeside stays, and nature breaks off the beaten path.',
    image: '/images/austria/articles/achensee.jpg',
    tag: 'Nature',
    href: '/blog/collections/mountain-lake-escapes'
  },
  {
    title: 'Coastal Highlights',
    subtitle: 'Beach days, cliffs, and seaside towns',
    description: 'A seaside collection of coastal drives, charming ports, and ocean-view adventures.',
    image: '/images/croatia/articles/dubrovnik.jpg',
    tag: 'Coastal',
    href: '/blog/collections/coastal-highlights'
  },
  {
    title: 'Food & Culture Trails',
    subtitle: 'Tastes, markets, and local rituals',
    description: 'Travel playlists focused on authentic dining, hidden cafes, and cultural experiences.',
    image: '/images/experiences/road-trips/strasbourg-christmas-market.jpg',
    tag: 'Foodie',
    href: '/blog/collections/food-culture-trails'
  },
  {
    title: 'Solo Traveler Guides',
    subtitle: 'Safe, smart, inspiring solo plans',
    description: 'Essential solo travel playlists shaped for confidence, ease, and memorable moments.',
    image: '/images/vietnam/articles/solotrip-itinerary-14-days-in-vietnam.jpg',
    tag: 'Solo',
    href: '/blog/collections/solo-traveler-guides'
  }
]

export const metadata: Metadata = {
  title: 'Adventure Library | FlipFlopsAfterFive',
  description: 'A curated adventure library of trip playlists, themed routes, and travel collections.',
  openGraph: {
    title: 'Adventure Library | FlipFlopsAfterFive',
    description: 'A curated adventure library of trip playlists, themed routes, and travel collections.',
    type: 'website',
    url: 'https://flipflopsafterfive.com/blog',
    images: [
      {
        url: '/images/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Adventure Library - FlipFlopsAfterFive'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adventure Library | FlipFlopsAfterFive',
    description: 'A curated adventure library of trip playlists, themed routes, and travel collections.',
    images: ['/images/home.jpg']
  },
  alternates: {
    canonical: '/blog'
  }
}

export default function BlogPage() {
  return (
    <div>
      <section className="bg-gradient-ocean text-white py-20">
        <div className="container-max text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-100 opacity-80 mb-4">Adventure Library</p>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Trip playlists for your next escape</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Swap long articles for curated travel playlists that help you plan by mood, pace, and destination type.
          </p>
          <p className="text-blue-100 opacity-80 max-w-2xl mx-auto">
            Designed for travelers who want fast inspiration, clear routes, and real-world trip ideas.
          </p>
        </div>
      </section>

      <main className="container-max py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {playlists.map((playlist) => (
            <article key={playlist.title} className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <Image
                  src={playlist.image}
                  alt={playlist.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4">
                  {playlist.tag}
                </span>
                <h2 className="text-2xl font-bold mb-3 text-text">{playlist.title}</h2>
                <p className="text-text-muted mb-5 leading-relaxed">{playlist.description}</p>
                <p className="text-sm text-text-light">{playlist.subtitle}</p>
                <Link href={playlist.href} className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark">
                  Open collection
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-gray-200 bg-secondary p-8">
            <h2 className="text-3xl font-bold mb-4">Why this is different</h2>
            <p className="text-text-muted leading-relaxed">
              Instead of a long blog archive, this library gives you compact travel playlists with clear themes, so you can jump straight into planning.
            </p>
          </div>
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8">
            <h3 className="font-semibold text-xl mb-3">Fast inspiration</h3>
            <p className="text-text-light text-sm leading-relaxed">
              Each playlist is built around a travel goal, whether it’s a city break, beach escape, or cultural route.
            </p>
          </div>
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8">
            <h3 className="font-semibold text-xl mb-3">Real route ideas</h3>
            <p className="text-text-light text-sm leading-relaxed">
              These aren’t just stories—they’re starting points for trips you can actually book and follow.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
 