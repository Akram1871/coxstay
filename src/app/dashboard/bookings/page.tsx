import prisma from '@/lib/db'
import Link from 'next/link'
import { PageGuard } from '@/lib/guards'
import { formatCurrency, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/common/Utils'
import { Calendar, MapPin, Users } from 'lucide-react'

async function getUserBookings(userId: string) {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      hotel: true,
      room: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function BookingsPage() {
  const session = await PageGuard()
  const bookings = await getUserBookings(session.id)

  const upcomingBookings = bookings.filter((b) => new Date(b.checkInDate) > new Date())
  const pastBookings = bookings.filter((b) => new Date(b.checkOutDate) < new Date())

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">Manage your hotel reservations</p>

        {/* Tabs */}
        <div className="mb-8 border-b">
          <div className="flex space-x-8">
            <button className="px-4 py-3 font-bold text-primary-600 border-b-2 border-primary-600">
              Upcoming ({upcomingBookings.length})
            </button>
            <button className="px-4 py-3 font-bold text-gray-600">
              Past ({pastBookings.length})
            </button>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Hotel Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-2">{booking.hotel.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{booking.room.name}</p>
                    <StatusBadge status={booking.bookingStatus} />
                  </div>

                  {/* Dates */}
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Check-in</p>
                    <p className="font-bold flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{formatDate(booking.checkInDate)}</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-3 mb-2">Check-out</p>
                    <p className="font-bold flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{formatDate(booking.checkOutDate)}</span>
                    </p>
                  </div>

                  {/* Guests & Rooms */}
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Guests & Rooms</p>
                    <p className="font-bold flex items-center space-x-1">
                      <Users size={16} />
                      <span>{booking.guests} guests</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-3">{booking.rooms} room(s)</p>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Total</p>
                      <p className="text-2xl font-bold">{formatCurrency(booking.totalAmount)}</p>
                    </div>
                    <Link
                      href={`/confirmation/${booking.id}`}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 rounded-lg text-center">
              <p className="text-gray-600 text-lg mb-4">No upcoming bookings</p>
              <Link
                href="/hotels"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
              >
                Browse Hotels
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
