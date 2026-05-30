'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-gray-600 text-lg mb-8">Something went wrong</p>
        <p className="text-gray-600 mb-8">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
