import  {Locator, Page, expect} from '@playwright/test';
import { HomePage } from './HomePage';
import { th } from '@faker-js/faker/.';

export class ProductsPage extends HomePage {
    private productsButton: Locator;
    private allProductsTitle: Locator;
    private searchProductBar: Locator;
    private searchButton: Locator;
    private searchedProductsTitle: Locator;
    private firstProductViewDetailButton: Locator;
    // private productNameInDetails: Locator;
    // private productCategoryInDetails: Locator;
    private productPriceInDetails: Locator;
    private productAvailabilityInDetails: Locator;
    private productConditionInDetails: Locator;
    private productBrandInDetails: Locator;
    private brandsTitle: Locator;
    private readonly expectedBrandsTitleText = 'Brands';
    private allBrandsLocator: Locator;
    private readonly expectedProductsTitleText = 'All Products';
    private allProductsLocator: Locator;
    private addToCartButton: Locator;
    private cartButton: Locator;
    private continueShoppingButton: Locator;
    private quantityField: Locator;
    private cartItemsLocator: Locator;
    private viewCartButton: Locator;
    private cartInfo: Locator;
    private cartQuantityField: Locator;


    constructor(page: Page) {
        super(page);
        this.productsButton = page.getByRole('link', { name: 'Products' });
        this.allProductsTitle = page.locator('h2[class="title text-center"]');
        this.searchProductBar = page.locator('input[id="search_product"]');
        this.searchButton = page.locator('button[id="submit_search"]');
        this.searchedProductsTitle = page.getByRole('heading', { name: 'Searched Products' });
        this.allProductsLocator = page.locator('div[class="features_items"] div[class="single-products"]');
        this.firstProductViewDetailButton = page.locator('a[href="/product_details/2"]');
       // this.productNameInDetails = page.getByRole('heading', { name: 'Men Tshirt' });
       // this.productCategoryInDetails = page.getByText('Category: Men > Tshirts');
        this.productPriceInDetails = page.getByText('Rs.');
        this.productAvailabilityInDetails = page.getByText('Availability:');
        this.productConditionInDetails = page.getByText('Condition:');
        this.productBrandInDetails = page.getByText('Brand:');
        this.brandsTitle = page.getByRole('heading', { name: 'Brands' });
        this.allBrandsLocator = page.locator('div[class="brands_products"] ul li');
        this.allProductsLocator = page.locator('div[class="features_items"] li');
        this.addToCartButton = page.locator('button[class="btn btn-default cart"]');
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.quantityField = page.locator('input[id="quantity"]');
        this.cartItemsLocator = page.locator('tr[class="cart_item"]');
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
        this.cartInfo = page.locator('div[id="cart_info"]');
        this.cartQuantityField = page.locator('input[class="cart_quantity_input"] button');
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
    async clickViewProductOnFirstProduct(): Promise<void> {
        await this.firstProductViewDetailButton.click();
    }

    async verifyDetailsAreVisible(): Promise<void> {
       // await expect(this.productNameInDetails).toBeVisible();
       // await expect(this.productCategoryInDetails).toBeVisible();
        await expect(this.productPriceInDetails).toBeVisible();
        await expect(this.productAvailabilityInDetails).toBeVisible();
        await expect(this.productConditionInDetails).toBeVisible();
        await expect(this.productBrandInDetails).toBeVisible();
    }

    async verifyBrandsSection(): Promise<void> {
        await expect(this.brandsTitle).toBeVisible();
        await expect(this.brandsTitle).toHaveText(this.expectedBrandsTitleText);
    }

    async clickOnBrand(brandName : string): Promise<void> {
        await this.allBrandsLocator.filter({ hasText: brandName }).first().click();
    }

    async addAllProductsToCart(): Promise<void> {
        const productCount = await this.allProductsLocator.count();
        for (let i = 0; i < productCount; i++) {
            await this.allProductsLocator.nth(i).hover();
            await this.addToCartButton.nth(i).click();
            await this.continueShoppingButton.click();
        }
    }

    async goToCartPage(): Promise<void> {
        await this.cartButton.click();
    }

    async verifyProductsInCartAreVisible(): Promise<void> {
        const cartItemsLocator = this.page.locator('tr[class="cart_item"]');
        const cartItemCount = await cartItemsLocator.count();
        console.log(`Total items in cart: ${cartItemCount}`);
        for (let i = 0; i < cartItemCount; i++) {
            await expect(cartItemsLocator.nth(i)).toBeVisible();
        }
    }

    async addProductQuantityToCart(quantity: number): Promise<void> {
        await this.quantityField.fill(quantity.toString());
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async verifyNumberOfItemsInCart(expectedCount: number): Promise<void> {
        return expect(this.cartItemsLocator).toHaveCount(expectedCount);
    }

    async clickContinueShoppingButton(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async clickViewCartButton(): Promise<void> {
        await this.viewCartButton.click();
    }
    async verifyIfProductAddedToCartIsVisible(): Promise<void> {
        await expect(this.cartInfo).toBeVisible();
    }

    async verifyQuantityInCart(expectedQuantity: number): Promise<void> {
        expect(this.cartQuantityField).toHaveValue(expectedQuantity.toString());
    }

}