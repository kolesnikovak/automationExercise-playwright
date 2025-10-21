import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginSignUpPage } from '../../pages/LoginSignUpPage';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('End to end test cases', async () => {
    let homePage: HomePage;
    let loginSignupPage: LoginSignUpPage;
    let signUpPage: SignUpPage;

      test.beforeEach('Setting up preconditions',async ({page}) => {
        
        homePage = new HomePage(page);
        loginSignupPage = new LoginSignUpPage(page);
        signUpPage = new SignUpPage(page);
        const url = process.env.baseUrl
        const username = process.env.username
        const password = process.env.password
        console.log(`Base URL: ${url}`);
        await page.goto(url!);
    });

    test('End to end account creation', async ({page}) => {
        
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and email address
    // 7. Click 'Signup' button
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // 13. Click 'Create Account button'
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    // 15. Click 'Continue' button
    // 16. Verify that 'Logged in as username' is visible
    // 17. Click 'Delete Account' button
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

        await homePage.validateHomePageTitle();
        await loginSignupPage.clickOnNavLink('Signup / Login')
        await loginSignupPage.validateSignUpLoginTitle();
        await loginSignupPage.signUpWithNameAndEmail('Test User','test@example.com')

        const fullName = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await loginSignupPage.signUpWithNameAndEmail(fullName, email);
        await page.waitForTimeout(10_000);
        await signUpPage.fillAccountDetails('Mr', password, '10', '5', '2000');
        await signUpPage.checkNewsLetterCheckbox();
        await signUpPage.checkSpecialOffersCheckbox();
    });
}); 