import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestCasesPage } from '../../pages/TestCasesPage';
import { BasePage } from '../../pages/BasePage';

test.describe('End to end test cases', async () => {
    let homePage: HomePage;
    let testCasesPage: TestCasesPage;
    let basePage: BasePage;

    test.beforeEach('Setting up preconditions',async ({page}) => {
        
        homePage = new HomePage(page);
        testCasesPage = new TestCasesPage(page);
        basePage = new BasePage(page);
        await page.goto(process.env.baseUrl!);
    });

    test('Navigate to Test Cases page', async ({page}) => {
        await basePage.clickOnNavLink('Test Cases');
        await testCasesPage.verifyTestCasesPage();

    });
});