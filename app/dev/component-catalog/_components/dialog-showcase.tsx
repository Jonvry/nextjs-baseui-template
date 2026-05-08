"use client"

import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ShowcaseRow } from "./showcase-row"
import { ShowcaseSection } from "./showcase-section"

export function DialogShowcase() {
   return (
      <ShowcaseSection
         title="Dialog"
         description="components/ui/dialog.tsx — Base UI primitive with overlay + content."
      >
         <ShowcaseRow label="Basic">
            <Dialog>
               <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Edit profile</DialogTitle>
                     <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                     </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-3 py-2">
                     <Input placeholder="Name" />
                     <Input placeholder="Email" type="email" />
                  </div>

                  <DialogFooter>
                     <DialogClose render={<Button variant="ghost">Cancel</Button>} />
                     <DialogClose render={<Button>Save</Button>} />
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </ShowcaseRow>
      </ShowcaseSection>
   )
}
