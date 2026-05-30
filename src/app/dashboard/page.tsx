import { PageGuard } from '@/lib/guards'
import Link from 'next/link'
import { User, Bookmark, Settings, LogOut } from 'lucide-react'

export default async function DashboardPage() {
  const session = await PageGuard()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, {session.name || 'User'}!</h1>
        <p className="text-gray-600 mb-12">Manage your account and bookings</p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Link href="/dashboard/profile">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <User className="text-primary-600" size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">My Profile</h2>
              <p className="text-gray-600">View and edit your profile information</p>
            </div>
          </Link>

          {/* Bookings Card */}
          <Link href="/dashboard/bookings">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <Bookmark className="text-accent-600" size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">My Bookings</h2>
              <p className="text-gray-600">View your hotel reservations</p>
            </div>
          </Link>

          {/* Settings Card */}
          <Link href="/dashboard/settings">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Settings className="text-orange-600" size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p className="text-gray-600">Manage account settings</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Email</p>
              <p className="font-bold text-lg">{session.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Account Type</p>
              <p className="font-bold text-lg capitalize">{session.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
