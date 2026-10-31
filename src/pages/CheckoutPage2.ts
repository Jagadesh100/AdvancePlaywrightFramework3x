import { type Locator, type Page } from '@playwright/test';

export class Checkoutpage2 {
  readonly page: Page;
  readonly textboxFirstName: Locator;
  readonly textboxLastName: Locator;
  readonly textboxZipPostalCode: Locator;
  readonly linkCancel: Locator;
  readonly buttonContinue: Locator;
  readonly title: Locator;
  readonly itemQuantity: Locator;
  readonly inventoryItem: Locator;
  readonly buttonFinish: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textboxFirstName = page.getByRole("textbox", { name: "First Name" }).or(page.getByTestId("firstName")).or(page.locator("#first-name"));
    this.textboxLastName = page.getByRole("textbox", { name: "Last Name" }).or(page.getByTestId("lastName")).or(page.locator("#last-name"));
    this.textboxZipPostalCode = page.getByRole("textbox", { name: "Zip/Postal Code" }).or(page.getByTestId("postalCode")).or(page.locator("#postal-code"));
    this.linkCancel = page.getByRole("link", { name: "Cancel" }).or(page.getByTestId("cancel")).or(page.getByText("Cancel"));
    this.buttonContinue = page.getByRole("button", { name: "Continue" }).or(page.getByTestId("continue")).or(page.locator("#continue-btn"));
    this.title = page.getByTestId("title").or(page.getByText("Checkout: Overview"));
    this.itemQuantity = page.getByTestId("item-quantity").or(page.getByText("1"));
    this.inventoryItem = page.getByTestId("inventory-item");
    this.buttonFinish = page.getByRole("button", { name: "Finish" }).or(page.getByTestId("finish")).or(page.locator("#finish-btn"));
    this.paymentInfoValue = page.getByTestId("payment-info-value").or(page.getByText("TTACard #31337"));
    this.shippingInfoValue = page.getByTestId("shipping-info-value").or(page.getByText("Free TTA Express Delivery!"));
    this.totalLabel = page.getByTestId("total-label").or(page.getByText("Total: $17.27"));
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
  }
}
