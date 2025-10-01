import  test, {Locator, Page, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { BasePage } from '../../pages/BasePage';
import { WomenCategoryPage } from '../../pages/WomenCategoryPage';

test.describe('Women and Men category page test cases', async () => {
    let homePage: HomePage;
    let basePage: BasePage;
    let womenCategoryPage: WomenCategoryPage;

    test.beforeEach('Setting up preconditions',async ({page}) => { 
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        womenCategoryPage = new WomenCategoryPage(page);
        await page.goto(process.env.baseUrl!);
    });

    test('Verify Women and Men categories are visible and working', async ({page}) => {
        await womenCategoryPage.verifyCategoriesAreVisible();
        await womenCategoryPage.navigateToWomenCategory();
        await womenCategoryPage.navigateToSareeSubcategory();
        await womenCategoryPage.verifySareeCategoryPage();
        await womenCategoryPage.navigateToMenCategory();
        await womenCategoryPage.navigateToTShirtsSubcategory();
        await womenCategoryPage.verifyMenTShirtsCategoryPage();
});
});