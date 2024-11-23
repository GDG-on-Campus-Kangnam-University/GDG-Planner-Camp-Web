// middleware.ts
import getSession from '@/lib/sessions'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await getSession()
  const { pathname } = request.nextUrl

  const publicPaths = ['/', '/login']

  const adminPaths = /^\/admin(\/|$)/

  const isPublicPath = publicPaths.includes(pathname)
  const isAdminPath = adminPaths.test(pathname)

  if (!session.user) {
    console.log('Guest accessing:', pathname)
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  } else {
    const { role } = session.user

    console.log('Authenticated user with role:', role, 'accessing:', pathname)

    if (role === 'admin') {
      return NextResponse.next()
    } else if (role === 'user') {
      if (isAdminPath) {
        return NextResponse.redirect(new URL('/user/home', request.url))
      }
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
