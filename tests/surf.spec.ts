import { test } from '@playwright/test';

test('Vendor category navigation', async ({ page }) => {
  // Go to login page
  await page.goto('https://dev-app.yirifi.ai/auth/login/', { timeout: 60000 });
  await page.waitForTimeout(1000);

  // Fill email
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('shreya.bhattarai@yirifi.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Shreya@123');

  // Click "Remember me" checkbox and login
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.waitForTimeout(2000);

  // Dismiss intro dialog
  await page.getByRole('button', { name: 'I Understand' }).click();
  await page.waitForTimeout(1000);

  // Browse Marketplace
  await page.getByRole('button', { name: 'Browse Market Place' }).click();
  await page.waitForTimeout(5000);

  // Browse Vendors → View All Categories
  await page.getByRole('link', { name: 'Browse Vendors' }).click();
  await page.waitForTimeout(9000);
  await page.getByRole('link', { name: 'View All Categories' }).click();
  await page.waitForTimeout(1000);

  // Search and click a specific category
  await page.getByRole('textbox', { name: 'Search categories...' }).click();
  await page.getByRole('textbox', { name: 'Search categories...' }).fill('aerial');
  await page.waitForTimeout(1000);
  await page.getByRole('heading', { name: 'Aerial Transportation' }).click();
  await page.waitForTimeout(1000);

  // Click specific vendor
  await page.getByText('14bis Supply Tracking', { exact: true }).click();
  await page.waitForTimeout(20000);
});
