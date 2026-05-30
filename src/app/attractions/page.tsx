import prisma from '@/lib/db'

async function getAttractions() {
  return await prisma.attraction.findMany()
}

export default async function AttractionsPage() {
  const attractions = await getAttractions()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Popular Attractions</h1>
          <p className="text-gray-600 text-lg">Things to do and see in Cox's Bazar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={attraction.imageUrl || '/placeholder.jpg'}
                  alt={attraction.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-900 mb-1">{attraction.name}</h2>
                <p className="text-xs text-gray-500 mb-2 font-medium">{attraction.category}</p>
                <p className="text-gray-600 text-sm line-clamp-3">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
