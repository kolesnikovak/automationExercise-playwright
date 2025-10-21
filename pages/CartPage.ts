import  {Locator, Page, expect} from '@playwright/test';
import { HomePage } from './HomePage';
import { faker } from '@faker-js/faker';

export class CartPage  extends HomePage {

    private addToCartButton: Locator;
    private cartButton: Locator;
    private continueShoppingButton: Locator;
    private quantityField: Locator;
    private cartItemsLocator: Locator;
    private viewCartButton: Locator;
    private cartInfo: Locator;
    private cartQuantityField: Locator;
    private allProductsLocator: Locator;
    private deleteButtonLocator: Locator;
    private cartIsEmptyTitle: Locator;
    private addToCartRecommendedItems: Locator;

    constructor(page: Page) {
         super(page);

        this.addToCartButton = page.locator('div[class="productinfo text-center"] a');
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.quantityField = page.locator('input[id="quantity"]');
        this.cartItemsLocator = page.locator('tr[class="cart_item"]');
        this.viewCartButton = page.locator('p[class="text-center"] u');
        this.cartInfo = page.locator('div[id="cart_info"]');
        this.cartQuantityField = page.locator('input[class="cart_quantity_input"] button');
        this.allProductsLocator = page.locator('div[class="features_items"] li');
        this.deleteButtonLocator = page.locator('a[class="cart_quantity_delete"]');
        this.cartIsEmptyTitle = page.locator('p[class="text-center"] b');
        this.addToCartRecommendedItems = page.locator('div[class="recommended_items"] a');
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

    async deleteAllProductsFromCart(): Promise<void> {
        while (await this.deleteButtonLocator.count() > 0) {
            await this.deleteButtonLocator.first().click();
            await this.page.waitForTimeout(1000); 
        }
    }

    async verifyCartIsEmpty(): Promise<void> {
        await expect(this.cartIsEmptyTitle).toBeVisible();
        await expect(this.cartIsEmptyTitle).toHaveText('Cart is empty!');
    }


     async clickOnProductsAddToCart(): Promise<void> {
            const count = await this.addToCartButton.count();
            const numberOfProductsToAdd = Math.min(10, count);
            for (let i = 0; i < numberOfProductsToAdd; i++) {
                await this.addToCartButton.nth(i).click();
                await this.continueShoppingButton.click();
            }
        }

        async addRecommendedItemToCart(): Promise<void> {
            for (let i = 0; i < await this.addToCartRecommendedItems.count(); i++) {
                await this.addToCartRecommendedItems.nth(0).click();
            }

    }
}
