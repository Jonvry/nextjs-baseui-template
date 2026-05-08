"use client"

import { Button } from "@/components/ui/button"
import {
   Drawer,
   DrawerBackdrop,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerInnerContent,
   DrawerPopup,
   DrawerPortal,
   DrawerTitle,
   DrawerTrigger,
   DrawerViewport,
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
                  <DrawerBackdrop className="fixed inset-0 z-50 bg-black opacity-[calc(0.4*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*0.4s)] data-starting-style:opacity-0 data-swiping:duration-0 dark:opacity-[calc(0.7*(1-var(--drawer-swipe-progress)))]" />
                  <DrawerViewport className="fixed inset-0 z-50 flex flex-col items-end justify-end">
                     <DrawerPopup
                        data-side="bottom"
                        style={{ transform: "translateY(var(--drawer-swipe-movement-y))" }}
                        className="pointer-events-none mx-auto box-border flex w-full max-w-md flex-col gap-3 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0))] transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform outline-none data-ending-style:translate-y-[calc(100%+1rem+2px)]! data-ending-style:duration-[calc(var(--drawer-swipe-strength)*0.4s)] data-starting-style:translate-y-[calc(100%+1rem+2px)]! data-swiping:select-none"
                     >
                        <DrawerInnerContent className="pointer-events-auto overflow-hidden rounded-2xl bg-popover text-popover-foreground outline outline-border">
                           <DrawerTitle className="sr-only">Profile actions</DrawerTitle>
                           <DrawerDescription className="sr-only">
                              Choose an action for this user.
                           </DrawerDescription>

                           <ul aria-label="Profile actions" className="m-0 list-none p-0">
                              {PROFILE_ACTIONS.map((action, index) => (
                                 <li
                                    key={action}
                                    className={index !== 0 ? "border-t border-border" : undefined}
                                 >
                                    {index === 0 && (
                                       <DrawerClose className="sr-only">
                                          Close action sheet
                                       </DrawerClose>
                                    )}
                                    <DrawerClose
                                       render={
                                          <button
                                             type="button"
                                             className="w-full px-5 py-4 text-center text-base text-foreground transition-colors outline-none hover:bg-muted focus-visible:bg-muted"
                                          />
                                       }
                                    >
                                       {action}
                                    </DrawerClose>
                                 </li>
                              ))}
                           </ul>
                        </DrawerInnerContent>

                        <div className="pointer-events-auto overflow-hidden rounded-2xl bg-popover outline outline-border">
                           <DrawerClose
                              render={
                                 <button
                                    type="button"
                                    className="w-full px-5 py-4 text-center text-base text-destructive transition-colors outline-none hover:bg-muted focus-visible:bg-muted"
                                 />
                              }
                           >
                              Block User
                           </DrawerClose>
                        </div>
                     </DrawerPopup>
                  </DrawerViewport>
               </DrawerPortal>
            </Drawer>
         </ShowcaseRow>
      </ShowcaseSection>
   )
}
