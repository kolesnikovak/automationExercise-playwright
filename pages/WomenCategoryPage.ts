import  {Locator, Page, expect} from '@playwright/test';
import { HomePage } from './HomePage';

export class WomenCategoryPage extends HomePage {
    private categoryTitle: Locator;
    private readonly expectedCategoryTitleText = 'Category';
    private womenCategoryLink: Locator;
    private sareeLink: Locator;
    private menCategoryLink: Locator;
    private tShirtsCategoryLink: Locator;

    constructor(page: Page) {
        super(page);
        this.categoryTitle = page.getByRole('heading', { name: 'Category' });
        this.womenCategoryLink = page.getByRole('link', { name: 'Women' });
        this.sareeLink = page.getByRole('link', { name: 'Saree' });
        this.menCategoryLink = page.getByRole('link', { name: ' Men' });
        this.tShirtsCategoryLink = page.getByRole('link', { name: 'Tshirts' });
    }
   
    async verifyCategoriesAreVisible(): Promise<void> {
        await expect(this.categoryTitle).toBeVisible();
        await expect(this.categoryTitle).toHaveText(this.expectedCategoryTitleText);
    }
 
     async navigateToWomenCategory(): Promise<void> {
        await this.womenCategoryLink.click();
    }

    async navigateToSareeSubcategory(): Promise<void> {
        await this.sareeLink.click();
    }

    async navigateToMenCategory(): Promise<void> {
        await this.menCategoryLink.click();
    }

    async navigateToTShirtsSubcategory(): Promise<void> {
        await this.tShirtsCategoryLink.click();
    }

}