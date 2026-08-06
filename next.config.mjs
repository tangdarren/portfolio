/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify/Vercel static hosting (publish directory: dist/).
  output: 'export',
  distDir: './dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
