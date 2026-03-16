import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';


test.describe('OrangeHRM Dashboard', () => {
    test('should verify dashboard loads after login', async ({ page }) => {
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);

        // Step 1: Navigate to login page
        await login.navigateToLoginPage();

        // Step 2: Login with Admin/admin123
        await login.login('Admin', 'admin123');

        // Step 3: Verify dashboard loaded
        // → URL contains 'dashboard'
        await expect(page).toHaveURL(/dashboard/);

        // → 'My Actions' text visible
        await expect(page.getByText('My Actions')).toBeVisible();

        // Additional verification using DashboardPage method
        await dashboard.verifyDashboardLoaded();
    });

    test('should verify logout works', async ({ page }) => {
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);

        // Step 1: Navigate to login page
        await login.navigateToLoginPage();

        // Step 2: Login with Admin/admin123
        await login.login('Admin', 'admin123');

        // Verify we're on the dashboard
        await expect(page).toHaveURL(/dashboard/);

        // Step 3: Click user profile menu
        // Step 4: Click logout
        await dashboard.logout();

        // Step 5: Verify redirected to login page
        // → URL contains 'auth/login'
        await expect(page).toHaveURL(/auth\/login/);
    });
});
