const { defineConfig } = require('@playwright/test');
require('dotenv').config();

const caps = {
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
  'browserstack.usePlaywrightCI': true,
};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 60 * 1000,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
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
