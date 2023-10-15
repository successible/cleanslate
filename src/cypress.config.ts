/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on: unknown, config: unknown) {},
  },
})
