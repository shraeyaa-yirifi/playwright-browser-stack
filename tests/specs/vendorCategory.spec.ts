import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import dotenv from 'dotenv';
dotenv.config();

const categorySearchText = 'aerial';
const vendorName = '14bis Supply Tracking';

test.describe('Vendor Category Navigation', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.dismissIntroDialog();

    // Ensure app has loaded
    await expect(page).toHaveURL(/\/app/, { timeout: 10000 });
  });

  test('should browse and view vendor category', async () => {
    // Wait for "Browse Market Place" and click it
    const browseMarketplaceBtn = page.getByRole('button', { name: 'Browse Market Place' });
    await expect(browseMarketplaceBtn).toBeVisible({ timeout: 10000 });
    await browseMarketplaceBtn.click();

    // Click 'All Vendors' inside USERS label
    const allVendorsLink = page.getByLabel('USERS').getByRole('link', { name: 'All Vendors' });
    await expect(allVendorsLink).toBeVisible({ timeout: 10000 });
    await allVendorsLink.click();

    // View All Categories
    const viewAllCategories = page.getByRole('link', { name: 'View All Categories' });
    await expect(viewAllCategories).toBeVisible({ timeout: 10000 });
    await viewAllCategories.click();

    // Search category
    const searchBox = page.getByRole('textbox', { name: 'Search categories...' });
    await expect(searchBox).toBeVisible({ timeout: 10000 });
    await searchBox.fill(categorySearchText);
    await searchBox.press('Enter');

    // Click on "Aerial Transportation"
    const aerialCategory = page.getByRole('heading', { name: 'Aerial Transportation' });
    await expect(aerialCategory).toBeVisible({ timeout: 10000 });
    await aerialCategory.click();

    // Click on the specific vendor
    const vendorCard = page.getByText(vendorName, { exact: true });
    await expect(vendorCard).toBeVisible({ timeout: 10000 });
    await vendorCard.click();

    // Confirm vendor details are visible
    const correctHeading = page.locator('#overview').getByRole('heading', { name: vendorName });
    await expect(correctHeading).toBeVisible({ timeout: 10000 });
      });

  test.afterEach(async () => {
    await page.close();
  });
});
