import { Input } from "@/components/ui/input"
import { ShowcaseRow } from "./showcase-row"
import { ShowcaseSection } from "./showcase-section"

export function InputShowcase() {
   return (
      <ShowcaseSection title="Input" description="components/ui/input.tsx — Base UI primitive.">
         <ShowcaseRow label="Default">
            <Input placeholder="Type something..." className="max-w-sm" />
         </ShowcaseRow>

         <ShowcaseRow label="Types">
            <Input type="email" placeholder="email@example.com" className="max-w-sm" />
            <Input type="password" placeholder="Password" className="max-w-sm" />
            <Input type="number" placeholder="0" className="max-w-sm" />
         </ShowcaseRow>

         <ShowcaseRow label="States">
            <Input placeholder="Disabled" disabled className="max-w-sm" />
            <Input placeholder="Invalid" aria-invalid className="max-w-sm" />
            <Input defaultValue="With value" className="max-w-sm" />
         </ShowcaseRow>

         <ShowcaseRow label="File">
            <Input type="file" className="max-w-sm" />
         </ShowcaseRow>
      </ShowcaseSection>
   )
}
