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
import { COMPONENT_REGISTRY, type ComponentKind, type ComponentSlug } from "../_lib/registry"

type CatalogSidebarProps = {
   activeSlug: ComponentSlug | null
}

const GROUPS: { kind: ComponentKind; label: string }[] = [
   { kind: "foundation", label: "Foundations" },
   { kind: "primitive", label: "Primitives" },
]

export function CatalogSidebar({ activeSlug }: CatalogSidebarProps) {
   return (
      <Sidebar>
         <SidebarHeader>
            <div className="text-foreground px-2 py-1 font-semibold">Component catalog</div>
         </SidebarHeader>

         <SidebarContent>
            {GROUPS.map((group) => {
               const entries = COMPONENT_REGISTRY.filter((entry) => entry.kind === group.kind)
               if (entries.length === 0) return null

               return (
                  <SidebarGroup key={group.kind}>
                     <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                     <SidebarGroupContent>
                        <SidebarMenu>
                           {entries.map((entry) => (
                              <SidebarMenuItem key={entry.slug}>
                                 <SidebarMenuButton
                                    isActive={entry.slug === activeSlug}
                                    render={
                                       <Link
                                          href={`/dev/component-catalog?component=${entry.slug}`}
                                       />
                                    }
                                 >
                                    <span>{entry.label}</span>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           ))}
                        </SidebarMenu>
                     </SidebarGroupContent>
                  </SidebarGroup>
               )
            })}
         </SidebarContent>
      </Sidebar>
   )
}
