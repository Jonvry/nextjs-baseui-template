/** @type {import('next').NextConfig} */

const nextConfig = {
   // reactCompiler: true,
   // cacheComponents: true,
   typedRoutes: true,

   /* config options here */
   experimental: {
      typedEnv: true,
   },

   // images: {
   //   remotePatterns: [
   //     {
   //       protocol: "",
   //       hostname: "",
   //     },
   //   ]
   // }

   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "X-Frame-Options",
                  value: "DENY",
               },
               {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
               },
            ],
         },
      ]
   },
}

export default nextConfig
