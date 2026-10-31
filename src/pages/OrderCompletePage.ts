import { type Locator, type Page } from '@playwright/test';

export class Ordercompletepage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly title: Locator;
  readonly linkBackHome: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.getByTestId("complete-header").or(page.getByRole("heading", { name: "Thank you for your order!" })).or(page.getByText("Thank you for your order!"));
    this.title = page.getByTestId("title").or(page.getByText("Checkout: Complete!"));
    this.linkBackHome = page.getByRole("link", { name: "Back Home" }).or(page.getByTestId("back-to-products")).or(page.getByText("Back Home"));
    this.completeText = page.getByTestId("complete-text");
  }

  async goto() {
    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
  }
}
