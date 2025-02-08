import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/proposal(.*)', '/api/page(.*)', '/api/webhooks/register'])

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth()
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    if (!isPublicRoute(request)) {
        if (!userId) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.next({ headers });
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}