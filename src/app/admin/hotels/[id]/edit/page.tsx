import { AdminGuard } from '@/lib/guards'
import Link from 'next/link'
import prisma from '@/lib/db'

async function getHotel(id: string) {
  return await prisma.hotel.findUnique({
    where: { id },
  })
}

async function getAreas() {
  return await prisma.area.findMany()
}

export default async function EditHotelPage({ params }: { params: { id: string } }) {
  await AdminGuard()
  const hotel = await getHotel(params.id)
  const areas = await getAreas()

  if (!hotel) {
    return <div className="text-center py-12">Hotel not found</div>
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Hotel</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Hotel Name *</label>
                <input
                  type="text"
                  placeholder="Enter hotel name"
                  defaultValue={hotel.name}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Area *</label>
                <select required className="w-full border border-gray-300 rounded px-4 py-2">
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Description *</label>
              <textarea
                placeholder="Hotel description"
                rows={4}
                required
                defaultValue={hotel.description}
                className="w-full border border-gray-300 rounded px-4 py-2"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Address *</label>
                <input
                  type="text"
                  placeholder="Hotel address"
                  defaultValue={hotel.address}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nearest Beach</label>
                <input
                  type="text"
                  placeholder="e.g., Laboni Beach"
                  defaultValue={hotel.nearestBeach || ''}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Distance to Beach (KM)</label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.1"
                  defaultValue={hotel.distanceToBeach || 0}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Star Rating *</label>
                <input
                  type="number"
                  placeholder="3"
                  min="1"
                  max="5"
                  step="0.5"
                  defaultValue={hotel.starRating}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Property Type</label>
                <select defaultValue={hotel.propertyType} className="w-full border border-gray-300 rounded px-4 py-2">
                  <option>Hotel</option>
                  <option>Resort</option>
                  <option>Motel</option>
                  <option>Guesthouse</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Status</label>
                <select defaultValue={hotel.status} className="w-full border border-gray-300 rounded px-4 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="beachfront" defaultChecked={hotel.isBeachfront} className="rounded" />
                <label htmlFor="beachfront" className="ml-2 cursor-pointer">
                  Beachfront Property
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="seaview" defaultChecked={hotel.hasSeaView} className="rounded" />
                <label htmlFor="seaview" className="ml-2 cursor-pointer">
                  Has Sea View Rooms
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                href="/admin/hotels"
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-6 rounded"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
