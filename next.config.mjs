import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript artık optimize edildi
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint artık konfigüre edildi
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Image optimization aktifleştirildi
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  // Webpack varsayılan ayarları kullanılsın
  webpack: (config) => config
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default bundleAnalyzer(nextConfig)
