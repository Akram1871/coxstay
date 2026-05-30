export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About CoxStay</h1>

        <div className="space-y-8 text-gray-700">
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              CoxStay is dedicated to making hotel bookings in Cox's Bazar easy, affordable, and enjoyable. We believe everyone deserves a perfect beach vacation at their favorite destination.
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose CoxStay?</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span><strong>Best Prices:</strong> We guarantee the lowest hotel rates in Cox's Bazar</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span><strong>Easy Booking:</strong> Book your perfect hotel in just a few clicks</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span><strong>24/7 Support:</strong> Our team is always here to help you</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span><strong>Beach Focused:</strong> All our hotels are in beautiful Cox's Bazar</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span><strong>Multiple Payment Options:</strong> Pay with Bkash, Nagad, Rocket, Card, or at hotel</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">Have questions? We'd love to hear from you!</p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> support@coxstay.com</li>
              <li><strong>Phone:</strong> +880 1234 567890</li>
              <li><strong>Address:</strong> Cox's Bazar, Bangladesh</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
