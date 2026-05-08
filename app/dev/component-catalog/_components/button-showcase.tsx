import { ArrowRight01Icon, Cancel01Icon, Download04Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { ShowcaseRow } from "./showcase-row"
import { ShowcaseSection } from "./showcase-section"

export function ButtonShowcase() {
   return (
      <ShowcaseSection
         title="Button"
         description="components/ui/button.tsx — Base UI primitive with cva variants."
      >
         <ShowcaseRow label="Variants">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
         </ShowcaseRow>

         <ShowcaseRow label="Sizes">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">default</Button>
            <Button size="lg">lg</Button>
         </ShowcaseRow>

         <ShowcaseRow label="States">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
            <Button aria-invalid>Invalid</Button>
         </ShowcaseRow>

         <ShowcaseRow label="With icon">
            <Button>
               <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" strokeWidth={2} />
               Download
            </Button>
            <Button variant="outline">
               Continue
               <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" strokeWidth={2} />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Close">
               <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            </Button>
         </ShowcaseRow>
      </ShowcaseSection>
   )
}
