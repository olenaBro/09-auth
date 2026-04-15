import { NextRequest, NextResponse } from 'next/server';

const privatePaths = ['/notes', '/profile'];
const authPaths = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = !!accessToken || !!refreshToken;

  const isPrivate = privatePaths.some(path => pathname.startsWith(path));
  const isAuth = authPaths.some(path => pathname.startsWith(path));

  if (isPrivate && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuth && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
