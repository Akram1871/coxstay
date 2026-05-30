import prisma from '@/lib/db'
import Link from 'next/link'
import { HeroSearch } from '@/components/home/HeroSearch'
import { HotelCard } from '@/components/common/HotelCard'
import { MapPin, Waves, Users, Hotel } from 'lucide-react'

async function getFeaturedHotels() {
  const hotels = await prisma.hotel.findMany({
    where: { status: 'active' },
    include: {
      area: true,
      rooms: true,
    },
    take: 6,
    orderBy: { guestRating: 'desc' },
  })
  return hotels
}

async function getAreas() {
  const areas = await prisma.area.findMany({
    take: 9,
  })
  return areas
}

async function getAttractions() {
  const attractions = await prisma.attraction.findMany({
    take: 8,
  })
  return attractions
}

export default async function Home() {
  const [featuredHotels, areas, attractions] = await Promise.all([
    getFeaturedHotels(),
    getAreas(),
    getAttractions(),
  ])

  return (
    <div>
      {/* Hero Search */}
      <HeroSearch />

      {/* Featured Hotels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Hotels</h2>
            <p className="text-gray-600">Top-rated hotels in Cox's Bazar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                area={hotel.area.name}
                nearestBeach={hotel.nearestBeach}
                distanceToBeach={hotel.distanceToBeach}
                starRating={hotel.starRating}
                guestRating={hotel.guestRating || undefined}
                images={hotel.images}
                pricePerNight={Math.min(...hotel.rooms.map((r) => r.pricePerNight))}
                discountPrice={
                  hotel.rooms.some((r) => r.discountPrice)
                    ? Math.min(...hotel.rooms.filter((r) => r.discountPrice).map((r) => r.discountPrice!))
                    : undefined
                }
                isBeachfront={hotel.isBeachfront}
                hasSeaView={hotel.hasSeaView}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/hotels"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              View All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-16 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Areas</h2>
            <p className="text-gray-600">Popular destinations in Cox's Bazar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <Link key={area.id} href={`/areas/${area.slug}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer h-full">
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={area.imageUrl || '/placeholder.jpg'}
                      alt={area.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{area.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{area.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book with CoxStay */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book with CoxStay?</h2>
            <p className="text-gray-600">The best travel experience starts here</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">Get the lowest rates guaranteed</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-accent-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our team is always here to help</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Beach Focused</h3>
              <p className="text-gray-600">All hotels are in Cox's Bazar</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book in seconds, no hassle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="py-16 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Attractions</h2>
            <p className="text-gray-600">Things to do in Cox's Bazar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={attraction.imageUrl || '/placeholder.jpg'}
                    alt={attraction.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{attraction.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{attraction.category}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8">Get travel tips, exclusive offers, and hotel deals</p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Guest Testimonials</h2>
            <p className="text-gray-600">What our guests say about their experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmed Khan',
                text: 'CoxStay made booking my vacation so easy. Great hotels and affordable prices!',
                rating: 5,
              },
              {
                name: 'Fatima Begum',
                text: 'The sea view hotels are absolutely amazing. Worth every taka!',
                rating: 5,
              },
              {
                name: 'John Smith',
                text: 'Best hotel booking experience in Cox\'s Bazar. Highly recommended!',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
