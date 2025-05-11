// const { test, expect } = require('@playwright/test');

import { test, expect } from '@playwright/test';

test('Login to Yirifi', async ({ page }) => {
  await page.goto('https://uat-app.yirifi.ai/auth/login/');

  await page.getByRole('textbox', { name: 'Enter your email' }).fill('dahalnirajan60@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.goto('https://uat-app.yirifi.ai/app/');

  // Optional: Verify landing page or login success
  // await expect(page).toHaveURL('https://uat-app.yirifi.ai/app/', { timeout: 20000 });
});

