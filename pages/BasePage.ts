import  {Locator, Page, expect} from '@playwright/test';

export class BasePage {
    page: Page;
    private topNavigationLocators: Locator;
    private header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.topNavigationLocators = page.locator('ul[class="nav navbar-nav"] li'); //all nav locators
        this.header = page.locator('h2[class="title text-center"]');
    }

    async clickOnNavLink(linkText: string) {
        await this.topNavigationLocators.getByText(linkText).click();
    }
    async verifyHeader(expectedHeaderText: string): Promise<void> {
        await expect(this.header).toBeVisible();
        await expect(this.header).toHaveText(expectedHeaderText);
    }

    async verifyLoginSuccessMessage(username: string): Promise<void> {
        const successMessageLocator = this.topNavigationLocators.last();
        await expect(successMessageLocator).toBeVisible();
        await expect(successMessageLocator).toHaveText(`Logged in as ${username}`);
    }

    

}
