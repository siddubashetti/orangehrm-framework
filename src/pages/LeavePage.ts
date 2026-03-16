import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class LeavePage extends BasePage {

    // Menu locator
    readonly leaveListMenu = 'a:has-text("Leave List")'

    // topbar/apply link – becomes visible when Leave module active
    readonly applyLeaveButton = '.oxd-topbar-body-nav-tab-item:has-text("Apply")'

    // Apply form locators (styled components)
    // we cannot rely on static ids for dropdown, instead locate by label
    readonly leaveTypeLabel = 'label:has-text("Leave Type")'
    readonly leaveTypeOption = (type: string) => `.oxd-select-dropdown [role="option"]:has-text("${type}")`

    // date inputs share placeholder; we'll use them by position in code
    readonly dateInputPlaceholder = 'input[placeholder="yyyy-dd-mm"]' // date value provided in MM/DD/YYYY format

    // comments textarea
    readonly commentInput = 'textarea.oxd-textarea'

    readonly formApplyButton = 'button[type="submit"]:has-text("Apply")'
    readonly successMessage = '.oxd-toast-content, .oxd-text.oxd-text--span.oxd-toast-content' // toast shape

    constructor(page: Page) {
        super(page)
    }

    /**
     * Navigate directly to the leave list page using URL.
     */
    async navigateToLeavePage() {
        await this.navigateTo('/web/index.php/leave/viewLeaveList')
    }

    /**
     * Fill the leave application form and submit it.
     * @param leaveType - visible text of the leave type to select
     * @param fromDate - starting date (format depends on app, e.g. "2025-01-01")
     * @param toDate - ending date
     * @param comment - explanation or note
     */
    async applyLeave(leaveType: string, fromDate: string, toDate: string, comment: string) {
        // open application dialog/page
        await this.clickElement(this.applyLeaveButton)

        // wait for leave type label to be visible as indicator that form is ready
        await this.waitForElement(this.leaveTypeLabel)

        // select leave type using the custom dropdown
        // Open dropdown
        await this.page.locator('.oxd-select-text').first().click()
        // Select option by visible name
        await this.page.getByRole('option', { name: leaveType }).click()

        // fill dates – first and second inputs
        const dates = this.page.locator(this.dateInputPlaceholder)
        await dates.first().fill(fromDate)
        await dates.nth(1).fill(toDate)

        // enter comment
        await this.page.fill(this.commentInput, comment)

        // submit application
        await this.clickElement(this.formApplyButton)
    }

    /**
     * Assert that the success notification is shown after applying.
     */
    async verifyLeaveApplied() {
        await expect(this.page.locator(this.successMessage)).toBeVisible({ timeout: 5000 })
    }
}
