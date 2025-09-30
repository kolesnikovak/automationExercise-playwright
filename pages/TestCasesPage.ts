import  {Locator, Page, expect} from '@playwright/test';
import { HomePage } from './HomePage';

export class TestCasesPage  extends HomePage {
    private testCasesButton: Locator;
    private testCasesTitle: Locator;
    private readonly expectedTestCasesTitleText = 'Test Cases';

    constructor(page: Page) {
        super(page);
        this.testCasesButton = page.getByRole('link', { name: 'Test Cases' });
        this.testCasesTitle = page.locator('b');
    }
    async navigateToTestCasesPage(): Promise<void> {
        await this.testCasesButton.click();
    }

    async verifyTestCasesPage(): Promise<void> {
        await expect(this.testCasesTitle).toBeVisible();
        await expect(this.testCasesTitle).toHaveText(this.expectedTestCasesTitleText);
    }
}