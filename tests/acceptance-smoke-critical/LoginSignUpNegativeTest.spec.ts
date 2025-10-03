import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginSignUpPage } from '../../pages/LoginSignUpPage';
import { BasePage } from '../../pages/BasePage';
import { faker } from '@faker-js/faker'


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

    test('Login with incorrect credentials and verify error message', async ({page}) => {
        await homePage.validateHomePageTitle();
        await basePage.clickOnNavLink('Signup / Login');
        await loginSignupPage.validateLoginToYourAccountTitle();
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();
        await loginSignupPage.loginWithEmailAndPassword(randomEmail, randomPassword);
        await loginSignupPage.validateErrorLoginMessage('Your email or password is incorrect!');
    });
    test('SignUp with existing email and verify error message', async ({page}) => {
        await homePage.validateHomePageTitle();
        await basePage.clickOnNavLink('Signup / Login');
        await loginSignupPage.validateSignUpTitle();
        const existingEmail = process.env.testEmail!;
        await loginSignupPage.signUpWithNameAndEmail('TestUser', existingEmail);
        await loginSignupPage.validateErrorSignUpMessage('Email Address already exist!');
    });
});
