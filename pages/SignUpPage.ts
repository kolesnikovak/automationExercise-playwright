import { Locator, Page } from "@playwright/test";

export class SignUpPage {
    private mrRadio: Locator;
    private mrsRadio: Locator;
    private passwordField: Locator;
    private daysSelect: Locator;
    private monthsSelect: Locator
    private yearsSelect: Locator;
    private newsletterCheckbox: Locator;
    private specialOffersCheckbox: Locator
    private firstNameField: Locator;
    private lastNameField: Locator;
    private companyField: Locator;
    private address1Field: Locator;
    private address2Field: Locator;
    private cityField: Locator;
    private zipcodeField: Locator;
    private mobileNumberField: Locator
    private countryField: Locator;
    private stateField: Locator
    private createAccountButton: Locator;

    constructor(page: Page) {
        this.mrRadio = page.getByRole('radio', { name: 'Mr.' })
        this.mrsRadio = page.getByRole('radio', { name: 'Mrs.' })
        this.passwordField = page.getByRole('textbox', { name: 'Password *' })
        this.daysSelect = page.locator('#days')
        this.monthsSelect = page.locator('#months')
        this.yearsSelect = page.locator('#years')
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
        this.specialOffersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' })
        this.firstNameField = page.getByRole('textbox', { name: 'First name *' })
        this.lastNameField = page.getByRole('textbox', { name: 'Last name *' })
        this.companyField = page.getByRole('textbox', { name: 'Company', exact: true })
        this.address1Field = page.getByRole('textbox', { name: 'Address * (Street address, P.' })
        this.address2Field = page.getByRole('textbox', { name: 'Address 2' })
        this.countryField = page.getByLabel('Country *')
        this.stateField = page.getByRole('textbox', { name: 'State *' })
        this.cityField = page.getByRole('textbox', { name: 'City * Zipcode *' })
        this.zipcodeField = page.locator('#zipcode')
        this.mobileNumberField = page.getByRole('textbox', { name: 'Mobile Number *' })
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
    }

    async fillAccountDetails(mrOrMrs: string, password: string, day: string, month: string, year: string): Promise<void> {
        if (mrOrMrs.toLowerCase() === 'mr') {
            await this.mrRadio.check();
        } else if (mrOrMrs.toLowerCase() === 'mrs') {
            await this.mrsRadio.check();
        } else{
            throw new Error(`Invalid title: ${mrOrMrs}. Please use "Mr" or "Mrs".`);
        }
        await this.passwordField.fill(password);
        await this.daysSelect.selectOption(day);
        await this.monthsSelect.selectOption(month);
        await this.yearsSelect.selectOption(year);
    }

    async checkNewsLetterCheckbox(): Promise<void> {
        await this.newsletterCheckbox.check();
    }

    async uncheckNewsLetterCheckbox(): Promise<void> {
        await this.newsletterCheckbox.uncheck();
    }

    async checkSpecialOffersCheckbox(): Promise<void> {
        await this.specialOffersCheckbox.check();
    }
    async uncheckSpecialOffersCheckbox(): Promise<void> {
        await this.specialOffersCheckbox.uncheck();
    }

    
}