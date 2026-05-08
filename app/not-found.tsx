import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
   title: "Not Found",
   description: "The page you are looking for does not exist.",
}

export default function NotFound() {
   return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
         <h1 className="text-5xl font-bold text-foreground md:text-7xl">404</h1>
         <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
         <p className="mt-2 max-w-md text-muted-foreground">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
         </p>
         <Link
            href="/"
            className="mt-4 rounded-lg bg-primary px-5 py-2 font-semibold text-white transition hover:opacity-80"
         >
            Go back home
         </Link>
      </div>
   )
}
