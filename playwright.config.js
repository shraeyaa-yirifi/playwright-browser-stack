const { defineConfig } = require('@playwright/test');
const browserstackConfig = require('./browserstack.config.js');

module.exports = defineConfig({
  testDir: './tests/specs',
  testMatch: /.*(spec|test)\.(js|ts)/,
//   reporter: [['html', { open: 'never' }], ['json', { outputFile: 'results.json' }]],
  fullyParallel: true,
  timeout: 60 * 1000,
  testObservability: true,
//   reporter: [
//     ['list'], 
//     ['html', { outputFolder: 'playwright-report' }],
//     ['browserstack', {
//       outputFolder: './playwright-report',
//       testObservability: true,
//     }],
//   ],
  use: {
    baseURL: 'https://dev-app.yirifi.ai',
    headless: false,
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    'browserstack.username': process.env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.usePlaywrightCI': true,
    'browserstack.buildName': 'Yirifi-CI-Build-1', // Set build name for visibility
  },
  
  projects: browserstackConfig.platforms.map((platform) => ({
    name: `${platform.browserName}@${platform.browserVersion}:${platform.os} ${platform.osVersion}`,
    use: {
      ...platform,
      baseURL: 'https://dev-app.yirifi.ai',
      headless: true,
      trace: 'on-first-retry',
      video: 'on',
      screenshot: 'only-on-failure',
      viewport: { width: 1280, height: 720 },
      'browserstack.username': process.env.BROWSERSTACK_USERNAME,
      'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
      'browserstack.usePlaywrightCI': true,
    },
  })),
});
