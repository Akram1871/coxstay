import { AdminGuard } from '@/lib/guards'
import prisma from '@/lib/db'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

async function getHotels() {
  return await prisma.hotel.findMany({
    include: { area: true, rooms: true },
  })
}

export default async function AdminHotelsPage() {
  await AdminGuard()
  const hotels = await getHotels()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Hotels</h1>
          <Link
            href="/admin/hotels/new"
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            <Plus size={20} />
            <span>Add Hotel</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Hotel Name</th>
                <th className="px-6 py-3 text-left font-bold">Area</th>
                <th className="px-6 py-3 text-left font-bold">Rooms</th>
                <th className="px-6 py-3 text-left font-bold">Star Rating</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
                <th className="px-6 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{hotel.name}</td>
                  <td className="px-6 py-3">{hotel.area.name}</td>
                  <td className="px-6 py-3">{hotel.rooms.length}</td>
                  <td className="px-6 py-3">⭐ {hotel.starRating}</td>
                  <td className="px-6 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex space-x-2">
                    <Link
                      href={`/admin/hotels/${hotel.id}/edit`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Edit size={18} />
                    </Link>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
