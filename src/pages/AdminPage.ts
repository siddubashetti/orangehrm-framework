import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class AdminPage extends BasePage {

    // Locators for Admin System Users page
    readonly addUserButton = 'button:has-text("Add")'              // Add User button
    readonly usernameSearchInput = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input' // Username search input
    readonly searchButton = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]' // Search button
    readonly userTable = '.oxd-table'                              // User table
    readonly userTableRows = '.oxd-table tbody tr'                 // Table rows

    constructor(page: Page) {
        super(page)
    }

    /**
     * Navigate to the Admin System Users page.
     */
    async navigateToAdminPage() {
        await this.navigateTo('/web/index.php/admin/viewSystemUsers')
    }

    /**
     * Search for a user by username.
     * @param username - username to search
     */
    async searchUser(username: string) {
        // Enter username in search field
        await this.enterText(this.usernameSearchInput, username)

        // Click Search button
        await this.clickElement(this.searchButton)

        // Wait for network activity to finish
        await this.page.waitForLoadState('networkidle')
    }

    /**
     * Verify that a user exists in the table.
     * @param username - username to verify
     */
    async verifyUserExists(username: string) {
        // Check if username is visible in the table
        await expect(this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div/div/div[2]/div').getByText(username)).toBeVisible()
    }
}