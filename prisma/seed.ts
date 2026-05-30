import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.bookingAddon.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.review.deleteMany()
  await prisma.room.deleteMany()
  await prisma.hotel.deleteMany()
  await prisma.area.deleteMany()
  await prisma.user.deleteMany()
  await prisma.travelAddon.deleteMany()
  await prisma.attraction.deleteMany()

  // Create areas
  const areas = await Promise.all([
    prisma.area.create({
      data: {
        name: 'Laboni Beach',
        slug: 'laboni-beach',
        description: 'Popular beach area with restaurants and shops',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Kolatoli',
        slug: 'kolatoli',
        description: 'Central beach area with most hotels',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Sugandha Beach',
        slug: 'sugandha-beach',
        description: 'Serene and less crowded beach',
        imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Marine Drive',
        slug: 'marine-drive',
        description: 'Long scenic drive along the beach',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Inani Beach',
        slug: 'inani-beach',
        description: 'Beautiful beach with rock formations',
        imageUrl: 'https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Himchari',
        slug: 'himchari',
        description: 'Scenic area with hills and forest',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Teknaf Road',
        slug: 'teknaf-road',
        description: 'Quiet area away from main beach',
        imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Dolphin Moor',
        slug: 'dolphin-moor',
        description: 'Natural dolphin spotting location',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
      },
    }),
    prisma.area.create({
      data: {
        name: 'Burmese Market Area',
        slug: 'burmese-market-area',
        description: 'Cultural and shopping district',
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop',
      },
    }),
  ])

  console.log('✅ Areas created')

  // Create hotels
  const hotelData = [
    {
      name: 'Hotel Sea Crown',
      areaId: areas[0].id,
      starRating: 4,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Luxury beachfront hotel with sea views',
      distanceToBeach: 0,
    },
    {
      name: 'Long Beach Hotel',
      areaId: areas[1].id,
      starRating: 3.5,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Great value beachfront accommodation',
      distanceToBeach: 0,
    },
    {
      name: 'Ocean Paradise Hotel & Resort',
      areaId: areas[0].id,
      starRating: 4.5,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Premium resort with full amenities',
      distanceToBeach: 0,
    },
    {
      name: 'Sayeman Beach Resort',
      areaId: areas[1].id,
      starRating: 4,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Spacious resort perfect for families',
      distanceToBeach: 0,
    },
    {
      name: 'Hotel The Cox Today',
      areaId: areas[2].id,
      starRating: 3,
      isBeachfront: false,
      hasSeaView: false,
      description: 'Budget-friendly hotel in quiet area',
      distanceToBeach: 0.5,
    },
    {
      name: 'Hotel Kollol by J&Z Group',
      areaId: areas[1].id,
      starRating: 3.5,
      isBeachfront: false,
      hasSeaView: true,
      description: 'Comfortable mid-range hotel with sea view',
      distanceToBeach: 0.3,
    },
    {
      name: 'Seagull Hotel',
      areaId: areas[3].id,
      starRating: 3,
      isBeachfront: false,
      hasSeaView: false,
      description: 'Cozy hotel near Marine Drive',
      distanceToBeach: 0.2,
    },
    {
      name: 'Mermaid Beach Resort',
      areaId: areas[4].id,
      starRating: 4,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Beautiful resort with scenic location',
      distanceToBeach: 0,
    },
    {
      name: 'Royal Tulip Sea Pearl Beach Resort',
      areaId: areas[1].id,
      starRating: 5,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Ultra-luxury resort with world-class service',
      distanceToBeach: 0,
    },
    {
      name: 'Best Western Heritage',
      areaId: areas[0].id,
      starRating: 4,
      isBeachfront: false,
      hasSeaView: true,
      description: 'International brand with excellent service',
      distanceToBeach: 0.4,
    },
    {
      name: 'Grace Cox Smart Hotel',
      areaId: areas[2].id,
      starRating: 3.5,
      isBeachfront: false,
      hasSeaView: false,
      description: 'Modern smart hotel with tech amenities',
      distanceToBeach: 0.6,
    },
    {
      name: 'Prime Park Hotel',
      areaId: areas[1].id,
      starRating: 3,
      isBeachfront: false,
      hasSeaView: false,
      description: 'Good value hotel with parking',
      distanceToBeach: 0.5,
    },
    {
      name: 'Sea Princess Hotel',
      areaId: areas[0].id,
      starRating: 4,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Elegant beachfront hotel for couples',
      distanceToBeach: 0,
    },
    {
      name: 'Windy Terrace Boutique Hotel',
      areaId: areas[3].id,
      starRating: 3.5,
      isBeachfront: false,
      hasSeaView: true,
      description: 'Boutique hotel with rooftop terrace',
      distanceToBeach: 0.3,
    },
    {
      name: 'Neshorgo Hotel & Resort',
      areaId: areas[5].id,
      starRating: 3.5,
      isBeachfront: false,
      hasSeaView: false,
      description: 'Resort in scenic location',
      distanceToBeach: 1,
    },
    {
      name: 'Beach Palace Hotel',
      areaId: areas[1].id,
      starRating: 4.5,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Luxury palace-style hotel',
      distanceToBeach: 0,
    },
    {
      name: 'Coxs Bay Resort',
      areaId: areas[0].id,
      starRating: 3.5,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Family-friendly beach resort',
      distanceToBeach: 0,
    },
    {
      name: 'Starfish Hotel',
      areaId: areas[2].id,
      starRating: 3,
      isBeachfront: false,
      hasSeaView: false,
      description: 'Budget hotel with good amenities',
      distanceToBeach: 0.4,
    },
    {
      name: 'Horizon View Resort',
      areaId: areas[4].id,
      starRating: 4,
      isBeachfront: true,
      hasSeaView: true,
      description: 'Resort with infinity pool',
      distanceToBeach: 0,
    },
    {
      name: 'Coral Reef Hotel',
      areaId: areas[3].id,
      starRating: 3.5,
      isBeachfront: false,
      hasSeaView: true,
      description: 'Hotel with ocean views and restaurant',
      distanceToBeach: 0.2,
    },
  ]

  const hotels = await Promise.all(
    hotelData.map((hotel) =>
      prisma.hotel.create({
        data: {
          name: hotel.name,
          slug: hotel.name.toLowerCase().replace(/\s+/g, '-'),
          description: hotel.description,
          address: `${hotel.name}, ${areas.find((a) => a.id === hotel.areaId)?.name}, Cox's Bazar`,
          areaId: hotel.areaId,
          nearestBeach: 'Main Beach',
          distanceToBeach: hotel.distanceToBeach,
          isBeachfront: hotel.isBeachfront,
          hasSeaView: hotel.hasSeaView,
          starRating: hotel.starRating,
          guestRating: Math.random() * 2 + 3,
          reviewCount: Math.floor(Math.random() * 200) + 20,
          propertyType: 'Hotel',
          images: JSON.stringify([
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1584622908088-3574f2b62a03?w=800&h=600&fit=crop',
          ]),
          amenities: JSON.stringify([
            'Free Wi-Fi',
            'Air Conditioning',
            'Restaurant',
            'Beach Access',
            'Parking',
            'Swimming Pool',
          ]),
        },
      })
    )
  )

  console.log('✅ Hotels created')

  // Create rooms for each hotel
  const roomTypes = [
    { name: 'Standard Room', bedType: 'Double Bed', roomSize: 25, discount: 0 },
    { name: 'Deluxe Room', bedType: 'King Bed', roomSize: 35, discount: 500 },
    { name: 'Sea View Room', bedType: 'Double Bed', roomSize: 30, hasSeaView: true, discount: 1000 },
    { name: 'Family Suite', bedType: 'Multiple Beds', roomSize: 50, discount: 1500 },
    { name: 'Honeymoon Suite', bedType: 'King Bed', roomSize: 45, hasSeaView: true, discount: 2000 },
    { name: 'Executive Suite', bedType: 'King Bed', roomSize: 55, hasSeaView: true, discount: 2500 },
  ]

  const rooms: any[] = []
  for (const hotel of hotels) {
    const hotelData = hotelData.find((h) => h.name === hotel.name)!
    const basePriceMultiplier = [2000, 3500, 5000, 6500, 4000, 4500, 3000, 5500, 8000, 5500, 3500, 3000, 5000, 4000, 4500, 6500, 4500, 3000, 5500, 4000][
      hotels.indexOf(hotel)
    ]

    for (const roomType of roomTypes) {
      const room = await prisma.room.create({
        data: {
          hotelId: hotel.id,
          name: roomType.name,
          description: `Comfortable ${roomType.name.toLowerCase()} with modern amenities`,
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
          bedType: roomType.bedType,
          roomSize: roomType.roomSize,
          maxGuests: roomType.name === 'Standard Room' ? 2 : roomType.name === 'Deluxe Room' ? 2 : roomType.name === 'Sea View Room' ? 2 : roomType.name === 'Family Suite' ? 4 : roomType.name === 'Honeymoon Suite' ? 2 : 3,
          hasSeaView: roomType.hasSeaView || hotel.hasSeaView,
          breakfastIncluded: Math.random() > 0.5,
          cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
          pricePerNight: basePriceMultiplier + (roomType.discount || 0),
          discountPrice: Math.random() > 0.6 ? basePriceMultiplier + (roomType.discount || 0) - 500 : undefined,
          totalRooms: Math.floor(Math.random() * 10) + 5,
          availableRooms: Math.floor(Math.random() * 5) + 1,
        },
      })
      rooms.push(room)
    }
  }

  console.log('✅ Rooms created')

  // Create users
  const hashedAdminPassword = await bcrypt.hash('admin123456', 12)
  const hashedUserPassword = await bcrypt.hash('user123456', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@coxstay.com',
      password: hashedAdminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  const users = [
    await prisma.user.create({
      data: {
        email: 'user@coxstay.com',
        password: hashedUserPassword,
        name: 'Test User',
        phone: '+88-01700-000001',
        nationality: 'Bangladesh',
        role: 'USER',
      },
    }),
    await prisma.user.create({
      data: {
        email: 'john@example.com',
        password: hashedUserPassword,
        name: 'John Doe',
        phone: '+88-01700-000002',
        nationality: 'USA',
        role: 'USER',
      },
    }),
    await prisma.user.create({
      data: {
        email: 'sarah@example.com',
        password: hashedUserPassword,
        name: 'Sarah Smith',
        phone: '+88-01700-000003',
        nationality: 'UK',
        role: 'USER',
      },
    }),
  ]

  console.log('✅ Users created')

  // Create bookings
  const today = new Date()
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

  for (let i = 0; i < 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const hotel = hotels[Math.floor(Math.random() * hotels.length)]
    const room = rooms.filter((r) => r.hotelId === hotel.id)[Math.floor(Math.random() * 3)]
    const checkIn = new Date(today.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
    const checkOut = new Date(checkIn.getTime() + (Math.floor(Math.random() * 5) + 1) * 24 * 60 * 60 * 1000)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000))
    const roomsCount = Math.floor(Math.random() * 2) + 1
    const guestCount = roomsCount * (Math.floor(Math.random() * 2) + 1)
    const subtotal = room.pricePerNight * nights * roomsCount
    const vat = subtotal * 0.1
    const serviceFee = subtotal * 0.05
    const totalAmount = subtotal + vat + serviceFee

    await prisma.booking.create({
      data: {
        userId: user.id,
        hotelId: hotel.id,
        roomId: room.id,
        guestName: user.name || 'Guest',
        guestEmail: user.email,
        guestPhone: user.phone || '+88-01700-000000',
        nationality: user.nationality,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests: guestCount,
        rooms: roomsCount,
        nights,
        pricePerNight: room.pricePerNight,
        subtotal,
        vat,
        serviceFee,
        totalAmount,
        paymentMethod: ['bkash', 'nagad', 'rocket', 'card', 'pay_at_hotel'][Math.floor(Math.random() * 5)],
        paymentStatus: Math.random() > 0.3 ? 'paid' : 'pending',
        bookingStatus: Math.random() > 0.5 ? 'confirmed' : 'pending',
      },
    })
  }

  console.log('✅ Bookings created')

  // Create reviews
  const reviewComments = [
    'Great hotel with excellent service!',
    'Beautiful beachfront location',
    'Perfect for our honeymoon',
    'Family-friendly atmosphere',
    'Amazing sunset views',
    'Delicious food at the restaurant',
    'Clean rooms and helpful staff',
    'Would definitely come back',
    'Great value for money',
    'Highly recommend to everyone',
  ]

  for (let i = 0; i < 40; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const hotel = hotels[Math.floor(Math.random() * hotels.length)]

    await prisma.review.create({
      data: {
        userId: user.id,
        hotelId: hotel.id,
        rating: Math.floor(Math.random() * 3) + 3,
        title: 'Great experience',
        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
      },
    })
  }

  console.log('✅ Reviews created')

  // Create travel add-ons
  const addons = [
    { name: 'Airport Pickup', category: 'Transport', price: 800 },
    { name: 'Railway Station Pickup', category: 'Transport', price: 600 },
    { name: 'Marine Drive Tour', category: 'Activities', price: 2500 },
    { name: 'Himchari Tour', category: 'Activities', price: 3000 },
    { name: 'Inani Beach Tour', category: 'Activities', price: 3500 },
    { name: 'Breakfast Package', category: 'Meals', price: 1500 },
  ]

  for (const addon of addons) {
    await prisma.travelAddon.create({
      data: addon,
    })
  }

  console.log('✅ Travel add-ons created')

  // Create attractions
  const attractions = [
    {
      name: 'Cox\'s Bazar Beach',
      description: 'Longest natural sea beach in the world',
      location: 'Cox\'s Bazar',
      category: 'Beach',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    },
    {
      name: 'Inani Beach',
      description: 'Beautiful beach with rock formations',
      location: 'Inani',
      category: 'Beach',
      imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    },
    {
      name: 'Himchari National Park',
      description: 'Scenic forest and hill area',
      location: 'Himchari',
      category: 'Nature',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    },
    {
      name: 'Marine Drive',
      description: 'Long scenic drive along the beach',
      location: 'Marine Drive',
      category: 'Drive',
      imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    },
    {
      name: 'Burmese Market',
      description: 'Traditional market with cultural items',
      location: 'Burmese Market Area',
      category: 'Shopping',
      imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    },
    {
      name: 'Teknaf',
      description: 'Southernmost town of Bangladesh',
      location: 'Teknaf',
      category: 'Town',
      imageUrl: 'https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=800&h=600&fit=crop',
    },
    {
      name: 'Sonadia Island',
      description: 'Island with diverse wildlife',
      location: 'Teknaf',
      category: 'Island',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    },
    {
      name: 'Sugandha Beach',
      description: 'Serene and peaceful beach',
      location: 'Sugandha',
      category: 'Beach',
      imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    },
  ]

  for (const attraction of attractions) {
    await prisma.attraction.create({
      data: attraction,
    })
  }

  console.log('✅ Attractions created')

  console.log('🎉 Seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
