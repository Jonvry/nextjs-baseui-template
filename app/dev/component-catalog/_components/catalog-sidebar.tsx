import Link from "next/link"
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { COMPONENT_REGISTRY, type ComponentSlug } from "../_lib/registry"

type CatalogSidebarProps = {
   activeSlug: ComponentSlug | null
}

export function CatalogSidebar({ activeSlug }: CatalogSidebarProps) {
   return (
      <Sidebar>
         <SidebarHeader>
            <div className="text-foreground px-2 py-1 font-semibold">Component catalog</div>
         </SidebarHeader>

         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Primitives</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {COMPONENT_REGISTRY.map((entry) => (
                        <SidebarMenuItem key={entry.slug}>
                           <SidebarMenuButton
                              isActive={entry.slug === activeSlug}
                              render={
                                 <Link href={`/dev/component-catalog?component=${entry.slug}`} />
                              }
                           >
                              <span>{entry.label}</span>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
      </Sidebar>
   )
}
