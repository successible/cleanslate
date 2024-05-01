/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
}
