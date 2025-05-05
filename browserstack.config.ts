// @ts-check
const { defineConfig } = require('@playwright/test');

require('dotenv').config();

const caps = {
  'browserstack.username': process.env.shreyabhattarai_ifPo34 || 'YOUR_USERNAME',
  'browserstack.accessKey': process.env.ajWrSLzt5XNdSEtUKi19 || 'YOUR_ACCESS_KEY',
  'browserstack.usePlaywrightCI': true,
};

module.exports = defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Limit test timeout to 60 seconds
  timeout: 60 * 1000,

  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],

  // BrowserStack settings
  use: {
    ...caps,
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'Chrome@latest:Windows 11',
      use: {
        ...caps,
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1280, height: 720 },
        'browserstack.os': 'Windows',
        'browserstack.osVersion': '11',
      },
    },
    {
      name: 'Edge@latest:Windows 10',
      use: {
        ...caps,
        browserName: 'chromium',
        channel: 'msedge',
        'browserstack.os': 'Windows',
        'browserstack.osVersion': '10',
      },
    },
    {
      name: 'Firefox@latest:OS X Ventura',
      use: {
        ...caps,
        browserName: 'firefox',
        'browserstack.os': 'OS X',
        'browserstack.osVersion': 'Ventura',
      },
    },
    {
      name: 'Safari@latest:OS X Sonoma',
      use: {
        ...caps,
        browserName: 'webkit',
        'browserstack.os': 'OS X',
        'browserstack.osVersion': 'Sonoma',
      },
    },
  ],
});



// const { chromium } = require('playwright');
// const browserstackLocal = require('browserstack-local');

// // Your credentials
// const username = 'shreyabhattarai_ifPo34';
// const accessKey = 'ajWrSLzt5XNdSEtUKi19'; // Make sure this is correct!

// // Capabilities for BrowserStack
// const capabilities = {
//   'browser': 'chrome',
//   'browser_version': 'latest',
//   'os': 'os x',
//   'os_version': 'ventura',
//   'name': 'Playwright Test on BrowserStack',
//   'build': 'Playwright-BStack-Build-1',
//   'browserstack.username': username,
//   'browserstack.accessKey': accessKey,
//   'browserstack.local': 'true',
// };

// // Create local instance
// const bsLocal = new browserstackLocal.Local();

// bsLocal.start({ key: accessKey }, async (error) => {
//   if (error) {
//     console.error('Error starting BrowserStack Local tunnel:', error);
//     return;
//   }

//   console.log('Connected to BrowserStack Local');

//   try {
//     const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`;

//     const browser = await chromium.connect({ wsEndpoint });
//     const page = await browser.newPage();

//     await page.goto('https://example.com');
//     const title = await page.title();
//     console.log('Page title:', title);

//     await browser.close();
//   } catch (err) {
//     console.error('Error during Playwright test execution:', err);
//   } finally {
//     bsLocal.stop(() => {
//       console.log('BrowserStack Local stopped');
//     });
//   }
// });
