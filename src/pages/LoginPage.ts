import { Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {

    // locators – prefer name attribute, then placeholder
    readonly usernameInput = '[name="username"]' // fallback [placeholder="Username"] if needed
    readonly passwordInput = '[name="password"]' // fallback [placeholder="Password"] if needed
    readonly loginButton = '[type="submit"]'    // generic submit button

    constructor(page: Page) {
        super(page)
    }

    /**
     * Open the OrangeHRM login screen.
     */
    async navigateToLoginPage() {
        // use configured baseURL from playwright.config.ts
        await this.navigateTo('/web/index.php/auth/login')
    }

    /**
     * Perform a login with given credentials.
     * @param username - user name (eg. 'Admin')
     * @param password - password (eg. 'admin123')
     */
    async login(username: string, password: string) {
        await this.enterText(this.usernameInput, username)
        await this.enterText(this.passwordInput, password)
        await this.clickElement(this.loginButton)
    }
}
