/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const configPath = process.env.FIREBASE_CONFIG
const config = configPath ? JSON.parse(configPath) : {}
const notProduction = process.env.NODE_ENV !== 'production'

module.exports = {
  distDir: 'build',
  env: {
    FIREBASE_CONFIG: notProduction
      ? require('../firebase-config.json')
      : config,
    HONEYBADGER_API: process.env.HONEYBADGER_API,
    ROOT_DOMAIN: process.env.ROOT_DOMAIN,
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
