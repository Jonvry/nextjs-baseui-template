import type { ComponentType } from "react"
import { ButtonShowcase } from "../_components/button-showcase"
import { DialogShowcase } from "../_components/dialog-showcase"
import { InputShowcase } from "../_components/input-showcase"

export type ComponentSlug = "button" | "input" | "dialog"

type Entry = {
   slug: ComponentSlug
   label: string
   Showcase: ComponentType
}

export const COMPONENT_REGISTRY: Entry[] = [
   { slug: "button", label: "Button", Showcase: ButtonShowcase },
   { slug: "input", label: "Input", Showcase: InputShowcase },
   { slug: "dialog", label: "Dialog", Showcase: DialogShowcase },
]

export const DEFAULT_SLUG: ComponentSlug = "button"

export function resolveSlug(value: string | undefined): ComponentSlug {
   const match = COMPONENT_REGISTRY.find((entry) => entry.slug === value)
   return match ? match.slug : DEFAULT_SLUG
}
