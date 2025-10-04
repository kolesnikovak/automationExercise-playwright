import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart functionality test cases', async () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let basePage: BasePage;
    let cartPage: CartPage;

    test.beforeEach('Setting up preconditions',async ({page}) => { 
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        basePage = new BasePage(page);
        cartPage = new CartPage(page);
        await page.goto(process.env.baseUrl!);
    });
    test('Delete items from cart', async ({page}) => {
        await homePage.validateHomePageTitle();
        await cartPage.clickOnProductsAddToCart();
        await productsPage.clickOnNavLink('Cart');
        await cartPage.verifyProductsInCartAreVisible();
        await cartPage.deleteAllProductsFromCart();
        await cartPage.verifyCartIsEmpty();
    }); 
});

