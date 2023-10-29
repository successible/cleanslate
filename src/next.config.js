/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

module.exports = {
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
}
