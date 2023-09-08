import { Locator, Page } from "@playwright/test"
export class BasePage {
    private readonly page: Page;
    private readonly loader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loader = this.page.locator("div.loader-wrapper.is-active");
    }

    async waitForLoaderToBeVisible(timeout: number) {
        await this.loader.waitFor({state: 'visible', timeout: timeout})
    }

    async waitForLoaderToNotBeVisible(timeout: number) {
        await this.loader.waitFor({state: 'attached', timeout: timeout});
    }
}