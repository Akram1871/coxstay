import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export async function PageGuard() {
  try {
    const session = await getSession()
    if (!session) {
      redirect('/login')
    }
    return session
  } catch (error) {
    // For static export, session checking may not work
    return null
  }
}

export async function AdminGuard() {
  try {
    const session = await PageGuard()
    if (session && session.role !== 'ADMIN') {
      redirect('/dashboard')
    }
    return session
  } catch (error) {
    // For static export, admin checking may not work
    return null
  }
}
