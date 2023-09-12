import { test, expect } from '@playwright/test';

// test.use({ locale: 'en-EN' }); // Applicable for entire tests in the file.
test.describe.configure({ mode: 'parallel' });

test('has title', async ({ page }) => {
  // test.use({ locale: 'fr-FR' }); // Applicable for 
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
