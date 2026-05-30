import type { Metadata } from 'next'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'CoxStay - Hotel Booking in Cox\'s Bazar',
  description: 'Book hotels in Cox\'s Bazar with CoxStay - Your trusted booking platform',
  keywords: 'Cox\'s Bazar, hotels, booking, travel, Bangladesh',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
