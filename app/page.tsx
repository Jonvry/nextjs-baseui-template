import Link from "next/link"
import { InstallPrompt } from "@/components/install-prompt"
import { Button } from "@/components/ui/button"

export default function Page() {
   return (
      <>
         <InstallPrompt />
         <div className="flex min-h-svh items-center justify-center p-6">
            <div className="flex max-w-md min-w-0 flex-col items-center gap-6 leading-loose">
               <section className="space-y-2">
                  <h1 className="text-base font-medium text-foreground">Project ready!</h1>
                  <p>
                     Next.js 16 starter with React 19, Tailwind v4, and shadcn/ui on Base UI
                     primitives. Clone, customize, ship.
                  </p>
               </section>

               <section className="space-y-2">
                  <h2 className="text-sm font-medium text-foreground">Component catalog</h2>
                  <p>
                     A dev-only reference for installed UI primitives and design tokens (colors,
                     radii, typography). Use it to preview variants, copy patterns, and verify dark
                     mode while building.
                  </p>
                  <Button
                     nativeButton={false}
                     render={<Link href="/dev/component-catalog" />}
                     className="mt-2"
                  >
                     Open catalog
                  </Button>
               </section>
               <div className="self-start font-mono text-xs text-muted-foreground">
                  (Press <kbd>d</kbd> to toggle dark mode)
               </div>
            </div>
         </div>
      </>
   )
}
