import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';

const USERNAME = 'Admin';
const PASSWORD = 'admin123';

/* Test case:
Create AdminPage.ts for OrangeHRM Admin module:

Navigate to: /web/index.php/admin/viewSystemUsers

Locators needed:
1. Add User button
2. Username input in search
3. Search button
4. User table rows

Methods needed:
1. navigateToAdminPage()
   → go to /web/index.php/admin/viewSystemUsers

2. searchUser(username)
   → enter username in search field
   → click Search button
   → verify results

3. verifyUserExists(username)
   → verify username visible in table

Use same BasePage pattern!
Visit site and inspect elements!
Login: Admin/admin123
*/

test.describe.serial('OrangeHRM Admin module - System Users', () => {
    test('can navigate to Admin System Users page', async ({ page }) => {
        const login = new LoginPage(page);
        const admin = new AdminPage(page);

        await login.navigateToLoginPage();
        await login.login(USERNAME, PASSWORD);
        await page.waitForURL(/dashboard/);

        await admin.navigateToAdminPage();
        await expect(page).toHaveURL(/admin\/viewSystemUsers/);
    });

    test('can search for a user', async ({ page }) => {
        const login = new LoginPage(page);
        const admin = new AdminPage(page);

        await login.navigateToLoginPage();
        await login.login(USERNAME, PASSWORD);
        await page.waitForURL(/dashboard/);
        await admin.navigateToAdminPage();

        await admin.searchUser('Admin');
        await admin.verifyUserExists('Admin');
    });
});