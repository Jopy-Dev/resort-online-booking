import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const pathname = request.nextUrl.pathname;

  // 1. Stealth Security Rule: Force 404 on hardcoded backend routes to prevent discovery probes
  // We rewrite to an intentional fake 404 so it displays our custom not-found.tsx
  if (pathname.startsWith('/admin')) {
    // Note: Assuming /jmaster_login is where the actual auth resolves. 
    // Simply hiding /admin prevents general snooping.
    const url = request.nextUrl.clone();
    url.pathname = '/404_stealth'; 
    return NextResponse.rewrite(url);
  }

  // 2. Global Maintenance Mode Rule
  // If active, redirect everything to /maintenance EXCEPT the secret login route
  if (isMaintenanceMode) {
    if (
      !pathname.startsWith('/maintenance') &&
      !pathname.startsWith('/jmaster_login') &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.')
    ) {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
