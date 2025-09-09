
import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  async openProducts() {
    await this.page.getByRole('link', { name: /products/i }).click();
    await expect(this.page).toHaveURL(/.*products/i);
  }

  async addProductToCartByBrand(brand: string) {
    let brandCategory = this.page.locator(`a[href='/brand_products/${brand}']`);
    await brandCategory.waitFor({ state: 'visible', timeout: 200000 });
    await brandCategory.click();
    if (brand==="Polo"){
      await expect(this.page.locator(".title.text-center")).toContainText("Brand");
      let clickProduct = this.page.locator("a[href='/product_details/1']");
      await clickProduct.waitFor({ state: 'visible', timeout: 200000 });
      await clickProduct.click();
    }
    else {
      await expect(this.page.locator(".title.text-center")).toContainText("Brand")
      let clickProductDetails = this.page.locator("a[href='/product_details/2']");
      await clickProductDetails.waitFor({ state: 'visible', timeout: 200000 });
      await clickProductDetails.click();
    }
    
    // On products listing, hover card to reveal 'Add to cart'
    let addtoCart = this.page.locator("button[type='button']");
    await addtoCart.waitFor({ state: 'visible', timeout: 200000 });
    await addtoCart.click();
    //Continue shopping
    let continueShopping = this.page.locator(".btn.btn-success.close-modal.btn-block");
    await continueShopping.waitFor({ state: 'visible', timeout: 200000 });
    await continueShopping.click();
  }

  async openCart() {
    await this.page.locator('a[href="/view_cart"]').first().click();
  }
}
