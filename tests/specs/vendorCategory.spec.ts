import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'; // Import your LoginPage class

// Test data or reusable values
const categorySearchText = 'aerial';
const vendorName = '14bis Supply Tracking';

test.describe('Vendor Category Navigation', () => {
  let page: Page;
  let loginPage: LoginPage;

  // Login before each test
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    
    // Go to login page and login
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;
    
    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.dismissIntroDialog();
  });

  // Actual test for browsing vendors
  test('should browse and view vendor category', async () => {
    // Wait for "Browse Market Place" to be visible before clicking
    await page.getByRole('button', { name: 'Browse Market Place' }).click({ timeout: 10000 });

    // Browse Vendors → View All Categories
    await page.getByRole('link', { name: 'Browse Vendors' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: 'View All Categories' }).click();
    await page.waitForTimeout(1000);

    // Search and click a specific category
    await page.getByRole('textbox', { name: 'Search categories...' }).fill(categorySearchText);
    await page.waitForTimeout(1000);
    await page.getByRole('heading', { name: 'Aerial Transportation' }).click();
    await page.waitForTimeout(1000);

    // Click specific vendor
    await page.getByText(vendorName, { exact: true }).click();
    await page.waitForTimeout(5000);
    
    // Use the vendorName to click on the vendor
    // await page.getByText(vendorName, { exact: true }).click();

    // Now assert on the heading containing the vendor name
    //await expect(page.getByRole('heading', { level: 4, name: vendorName })).toBeVisible();


    });

  // Clean up after the test
  test.afterEach(async () => {
    await page.close();
  });
});
