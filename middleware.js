import {NextResponse} from 'next/server'
import {auth} from '@/auth'

export async function middleware(request) {
  const session = await auth()
  const user = session?.user?.email
  if (!user) return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next()
}

//PROTECTED ROUTES
export const config = {
  matcher: ['/standings', '/book'],
}
