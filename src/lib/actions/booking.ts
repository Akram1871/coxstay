'use server'

import prisma from '@/lib/db'
import { getSession, requireAuth, requireAdmin } from '@/lib/auth'
import { calculateBookingTotal, calculateNights } from '@/lib/utils'

export async function searchHotels(params: any) {
  try {
    const {
      checkIn,
      checkOut,
      area,
      minPrice,
      maxPrice,
      starRating,
      beachfront,
      seaView,
      sortBy,
      page = 1,
    } = params

    const where: any = {}

    if (area) {
      const areaData = await prisma.area.findUnique({
        where: { slug: area },
      })
      if (areaData) {
        where.areaId = areaData.id
      }
    }

    if (minPrice || maxPrice) {
      where.rooms = {
        some: {
          pricePerNight: {
            gte: minPrice || 0,
            lte: maxPrice || 99999,
          },
        },
      }
    }

    if (starRating) {
      where.starRating = { gte: starRating }
    }

    if (beachfront) {
      where.isBeachfront = true
    }

    if (seaView) {
      where.hasSeaView = true
    }

    let orderBy: any = { starRating: 'desc' }

    if (sortBy === 'price-low') {
      orderBy = { rooms: { _min: { pricePerNight: 'asc' } } }
    } else if (sortBy === 'price-high') {
      orderBy = { rooms: { _max: { pricePerNight: 'desc' } } }
    } else if (sortBy === 'rating') {
      orderBy = { guestRating: 'desc' }
    } else if (sortBy === 'distance') {
      orderBy = { distanceToBeach: 'asc' }
    } else if (sortBy === 'beachfront') {
      orderBy = { isBeachfront: 'desc' }
    }

    const skip = (page - 1) * 12
    const take = 12

    const hotels = await prisma.hotel.findMany({
      where,
      include: {
        area: true,
        rooms: true,
        _count: {
          select: { reviews: true },
        },
      },
      orderBy,
      skip,
      take,
    })

    const total = await prisma.hotel.count({ where })

    return {
      success: true,
      hotels,
      total,
      pages: Math.ceil(total / take),
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function getHotelById(id: string) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        area: true,
        rooms: {
          orderBy: { pricePerNight: 'asc' },
        },
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: { reviews: true },
        },
      },
    })

    if (!hotel) {
      return {
        success: false,
        error: 'Hotel not found',
      }
    }

    return {
      success: true,
      hotel,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function createBooking(bookingData: any) {
  try {
    const session = await requireAuth()

    const {
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      rooms,
      guestName,
      guestEmail,
      guestPhone,
      nationality,
      paymentMethod,
      specialRequests,
      addons,
    } = bookingData

    // Get room details
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { hotel: true },
    })

    if (!room) {
      return {
        success: false,
        error: 'Room not found',
      }
    }

    // Check availability
    if (room.availableRooms < rooms) {
      return {
        success: false,
        error: 'Not enough rooms available',
      }
    }

    const nights = calculateNights(new Date(checkInDate), new Date(checkOutDate))

    const { subtotal, vat, serviceFee, totalAmount } = calculateBookingTotal(
      room.pricePerNight,
      nights,
      rooms
    )

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.id,
        hotelId,
        roomId,
        guestName,
        guestEmail,
        guestPhone,
        nationality,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guests,
        rooms,
        nights,
        pricePerNight: room.pricePerNight,
        subtotal,
        vat,
        serviceFee,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'pay_at_hotel' ? 'pending' : 'pending',
        bookingStatus: paymentMethod === 'pay_at_hotel' ? 'pending' : 'pending',
        specialRequests,
      },
    })

    // Add add-ons if provided
    if (addons && addons.length > 0) {
      for (const addonId of addons) {
        const addon = await prisma.travelAddon.findUnique({
          where: { id: addonId },
        })
        if (addon) {
          await prisma.bookingAddon.create({
            data: {
              bookingId: booking.id,
              travelAddonId: addonId,
              price: addon.price,
            },
          })
        }
      }
    }

    return {
      success: true,
      booking,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function getUserBookings() {
  try {
    const session = await requireAuth()

    const bookings = await prisma.booking.findMany({
      where: { userId: session.id },
      include: {
        hotel: true,
        room: true,
        addons: {
          include: { travelAddon: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return {
      success: true,
      bookings,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function getBookingById(id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        hotel: true,
        room: true,
        user: true,
        addons: {
          include: { travelAddon: true },
        },
      },
    })

    if (!booking) {
      return {
        success: false,
        error: 'Booking not found',
      }
    }

    return {
      success: true,
      booking,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}
