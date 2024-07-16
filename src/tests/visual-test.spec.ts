import { expect, test } from '@playwright/test';

test('Visual comparison', async({page}) =>{
    await page.goto('https://github.com/login')
    await expect(page).toHaveScreenshot('githubpage.png');
    await page.waitForTimeout(3000);
});
    