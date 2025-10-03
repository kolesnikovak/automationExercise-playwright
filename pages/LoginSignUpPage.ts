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
    private loginToYourAccountTitle: Locator;
    private readonly expectedLoginToYourAccountTitleText = "Login to your account";
    private emailAddressField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;

    constructor(page: Page) {
        super(page)
        this.signUpTitle = page.getByRole('heading', { name: this.expectedSignUpTitleText })
        this.nameField = page.getByPlaceholder('Name')
        this.emailField = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signUpButton = page.getByRole('button', { name: 'Signup' })
        this.signUpLoginTitle = page.getByRole('link', { name: 'Signup / Login' });
        this.loginToYourAccountTitle = page.getByRole('heading', { name: 'Login to your account' });
        this.emailAddressField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
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
    async validateLoginToYourAccountTitle(): Promise<void> {
        await expect(this.loginToYourAccountTitle).toBeVisible();
        await expect(this.loginToYourAccountTitle).toHaveText(this.expectedLoginToYourAccountTitleText);
    }
    async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
        await this.emailAddressField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async validateErrorMessage(expectedMessage: string): Promise<void> {
        const errorMessage = this.page.getByText('Your email or password is');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(expectedMessage);
    }
    async clickLogoutButton(): Promise<void> {
        await this.logoutButton.click();
    }
}






