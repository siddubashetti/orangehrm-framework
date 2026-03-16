import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class DashboardPage extends BasePage {

    // locators
    readonly userProfileMenu = '.oxd-userdropdown-tab'  // top right user profile menu
    readonly logoutOption = 'text=Logout'               // logout option in dropdown
    readonly mainMenuItems = '.oxd-main-menu-item'      // main menu items

    constructor(page: Page) {
        super(page)
    }

    /**
     * Verify that the dashboard has loaded successfully.
     */
    async verifyDashboardLoaded() {
        // verify URL contains 'dashboard'
        await expect(this.page).toHaveURL(/dashboard/)
        // verify 'My Actions' text is visible
        await expect(this.page.getByText('My Actions')).toBeVisible()
    }

    /**
     * Perform logout from the dashboard.
     */
    async logout() {
        // click user profile icon
        await this.clickElement(this.userProfileMenu)
        // click logout option
        await this.clickElement(this.logoutOption)
    }
}