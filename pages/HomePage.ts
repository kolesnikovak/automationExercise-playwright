import  {Locator, Page, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{

    private homePageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.homePageTitle = page.getByRole('link', { name: 'Website for automation' })
    }
    
    async validateHomePageTitle(): Promise<void> {
        await expect(this.homePageTitle).toBeVisible();
    }

    async verifyLoggedInAsUserName(fullName: string) {
        const loggedInAsLocator = this.page.getByText(`Logged in as ${fullName}`)
        await expect(loggedInAsLocator).toBeVisible()
        await expect(loggedInAsLocator).toHaveText(`Logged in as ${fullName}`)
    }
}