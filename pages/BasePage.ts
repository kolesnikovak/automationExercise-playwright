import  {Locator, Page, expect} from '@playwright/test';

export class BasePage {
    page: Page;
    private topNavigationLocators: Locator;
    private header: Locator;
    private contactUsHeading: Locator;
    private getInTouchHeading: Locator;
    private contactUsNameInput: Locator;
    private contactUsEmailInput: Locator;
    private contactUsSubjectInput: Locator;
    private contactUsMessageInput: Locator;
    private contactUsFileInput: Locator;
    private contactUsSubmitButton: Locator;
    private successMessageLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.topNavigationLocators = page.locator('ul[class="nav navbar-nav"] li'); //all nav locators
        this.header = page.locator('h2[class="title text-center"]');
        this.contactUsHeading = page.getByRole('heading', { name: 'Contact Us' });
        this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
        this.contactUsNameInput = page.getByRole('textbox', { name: 'Name' });
        this.contactUsEmailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.contactUsSubjectInput = page.getByRole('textbox', { name: 'Subject', exact: true });
        this.contactUsMessageInput = page.getByRole('textbox', { name: 'Your Message Here' });
        this.contactUsFileInput = page.getByRole('button', { name: 'Choose File' });
        this.contactUsSubmitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessageLocator = page.locator('div[class="status alert alert-success"]');
    }

    async clickOnNavLink(linkText: string) {
        await this.topNavigationLocators.getByText(linkText).click();
    }
    async verifyHeader(expectedHeaderText: string): Promise<void> {
        await expect(this.header).toBeVisible();
        await expect(this.header).toHaveText(expectedHeaderText);
    }

    async verifyLoginSuccessMessage(username: string): Promise<void> {
        const successMessageLocator = this.topNavigationLocators.last();
        await expect(successMessageLocator).toBeVisible();
        await expect(successMessageLocator).toHaveText(`Logged in as ${username}`);
    }

    async verifyContactUsPage(): Promise<void> {
        await expect(this.contactUsHeading).toBeVisible();
        await expect(this.getInTouchHeading).toBeVisible();
    }

    async fillContactUsForm(name: string, email: string, message: string): Promise<void> {
        await this.contactUsNameInput.fill(name);
        await this.contactUsEmailInput.fill(email);
        await this.contactUsSubjectInput.fill('Test Subject');
        await this.contactUsMessageInput.fill(message);
    }

    async uploadFileInContactUsForm(filePath: string): Promise<void> {
        await this.contactUsFileInput.setInputFiles(filePath);
    }

    async submitContactUsForm(): Promise<void> {
        await this.contactUsSubmitButton.click();
    }

    async pressOKOnAlert(): Promise<void> {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.successMessageLocator).toBeVisible();
    }

}
