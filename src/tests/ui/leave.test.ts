import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LeavePage } from '../../pages/LeavePage';

const USERNAME = 'Admin';
const PASSWORD = 'admin123';

const fromDate = '01/01/2025';
const toDate = '01/03/2025';
const leaveType = 'US - Vacation';
const comment = 'Automation test leave';


test.describe.serial('OrangeHRM Leave module', () => {
    test('can navigate to Leave List page', async ({ page }) => {
        const login = new LoginPage(page);
        const leave = new LeavePage(page);

        await login.navigateToLoginPage();
        await login.login(USERNAME, PASSWORD);

        await leave.navigateToLeavePage();
        await expect(page).toHaveURL(/leave\/viewLeaveList/);
    });

    test('can view leave list', async ({ page }) => {
        const login = new LoginPage(page);
        const leave = new LeavePage(page);

        await login.navigateToLoginPage();
        await login.login(USERNAME, PASSWORD);

        await leave.navigateToLeavePage();
        await expect(page).toHaveURL(/viewLeaveList/);

        // heading and table should be visible
        await expect(page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
        await expect(page.locator('.oxd-table')).toBeVisible();
    });
});
