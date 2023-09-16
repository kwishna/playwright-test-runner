import { expect, test } from '@playwright/test';
import { SettingsPage } from "../pages/settings-page"

test.beforeEach(async ({ settingsPage }) => {
  await settingsPage.switchToDarkMode();
});

test.describe('Test Suite', () => {

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['notifications'], { origin: 'https://skype.com' });
  });

  test('test1', async ({ page, context }) => {
    await context.route('**.jpg', route => route.abort());
    // test logic
  });

  test.skip('test2', async ({ page }, testInfo) => {

    // test.skip("", (args, testInfo) => {
    //     console.log(testInfo);
    // });

    // test.skip((args) => {
    //     return args.acceptDownloads == false;
    // }, "skipper");

    // test.fixme(isMobile, 'Settings page does not work in mobile yet');

    if (testInfo.retry > 0) console.log(`Retrying!`);

    expect.soft(page.locator(""), "not visible").toBeVisible();
    expect.poll(() => page.locator("ss").textContent(), { intervals: [500], timeout: 3000 }).toBe("Hi");

  });

  test('test3', async ({ page }) => {
    // test logic
  });

});