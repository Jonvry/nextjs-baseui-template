"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Side = "top" | "right" | "bottom" | "left"

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
   return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
   return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
   return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
   return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
   return (
      <DrawerPrimitive.Backdrop
         data-slot="drawer-overlay"
         className={cn(
            "fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
            className
         )}
         {...props}
      />
   )
}

function DrawerSwipeArea({ ...props }: DrawerPrimitive.SwipeArea.Props) {
   return <DrawerPrimitive.SwipeArea data-slot="drawer-swipe-area" {...props} />
}

function DrawerContent({
   className,
   children,
   side = "bottom",
   showCloseButton = true,
   showHandle,
   ...props
}: DrawerPrimitive.Popup.Props & {
   side?: Side
   showCloseButton?: boolean
   showHandle?: boolean
}) {
   const renderHandle = showHandle ?? side === "bottom"

   return (
      <DrawerPortal>
         <DrawerOverlay />
         <DrawerPrimitive.Viewport data-slot="drawer-viewport" className="fixed inset-0 z-50">
            <DrawerPrimitive.Popup
               data-slot="drawer-content"
               data-side={side}
               className={cn(
                  "group/drawer-content fixed z-50 flex flex-col bg-popover text-popover-foreground shadow-lg outline-none transition-transform duration-300 ease-out",
                  "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[85vh] data-[side=bottom]:rounded-t-4xl data-[side=bottom]:border-t data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full",
                  "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:max-h-[85vh] data-[side=top]:rounded-b-4xl data-[side=top]:border-b data-[side=top]:data-starting-style:-translate-y-full data-[side=top]:data-ending-style:-translate-y-full",
                  "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:rounded-r-4xl data-[side=left]:border-r data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full sm:data-[side=left]:max-w-sm",
                  "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:rounded-l-4xl data-[side=right]:border-l data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full sm:data-[side=right]:max-w-sm",
                  className
               )}
               {...props}
            >
               {renderHandle && (
                  <div
                     aria-hidden
                     className="bg-muted mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full"
                  />
               )}

               <DrawerPrimitive.Content
                  data-slot="drawer-content-inner"
                  className="flex min-h-0 flex-1 flex-col"
               >
                  {children}
               </DrawerPrimitive.Content>

               {showCloseButton && (
                  <DrawerPrimitive.Close
                     data-slot="drawer-close"
                     render={
                        <Button variant="ghost" size="icon-sm" className="absolute top-4 right-4" />
                     }
                  >
                     <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                     <span className="sr-only">Close</span>
                  </DrawerPrimitive.Close>
               )}
            </DrawerPrimitive.Popup>
         </DrawerPrimitive.Viewport>
      </DrawerPortal>
   )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="drawer-header"
         className={cn(
            "flex flex-col gap-1.5 p-6 group-data-[side=bottom]/drawer-content:text-center group-data-[side=top]/drawer-content:text-center sm:text-left",
            className
         )}
         {...props}
      />
   )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="drawer-footer"
         className={cn("mt-auto flex flex-col gap-2 p-6", className)}
         {...props}
      />
   )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
   return (
      <DrawerPrimitive.Title
         data-slot="drawer-title"
         className={cn("text-foreground font-heading text-base font-medium", className)}
         {...props}
      />
   )
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
   return (
      <DrawerPrimitive.Description
         data-slot="drawer-description"
         className={cn("text-muted-foreground text-sm", className)}
         {...props}
      />
   )
}

function DrawerProvider({ ...props }: DrawerPrimitive.Provider.Props) {
   return <DrawerPrimitive.Provider data-slot="drawer-provider" {...props} />
}

function DrawerIndent({ className, ...props }: DrawerPrimitive.Indent.Props) {
   return (
      <DrawerPrimitive.Indent
         data-slot="drawer-indent"
         className={cn(
            "transition-transform duration-300 ease-out data-active:scale-[0.96] data-active:rounded-3xl",
            className
         )}
         {...props}
      />
   )
}

function DrawerIndentBackground({ className, ...props }: DrawerPrimitive.IndentBackground.Props) {
   return (
      <DrawerPrimitive.IndentBackground
         data-slot="drawer-indent-background"
         className={cn("bg-background fixed inset-0 -z-10", className)}
         {...props}
      />
   )
}

export {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerIndent,
   DrawerIndentBackground,
   DrawerOverlay,
   DrawerPortal,
   DrawerProvider,
   DrawerSwipeArea,
   DrawerTitle,
   DrawerTrigger,
}
