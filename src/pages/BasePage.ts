import { Page } from "@playwright/test";
import { UtilElementLocator } from "@utils/UtilElementLocator";
import { createLogger, Logger } from "@utils/logger";

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly log: Logger;
  protected readonly element: UtilElementLocator;

  protected constructor(page: Page, scope: string) {
    this.page = page;
    this.element = new UtilElementLocator(page, scope);
    this.log = createLogger(scope);
  }

  protected async goto(relativePath: string): Promise<void> {
    await this.page.goto(relativePath);
    await this.page.waitForLoadState("domcontentloaded");
  }
}
