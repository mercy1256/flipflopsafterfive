import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium">
            About The Author
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Hey, I'm Urvish! 👋
          </h1>
          <p className="text-lg text-text-muted mb-6 leading-relaxed">
            I'm your average 9-to-5 professional with an extraordinary passion for travel. Every year, I embark on 3-4 major adventures and countless short trips across Europe, Asia, and beyond.
          </p>
          <p className="text-lg text-text-muted mb-6 leading-relaxed">
            I created Flip Flops After Five to share my travel expertise, prove that you don't need to quit your job to travel, and help working professionals like you make the most of your vacations.
          </p>
          <p className="text-lg text-text-muted mb-6 leading-relaxed">
            This blog is built for people who want practical itineraries, honest planning advice, and inspiring destination ideas—without the overwhelm. Whether you're planning a weekend escape or a longer overseas adventure, I want to help you travel smarter and more confidently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/places"
              className="inline-block px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-accent transition-all font-medium"
            >
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-all font-medium"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="relative h-96 rounded-3xl overflow-hidden shadow-elevated">
          <Image
            src="/images/profile.jpg"
            alt="Urvish Shah - Travel Blogger"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
