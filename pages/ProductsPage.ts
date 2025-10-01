import  {Locator, Page, expect} from '@playwright/test';
import { HomePage } from './HomePage';

export class ProductsPage extends HomePage {
    private productsButton: Locator;
    private allProductsTitle: Locator;
    private searchProductBar: Locator;
    private searchButton: Locator;
    private searchedProductsTitle: Locator;
    private allProductsLocator: Locator;
    private readonly expectedProductsTitleText = 'All Products';

    constructor(page: Page) {
        super(page);
        this.productsButton = page.getByRole('link', { name: 'Products' });
        this.allProductsTitle = page.locator('h2[class="title text-center"]');
        this.searchProductBar = page.locator('input[id="search_product"]');
        this.searchButton = page.locator('button[id="submit_search"]');
        this.searchedProductsTitle = page.getByRole('heading', { name: 'Searched Products' });
        this.allProductsLocator = page.locator('div[class="features_items"] div[class="single-products"]');
    }

    async navigateToProductsPage(): Promise<void> {
        await this.productsButton.click();
    }

    async verifyAllProductsPage(): Promise<void> {
        await expect(this.allProductsTitle).toBeVisible();
        await expect(this.allProductsTitle).toHaveText(this.expectedProductsTitleText);
    }

    async searchForProduct(productName: string): Promise<void> {
        await this.searchProductBar.fill(productName);
        await this.searchButton.click();
    }
    async verifySearchedProductsPage(): Promise<void> {
        await expect(this.searchedProductsTitle).toBeVisible();
        await expect(this.searchedProductsTitle).toHaveText('Searched Products');
    }

    async verifyAllProductsAreVisible(): Promise<void> {
        const productCount = await this.allProductsLocator.count();
        expect(productCount).toBeGreaterThan(0);
        console.log(`Total products found: ${productCount}`);
        for (let i = 0; i < productCount; i++) {
            await expect(this.allProductsLocator.nth(i)).toBeVisible();
        }
    }
}