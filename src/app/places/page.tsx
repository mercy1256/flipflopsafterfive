import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PlacesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Destinations</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Looking for your next adventure? Whether you're craving serene landscapes, bustling cities, or hidden gems, we've got you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Europe Section */}
        <div className="col-span-full">
          <h2 className="text-2xl font-bold mb-6">Europe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/places/europe/iceland" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/iceland.jpg"
                  alt="Iceland"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Iceland</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/finland" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/finland.jpg"
                  alt="Finland"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Finland</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/italy" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/italy.jpg"
                  alt="Italy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Italy</h3>
                    <p className="text-white/80">Explore the romantic cities and delicious cuisine</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/spain" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/spain.jpg"
                  alt="Spain"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Spain</h3>
                    <p className="text-white/80">Vibrant culture and stunning beaches</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/portugal" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/portugal.jpg"
                  alt="Portugal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Portugal</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/norway" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/norway.jpg"
                  alt="Norway"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Norway</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/greece" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/greece.jpg"
                  alt="Greece"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Greece</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/albania" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/albania.jpg"
                  alt="Albania"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Albania</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/croatia" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/croatia.jpg"
                  alt="Croatia"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Croatia</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/austria" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/austria.jpg"
                  alt="Austria"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Austria</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/denmark" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/denmark/main.jpg"
                  alt="Denmark"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Denmark</h3>
                    <p className="text-white/80">Copenhagen by bike, boat and bridge</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/germany" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/experiences/hiking/konigsee-hiking.jpg"
                  alt="Germany"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Germany</h3>
                    <p className="text-white/80">Alpine hikes, gorges and Christmas markets</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/czech-republic" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/experiences/cities/astronomical-clock.jpg"
                  alt="Czech Republic"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Czech Republic</h3>
                    <p className="text-white/80">Prague on foot, in a single day</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/hungary" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/experiences/cities/hungarian-parliament-building.jpg"
                  alt="Hungary"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Hungary</h3>
                    <p className="text-white/80">Budapest, the Danube and the baths</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/united-kingdom" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/experiences/cities/big-ben.jpg"
                  alt="United Kingdom"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">United Kingdom</h3>
                    <p className="text-white/80">Four days across London</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/slovenia" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/slovenia.jpg"
                  alt="Slovenia"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Slovenia</h3>
                    <p className="text-white/80">Art, history, and culinary delights</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/france" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/france.jpg"
                  alt="France"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">France</h3>
                    <p className="text-white/80">Charming villages, lavender fields, and Mediterranean coast</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/belgium" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/belgium.jpg"
                  alt="Belgium"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Belgium</h3>
                    <p className="text-white/80">Medieval cities, chocolate, and historic squares</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/netherlands" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/netherlands.jpg"
                  alt="Netherlands"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Netherlands</h3>
                    <p className="text-white/80">Canals, tulips, and classic Dutch scenery</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/europe/switzerland" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/switzerland.jpg"
                  alt="Switzerland"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Switzerland</h3>
                    <p className="text-white/80">Alpine lakes, mountain hikes, and charming villages</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Asia Section */}
        <div className="col-span-full">
          <h2 className="text-2xl font-bold mb-6">Asia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/places/asia/thailand" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/thailand.jpg"
                  alt="Thailand"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Thailand</h3>
                    <p className="text-white/80">Tropical paradise and rich culture</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/places/asia/vietnam" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/vietnam.jpg"
                  alt="Vietnam"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Vietnam</h3>
                    <p className="text-white/80">Vibrant cities, dramatic coastlines, and mountain roads</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-block bg-secondary text-primary px-6 py-3 rounded-md hover:bg-accent transition-colors"
          >
            Plan Your Next Adventure
          </Link>
        </div>
      </div>
    </div>
  )
} 