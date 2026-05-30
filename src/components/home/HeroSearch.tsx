'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Users, Home, ChevronDown } from 'lucide-react'

export interface HeroSearchProps {
  onSearch?: (params: any) => void
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [guests, setGuests] = useState<number>(1)
  const [rooms, setRooms] = useState<number>(1)
  const [area, setArea] = useState<string>('')

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        checkIn,
        checkOut,
        guests,
        rooms,
        area,
      })
    }
  }

  return (
    <div className="bg-gradient-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Stay in Cox's Bazar
          </h1>
          <p className="text-xl text-blue-100">Book hotels with confidence</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Check-in */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Rooms */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  min="1"
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Area */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <div className="relative">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="">All Areas</option>
                  <option value="laboni-beach">Laboni Beach</option>
                  <option value="kolatoli">Kolatoli</option>
                  <option value="sugandha-beach">Sugandha Beach</option>
                  <option value="marine-drive">Marine Drive</option>
                  <option value="inani-beach">Inani Beach</option>
                  <option value="himchari">Himchari</option>
                  <option value="teknaf-road">Teknaf Road</option>
                  <option value="dolphin-moor">Dolphin Moor</option>
                  <option value="burmese-market-area">Burmese Market Area</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
