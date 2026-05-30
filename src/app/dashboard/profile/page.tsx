import { PageGuard } from '@/lib/guards'

export default async function ProfilePage() {
  const session = await PageGuard()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <p className="text-gray-900 font-medium mb-4">{session.email}</p>

              <label className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={session.name || ''}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
              />

              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input
                type="tel"
                placeholder="Your phone number"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Nationality</label>
              <input
                type="text"
                placeholder="Your nationality"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
              />

              <label className="block text-gray-700 font-bold mb-2">Account Type</label>
              <p className="text-gray-900 font-medium mb-4 capitalize">{session.role}</p>

              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
