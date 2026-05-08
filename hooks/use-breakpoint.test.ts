import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useBreakpoint, useIsDesktop, useIsMobile, useIsTablet } from "./use-breakpoint"

describe("useBreakpoint", () => {
   const listeners = new Set<() => void>()
   const originalMatchMedia = window.matchMedia

   function setViewport(width: number) {
      Object.defineProperty(window, "innerWidth", {
         value: width,
         writable: true,
         configurable: true,
      })
      act(() => {
         listeners.forEach((fn) => fn())
      })
   }

   beforeEach(() => {
      listeners.clear()
      window.matchMedia = vi.fn((query: string) => {
         const minWidthMatch = /min-width:\s*(\d+)px/.exec(query)
         const minWidth = minWidthMatch ? Number(minWidthMatch[1]) : 0
         return {
            get matches() {
               return window.innerWidth >= minWidth
            },
            media: query,
            onchange: null,
            addEventListener: (_: string, fn: () => void) => listeners.add(fn),
            removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
         }
      }) as unknown as typeof window.matchMedia
   })

   afterEach(() => {
      window.matchMedia = originalMatchMedia
   })

   it("returns 'mobile' below 768px", () => {
      setViewport(500)
      const { result } = renderHook(() => useBreakpoint())
      expect(result.current).toBe("mobile")
   })

   it("returns 'tablet' between 768px and 1023px", () => {
      setViewport(800)
      const { result } = renderHook(() => useBreakpoint())
      expect(result.current).toBe("tablet")
   })

   it("returns 'desktop' at 1024px and above", () => {
      setViewport(1024)
      const { result } = renderHook(() => useBreakpoint())
      expect(result.current).toBe("desktop")
   })

   it("updates when the viewport crosses breakpoints", () => {
      setViewport(500)
      const { result } = renderHook(() => useBreakpoint())
      expect(result.current).toBe("mobile")

      setViewport(900)
      expect(result.current).toBe("tablet")

      setViewport(1400)
      expect(result.current).toBe("desktop")
   })

   it("boolean wrappers reflect the active breakpoint", () => {
      setViewport(500)
      expect(renderHook(() => useIsMobile()).result.current).toBe(true)
      expect(renderHook(() => useIsTablet()).result.current).toBe(false)
      expect(renderHook(() => useIsDesktop()).result.current).toBe(false)

      setViewport(800)
      expect(renderHook(() => useIsMobile()).result.current).toBe(false)
      expect(renderHook(() => useIsTablet()).result.current).toBe(true)
      expect(renderHook(() => useIsDesktop()).result.current).toBe(false)

      setViewport(1400)
      expect(renderHook(() => useIsMobile()).result.current).toBe(false)
      expect(renderHook(() => useIsTablet()).result.current).toBe(false)
      expect(renderHook(() => useIsDesktop()).result.current).toBe(true)
   })
})
