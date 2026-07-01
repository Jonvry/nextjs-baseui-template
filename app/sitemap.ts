import type { MetadataRoute } from "next"
import { config } from "@/config/env"

const SITE_URL = config.APP_URL

export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: SITE_URL,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 1,
      },
      // Add more URLs as needed
   ]
}
