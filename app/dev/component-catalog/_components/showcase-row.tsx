import { type ReactNode } from "react"

type ShowcaseRowProps = {
   label: string
   children: ReactNode
}

export function ShowcaseRow({ label, children }: ShowcaseRowProps) {
   return (
      <div className="grid items-center gap-4 sm:grid-cols-[140px_1fr]">
         <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
         <div className="flex flex-wrap items-center gap-3">{children}</div>
      </div>
   )
}
