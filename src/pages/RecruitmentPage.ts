import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class RecruitmentPage extends BasePage {

    // Locators for Recruitment Candidates page
    readonly addCandidateButton = 'button:has-text("Add")'  // Add Candidate button
    readonly firstNameInput = '[name="firstName"]'         // First Name input
    readonly lastNameInput = '[name="lastName"]'           // Last Name input
    readonly emailInput = '[placeholder="Type here"]'                 // Email input
    readonly saveButton = 'button[type="submit"]'          // Save button
    readonly candidatesTable = '.oxd-table'                // Candidates table

    constructor(page: Page) {
        super(page)
    }

    /**
     * Navigate to the Recruitment Candidates page.
     */
    async navigateToRecruitmentPage() {
        await this.navigateTo('/web/index.php/recruitment/viewCandidates')
    }

    /**
     * Add a new candidate.
     * @param firstName - candidate's first name
     * @param lastName - candidate's last name
     * @param email - candidate's email
     */
    async addCandidate(firstName: string, lastName: string, email: string) {
        // Click Add Candidate button
        await this.clickElement(this.addCandidateButton)

        // Enter first name
        await this.enterText(this.firstNameInput, firstName)

        // Enter last name
        await this.enterText(this.lastNameInput, lastName)

        // Enter email
        await this.enterText(this.emailInput, email)

        // Click Save button
        await this.clickElement(this.saveButton)
    }

    /**
     * Verify that the candidate was added successfully.
     */
    async verifyCandidateAdded() {
        // Wait for success message or redirection
        await this.page.waitForLoadState('networkidle')

        // Check for success message or redirection to candidate profile
        const successMessage = this.page.locator('.oxd-toast-content-text').getByText('Successfully Saved')
        const candidateProfile = this.page.locator('h6').getByText('Candidate Profile')

        await expect(successMessage.or(candidateProfile)).toBeVisible()
    }
}