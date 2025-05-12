// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/loginPage';

// test.describe('Login Test Suite', () => {
//   test('Login with valid credentials', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('dahalnirajan60@gmail.com', 'Welcome@123');
//     await loginPage.verifyLoginSuccess();
//     expect(page.url()).toContain('/app');
//   });
// });

import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/loginPage';

// Create a fixture for login credentials
test.describe('Login Test Suite', () => {
  test('Login with valid credentials', async ({ page }) => {
    // Credentials passed from environment or fixtures
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    // Initialize LoginPage
    const loginPage = new LoginPage(page);

    // Go to login page and perform login
    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.dismissIntroDialog();

    // Verify login success by checking URL

    await expect(page).toHaveURL(/\/app\/?$/, { timeout: 8000 });
});
});
