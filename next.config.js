/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/coxstay',
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  typescript: {
    // Ignore build errors to allow static export
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
