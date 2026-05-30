import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key')

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, SECRET)
    return verified.payload as any
  } catch (err) {
    return null
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) return null

    const session = await verifyAuth(token)
    return session
  } catch (err) {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function requireAdmin() {
  const session = await requireAuth()

  if (session.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required')
  }

  return session
}
