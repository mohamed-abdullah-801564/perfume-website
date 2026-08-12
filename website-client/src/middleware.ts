import { clerkMiddleware } from '@clerk/nextjs/server';

// By default, clerkMiddleware() leaves all routes public, meaning that pages like
// /product/(.*) and /collections/(.*) are fully accessible without triggering
// session token checks on unauthenticated page views. Access checks are handled at
// the component level (e.g. cart/checkout redirections).
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};