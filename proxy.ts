import { NextResponse } from "next/server"

// Add a `request: NextRequest` param (import from "next/server") when you need
// to inspect or rewrite the incoming request. Mark `async` if using `await`.
export function proxy() {
   return NextResponse.next()
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
   ],
}
