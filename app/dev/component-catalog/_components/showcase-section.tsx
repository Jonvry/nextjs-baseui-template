import { type ReactNode } from "react"

type ShowcaseSectionProps = {
   title: string
   description?: string
   children: ReactNode
}

export function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
   return (
      <section className="space-y-4">
         <header className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            {description && <p>{description}</p>}
         </header>

         <div className="space-y-6 rounded-lg border p-6">{children}</div>
      </section>
   )
}
