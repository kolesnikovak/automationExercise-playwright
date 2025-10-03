import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginSignUpPage } from '../../pages/LoginSignUpPage';
import { BasePage } from '../../pages/BasePage';


test.describe('Login test cases', async () => {
    let homePage: HomePage;
    let loginSignupPage: LoginSignUpPage;
    let basePage: BasePage;

    test.beforeEach('Setting up preconditions',async ({page}) => {
        
        homePage = new HomePage(page);
        loginSignupPage = new LoginSignUpPage(page);
        basePage = new BasePage(page);
        await page.goto(process.env.baseUrl!);
    });


test('Logout after login and verify logout', async ({page}) => {
        await homePage.validateHomePageTitle();
        await basePage.clickOnNavLink('Signup / Login');
        await loginSignupPage.validateLoginToYourAccountTitle();
        const email = process.env.testEmail!;
        const password = process.env.password!;
        await loginSignupPage.loginWithEmailAndPassword(email, password);
        await loginSignupPage.verifyLoginSuccessMessage(email);
        await loginSignupPage.clickLogoutButton();
        await loginSignupPage.validateLoginToYourAccountTitle();
    });
});