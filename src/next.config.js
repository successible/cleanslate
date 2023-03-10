/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const configPath = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
const config = configPath ? JSON.parse(configPath) : {}
const notProduction = process.env.NODE_ENV !== 'production'

module.exports = {
  distDir: 'build',
  // Everything here is exposed to the client
  env: {
    FIREBASE_CONFIG: notProduction
      ? require('../firebase-config.json')
      : config,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,

  /* eslint-disable @typescript-eslint/no-unused-vars */
  webpack: (config, { buildId, defaultLoaders, dev, isServer, webpack }) => {
    config.module.rules.push({
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
      test: /\.csv$/,
    })
    return config
  },
}
