module.exports = {
  clientsClaim: true,
  globDirectory: 'build',
  globPatterns: ['**/*.{html,css,js}'],
  runtimeCaching: [
    {
      handler: 'CacheFirst',
      urlPattern: /(\.(png|jpg|jpeg|svg|ico|json)$)/,
    },
  ],
  skipWaiting: true,
  swDest: 'build/service-worker.js',
}
