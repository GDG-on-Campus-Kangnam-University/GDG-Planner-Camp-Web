// lib/sessions.ts
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export type UserRole = 'admin' | 'user' | 'guest'

interface SessionContent {
  user?: {
    id: number
    role: UserRole
  }
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: 'gdg_kangnam',
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    },
  })
}
