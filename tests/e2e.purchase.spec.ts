import {test, expect} from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import fs from 'fs';
import data from "../src/data/user_credentials.json";
test.describe('Task 1: End-to-End Purchase Flow with New User Registration', () => {
  test('register via API, login via UI, add to cart, checkout, download and verify invoice', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await home.goto();

    await login.gotoLogin();
    await login.login(data.email, data.password);

    await home.openProducts();
    await home.addProductToCartByBrand('Polo');
    await home.addProductToCartByBrand('H&M');

    await home.openCart();
    await cart.proceedToCheckout();

    const invoicePath = await checkout.placeOrderAndDownloadInvoice();
    const stats = fs.statSync(invoicePath);
    expect(stats.isFile()).toBeTruthy();
    expect(stats.size).toBeGreaterThan(0);
  });
});
