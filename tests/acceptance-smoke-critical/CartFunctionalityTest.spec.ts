import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { LoginSignUpPage } from '../../pages/LoginSignUpPage';

test.describe('Cart functionality test cases', async () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let basePage: BasePage;
    let loginSignupPage: LoginSignUpPage;

    test.beforeEach('Setting up preconditions',async ({page}) => { 
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        basePage = new BasePage(page);
        loginSignupPage = new LoginSignUpPage(page);
        await page.goto(process.env.baseUrl!);
    });

    test('Search for a products and verify cart functionality', async ({page}) => {
        await homePage.validateHomePageTitle();
        await basePage.clickOnNavLink('Products');
        await productsPage.verifyAllProductsPage();
        await productsPage.searchForProduct('Shirt');
        await productsPage.verifySearchedProductsPage();
        await productsPage.verifyAllProductsAreVisible();
        await productsPage.addAllProductsToCart();
        await productsPage.goToCartPage();
        await productsPage.verifyProductsInCartAreVisible();
        await basePage.clickOnNavLink('Signup / Login');
        await loginSignupPage.validateLoginToYourAccountTitle();
        const email = process.env.testEmail!;
        const password = process.env.password!;
        await loginSignupPage.loginWithEmailAndPassword(email, password);
        await loginSignupPage.verifyLoginSuccessMessage(email);
        await basePage.clickOnNavLink('Cart');
        await productsPage.verifyProductsInCartAreVisible();
    });
});