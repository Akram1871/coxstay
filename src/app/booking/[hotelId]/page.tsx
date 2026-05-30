import prisma from '@/lib/db'
import { PageGuard } from '@/lib/guards'
import Link from 'next/link'
import { formatCurrency, calculateNights, calculateBookingTotal } from '@/lib/utils'
import { Calendar, Users, Home } from 'lucide-react'

async function getHotel(id: string) {
  return await prisma.hotel.findUnique({
    where: { id },
    include: {
      area: true,
      rooms: true,
    },
  })
}

async function getAddons() {
  return await prisma.travelAddon.findMany()
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: { hotelId: string }
  searchParams: any
}) {
  await PageGuard()
  const hotel = await getHotel(params.hotelId)
  const addons = await getAddons()

  if (!hotel) {
    return <div className="text-center py-12">Hotel not found</div>
  }

  const selectedRoomId = searchParams.room
  const selectedRoom = hotel.rooms.find((r) => r.id === selectedRoomId) || hotel.rooms[0]

  const checkIn = searchParams.checkIn || new Date().toISOString().split('T')[0]
  const checkOut = searchParams.checkOut || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const guests = parseInt(searchParams.guests || '1')
  const roomsCount = parseInt(searchParams.rooms || '1')

  const nights = calculateNights(new Date(checkIn), new Date(checkOut))
  const { subtotal, vat, serviceFee, totalAmount } = calculateBookingTotal(
    selectedRoom.pricePerNight,
    nights,
    roomsCount
  )

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Hotel</p>
                  <p className="font-bold text-lg">{hotel.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Room</p>
                  <p className="font-bold text-lg">{selectedRoom.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Check-in</span>
                    </p>
                    <p className="font-bold">{checkIn}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Check-out</span>
                    </p>
                    <p className="font-bold">{checkOut}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Nights</p>
                    <p className="font-bold">{nights}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Guest Information</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Nationality"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <textarea
                  placeholder="Special Requests (optional)"
                  rows={3}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                ></textarea>
              </form>
            </div>

            {/* Travel Add-ons */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Travel Add-ons</h3>
              <div className="space-y-3">
                {addons.map((addon) => (
                  <div key={addon.id} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                    <input type="checkbox" id={addon.id} className="rounded" />
                    <div className="flex-1">
                      <label htmlFor={addon.id} className="font-medium cursor-pointer">
                        {addon.name}
                      </label>
                      <p className="text-gray-600 text-sm">{addon.description}</p>
                    </div>
                    <span className="font-bold">{formatCurrency(addon.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'card', name: '💳 Card' },
                  { id: 'bkash', name: '📱 Bkash' },
                  { id: 'nagad', name: '📱 Nagad' },
                  { id: 'rocket', name: '📱 Rocket' },
                  { id: 'pay_at_hotel', name: '🏨 Pay at Hotel' },
                ].map((method) => (
                  <div key={method.id} className="flex items-center">
                    <input type="radio" name="payment" id={method.id} defaultChecked={method.id === 'card'} />
                    <label htmlFor={method.id} className="ml-3 cursor-pointer">
                      {method.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href={`/hotels/${hotel.id}`} className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-6 rounded text-center">
                Back
              </Link>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded">
                Proceed to Payment
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-20">
              <h3 className="text-xl font-bold mb-6">Price Breakdown</h3>

              <div className="space-y-4 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {formatCurrency(selectedRoom.pricePerNight)} × {nights} nights × {roomsCount} room(s)
                  </span>
                  <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (10%)</span>
                  <span className="font-bold">{formatCurrency(vat)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee (5%)</span>
                  <span className="font-bold">{formatCurrency(serviceFee)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>

              <div className="p-4 bg-blue-50 rounded text-sm text-gray-700">
                <p className="font-medium mb-2">✓ Free cancellation up to 48 hours</p>
                <p className="font-medium">✓ Best price guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
