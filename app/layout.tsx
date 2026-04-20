import type { Metadata, Viewport } from "next"
import { Figtree, Geist } from "next/font/google"
import { ServiceWorkerRegister } from "@/components/sw-register"
import { ThemeProvider } from "@/context/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })
const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const SITE_NAME = "Site Name"
const SITE_DESCRIPTION =
   "Site description goes here. It should be a concise and compelling summary of what the site is about, ideally around 150-160 characters for optimal display in search engine results and social media previews."
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
const SITE_IMAGE = `${SITE_URL}/opengraph-image.jpeg`

export const viewport: Viewport = {
   themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#141414" },
   ],
}

export const metadata: Metadata = {
   metadataBase: new URL(SITE_URL),
   title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
   },
   description: SITE_DESCRIPTION,
   keywords: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
   authors: [{ name: "Jon  Virrey" }],
   creator: "Jon  Virrey",
   openGraph: {
      locale: "en-US", // Optional: Specify the locale for OpenGraph tags
      type: "website", // Optional: Specify the type of content (e.g., article, website, etc.)
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
         {
            url: SITE_IMAGE,
            width: 1200,
            height: 630,
            alt: "Alt text for the OpenGraph image, describing the content of the image in a concise manner, ideally around 100 characters for optimal display in search engine results and social media previews.",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [
         {
            url: SITE_IMAGE,
            alt: "Alt text for the Twitter card image, describing the content of the image in a concise manner, ideally around 100 characters for optimal display on Twitter.",
         },
      ],
   },
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html
         lang="en"
         suppressHydrationWarning
         className={cn("antialiased", "font-sans", figtree.variable, geistHeading.variable)}
      >
         <body>
            <ThemeProvider>{children}</ThemeProvider>
            <ServiceWorkerRegister />
         </body>
      </html>
   )
}
