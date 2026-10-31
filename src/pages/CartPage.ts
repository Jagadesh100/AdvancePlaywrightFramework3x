import { type Locator, type Page } from '@playwright/test';

export class Cartpage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly inventoryItem: Locator;
  readonly linkContinueShopping: Locator;
  readonly linkCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.getByTestId("cart-list");
    this.inventoryItem = page.getByTestId("inventory-item");
    this.linkContinueShopping = page.getByRole("link", { name: "Continue Shopping" }).or(page.getByTestId("continue-shopping")).or(page.getByText("Continue Shopping"));
    this.linkCheckout = page.getByRole("link", { name: "Checkout" }).or(page.getByTestId("checkout")).or(page.getByText("Checkout"));
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
  }
}
