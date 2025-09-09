
import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.getByRole('link', { name: /signup \/ login/i }).click();
    await expect(this.page).toHaveURL(/.*login/i);
  }

  async login(email: string, password: string) {
    await this.page.getByRole('heading', { name: /login to your account/i }).waitFor();
    await this.page.locator('input[data-qa="login-email"]').fill(email);
    await this.page.locator('input[data-qa="login-password"]').fill(password);
    await this.page.locator('button[data-qa="login-button"]').click();
    await expect(this.page.getByText(/logged in as/i)).toBeVisible();
  }
}
