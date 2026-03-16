import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

// simple smoke test for the login flow

test.describe('OrangeHRM login', () => {
    test('should allow valid user to log in', async ({ page }) => {
        const login = new LoginPage(page);


        await login.navigateToLoginPage();

        // ensure the form fields exist
        await expect(page.locator(login.usernameInput)).toBeVisible();
        await expect(page.locator(login.passwordInput)).toBeVisible();

        // perform login
        await login.login('Admin', 'admin123');

        // after login we should land on the dashboard
        await expect(page).toHaveURL(/dashboard/);

        // verify some element on the dashboard to confirm login was successful
        await expect(page.getByText('My Actions')).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
        const login = new LoginPage(page);

        await login.navigateToLoginPage();

        // perform login with invalid credentials
        await login.login('wronguser', 'wrongpass');

        // verify error message is visible
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });
});