import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';

test.describe('Contact Us functionality test cases', async () => {
    let homePage: HomePage;
    let basePage: BasePage;

    test.beforeEach('Setting up preconditions',async ({page}) => { 
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        await page.goto(process.env.baseUrl!);
    });
    test('Submit contact us form and verify success message', async ({page}) => {
        await homePage.validateHomePageTitle();
        await basePage.clickOnNavLink('Contact us');
        await basePage.verifyContactUsPage();
        await basePage.fillContactUsForm('Test User', 'test@example.com', 'This is a test message.');
        await basePage.uploadFileInContactUsForm('/Users/katyakolesnikova/Desktop/MyFirstTypeScriptProject/LearningTypeScript/KnopaTheBestTester.jpg');
        await basePage.submitContactUsForm();
        await basePage.pressOKOnAlert();
        await basePage.submitContactUsForm();
        await basePage.verifySuccessMessage();
        
    });
});
