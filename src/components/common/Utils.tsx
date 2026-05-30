'use client'

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-primary-600 animate-spin"></div>
      </div>
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-800' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
    completed: { bg: 'bg-blue-100', text: 'text-blue-800' },
    paid: { bg: 'bg-green-100', text: 'text-green-800' },
    unpaid: { bg: 'bg-orange-100', text: 'text-orange-800' },
  }

  const style = statusStyles[status] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  return (
    <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-sm font-medium capitalize`}>
      {status}
    </span>
  )
}
