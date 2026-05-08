import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CatalogSidebar } from "./_components/catalog-sidebar"
import { COMPONENT_REGISTRY, resolveSlug } from "./_lib/registry"

export const metadata: Metadata = {
   title: "Component catalog",
}

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ component?: string }>
}) {
   if (process.env.NODE_ENV === "production") {
      return notFound()
   }

   const { component } = await searchParams
   const activeSlug = component ? resolveSlug(component) : null
   const active = activeSlug ? COMPONENT_REGISTRY.find((entry) => entry.slug === activeSlug) : null

   return (
      <SidebarProvider>
         <CatalogSidebar activeSlug={activeSlug} />
         <SidebarInset>
            <header className="flex h-14 items-center gap-3 border-b px-4">
               <SidebarTrigger />
               <h1 className="font-semibold text-foreground">
                  {active ? active.label : "Component catalog"}
               </h1>
            </header>

            <section className="space-y-8 p-6 sm:p-10">
               {active ? (
                  <active.Showcase />
               ) : (
                  <header className="max-w-4xl space-y-2">
                     <p className="text-xs font-medium tracking-widest uppercase">Dev only</p>
                     <h2 className="text-3xl font-semibold text-foreground">Component catalog</h2>
                     <p className="text-base">
                        Visual reference for installed UI primitives. Pick a component from the
                        sidebar to view its variants. Add a new showcase under&nbsp;
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">_components/</code>
                        &nbsp; and register it in&nbsp;
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">
                           _lib/registry.ts
                        </code>
                        &nbsp; when you install a new shadcn component.
                     </p>
                  </header>
               )}
            </section>
         </SidebarInset>
      </SidebarProvider>
   )
}
