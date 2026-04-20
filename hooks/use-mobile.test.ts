import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useIsMobile } from "./use-mobile"

describe("useIsMobile", () => {
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
      window.matchMedia = vi.fn((query: string) => ({
         matches: window.innerWidth < 768,
         media: query,
         onchange: null,
         addEventListener: (_: string, fn: () => void) => listeners.add(fn),
         removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
         addListener: vi.fn(),
         removeListener: vi.fn(),
         dispatchEvent: vi.fn(),
      })) as unknown as typeof window.matchMedia
   })

   afterEach(() => {
      window.matchMedia = originalMatchMedia
   })

   it("returns true when the viewport is narrower than 768px", () => {
      setViewport(500)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current).toBe(true)
   })

   it("returns false when the viewport is 768px or wider", () => {
      setViewport(1024)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current).toBe(false)
   })

   it("updates when the viewport crosses the breakpoint", () => {
      setViewport(1024)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current).toBe(false)

      setViewport(500)
      expect(result.current).toBe(true)
   })
})
