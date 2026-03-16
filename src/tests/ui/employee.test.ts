import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeePage } from '../../pages/EmployeePage';

test.describe.serial('OrangeHRM Employee Management', () => {
    // At top of describe block
    const firstName = `Test${Date.now()}`
    const lastName = 'Automation'
    const fullName = `${firstName} ${lastName}`
    test('should navigate to employee list page', async ({ page }) => {
        const login = new LoginPage(page);
        const employee = new EmployeePage(page);

        // Login first
        await login.navigateToLoginPage();
        await login.login('Admin', 'admin123');

        // Navigate to employee page
        await employee.navigateToEmployeePage();

        await page.waitForTimeout(2000);

        // Verify we're on the correct page
        await expect(page).toHaveURL(/pim\/viewEmployeeList/);
    });

    test('should add a new employee', async ({ page }) => {
        const login = new LoginPage(page);
        const employee = new EmployeePage(page);

        // Login first
        await login.navigateToLoginPage();
        await login.login('Admin', 'admin123');

        // Navigate to employee page
        await employee.navigateToEmployeePage();

        // Add a new employee
        await employee.addEmployee(firstName, lastName);

        // Verify success message or redirect (optional - depends on UI)
        await page.waitForLoadState('networkidle');
    });

    test('should search for an employee', async ({ page }) => {
        const login = new LoginPage(page);
        const employee = new EmployeePage(page);

        // Login first
        await login.navigateToLoginPage();
        await login.login('Admin', 'admin123');

        // Navigate to employee page
        await employee.navigateToEmployeePage();

        // Search for the employee by full name (autocomplete requires both parts)
        await employee.searchEmployee(fullName);
        await page.waitForTimeout(2000) // Wait for search results to load

        // verify results found
        await expect(page.getByText('Record(s) Found')).toBeVisible()


    });
});
