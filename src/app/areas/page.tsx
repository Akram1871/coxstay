import prisma from '@/lib/db'
import Link from 'next/link'

async function getAreas() {
  return await prisma.area.findMany()
}

export default async function AreasPage() {
  const areas = await getAreas()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Cox's Bazar</h1>
          <p className="text-gray-600 text-lg">Discover the best areas to stay</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <Link key={area.id} href={`/areas/${area.slug}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer h-full">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={area.imageUrl || '/placeholder.jpg'}
                    alt={area.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">{area.name}</h2>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
