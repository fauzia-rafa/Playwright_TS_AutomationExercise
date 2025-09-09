
import { Page, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class CheckoutPage {
  constructor(private page: Page) {}

  async placeOrderAndDownloadInvoice() {
    // Address review + order review page
    await this.page.locator(".btn.btn-default.check_out").click();

    // Payment page
    await this.page.locator('input[name="name_on_card"]').fill('QA Candidate');
    await this.page.locator('input[name="card_number"]').fill('4242424242424242');
    await this.page.locator("input[placeholder='ex. 311']").fill('123');
    await this.page.locator('input[placeholder="MM"]').fill('12');
    await this.page.locator('input[placeholder="YYYY"]').fill('2030');
    await this.page.locator("#submit").click();

    // Success confirmation
    const success = this.page.locator("div[class='col-sm-9 col-sm-offset-1'] p");
    await expect(success).toBeVisible();
    await expect(this.page).toHaveURL(/.*payment_done.*/);

    // Download invoice
    const [ download ] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator(".btn.btn-default.check_out").click()
    ]);

    const invoicesDir = path.resolve('downloads/invoices');
    if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir, { recursive: true });
    const filePath = path.join(invoicesDir, await download.suggestedFilename());
    await download.saveAs(filePath);
    return filePath;
  }
}
