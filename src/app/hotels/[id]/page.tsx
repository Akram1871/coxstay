import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, MapPin, Waves, Heart, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { StatusBadge } from '@/components/common/Utils'

async function getHotel(id: string) {
  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: {
      area: true,
      rooms: {
        orderBy: { pricePerNight: 'asc' },
      },
      reviews: {
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  return hotel
}

export default async function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = await getHotel(params.id)

  if (!hotel) {
    notFound()
  }

  const images = JSON.parse(hotel.images)
  const amenities = JSON.parse(hotel.amenities)

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={images[0] || '/placeholder.jpg'}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1, 5).map((img, i) => (
                <div key={i} className="h-44 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={img} alt={`${hotel.name} ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <p className="text-gray-600 mb-2 flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>{hotel.area.name}</span>
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart size={24} className="text-red-500 fill-red-500" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(Math.floor(hotel.starRating))].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {hotel.guestRating && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold">
                    {hotel.guestRating.toFixed(1)} ({hotel.reviewCount} reviews)
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {hotel.isBeachfront && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded font-medium">
                    🏖️ Beachfront
                  </span>
                )}
                {hotel.hasSeaView && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-medium flex items-center space-x-1">
                    <Waves size={16} />
                    <span>Sea View</span>
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity: string, i: number) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="text-primary-600">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Room Info */}
                      <div>
                        <h3 className="font-bold text-lg mb-2">{room.name}</h3>
                        <p className="text-gray-600 text-sm">{room.bedType}</p>
                        <p className="text-gray-600 text-sm">{room.roomSize}m²</p>
                        <p className="text-gray-600 text-sm">Up to {room.maxGuests} guests</p>
                        {room.hasSeaView && (
                          <span className="text-blue-600 text-sm font-medium">🌊 Sea View</span>
                        )}
                      </div>

                      {/* Features */}
                      <div>
                        <p className="text-gray-600 text-sm mb-2">
                          {room.breakfastIncluded && <span className="text-green-600 font-medium">✓ Breakfast</span>}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Cancellation: {room.cancellationPolicy}
                        </p>
                      </div>

                      {/* Price */}
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(room.discountPrice || room.pricePerNight)}
                        </div>
                        {room.discountPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(room.pricePerNight)}
                          </div>
                        )}
                        <p className="text-gray-600 text-sm">per night</p>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center">
                        <Link
                          href={`/booking/${hotel.id}?room=${room.id}`}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-center"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
              <div className="space-y-4">
                {hotel.reviews.length > 0 ? (
                  hotel.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold">{review.user.name}</p>
                          <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-20">
              <h3 className="text-xl font-bold mb-4">Book Now</h3>

              <div className="space-y-4 mb-6">
                <div className="text-center p-3 bg-sand-50 rounded">
                  <p className="text-gray-600 text-sm">From</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(Math.min(...hotel.rooms.map((r) => r.pricePerNight)))}
                  </p>
                  <p className="text-gray-600 text-sm">per night</p>
                </div>
              </div>

              <Link
                href={`/booking/${hotel.id}`}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg text-center block transition"
              >
                Select a Room
              </Link>

              <div className="mt-6 p-4 bg-blue-50 rounded text-sm">
                <p className="font-medium mb-2">Hotel Info</p>
                <p className="text-gray-700 mb-2">
                  <strong>Area:</strong> {hotel.area.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Distance to Beach:</strong> {hotel.distanceToBeach === 0 ? 'On the beach' : `${hotel.distanceToBeach}km`}
                </p>
                <p className="text-gray-700">
                  <strong>Nearest Beach:</strong> {hotel.nearestBeach}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
