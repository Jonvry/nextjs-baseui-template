"use client"

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { Button } from "@/components/ui/button"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerPortal,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { ShowcaseRow } from "./showcase-row"
import { ShowcaseSection } from "./showcase-section"

const PROFILE_ACTIONS = [
   "Unfollow",
   "Mute",
   "Add to Favourites",
   "Add to Close Friends",
   "Restrict",
]

export function DrawerShowcase() {
   return (
      <ShowcaseSection
         title="Drawer"
         description="components/ui/drawer.tsx — Base UI primitive with swipe gestures and a drag handle on bottom drawers."
      >
         <ShowcaseRow label="Bottom (default)">
            <Drawer>
               <DrawerTrigger render={<Button variant="outline">Open bottom</Button>} />
               <DrawerContent side="bottom">
                  <DrawerHeader>
                     <DrawerTitle>Edit profile</DrawerTitle>
                     <DrawerDescription>
                        Make changes here. Drag the handle or swipe down to dismiss.
                     </DrawerDescription>
                  </DrawerHeader>

                  <div className="space-y-3 px-6 pb-2">
                     <Input placeholder="Name" />
                     <Input placeholder="Email" type="email" />
                  </div>

                  <DrawerFooter>
                     <DrawerClose render={<Button>Save</Button>} />
                     <DrawerClose render={<Button variant="ghost">Cancel</Button>} />
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </ShowcaseRow>

         <ShowcaseRow label="Right">
            <Drawer swipeDirection="right">
               <DrawerTrigger render={<Button variant="outline">Open right</Button>} />
               <DrawerContent side="right">
                  <DrawerHeader>
                     <DrawerTitle>Filters</DrawerTitle>
                     <DrawerDescription>Refine the current view.</DrawerDescription>
                  </DrawerHeader>

                  <div className="space-y-3 px-6">
                     <Input placeholder="Search..." />
                  </div>

                  <DrawerFooter>
                     <DrawerClose render={<Button>Apply</Button>} />
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </ShowcaseRow>

         <ShowcaseRow label="Left">
            <Drawer swipeDirection="left">
               <DrawerTrigger render={<Button variant="outline">Open left</Button>} />
               <DrawerContent side="left">
                  <DrawerHeader>
                     <DrawerTitle>Navigation</DrawerTitle>
                     <DrawerDescription>App sections.</DrawerDescription>
                  </DrawerHeader>

                  <div className="px-6 pb-6">
                     <ul className="space-y-2">
                        <li>Dashboard</li>
                        <li>Inbox</li>
                        <li>Settings</li>
                     </ul>
                  </div>
               </DrawerContent>
            </Drawer>
         </ShowcaseRow>

         <ShowcaseRow label="Top">
            <Drawer swipeDirection="up">
               <DrawerTrigger render={<Button variant="outline">Open top</Button>} />
               <DrawerContent side="top">
                  <DrawerHeader>
                     <DrawerTitle>Notifications</DrawerTitle>
                     <DrawerDescription>You have 3 unread items.</DrawerDescription>
                  </DrawerHeader>
               </DrawerContent>
            </Drawer>
         </ShowcaseRow>

         <ShowcaseRow label="Without close button">
            <Drawer>
               <DrawerTrigger render={<Button variant="outline">Open</Button>} />
               <DrawerContent side="bottom" showCloseButton={false}>
                  <DrawerHeader>
                     <DrawerTitle>Confirm action</DrawerTitle>
                     <DrawerDescription>
                        Use the action buttons below — no close icon.
                     </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                     <DrawerClose render={<Button variant="destructive">Delete</Button>} />
                     <DrawerClose render={<Button variant="ghost">Cancel</Button>} />
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </ShowcaseRow>

         <ShowcaseRow label="Action sheet">
            <Drawer>
               <DrawerTrigger render={<Button variant="outline">Open action sheet</Button>} />
               <DrawerPortal>
                  <DrawerOverlay />
                  <DrawerPrimitive.Viewport
                     data-slot="drawer-viewport"
                     className="fixed inset-0 z-50 flex flex-col items-center justify-end p-3"
                  >
                     <DrawerPrimitive.Popup
                        data-slot="drawer-content"
                        data-side="bottom"
                        className="flex w-full max-w-md flex-col gap-3 outline-none transition-transform duration-300 ease-out data-starting-style:translate-y-[110%] data-ending-style:translate-y-[110%]"
                     >
                        <DrawerPrimitive.Content className="bg-popover text-popover-foreground rounded-3xl shadow-lg ring-1 ring-foreground/5">
                           <DrawerPrimitive.Title className="sr-only">
                              Profile actions
                           </DrawerPrimitive.Title>
                           <DrawerPrimitive.Description className="sr-only">
                              Choose an action for this user.
                           </DrawerPrimitive.Description>

                           <ul aria-label="Profile actions" className="divide-y divide-border">
                              {PROFILE_ACTIONS.map((action, index) => (
                                 <li key={action}>
                                    {index === 0 && (
                                       <DrawerPrimitive.Close className="sr-only">
                                          Close action sheet
                                       </DrawerPrimitive.Close>
                                    )}
                                    <DrawerPrimitive.Close
                                       render={
                                          <button
                                             type="button"
                                             className="text-foreground hover:bg-muted w-full px-4 py-3.5 text-center text-base transition-colors"
                                          />
                                       }
                                    >
                                       {action}
                                    </DrawerPrimitive.Close>
                                 </li>
                              ))}
                           </ul>
                        </DrawerPrimitive.Content>

                        <div className="bg-popover rounded-3xl shadow-lg ring-1 ring-foreground/5">
                           <DrawerPrimitive.Close
                              render={
                                 <button
                                    type="button"
                                    className="text-destructive hover:bg-destructive/10 w-full rounded-3xl px-4 py-3.5 text-center text-base font-medium transition-colors"
                                 />
                              }
                           >
                              Block User
                           </DrawerPrimitive.Close>
                        </div>
                     </DrawerPrimitive.Popup>
                  </DrawerPrimitive.Viewport>
               </DrawerPortal>
            </Drawer>
         </ShowcaseRow>
      </ShowcaseSection>
   )
}
