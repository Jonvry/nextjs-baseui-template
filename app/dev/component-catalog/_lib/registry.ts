import type { ComponentType } from "react"
import { ButtonShowcase } from "../_components/button-showcase"
import { DesignTokensShowcase } from "../_components/design-tokens-showcase"
import { DialogShowcase } from "../_components/dialog-showcase"
import { InputShowcase } from "../_components/input-showcase"

export type ComponentSlug = "design-tokens" | "button" | "input" | "dialog"
export type ComponentKind = "foundation" | "primitive"

type Entry = {
   slug: ComponentSlug
   label: string
   kind: ComponentKind
   Showcase: ComponentType
}

export const COMPONENT_REGISTRY: Entry[] = [
   {
      slug: "design-tokens",
      label: "Design tokens",
      kind: "foundation",
      Showcase: DesignTokensShowcase,
   },
   { slug: "button", label: "Button", kind: "primitive", Showcase: ButtonShowcase },
   { slug: "input", label: "Input", kind: "primitive", Showcase: InputShowcase },
   { slug: "dialog", label: "Dialog", kind: "primitive", Showcase: DialogShowcase },
]

export const DEFAULT_SLUG: ComponentSlug = "button"

export function resolveSlug(value: string | undefined): ComponentSlug {
   const match = COMPONENT_REGISTRY.find((entry) => entry.slug === value)
   return match ? match.slug : DEFAULT_SLUG
}
