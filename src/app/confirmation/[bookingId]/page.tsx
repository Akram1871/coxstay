import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/common/Utils'
import { Check, Printer } from 'lucide-react'

async function getBooking(id: string) {
  return await prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      hotel: true,
      room: true,
      addons: {
        include: { travelAddon: true },
      },
    },
  })
}

export async function generateStaticParams() {
  try {
    const bookings = await prisma.booking.findMany({
      select: { id: true },
    })
    return bookings.map((booking) => ({
      bookingId: booking.id,
    }))
  } catch (error) {
    return []
  }
}

export default async function ConfirmationPage({ params }: { params: { bookingId: string } }) {
  const booking = await getBooking(params.bookingId)

  if (!booking) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-4">
            Your booking has been received. We'll send you a confirmation email shortly.
          </p>
          <p className="text-gray-600">
            Booking Reference: <span className="font-mono font-bold">{booking.id.substring(0, 12)}</span>
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hotel & Room Info */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">📍 Hotel & Room</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Hotel:</strong> {booking.hotel.name}</p>
                <p><strong>Room:</strong> {booking.room.name}</p>
              </div>
            </div>

            {/* Guest Info */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">👤 Guest Information</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {booking.guestName}</p>
                <p><strong>Email:</strong> {booking.guestEmail}</p>
                <p><strong>Phone:</strong> {booking.guestPhone}</p>
                <p><strong>Nationality:</strong> {booking.nationality || 'N/A'}</p>
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">📅 Dates</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Check-in:</strong> {formatDate(booking.checkInDate)}</p>
                <p><strong>Check-out:</strong> {formatDate(booking.checkOutDate)}</p>
                <p><strong>Nights:</strong> {booking.nights}</p>
              </div>
            </div>

            {/* Guests & Rooms */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">👥 Guests & Rooms</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p><strong>Rooms:</strong> {booking.rooms}</p>
                <p><strong>Status:</strong> <StatusBadge status={booking.bookingStatus} /></p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Price Breakdown</h2>

          <div className="space-y-3 mb-6 pb-6 border-b">
            <div className="flex justify-between">
              <span className="text-gray-700">
                {formatCurrency(booking.pricePerNight)} × {booking.nights} nights × {booking.rooms} room(s)
              </span>
              <span className="font-bold">{formatCurrency(booking.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">VAT (10%)</span>
              <span className="font-bold">{formatCurrency(booking.vat)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Service Fee (5%)</span>
              <span className="font-bold">{formatCurrency(booking.serviceFee)}</span>
            </div>
            {booking.addons.length > 0 && (
              <>
                {booking.addons.map((addon) => (
                  <div key={addon.id} className="flex justify-between">
                    <span className="text-gray-700">{addon.travelAddon.name}</span>
                    <span className="font-bold">{formatCurrency(addon.price)}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex justify-between text-2xl font-bold">
            <span>Total Amount:</span>
            <span>{formatCurrency(booking.totalAmount)} {booking.currency}</span>
          </div>
        </div>

        {/* Payment Status */}
        <div className={`p-8 rounded-lg shadow-md mb-8 ${
          booking.paymentStatus === 'paid'
            ? 'bg-green-50 border border-green-200'
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <h3 className="font-bold text-lg mb-2">
            💳 Payment Status: <StatusBadge status={booking.paymentStatus} />
          </h3>
          <p className="text-gray-700">
            {booking.paymentStatus === 'paid'
              ? 'Payment has been received. Your booking is confirmed.'
              : `Please complete the payment of ${formatCurrency(booking.totalAmount)} ${booking.currency}`}
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded">
            <Printer size={20} />
            <span>Print Booking</span>
          </button>
          <Link
            href="/dashboard/bookings"
            className="flex items-center justify-center bg-accent-600 hover:bg-accent-700 text-white font-bold py-3 px-6 rounded text-center"
          >
            View My Bookings
          </Link>
          <Link
            href="/hotels"
            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded text-center"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  )
}
