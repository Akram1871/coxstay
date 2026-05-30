import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export async function PageGuard() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function AdminGuard() {
  const session = await PageGuard()
  if (session.role !== 'ADMIN') {
    redirect('/dashboard')
  }
  return session
}
