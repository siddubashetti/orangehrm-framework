import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class EmployeePage extends BasePage {

    // Locators for PIM Employee List page
    readonly addEmployeeButton = 'button:has-text("Add")'              // Add Employee button
    readonly firstNameInput = '[name="firstName"]'                     // First Name input
    readonly lastNameInput = '[name="lastName"]'                       // Last Name input
    readonly saveButton = '[type="submit"]:has-text("Save")'          // Save button
    readonly searchBar = '[placeholder="Type for hints..."]'                     // Search bar (autocomplete)
    readonly employeeListTable = '.oxd-table'                          // Employee list table
    readonly searchButton = 'button[type="submit"]:has-text("Search")'               // Search button

    constructor(page: Page) {
        super(page)
    }

    /**
     * Navigate to the PIM Employee List page.
     */
    async navigateToEmployeePage() {
        await this.navigateTo('/web/index.php/pim/viewEmployeeList')
    }

    /**
     * Add a new employee with given first and last name.
     * @param firstName - employee first name
     * @param lastName - employee last name
     */
    async addEmployee(firstName: string, lastName: string) {
        // Click Add Employee button
        await this.clickElement(this.addEmployeeButton)

        // Wait for form to load
        await this.waitForElement(this.firstNameInput)

        // Enter first name
        await this.enterText(this.firstNameInput, firstName)

        // Enter last name
        await this.enterText(this.lastNameInput, lastName)

        // Click Save button
        await this.clickElement(this.saveButton)
        await this.page.waitForTimeout(2000) // Wait for save to complete
    }

    /**
     * Search for an employee by name.
     * @param name - employee name to search
     */
    /**
     * Search for an employee by full name.
     * The PIM search field is an autocomplete; typing alone does not
     * actually perform the search.  You must select the suggestion that
     * drops down before clicking the Search button.  The tests previously
     * passed only the first name, which meant the autocomplete never
     * resolved and the query returned no results.
     *
     * @param fullName - employee first and last name (e.g. "John Doe")
     */
    async searchEmployee(fullName: string) {
        // type the value into the autocomplete field
        await this.enterText(this.searchBar, fullName)

        // wait for dropdown options and click the one that matches
        const option = this.page.locator('.oxd-autocomplete-dropdown [role="option"]', { hasText: fullName });
        await option.click();

        // now perform the search
        await this.clickElement(this.searchButton)

        // wait for network activity to finish
        await this.page.waitForLoadState('networkidle')

        // verify the row appears (full name is shown on the row)
        await expect(this.page.getByText(fullName)).toBeVisible()
    }
}
