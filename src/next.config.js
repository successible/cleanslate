/** @type {import('next').NextConfig} */

module.exports = {
  output: 'export',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
}
