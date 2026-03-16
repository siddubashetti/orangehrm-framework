import { test, expect } from '@playwright/test'

const USERNAME = 'Admin'
const PASSWORD = 'admin123'

// Helper function to login
async function loginViaUI(page: any) {
    await page.goto('/web/index.php/auth/login')
    await page.fill('[name="username"]', USERNAME)
    await page.fill('[name="password"]', PASSWORD)
    await page.click('[type="submit"]')
    await page.waitForURL(/dashboard/)
}

test.describe('OrangeHRM API Tests', () => {

    // Test 1: GET employees
    test('GET employees list should return 200', async ({ page }) => {
        await loginViaUI(page)

        const response = await page.request.get(
            '/web/index.php/api/v2/pim/employees'
        )

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.length).toBeGreaterThan(0)
        expect(body.data[0]).toHaveProperty('firstName')
    })

    // Test 2: GET leave types
    test('GET leave types should return 200', async ({ page }) => {
        await loginViaUI(page)

        const response = await page.request.get(
            '/web/index.php/api/v2/leave/leave-types'
        )

        console.log('Status:', response.status())
        const body = await response.json()
        console.log('Body:', JSON.stringify(body, null, 2))

        expect(response.status()).toBe(200)
        expect(body.data).toBeDefined()
    })

    // Test 3: GET job titles
    test('GET job titles should return 200', async ({ page }) => {
        await loginViaUI(page)

        const response = await page.request.get(
            '/web/index.php/api/v2/admin/job-titles'
        )

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.length).toBeGreaterThan(0)
    })

    // Test 4: GET locations
    test('GET locations should return 200', async ({ page }) => {
        await loginViaUI(page)

        const response = await page.request.get(
            '/web/index.php/api/v2/admin/locations'
        )

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.length).toBeGreaterThan(0)
    })

    // Test 5: GET nationalities
    test('GET nationalities should return 200', async ({ page }) => {
        await loginViaUI(page)

        const response = await page.request.get(
            '/web/index.php/api/v2/admin/nationalities'
        )

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.length).toBeGreaterThan(0)
    })

})