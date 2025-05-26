import { Page, expect } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/auth/login/');
    await this.page.getByRole('link', { name: 'Sign Up' }).click();
  }

  async fillForm(name: string, email: string, password: string, confirmPassword: string, agreeTerms = true, acceptMarketing = true) {
    await this.page.locator('input[type="text"]').fill(name);
    await this.page.locator('input[type="email"]').fill(email);
    await this.page.getByRole('textbox').nth(2).fill(password);
    await this.page.getByRole('textbox').nth(3).fill(confirmPassword);
    
    if (agreeTerms) {
        await this.page.getByRole('checkbox').nth(0).check(); // Terms checkbox
    }

    if (acceptMarketing) {
      const secondCheckbox = this.page.getByRole('checkbox').nth(1);
      if (await secondCheckbox.isVisible()) {
        await secondCheckbox.check();
      }
    }
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Get started' }).click();
  }

//   async assertRedirectToCheckMail(email: string) {
//     await expect(this.page).toHaveURL(new RegExp(`.+/auth/signup/check-mail/\\?email=${email}`), { timeout: 10000 });
// }

async assertRedirectToCheckMail(email: string) {
    // Wait for heading "Check your email" to appear before asserting URL
    await this.page.getByRole('heading', { name: 'Check your email' }).waitFor({ timeout: 10000 });

    // Escape "+" in email for regex
    const safeEmail = email.replace(/\+/g, '\\+');

    // Match full URL with proper escaping
    const urlPattern = new RegExp(`^https://dev-app\\.yirifi\\.ai/auth/signup/check-mail/\\?email=${safeEmail}$`);

    await expect(this.page).toHaveURL(urlPattern, { timeout: 10000 });
  }

  async assertValidationError(text: string) {
    await expect(this.page.getByText(new RegExp(text, 'i'))).toBeVisible();
  }
}
