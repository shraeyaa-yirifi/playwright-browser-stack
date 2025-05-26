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

// import { test, expect } from '@playwright/test';
// import * as dotenv from 'dotenv';
// import { LoginPage } from '../pages/loginPage';

// // Create a fixture for login credentials
// test.describe('Login Test Suite', () => {
//   test('Login with valid credentials', async ({ page }) => {
//     // Credentials passed from environment or fixtures
//     const email = process.env.TEST_EMAIL!;
//     const password = process.env.TEST_PASSWORD!;

//     // Initialize LoginPage
//     const loginPage = new LoginPage(page);

//     // Go to login page and perform login
//     await loginPage.goto();
//     await loginPage.login(email, password);
//     await loginPage.dismissIntroDialog();

//     // Verify login success by checking URL

//     await expect(page).toHaveURL(/\/app\/?$/, { timeout: 8000 });
// });
// });


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Login Test Suite', () => {
  const validEmail = process.env.TEST_EMAIL!;
  const validPassword = process.env.TEST_PASSWORD!;
  const invalidPassword = 'WrongPassword123!';
  const invalidEmail = 'wrongemail@example.com';
  const badFormatEmail = 'invalidemail';

  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);
    await loginPage.dismissIntroDialog();
    await expect(page).toHaveURL(/\/app\/?$/, { timeout: 10000 });
  });

  test('Login with valid email and invalid password should FAIL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, invalidPassword);
    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });

  test('Login with invalid email and valid password should FAIL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidEmail, validPassword);
    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });

  test('Login with invalid email and password should FAIL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidEmail, invalidPassword);
    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });

  test('Login with empty email and password should FAIL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(page.getByText(/Email is required/i)).toBeVisible();
    await expect(page.getByText(/Password is required/i)).toBeVisible();
  });

  test('Login with bad email format should FAIL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(badFormatEmail, validPassword);
    await expect(page.getByText(/Invalid email format/i)).toBeVisible();
  });

  test('Login with short password should FAIL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, '123');
    await expect(page.getByText(/Password must be at least/i)).toBeVisible();
  });

  test('Remember me checkbox remains checked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  });
});
