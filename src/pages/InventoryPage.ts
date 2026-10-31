import { type Locator, type Page } from '@playwright/test';

export class Inventorypage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly addToCartTestAllthethings: Locator;
  readonly itemTtaBikeLightTitle: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId("inventory-container").or(page.locator("#inventory-grid")).or(page.locator("main").locator("#inventory-grid"));
    this.addToCartTestAllthethings = page.getByTestId("add-to-cart-test-allthethings-tshirt-red").or(page.getByRole("button", { name: "Add to cart" })).or(page.getByText("Add to cart"));
    this.itemTtaBikeLightTitle = page.getByTestId("item-tta-bike-light-title-link").or(page.getByRole("link", { name: "TTA Bike Light" })).or(page.getByText("TTA Bike Light"));
    this.shoppingCartLink = page.getByTestId("shopping-cart-link").or(page.getByRole("link", { name: "Shopping cart" })).or(page.locator("#shopping_cart_container"));
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
  }
}
