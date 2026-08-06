/** @type {import('next').NextConfig} */
const nextConfig = {
  // SPA-style static export while React Router remains the client router.
  output: 'export',
  // Keep the existing `dist/` publish directory used by Netlify/Vercel static hosting.
  distDir: './dist',
  // Avoid next/image optimizer requirements during the static SPA migration stage.
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
