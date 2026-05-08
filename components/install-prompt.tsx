"use client"

import { useEffect, useState } from "react"

type BeforeInstallPromptEvent = Event & {
   prompt: () => Promise<void>
   userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
   const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)

   const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)
   const isStandalone =
      typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches

   useEffect(() => {
      function onPrompt(e: Event) {
         e.preventDefault()
         setDeferred(e as BeforeInstallPromptEvent)
      }
      window.addEventListener("beforeinstallprompt", onPrompt)
      return () => window.removeEventListener("beforeinstallprompt", onPrompt)
   }, [])

   if (isStandalone) return null
   if (!deferred && !isIOS) return null

   async function handleInstall() {
      if (!deferred) return
      await deferred.prompt()
      const { outcome } = await deferred.userChoice
      if (outcome === "accepted") setDeferred(null)
   }

   return (
      <div className="rounded-md border p-4">
         <h3 className="font-medium">Install App</h3>

         {deferred && (
            <button
               className="mt-2 rounded bg-primary px-3 py-1 text-primary-foreground"
               onClick={handleInstall}
            >
               Install
            </button>
         )}

         {isIOS && (
            <p className="mt-2 text-sm text-muted-foreground">
               Tap the share button and then &quot;Add to Home Screen&quot;.
            </p>
         )}
      </div>
   )
}
