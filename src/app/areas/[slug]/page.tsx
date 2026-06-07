import prisma from '@/lib/db'
import Link from 'next/link'
import { HotelCard } from '@/components/common/HotelCard'

async function getArea(slug: string) {
  return await prisma.area.findUnique({
    where: { slug },
  })
}

async function getAreaHotels(areaId: string) {
  return await prisma.hotel.findMany({
    where: { areaId },
    include: {
      area: true,
      rooms: true,
    },
  })
}

export async function generateStaticParams() {
  try {
    const areas = await prisma.area.findMany({
      select: { slug: true },
    })
    return areas.map((area) => ({
      slug: area.slug,
    }))
  } catch (error) {
    return []
  }
}

export default async function AreaPage({ params }: { params: { slug: string } }) {
  const area = await getArea(params.slug)

  if (!area) {
    return <div className="text-center py-12">Area not found</div>
  }

  const hotels = await getAreaHotels(area.id)

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div
        className="bg-cover bg-center h-64 relative"
        style={{ backgroundImage: `url(${area.imageUrl || '/placeholder.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{area.name}</h1>
            <p className="text-lg">{area.description}</p>
          </div>
        </div>
      </div>

      {/* Hotels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Hotels in {area.name}</h2>

        {hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <p className="text-gray-600">No hotels in this area yet</p>
        )}
      </div>
    </div>
  )
}
