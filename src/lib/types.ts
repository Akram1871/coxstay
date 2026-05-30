export type Role = 'USER' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  nationality: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface Area {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Hotel {
  id: string
  name: string
  slug: string
  description: string
  address: string
  areaId: string
  nearestBeach: string
  distanceToBeach: number
  isBeachfront: boolean
  hasSeaView: boolean
  starRating: number
  guestRating: number | null
  reviewCount: number
  propertyType: string
  images: string
  amenities: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  id: string
  hotelId: string
  name: string
  description: string | null
  image: string | null
  bedType: string
  roomSize: number
  maxGuests: number
  hasSeaView: boolean
  breakfastIncluded: boolean
  cancellationPolicy: string
  pricePerNight: number
  discountPrice: number | null
  totalRooms: number
  availableRooms: number
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  userId: string
  hotelId: string
  roomId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  nationality: string | null
  checkInDate: Date
  checkOutDate: Date
  guests: number
  rooms: number
  nights: number
  pricePerNight: number
  subtotal: number
  vat: number
  serviceFee: number
  addonTotal: number
  totalAmount: number
  currency: string
  paymentMethod: string
  paymentStatus: string
  bookingStatus: string
  specialRequests: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  userId: string
  hotelId: string
  rating: number
  title: string
  comment: string
  createdAt: Date
  updatedAt: Date
}

export interface TravelAddon {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface Attraction {
  id: string
  name: string
  description: string
  location: string
  areaId: string | null
  imageUrl: string | null
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface SearchParams {
  checkIn?: string
  checkOut?: string
  guests?: number
  rooms?: number
  area?: string
  minPrice?: number
  maxPrice?: number
  starRating?: number
  guestRating?: number
  beachfront?: boolean
  seaView?: boolean
  freeBreakfast?: boolean
  familyFriendly?: boolean
  coupleFriendly?: boolean
  pool?: boolean
  parking?: boolean
  restaurant?: boolean
  airportPickup?: boolean
  maxDistanceFromBeach?: number
  sortBy?: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'distance' | 'beachfront'
  page?: number
}

export interface BookingFormData {
  guestName: string
  guestEmail: string
  guestPhone: string
  nationality?: string
  nidPassport?: string
  specialRequests?: string
  paymentMethod: string
  addons?: string[]
}
