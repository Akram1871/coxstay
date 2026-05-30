import { AdminGuard } from '@/lib/guards'
import prisma from '@/lib/db'
import { formatCurrency, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/common/Utils'

async function getBookings() {
  return await prisma.booking.findMany({
    include: {
      user: true,
      hotel: true,
      room: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminBookingsPage() {
  await AdminGuard()
  const bookings = await getBookings()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Bookings</h1>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Booking ID</th>
                <th className="px-6 py-3 text-left font-bold">Guest</th>
                <th className="px-6 py-3 text-left font-bold">Hotel</th>
                <th className="px-6 py-3 text-left font-bold">Check-in</th>
                <th className="px-6 py-3 text-left font-bold">Check-out</th>
                <th className="px-6 py-3 text-left font-bold">Amount</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-sm">{booking.id.substring(0, 8)}</td>
                  <td className="px-6 py-3">
                    <div>
                      <p className="font-medium">{booking.guestName}</p>
                      <p className="text-sm text-gray-600">{booking.guestEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3">{booking.hotel.name}</td>
                  <td className="px-6 py-3">{formatDate(booking.checkInDate)}</td>
                  <td className="px-6 py-3">{formatDate(booking.checkOutDate)}</td>
                  <td className="px-6 py-3 font-bold">{formatCurrency(booking.totalAmount)}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={booking.bookingStatus} />
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
