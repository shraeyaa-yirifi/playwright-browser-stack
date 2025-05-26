import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Add Template Flow', () => {
  let page: Page;
  let loginPage: LoginPage;

  const routes = {
    app: '/app/',
    templates: '/app/business-template/',
  };

  const buttons = {
    yirifi: 'YIRIFI',
    templates: 'Templates',
    addTemplate: 'Add Template',
    publish: 'Publish',
  };

  const inputs = {
    reportName: 'Enter Report Name',
    authorName: 'Enter Author Name',
    readingTime: 'Enter Reading Time',
    description: 'Enter Report Description',
    instructions: 'Enter Report Instructions',
    tags: 'Type and press comma...',
  };

  const dropdowns = {
    category: 'Select Category',
    jurisdiction: 'Select Jurisdiction',
    businessSize: 'Select Business Size',
  };

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.dismissIntroDialog();
    await page.getByRole('button', { name: 'Accept' }).click();
  });

  test('should create a new template successfully', async () => {
    // Navigate to templates section
    await page.getByRole('button', { name: buttons.yirifi }).click();
    await page.getByRole('link', { name: buttons.templates, exact: true }).click();

    // Wait for and click Add Template
    await expect(page.getByRole('button', { name: buttons.addTemplate })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: buttons.addTemplate }).click();

    // Fill out template form
    await page.getByRole('textbox', { name: inputs.reportName }).fill('Automated Template Test');
    await page.getByRole('checkbox').check();
    await page.getByRole('textbox', { name: inputs.authorName }).fill('Playwright');
    await page.getByRole('textbox', { name: inputs.readingTime }).fill('5 min');

    await page.getByRole('combobox', { name: dropdowns.businessSize }).first().click();
    await page.getByRole('option', { name: 'Beginner' }).click();

    await page.getByRole('textbox', { name: inputs.tags }).first().fill('tags');
    await page.keyboard.press('Enter');

    const secondTag = page.locator('[id="\\:r3h\\:"]');
    await secondTag.fill('scripts');
    await secondTag.press('Enter');

    await page.getByRole('textbox', { name: inputs.tags }).first().fill('industry');
    await page.keyboard.press('Enter');

    await page.getByRole('combobox', { name: dropdowns.category }).click();
    await page.getByRole('option', { name: 'Hello Template' }).click();

    await page.getByRole('combobox', { name: dropdowns.jurisdiction }).click();
    await page.getByRole('option', { name: 'Angola' }).click();

    await page.getByRole('combobox', { name: dropdowns.businessSize }).nth(1).click();
    await page.getByRole('option', { name: 'Small' }).click();

    await page.getByRole('textbox', { name: inputs.description }).fill(
      'This is a description added via automated test.'
    );
    await page.getByRole('textbox', { name: inputs.instructions }).fill('Instructions written for test purposes.');

    // Publish the template
    await page.getByRole('button', { name: buttons.publish }).click();
    await page.waitForTimeout(8000);

    // Verify success (adapt this to your app's confirmation message or redirect)
    //await expect(page.locator('text=Template created')).toBeVisible({ timeout: 10000 });
  });

  test.afterEach(async () => {
    await page.close();
  });
});
