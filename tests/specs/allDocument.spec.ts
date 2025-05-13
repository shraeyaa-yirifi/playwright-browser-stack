import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('All Documents Navigation Flow', () => {
  let page: Page;
  let loginPage: LoginPage;

  const routes = {
    app: '/app/',
    regulations: '/app/regulations/',
  };

  const buttons = {
    browseRegulations: 'Browse Regulations',
    closeChat: 'Close Chat',
    allDocuments: 'All Documents',
    iUnderstand: 'I Understand',
  };

  const links = {
    browseRegulationMap: 'Browse Regulation Map',
    regulationMap: 'Regulation Map',
    laws: 'Laws',
    summary: /Summary of changes for/i,
    originalArticle: 'Link to Original Article',
  };

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);

    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    await loginPage.goto();
    await loginPage.login(email, password);
    await loginPage.dismissIntroDialog();
  });

  test('should navigate All Documents and open external regulation link', async () => {
    // Wait and handle UI
    await page.getByRole('button', { name: buttons.iUnderstand }).click({ timeout: 10000 }).catch(() => {});
    await page.getByRole('button', { name: buttons.closeChat }).click({ timeout: 10000 }).catch(() => {});

    // // Browse → Regulation Map
    // await page.getByRole('button', { name: buttons.browseRegulations }).click({ timeout: 10000 });
    // await page.getByRole('link', { name: links.browseRegulationMap }).click({ timeout: 10000 });

    // Go to regulation page
    await page.waitForTimeout(1000);
    await page.goto(routes.regulations);
    await page.waitForLoadState('domcontentloaded');

    // Click Regulation Map again if needed
    // await page.getByRole('link', { name: links.regulationMap }).click({ timeout: 100000 });

    // Close chat again just in case
    await page.getByRole('button', { name: buttons.closeChat }).click({ timeout: 5000 }).catch(() => {});

    // Click All Documents → Laws → Summary
    await page.getByRole('button', { name: buttons.allDocuments }).click({ timeout: 10000 });
    await page.getByRole('link', { name: 'Laws', exact: true }).click({ timeout: 10000 });
    await page.getByRole('link', { name: links.summary }).click({ timeout: 10000 });

    // Open "Link to Original Article" in new tab
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: links.originalArticle }).click({ timeout: 10000 });
    const newTab = await popupPromise;

    await newTab.waitForLoadState('domcontentloaded');
    await expect(newTab).not.toBeNull();
    
  });

  test.afterEach(async () => {
    await page.close();
  });
});
