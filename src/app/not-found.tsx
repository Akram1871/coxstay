export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 text-xl mb-4">Page not found</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
