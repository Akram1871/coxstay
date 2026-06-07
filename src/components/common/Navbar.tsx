'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'
import { getSession } from '@/lib/auth'

// Client-side logout handler
async function handleLogout() {
  // Clear the auth token from cookies
  document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;'
  window.location.href = '/'
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Note: In a real app, you'd fetch this properly
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth-token='))
      ?.split('=')[1]

    if (token) {
      // Decode token to get user info
      try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        setSession(JSON.parse(jsonPayload))
      } catch (e) {
        setSession(null)
      }
    }
  }, [])

  const handleLogoutClick = async () => {
    // Clear the auth token from cookies
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;'
    window.location.href = '/'
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline text-primary-700">CoxStay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/hotels"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/hotels') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Hotels
            </Link>
            <Link
              href="/areas"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/areas') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Areas
            </Link>
            <Link
              href="/attractions"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/attractions') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Attractions
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {session.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-primary-600"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Home
            </Link>
            <Link
              href="/hotels"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Hotels
            </Link>
            <Link
              href="/areas"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Areas
            </Link>
            <Link
              href="/attractions"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600"
            >
              Attractions
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
