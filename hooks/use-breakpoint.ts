import { useSyncExternalStore } from "react"

const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024

export type Breakpoint = "mobile" | "tablet" | "desktop"

function subscribe(callback: () => void) {
   const tabletQuery = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`)
   const desktopQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
   tabletQuery.addEventListener("change", callback)
   desktopQuery.addEventListener("change", callback)
   return () => {
      tabletQuery.removeEventListener("change", callback)
      desktopQuery.removeEventListener("change", callback)
   }
}

function getSnapshot(): Breakpoint {
   const width = window.innerWidth
   if (width < TABLET_BREAKPOINT) return "mobile"
   if (width < DESKTOP_BREAKPOINT) return "tablet"
   return "desktop"
}

function getServerSnapshot(): Breakpoint {
   return "desktop"
}

export function useBreakpoint(): Breakpoint {
   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useIsMobile() {
   return useBreakpoint() === "mobile"
}

export function useIsTablet() {
   return useBreakpoint() === "tablet"
}

export function useIsDesktop() {
   return useBreakpoint() === "desktop"
}
