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
}

export default nextConfig
