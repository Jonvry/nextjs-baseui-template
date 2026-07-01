import type { MetadataRoute } from "next"
import { config } from "@/config/env"

const SITE_URL = config.APP_URL

export default function robots(): MetadataRoute.Robots {
   return {
      rules: [
         {
            userAgent: "*",
            allow: "/",
            // Uncomment the line below to disallow crawling of the /private/ directory
            // disallow: "/private/",
         },
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
   }
}
