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

    test('Choose a product and add couple quantities to cart', async ({page}) => {
        await homePage.validateHomePageTitle();
        await homePage.randomClickViewProductButton();
        await productsPage.verifyDetailsAreVisible();
        await productsPage.addProductQuantityToCart(3);
        await productsPage.addProductToCart();
        await productsPage.clickViewCartButton();
        await productsPage.verifyProductsInCartAreVisible();
       // await productsPage.verifyQuantityInCart(3);
});
});