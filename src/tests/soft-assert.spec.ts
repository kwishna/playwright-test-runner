import { test, expect } from '@playwright/test';

// Create slowExpect
// const slowExpect = expect.configure({ timeout: 5000 });

// Create softExpect
// const softExpect = expect.configure({ soft: true });

test('Soft Assertions', async({page}) => {

    await page.goto('https://www.google.co.in/');
    await expect(page.locator("[aria-label='Search']").first()).toBeEditable();
    await expect(page.locator("[aria-label='Search']").first()).toBeVisible();
    await expect(page.locator("[aria-label='Search']").first()).toBeEnabled();

    await expect.soft(page).toHaveURL('https://www.google.com/search');
    await page.getByLabel('Search', { exact: true }).click();
        
    await page.getByLabel('Search', { exact: true }).fill("Fruits");
    await page.getByLabel('Google Search').first().click();

    await expect.soft(page.locator("[aria-label='Search']").first()).toHaveText('playwright');

    await expect(page.locator("[aria-label='Search']").first()).not.toBeEmpty();
    await page.waitForTimeout(5000);

    await expect.poll(async () => {
        const response = await page.request.get('https://api.example.com');
        return response.status();
      }, {
        // Custom expect message for reporting, optional.
        message: 'make sure API eventually succeeds',
        // Poll for 10 seconds; defaults to 5 seconds. Pass 0 to disable timeout.
        timeout: 10000,
      }).toBe(200);
})

    