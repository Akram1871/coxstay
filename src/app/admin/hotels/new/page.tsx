import { AdminGuard } from '@/lib/guards'
import Link from 'next/link'
import prisma from '@/lib/db'

async function getAreas() {
  return await prisma.area.findMany()
}

export default async function NewHotelPage() {
  await AdminGuard()
  const areas = await getAreas()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Hotel</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Hotel Name *</label>
                <input
                  type="text"
                  placeholder="Enter hotel name"
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
                className="w-full border border-gray-300 rounded px-4 py-2"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Address *</label>
                <input
                  type="text"
                  placeholder="Hotel address"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nearest Beach</label>
                <input
                  type="text"
                  placeholder="e.g., Laboni Beach"
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
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Property Type</label>
                <select className="w-full border border-gray-300 rounded px-4 py-2">
                  <option>Hotel</option>
                  <option>Resort</option>
                  <option>Motel</option>
                  <option>Guesthouse</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Status</label>
                <select className="w-full border border-gray-300 rounded px-4 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="beachfront" className="rounded" />
                <label htmlFor="beachfront" className="ml-2 cursor-pointer">
                  Beachfront Property
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="seaview" className="rounded" />
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
                Add Hotel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
