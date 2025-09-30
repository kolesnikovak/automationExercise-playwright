import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestCasesPage } from '../../pages/testCasesPage';

test.describe('End to end test cases', async () => {
    let homePage: HomePage;
    let testCasesPage: TestCasesPage;

    test.beforeEach('Setting up preconditions',async ({page}) => {
        
        homePage = new HomePage(page);
        testCasesPage = new TestCasesPage(page);
        const url = process.env.baseUrl
        await page.goto(url!);
    });

    test('Navigate to Test Cases page', async ({page}) => {
        await testCasesPage.navigateToTestCasesPage();
        await testCasesPage.verifyTestCasesPage();

    });
});