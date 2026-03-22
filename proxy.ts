import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const response = await checkSession();
      const setCookie = response.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        cookieArray.forEach(cookieString => {
          const [nameValue, ...attrs] = cookieString.split(';');
          const parsed = parse(nameValue);

          const options: { path?: string; expires?: Date; maxAge?: number } = {};
          attrs.forEach(attr => {
            const [key, value] = attr.trim().split('=');
            if (!value) return;
            if (key.toLowerCase() === 'path') options.path = value;
            if (key.toLowerCase() === 'expires') options.expires = new Date(value);
            if (key.toLowerCase() === 'max-age') options.maxAge = Number(value);
          });

          if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
        });

        if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));
        if (isPrivateRoute) return NextResponse.next();
      }
    }

    if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
    return NextResponse.next();
  }

  if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));
  if (isPrivateRoute) return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
