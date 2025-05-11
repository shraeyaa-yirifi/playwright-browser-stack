const { defineConfig } = require('@playwright/test');
require('dotenv').config();

const caps = {
  'browserstack.username': process.env.shreyabhattarai_ifPo34 || 'YOUR_USERNAME',
  'browserstack.accessKey': process.env.ajWrSLzt5XNdSEtUKi19 || 'YOUR_ACCESS_KEY',
  'browserstack.usePlaywrightCI': true,
};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 60 * 1000,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],

  use: {
    ...caps,
    baseURL: 'https://dev-app.yirifi.ai', // ✅ Properly merged
    headless: true,
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'Chrome@latest:Windows 11',
      use: {
        ...caps,
        browserName: 'chromium',
        channel: 'chrome',
        'browserstack.os': 'Windows',
        'browserstack.osVersion': '11',
        browserstack: {
          username: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY
        }
      },
    },
    {
      name: 'Firefox@latest:OS X Ventura',
      use: {
        ...caps,
        browserName: 'firefox',
        'browserstack.os': 'OS X',
        'browserstack.osVersion': 'Ventura',
        browserstack: {
          username: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY
        }
      },
    },
    // {
    //   name: 'Safari@latest:OS X Sonoma',
    //   use: {
    //     ...caps,
    //     browserName: 'webkit',
    //     'browserstack.os': 'OS X',
    //     'browserstack.osVersion': 'Sonoma',
    //     browserstack: {
    //       username: process.env.BROWSERSTACK_USERNAME,
    //       accessKey: process.env.BROWSERSTACK_ACCESS_KEY
    //     }
    //   },
    // },
  ],
});
