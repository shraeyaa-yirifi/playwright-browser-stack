import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Template and Bundle Download Flow', () => {
  test('should login, download a template and bundle, and create a collection', async ({ page }) => {
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    const loginPage = new LoginPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.dismissIntroDialog();

    // Navigate to All Templates
    await page.getByRole('link', { name: 'All Templates' }).click({ timeout: 10000 });

    // Open a specific template
    await page.getByText('FINAL DOCUMENT TEST').first().click({ timeout: 10000 });

    // Start download flow
    await page.getByText('Download', { exact: true }).click({ timeout: 5000 });
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('PDF').click();
    const download = await downloadPromise;
    await download.saveAs(`downloads/${await download.suggestedFilename()}`);
    console.log(`Template downloaded as: ${await download.suggestedFilename()}`);
    
    // Close the overlay if any
    const overlay = page.locator('.MuiBackdrop-root');
    if (await overlay.isVisible({ timeout: 3000 })) {
      await overlay.click();
    }

    // Navigate to Bundles
    await page.getByRole('link', { name: 'templates', exact: true }).click({ timeout: 5000 });
    await page.getByRole('heading', { name: 'Bundles' }).click({ timeout: 5000 });

    // Open a specific bundle
    await page.getByText('Test Bundle 1').click({ timeout: 8000 });

    // Start bundle download
    await page.getByRole('button', { name: 'Download' }).click({ timeout: 5000 });
    await page.getByRole('button', { name: 'Save' }).click({ timeout: 5000 });

    // Create a collection from the bundle
    await page.getByRole('button', { name: 'Create Collection' }).click({ timeout: 5000 });
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('Collection test');
    await page.getByRole('radio', { name: 'Public' }).check({ timeout: 3000 });
    await page.getByRole('button', { name: 'Create' }).click({ timeout: 5000 });

    // Confirm that the collection is created (optional: add assertion)
    await expect(page.locator('text=Collection test')).toBeVisible({ timeout: 10000 });
  });
});
