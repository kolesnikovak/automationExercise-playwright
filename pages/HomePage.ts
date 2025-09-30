import  {Locator, Page, expect} from '@playwright/test';

export class HomePage {

    private homePageTitle: Locator;

    constructor(page: Page) {
        this.homePageTitle = page.getByRole('link', { name: 'Website for automation' })
    }
    
    async validateHomePageTitle(): Promise<void> {
        await expect(this.homePageTitle).toBeVisible();
    }
}