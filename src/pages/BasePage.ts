import { Page } from '@playwright/test'

export class BasePage {

    readonly page: Page
    // constructor - how do we store the page object?
    constructor(page: Page) {
        this.page = page
    }

    async navigateTo(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',  // ← don't wait for load!
            timeout: 90000                   // ← 60 seconds timeout!
        })
    }

    // write a method to get page title
    async getTitle() {
        return await this.page.title();
    }

    // Wait for an element to be visible
    async waitForElement(locator: string) {
        await this.page.waitForSelector(locator)
    }

    // Click any element
    async clickElement(locator: string) {
        await this.page.click(locator)
    }

    // Type text into any input field
    async enterText(locator: string, text: string) {
        await this.page.fill(locator, text)
    }

    // Check if element is visible - returns true or false
    async isElementVisible(locator: string): Promise<boolean> {
        return await this.page.isVisible(locator)
    }

    //To Close the perticular ad , when we are trying to serach in search field
    async closeAdIfPresent() {
        try {
            const closeBtn = this.page.locator('[id="dismiss-button"], [id="dismiss-button-element"]')
            if (await closeBtn.isVisible({ timeout: 3000 })) {
                await closeBtn.click()
                console.log('Ad closed!')
            }
        } catch {
            console.log('No ad found, continuing...')
        }
    }

}