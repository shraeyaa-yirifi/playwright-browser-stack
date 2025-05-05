const { test, expect } = require('@playwright/test');

test('Yirifi walkthrough', async ({ page }) => {
  await page.goto('https://uat-app.yirifi.ai/auth/login/');
  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByRole('textbox', { name: 'Enter your email address' }).fill('dahalnirajan60@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome@123');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  await page.goto('https://uat-app.yirifi.ai/app/');

//   await expect(page.getByRole('heading', { name: 'Use Cases' })).toBeVisible({ timeout: 90000 });
//   await page.getByRole('heading', { name: 'Use Cases' }).click();

//   // Wait and click on Use Case item
//   await expect(page.getByText(/Automated Market Makers/i)).toBeVisible({ timeout: 90000 });
//   await page.getByText(/Automated Market Makers/i).click();

//   await page.getByRole('button', { name: 'Browse Knowledge Base' }).click();
//   await page.getByRole('link', { name: 'Browse FAQs' }).click();

//   // Click another Use Case (handle flaky element)
//   await expect(page.getByText(/Blockchain-Based Voting/i)).toBeVisible({ timeout: 90000 });
//   await page.getByText(/Blockchain-Based Voting/i).click();

//   await page.locator('div').filter({ hasText: /benefits of using smart contracts/i }).click();
//   await page.getByRole('link', { name: 'Browse Features' }).click();
//   await page.getByText(/Integration & Interoperability/i).click();
//   await page.getByRole('button', { name: 'Browse Reports' }).click();
//   await page.getByRole('link', { name: 'Browse Research Reports' }).click();
//   await page.getByRole('link', { name: /Avatar Nirajan Dahal/i }).click();
//   await page.getByRole('button', { name: 'Browse Regulations' }).click();
//   await page.getByRole('link', { name: 'Browse Jurisdictions' }).click();
//   await page.getByRole('button', { name: 'D', exact: true }).click();
//   await page.getByRole('button', { name: 'C', exact: true }).click();
//   await page.getByRole('button', { name: 'A', exact: true }).click();
//   await page.getByRole('link', { name: 'Browse Side-by-Side' }).click();

//   await page.goto('https://uat-app.yirifi.ai/app/compare-regulations/?countries=66ba453ea7f6c7806da84f85%2C66ba453ea7f6c7806da84fbc%2C66ba453ea7f6c7806da84fbf');
//   await page.getByRole('row', { name: /VASP/ }).getByRole('cell').nth(1).click();

//   await page.getByRole('button', { name: 'Regulatory & Licensing' }).click();
//   await page.getByRole('button', { name: 'Financial & Tax Considerations' }).click();
//   await page.getByRole('button', { name: 'AML/KYC & Compliance' }).click();
//   await page.getByRole('button', { name: 'Crypto Trading & Exchange' }).click();
//   await page.getByRole('link', { name: 'Browse Regulatory' }).click();

//   await page.getByRole('combobox', { name: 'Country' }).click();
//   await page.getByRole('option', { name: 'Andorra' }).click();
//   await page.getByRole('option', { name: 'Algeria' }).click();
//   await page.getByRole('button', { name: 'Clear' }).click();
//   await page.getByText('Stock Exchanges').click();
//   await page.getByRole('heading', { name: /Abu Dhabi Global Market/i }).click();

//   await page.getByRole('link', { name: 'Browse Home' }).click();
//   await page.getByRole('button', { name: 'Browse Market Place' }).click();
//   await page.getByRole('link', { name: 'Browse Vendors' }).click();
//   await page.getByText(/Data & Analytics/i).click();
//   await page.getByText(/Data Analysis.*155 Vendors/i).click();

//   await page.getByRole('button', { name: 'US', exact: true }).click();
//   await page.getByRole('button', { name: '5' }).click();
//   await page.getByRole('link', { name: 'Browse Home' }).click();
});
