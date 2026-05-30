'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Waves, Heart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export interface HotelCardProps {
  id: string
  name: string
  area: string
  nearestBeach: string
  distanceToBeach: number
  starRating: number
  guestRating?: number
  images: string
  pricePerNight: number
  discountPrice?: number
  isBeachfront: boolean
  hasSeaView: boolean
}

export function HotelCard({
  id,
  name,
  area,
  nearestBeach,
  distanceToBeach,
  starRating,
  guestRating,
  images,
  pricePerNight,
  discountPrice,
  isBeachfront,
  hasSeaView,
}: HotelCardProps) {
  const imageList = JSON.parse(images)
  const mainImage = imageList[0] || '/placeholder.jpg'

  return (
    <Link href={`/hotels/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          {isBeachfront && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
              Beachfront
            </div>
          )}
          {hasSeaView && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
              <Waves size={14} />
              <span>Sea View</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{name}</h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin size={14} className="mr-1" />
            <span className="line-clamp-1">{area}</span>
          </div>

          {/* Beach Info */}
          <div className="text-xs text-gray-500 mb-3">
            {distanceToBeach === 0 ? (
              <span className="font-medium text-primary-600">On the beach</span>
            ) : (
              <span>{distanceToBeach}km from {nearestBeach}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(Math.floor(starRating))].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            {guestRating && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                {guestRating.toFixed(1)}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="border-t pt-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(discountPrice || pricePerNight)}
              </span>
              {discountPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(pricePerNight)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600">per night</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
