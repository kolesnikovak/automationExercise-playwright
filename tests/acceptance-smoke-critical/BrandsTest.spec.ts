import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products page test cases', async () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let basePage: BasePage;

    test.beforeEach('Setting up preconditions',async ({page}) => { 
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        basePage = new BasePage(page);
        await page.goto(process.env.baseUrl!);
    });
    test('Verify Brands section and navigate to Biba brand', async ({page}) => {
        await basePage.clickOnNavLink('Products');
        await productsPage.verifyAllProductsPage();
        await productsPage.verifyBrandsSection();
        await productsPage.clickOnBrand('Biba');
        await productsPage.verifyHeader('Brand - Biba Products');
    });
});