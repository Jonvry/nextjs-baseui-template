import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "Site Title",
      short_name: "App",
      description: "A Next.js 16 PWA template with Tailwind CSS and Base UI.",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#141414",
      // icons: [
      //    {
      //       src: "/icon-192x192.png",
      //       sizes: "192x192",
      //       type: "image/png",
      //    },
      //    {
      //       src: "/icon-512x512.png",
      //       sizes: "512x512",
      //       type: "image/png",
      //    },
      // ],
   }
}
