import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RecruitmentPage } from '../../pages/RecruitmentPage';

const USERNAME = 'Admin';
const PASSWORD = 'admin123';

/* Test case:
Create RecruitmentPage.ts for OrangeHRM:

Navigate to: /web/index.php/recruitment/viewCandidates

Locators needed:
1. Add Candidate button
2. First Name input
3. Last Name input
4. Email input
5. Save button
6. Candidates table

Methods needed:
1. navigateToRecruitmentPage()
   → go to /web/index.php/recruitment/viewCandidates

2. addCandidate(firstName, lastName, email)
   → click Add button
   → enter first name
   → enter last name
   → enter email
   → click Save

3. verifyCandidateAdded()
   → verify success message OR
   → verify redirected to candidate profile

Use same BasePage pattern!
Visit site and inspect elements!
Login: Admin/admin123
*/

test.describe.serial('OrangeHRM Recruitment module - Candidates', () => {
    test('inspect recruitment page elements', async ({ page }) => {
        const login = new LoginPage(page);
        const recruitment = new RecruitmentPage(page);

        await login.navigateToLoginPage();
        await login.login(USERNAME, PASSWORD);
        await page.waitForURL(/dashboard/);

        await recruitment.navigateToRecruitmentPage();
        await expect(page).toHaveURL(/recruitment\/viewCandidates/);

        // Take screenshot for inspection
        await page.screenshot({ path: 'recruitment-page.png', fullPage: true });

        // Try to find and log locators
        const addButton = page.locator('button:has-text("Add")');
        console.log('Add button found:', await addButton.count());

        const inputs = page.locator('input');
        console.log('Input count:', await inputs.count());

        // Log some input names
        const inputNames = await inputs.evaluateAll(inputs => inputs.map(input => input.name || input.placeholder));
        console.log('Input names/placeholders:', inputNames);

        // Pause for manual inspection if possible
        // await page.pause();
    });

    test('add candidate test', async ({ page }) => {
        const login = new LoginPage(page);
        const recruitment = new RecruitmentPage(page);

        await login.navigateToLoginPage();
        await login.login(USERNAME, PASSWORD);
        await page.waitForURL(/dashboard/);

        await recruitment.navigateToRecruitmentPage();

        await recruitment.addCandidate('John', 'Doe', 'john.doe@example.com');
        await recruitment.verifyCandidateAdded();
    });
});