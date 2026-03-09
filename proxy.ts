import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/sign-in', '/sign-up'];

const privateRoutes = ['/profile', '/notes', '/notes/action/create'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivate = privateRoutes.some(route => pathname.startsWith(route));

  const hasCookie = request.cookies.size > 0;

  if (isPrivate && !hasCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && hasCookie) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
