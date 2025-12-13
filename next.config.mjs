/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['motion/react'],
  },
  // Compress output
  compress: true,
  // Security: Disable X-Powered-By header
  poweredByHeader: false,
  // Security: Enable strict mode
  reactStrictMode: true,
};

export default nextConfig;
