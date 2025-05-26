## Automation with Playwright + BrowserStack + GitHub Actions

This repo automates the **Login** and **Signup** flow using [Playwright](https://playwright.dev/), [BrowserStack](https://www.browserstack.com/) for cross-browser testing, and [GitHub Actions](https://github.com/features/actions) for CI/CD integration.

#### 1. Clone this repo

    git clone https://github.com/shraeyaa-yirifi/playwright-browser-stack.git

    cd playwright-browser-stack

#### 2. Install dependencies
    npm install

#### 3. Create your `.env` file
    cp .env.example .env

Then fill in the following credentials inside `.env`:

    BROWSERSTACK_USERNAME=your_browserstack_username
    
    BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
    
    TEST_EMAIL=your_test_email
    
    TEST_PASSWORD=your_test_password

### Run Tests Locally
To run all test specs:

    npm run test

To generate test scripts interactively using Playwright Codegen:

    npm run codegen

### BrowserStack Integration
This project is pre-configured for [BrowserStack Automate](https://www.browserstack.com/automate/playwright).
No need for browser installations or local config — tests run across real devices in the cloud. Just make sure your `.env` file contains valid BrowserStack credentials.

### GitHub Actions CI
GitHub Actions is already set up to automatically run tests:
  
  - On every `push`
  - On every `pull_request`

To activate CI, add the following secrets in your GitHub repo:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

You’ll find this under: **Settings → Secrets and variables → Actions**

