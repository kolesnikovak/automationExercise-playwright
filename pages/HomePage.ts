import  {Locator, Page, expect} from '@playwright/test';
import { BasePage } from './BasePage';
import { faker } from '@faker-js/faker'

export class HomePage extends BasePage{

    private homePageTitle: Locator;
    private allViewProductButtons: Locator;

    constructor(page: Page) {
        super(page);
        this.homePageTitle = page.getByRole('link', { name: 'Website for automation' })
        this.allViewProductButtons = page.locator('ul[class="nav nav-pills nav-justified"] a');
    }
    
    async validateHomePageTitle(): Promise<void> {
        await expect(this.homePageTitle).toBeVisible();
    }

    async verifyLoggedInAsUserName(fullName: string) {
        const loggedInAsLocator = this.page.getByText(`Logged in as ${fullName}`)
        await expect(loggedInAsLocator).toBeVisible()
        await expect(loggedInAsLocator).toHaveText(`Logged in as ${fullName}`)
    }

     async randomClickViewProductButton(): Promise<void> {
        const randomIndex = faker.number.int({ min: 0, max: await this.allViewProductButtons.count() - 1 });
        await this.allViewProductButtons.nth(randomIndex).click()
    }



    
}