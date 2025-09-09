
import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    await this.page.locator(".btn.btn-default.check_out").first().click();
  }
}
