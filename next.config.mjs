/** @type {import('next').NextConfig} */
const nextConfig = {
  // Native Next.js deployment on Vercel (no static-export SPA shim).
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
