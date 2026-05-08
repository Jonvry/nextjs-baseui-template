"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
   // error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   return (
      <html>
         <body className="grid min-h-dvh place-items-center">
            <section>
               <h2 className="text-2xl font-semibold text-foreground">Something went wrong!</h2>
               <Button onClick={() => reset()}>Try again</Button>
            </section>
         </body>
      </html>
   )
}
