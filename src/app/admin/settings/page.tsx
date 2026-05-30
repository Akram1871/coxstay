import { AdminGuard } from '@/lib/guards'

export default async function AdminSettingsPage() {
  await AdminGuard()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Settings</h1>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="CoxStay"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Site Description</label>
                <textarea
                  rows={4}
                  defaultValue="Hotel booking platform for Cox's Bazar, Bangladesh"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Booking Settings */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Booking Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">VAT Percentage (%)</label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Service Fee Percentage (%)</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
          </div>

          <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
