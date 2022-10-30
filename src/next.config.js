/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const configPath = process.env.FIREBASE_CONFIG
const config = configPath ? JSON.parse(configPath) : {}
const notProduction = process.env.NODE_ENV !== 'production'

module.exports = {
  distDir: 'build',
  env: {
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    FIREBASE_CONFIG: notProduction
      ? require('../firebase-config.json')
      : config,
    HONEYBADGER_API_KEY: process.env.HONEYBADGER_API_KEY,
    // PROXY_ROOT_DOMAIN only used for Cloudflare Tunnels on localhost
    PROXY_ROOT_DOMAIN: process.env.PROXY_ROOT_DOMAIN,
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
