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
        await page.waitForURL(/dashboard/)

        // Navigate to employee page
        await employee.navigateToEmployeePage();
        await page.waitForTimeout(2000);

        // Verify we're on the correct page
        await expect(page).toHaveURL(/pim\/viewEmployeeList/);
    });

    test('should add a new employee', async ({ page }) => {
        const login = new LoginPage(page)
        const employee = new EmployeePage(page)

        await login.navigateToLoginPage()
        await login.login('Admin', 'admin123')
        await page.waitForURL(/dashboard/)
        await employee.navigateToEmployeePage()
        await employee.addEmployee(firstName, lastName)


    })

    test('should search for an employee', async ({ page }) => {
        const login = new LoginPage(page);
        const employee = new EmployeePage(page);

        // Login first
        await login.navigateToLoginPage();
        await login.login('Admin', 'admin123');

        await page.waitForURL(/dashboard/)          // ← wait for dashboard!
        await page.waitForLoadState('domcontentloaded')


        // Navigate to employee page
        await employee.navigateToEmployeePage();

        await page.waitForURL(/viewEmployeeList/)   // ← wait for employee page!

        // Search for the employee by full name (autocomplete requires both parts)
        await employee.searchEmployee(fullName);
        await page.waitForTimeout(2000) // Wait for search results to load

        // verify results found
        await expect(page.getByText('(1) Record Found')).toBeVisible()


    });
});
