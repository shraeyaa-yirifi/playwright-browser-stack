import { Page } from '@playwright/test';
import { expect } from '@playwright/test';


export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Enter your password' }).fill(password);
    await this.page.getByRole('checkbox').check();
    await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await this.page.waitForTimeout(2000);
  }
  async verifyLoginSuccess() {
    const dialogButton = this.page.getByRole('button', { name: 'I Understand' });
    if (await dialogButton.isVisible({ timeout: 5000 })) {
      await dialogButton.click();
    }
    await expect(this.page).toHaveURL(/\/app\/?$/, { timeout: 10000 });
}
// loginPage.ts
// loginPage.ts
async dismissIntroDialog() {
    await this.page.getByRole('button', { name: 'I Understand' }).click({ timeout: 10000 });
    await this.page.waitForTimeout(10000);
  }
  
}
