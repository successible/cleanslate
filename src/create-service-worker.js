const { generateSW } = require('workbox-build');

generateSW({
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
}).then(({ count, size, warnings }) => {
  warnings.forEach(console.warn);
  console.log(`✅ Generated service-worker.js with ${count} files (${size} bytes)`);
}).catch((err) => {
  console.error('❌ Service worker generation failed:', err);
  process.exit(1);
});