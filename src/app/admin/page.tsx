import { AdminGuard } from '@/lib/guards'
import prisma from '@/lib/db'
import Link from 'next/link'
import { BarChart3, Hotel, Users, Calendar } from 'lucide-react'

async function getAdminStats() {
  const [totalHotels, totalRooms, totalBookings, totalUsers] = await Promise.all([
    prisma.hotel.count(),
    prisma.room.count(),
    prisma.booking.count(),
    prisma.user.count({ where: { role: 'USER' } }),
  ])

  const totalRevenue = await prisma.booking.aggregate({
    _sum: { totalAmount: true },
  })

  return {
    totalHotels,
    totalRooms,
    totalBookings,
    totalUsers,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  }
}

export default async function AdminPage() {
  await AdminGuard()
  const stats = await getAdminStats()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Hotels</p>
                <p className="text-3xl font-bold">{stats.totalHotels}</p>
              </div>
              <Hotel className="text-primary-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Rooms</p>
                <p className="text-3xl font-bold">{stats.totalRooms}</p>
              </div>
              <Hotel className="text-accent-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Bookings</p>
                <p className="text-3xl font-bold">{stats.totalBookings}</p>
              </div>
              <Calendar className="text-orange-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Active Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/hotels">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <Hotel className="text-primary-600 mb-4" size={32} />
              <h2 className="text-xl font-bold mb-2">Manage Hotels</h2>
              <p className="text-gray-600">Add, edit, or delete hotels</p>
            </div>
          </Link>

          <Link href="/admin/rooms">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <Hotel className="text-accent-600 mb-4" size={32} />
              <h2 className="text-xl font-bold mb-2">Manage Rooms</h2>
              <p className="text-gray-600">Add, edit, or delete rooms</p>
            </div>
          </Link>

          <Link href="/admin/bookings">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <Calendar className="text-orange-600 mb-4" size={32} />
              <h2 className="text-xl font-bold mb-2">Manage Bookings</h2>
              <p className="text-gray-600">View and manage all bookings</p>
            </div>
          </Link>

          <Link href="/admin/users">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <Users className="text-green-600 mb-4" size={32} />
              <h2 className="text-xl font-bold mb-2">Manage Users</h2>
              <p className="text-gray-600">View all registered users</p>
            </div>
          </Link>

          <Link href="/admin/settings">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <BarChart3 className="text-red-600 mb-4" size={32} />
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p className="text-gray-600">Manage system settings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
