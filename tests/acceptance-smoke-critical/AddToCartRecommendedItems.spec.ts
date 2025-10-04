import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

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
    test('Add recommended items to cart and verify', async ({page}) => {
        await homePage.validateHomePageTitle();
        await homePage.verifyRecommendedItemsSection();
        await cartPage.addRecommendedItemToCart(); 
        await cartPage.clickViewCartButton();
        await cartPage.verifyProductsInCartAreVisible();
    });
});