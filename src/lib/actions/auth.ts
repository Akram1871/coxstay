import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

// Mock cookies for static export compatibility
const mockCookies = {
  set: (name: string, value: string, options: any) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=${value}; path=/;`
    }
  },
}

async function getCookies() {
  try {
    const { cookies } = await import('next/headers')
    return await cookies()
  } catch (error) {
    return mockCookies
  }
}

export async function registerUser(email: string, password: string, name: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        error: 'Email already registered',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER',
      },
    })

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: '30d' }
    )

    // Set cookie
    const cookieStore = await getCookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Registration failed',
    }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return {
        success: false,
        error: 'Invalid password',
      }
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: '30d' }
    )

    // Set cookie
    const cookieStore = await getCookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Login failed',
    }
  }
}

export async function logoutUser() {
  const cookieStore = await getCookies()
  if ('delete' in cookieStore) {
    cookieStore.delete('auth-token')
  }
}
