import prisma from '@/lib/db'
import Link from 'next/link'
import { HotelCard } from '@/components/common/HotelCard'
import { Filter } from 'lucide-react'

async function getHotels(searchParams: any) {
  const {
    area,
    minPrice,
    maxPrice,
    starRating,
    beachfront,
    seaView,
    sortBy = 'recommended',
    page = 1,
  } = searchParams

  const where: any = {
    status: 'active',
  }

  if (area) {
    const areaData = await prisma.area.findUnique({
      where: { slug: area },
    })
    if (areaData) {
      where.areaId = areaData.id
    }
  }

  if (minPrice || maxPrice) {
    where.rooms = {
      some: {
        pricePerNight: {
          gte: minPrice ? parseInt(minPrice) : 0,
          lte: maxPrice ? parseInt(maxPrice) : 99999,
        },
      },
    }
  }

  if (starRating) {
    where.starRating = { gte: parseInt(starRating) }
  }

  if (beachfront) {
    where.isBeachfront = true
  }

  if (seaView) {
    where.hasSeaView = true
  }

  let orderBy: any = { starRating: 'desc' }

  if (sortBy === 'price-low') {
    orderBy = { rooms: { _min: { pricePerNight: 'asc' } } }
  } else if (sortBy === 'price-high') {
    orderBy = { rooms: { _max: { pricePerNight: 'desc' } } }
  } else if (sortBy === 'rating') {
    orderBy = { guestRating: 'desc' }
  } else if (sortBy === 'distance') {
    orderBy = { distanceToBeach: 'asc' }
  }

  const skip = (parseInt(page) - 1) * 12
  const hotels = await prisma.hotel.findMany({
    where,
    include: {
      area: true,
      rooms: true,
    },
    orderBy,
    skip,
    take: 12,
  })

  const total = await prisma.hotel.count({ where })

  return { hotels, total, pages: Math.ceil(total / 12) }
}

async function getAreas() {
  return await prisma.area.findMany()
}

export default async function HotelsPage({ searchParams }: { searchParams: any }) {
  const { hotels, total } = await getHotels(searchParams)
  const areas = await getAreas()

  const area = searchParams.area || ''
  const starRating = searchParams.starRating || ''
  const minPrice = searchParams.minPrice || ''
  const maxPrice = searchParams.maxPrice || ''
  const beachfront = searchParams.beachfront === 'true'
  const seaView = searchParams.seaView === 'true'
  const sortBy = searchParams.sortBy || 'recommended'

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Hotels in Cox's Bazar</h1>
        <p className="text-gray-600 mb-8">Found {total} hotels</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-20">
            <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Filter size={20} />
              <span>Filters</span>
            </h2>

            <form className="space-y-4">
              {/* Area */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Area</label>
                <select
                  name="area"
                  defaultValue={area}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All Areas</option>
                  {areas.map((a) => (
                    <option key={a.id} value={a.slug}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    defaultValue={minPrice}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    defaultValue={maxPrice}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Star Rating</label>
                <select
                  name="starRating"
                  defaultValue={starRating}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              {/* Beachfront */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="beachfront"
                  value="true"
                  defaultChecked={beachfront}
                  className="rounded"
                />
                <label className="ml-2 text-gray-700">Beachfront Only</label>
              </div>

              {/* Sea View */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="seaView"
                  value="true"
                  defaultChecked={seaView}
                  className="rounded"
                />
                <label className="ml-2 text-gray-700">Sea View</label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-bold py-2 rounded hover:bg-primary-700"
              >
                Apply Filters
              </button>
            </form>
          </div>

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="mb-6">
              <select
                name="sortBy"
                defaultValue={sortBy}
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  url.searchParams.set('sortBy', e.target.value)
                  window.location.href = url.toString()
                }}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest to Beach</option>
              </select>
            </div>

            {/* Hotels */}
            {hotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No hotels found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
