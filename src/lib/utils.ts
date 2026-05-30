export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-BD', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / oneDay)
}

export function calculateBookingTotal(
  pricePerNight: number,
  nights: number,
  rooms: number,
  addons?: number
): {
  subtotal: number
  vat: number
  serviceFee: number
  addonTotal: number
  totalAmount: number
} {
  const subtotal = pricePerNight * nights * rooms
  const vat = subtotal * 0.1
  const serviceFee = subtotal * 0.05
  const addonTotal = addons || 0
  const totalAmount = subtotal + vat + serviceFee + addonTotal

  return {
    subtotal,
    vat,
    serviceFee,
    addonTotal,
    totalAmount,
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
