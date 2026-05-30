import { PageGuard } from '@/lib/guards'

export default async function SettingsPage() {
  const session = await PageGuard()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Email Notifications</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="promotional" defaultChecked />
                <label htmlFor="promotional" className="ml-3">
                  Receive promotional offers and deals
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="booking" defaultChecked />
                <label htmlFor="booking" className="ml-3">
                  Booking confirmation and updates
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="newsletter" defaultChecked />
                <label htmlFor="newsletter" className="ml-3">
                  Subscribe to our newsletter
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Privacy Settings</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="profile" defaultChecked />
                <label htmlFor="profile" className="ml-3">
                  Make profile public
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="reviews" defaultChecked />
                <label htmlFor="reviews" className="ml-3">
                  Show my reviews publicly
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Danger Zone</h2>
            <p className="text-red-700 mb-4">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded">
              Delete Account
            </button>
          </div>

          <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
