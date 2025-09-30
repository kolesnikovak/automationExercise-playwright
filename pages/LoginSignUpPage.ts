import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginSignUpPage extends BasePage {

    private signUpTitle: Locator
    private nameField: Locator
    private emailField: Locator
    private signUpButton: Locator
    private readonly expectedSignUpTitleText = 'New User Signup!'
    private signUpLoginTitle: Locator;
    private readonly expectedsignUpTitleText = "Signup / Login";

    constructor(page: Page) {
        super(page)
        this.signUpTitle = page.getByRole('heading', { name: this.expectedSignUpTitleText })
        this.nameField = page.getByPlaceholder('Name')
        this.emailField = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signUpButton = page.getByRole('button', { name: 'Signup' })
        this.signUpLoginTitle = page.getByRole('link', { name: 'Signup / Login' });
    }

    async validateSignUpTitle(): Promise<void> {
        expect(this.signUpTitle).toBeVisible()
        expect(this.signUpTitle).toHaveText(this.expectedSignUpTitleText)
    }
    async signUpWithNameAndEmail(name: string, email: string): Promise<void> {
        await this.nameField.fill(name)
        await this.emailField.fill(email)
        await this.signUpButton.click()
    }
      async validateSignUpLoginTitle(): Promise<void> {
        await expect(this.signUpLoginTitle).toBeVisible();
        await expect(this.signUpLoginTitle).toHaveText(this.expectedsignUpTitleText);
    }
}






