import { defineConfig } from 'cypress'

export default defineConfig({
  downloadsFolder: 'cypress/downloads',
  e2e: {
    experimentalStudio: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.ts',
    watchForFileChanges: true,
  },
  fixturesFolder: 'cypress/fixtures',
  projectId: 'ay3623',
  screenshotsFolder: 'cypress/screenshots',
  video: false,
  videosFolder: 'cypress/videos',
  viewportHeight: 900,
  viewportWidth: 1400,
})
