import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart functionality test cases', async () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let basePage: BasePage;

    test.beforeEach('Setting up preconditions',async ({page}) => { 
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        basePage = new BasePage(page);
        await page.goto(process.env.baseUrl!);
    });

    test('Search for a product and verify products page', async ({page}) => {
        await homePage.validateHomePageTitle();
        await basePage.clickOnNavLink('Products');
        await productsPage.verifyAllProductsPage();
        await productsPage.searchForProduct('Shirt');
        await productsPage.verifySearchedProductsPage();
        await productsPage.verifyAllProductsAreVisible();
});
});