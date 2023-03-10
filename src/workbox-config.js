module.exports = {
  clientsClaim: true,
  globDirectory: 'out',
  globPatterns: ['**/*.{html,css,js}'],
  runtimeCaching: [
    {
      handler: 'CacheFirst',
      urlPattern: /(\.(png|jpg|jpeg|svg|ico|json)$)/,
    },
  ],
  skipWaiting: true,
  swDest: 'out/service-worker.js',
}
