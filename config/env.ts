// This module can be imported by client components. Only expose public env values here.
// Add @t3-oss/env-nextjs only once the template needs required env validation, private server envs, or multiple public/client envs.
export const config = {
   NODE_ENV: process.env.NODE_ENV,
   APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}
