const platforms = [
  {
    os: 'OS X',
    osVersion: 'Ventura',
    browserName: 'chromium',
    browserVersion: 'latest',
    'browserstack.os': 'OS X',
    'browserstack.osVersion': 'Ventura',
    'browserstack.browserName': 'chromium',
    'browserstack.browserVersion': 'latest',
  },
  {
    os: 'OS X',
    osVersion: 'Ventura',
    browserName: 'firefox',
    browserVersion: 'latest',
    'browserstack.os': 'OS X',
    'browserstack.osVersion': 'Ventura',
    'browserstack.browserName': 'firefox',
    'browserstack.browserVersion': 'latest',
  },
];
module.exports = {
    auth: {
      username: process.env.BROWSERSTACK_USERNAME,
      access_key: process.env.BROWSERSTACK_ACCESS_KEY
    },
    run_settings: {
      framework: "playwright",
      framework_config_file: "playwright.config.js",
      project_name: "Yirifi Project",
      build_name: "Yirifi-CI-Build-1",
      test_observability: true,
    },
    platforms,
  };
  