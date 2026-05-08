import { ShowcaseSection } from "./showcase-section"

const COLOR_GROUPS: { label: string; tokens: { name: string; className: string }[] }[] = [
   {
      label: "Surface",
      tokens: [
         { name: "background", className: "bg-background" },
         { name: "foreground", className: "bg-foreground" },
         { name: "card", className: "bg-card" },
         { name: "popover", className: "bg-popover" },
         { name: "muted", className: "bg-muted" },
      ],
   },
   {
      label: "Interactive",
      tokens: [
         { name: "primary", className: "bg-primary" },
         { name: "secondary", className: "bg-secondary" },
         { name: "accent", className: "bg-accent" },
         { name: "destructive", className: "bg-destructive" },
      ],
   },
   {
      label: "Borders & rings",
      tokens: [
         { name: "border", className: "bg-border" },
         { name: "input", className: "bg-input" },
         { name: "ring", className: "bg-ring" },
      ],
   },
   {
      label: "Sidebar",
      tokens: [
         { name: "sidebar", className: "bg-sidebar" },
         { name: "sidebar-foreground", className: "bg-sidebar-foreground" },
         { name: "sidebar-primary", className: "bg-sidebar-primary" },
         { name: "sidebar-accent", className: "bg-sidebar-accent" },
         { name: "sidebar-border", className: "bg-sidebar-border" },
      ],
   },
   {
      label: "Charts",
      tokens: [
         { name: "chart-1", className: "bg-chart-1" },
         { name: "chart-2", className: "bg-chart-2" },
         { name: "chart-3", className: "bg-chart-3" },
         { name: "chart-4", className: "bg-chart-4" },
         { name: "chart-5", className: "bg-chart-5" },
      ],
   },
]

const RADII = [
   { name: "sm", className: "rounded-sm" },
   { name: "md", className: "rounded-md" },
   { name: "lg", className: "rounded-lg" },
   { name: "xl", className: "rounded-xl" },
   { name: "2xl", className: "rounded-2xl" },
   { name: "3xl", className: "rounded-3xl" },
   { name: "4xl", className: "rounded-4xl" },
]

const TYPE_SCALE = [
   { name: "text-xs", className: "text-xs" },
   { name: "text-sm (default)", className: "text-sm" },
   { name: "text-base", className: "text-base" },
   { name: "text-lg", className: "text-lg" },
   { name: "text-xl", className: "text-xl" },
   { name: "text-2xl", className: "text-2xl" },
   { name: "text-3xl", className: "text-3xl" },
   { name: "text-4xl", className: "text-4xl" },
]

const FONT_WEIGHTS = [
   { name: "normal", className: "font-normal" },
   { name: "medium", className: "font-medium" },
   { name: "semibold", className: "font-semibold" },
   { name: "bold", className: "font-bold" },
]

export function DesignTokensShowcase() {
   return (
      <div className="space-y-12">
         <ShowcaseSection
            title="Colors"
            description="Semantic tokens defined in app/globals.css. Click theme toggle (or press 'd') to compare modes."
         >
            {COLOR_GROUPS.map((group) => (
               <div key={group.label} className="space-y-3">
                  <h3 className="text-foreground text-sm font-medium">{group.label}</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                     {group.tokens.map((token) => (
                        <div
                           key={token.name}
                           className="flex items-center gap-3 rounded-md border p-2"
                        >
                           <div
                              className={`size-12 shrink-0 rounded border ${token.className}`}
                              aria-hidden
                           />
                           <code className="text-foreground text-xs">{token.name}</code>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </ShowcaseSection>

         <ShowcaseSection
            title="Radii"
            description="--radius scale defined via @theme inline in app/globals.css."
         >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
               {RADII.map((r) => (
                  <div key={r.name} className="space-y-2">
                     <div
                        className={`bg-primary/20 border-primary/40 size-16 border ${r.className}`}
                     />
                     <code className="text-foreground text-xs">{r.name}</code>
                  </div>
               ))}
            </div>
         </ShowcaseSection>

         <ShowcaseSection
            title="Typography"
            description="Sans font is bound to --font-sans. Body defaults to text-sm + text-muted-foreground."
         >
            <div className="space-y-3">
               <h3 className="text-foreground text-sm font-medium">Size scale</h3>
               <div className="space-y-2">
                  {TYPE_SCALE.map((t) => (
                     <div key={t.name} className="flex items-baseline gap-4">
                        <code className="w-32 shrink-0 text-xs">{t.name}</code>
                        <span className={`text-foreground ${t.className}`}>
                           The quick brown fox
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="space-y-3">
               <h3 className="text-foreground text-sm font-medium">Weights</h3>
               <div className="space-y-2">
                  {FONT_WEIGHTS.map((w) => (
                     <div key={w.name} className="flex items-baseline gap-4">
                        <code className="w-32 shrink-0 text-xs">font-{w.name}</code>
                        <span className={`text-foreground text-base ${w.className}`}>
                           The quick brown fox
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </ShowcaseSection>
      </div>
   )
}
