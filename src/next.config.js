/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
}
