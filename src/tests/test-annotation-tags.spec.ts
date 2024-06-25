// Include playwright module
import { test, expect } from '@playwright/test';
test.describe('group', { tag: '@tagging' }, () => {
    
    test('skip this test', async ({ page, browserName }) => {
        test.skip(browserName === 'firefox', 'Still working on it');
    });

    // Declares a focused test. If there are some focused tests or suites, all of them will be run but nothing else.
    test.only('Only this', { tag: "@focused" }, async({page}) =>{
        console.log('a focused test')
    })

    // Skip a test. Playwright will not run the test past the test.skip() call.
    test.skip('Skipped Test', { tag: "@skipped" }, async({page}) =>{
        console.log('This test is skipped')
    })

    // Mark a test as "fixme", with the intention to fix it. P
    test.fixme('Under Dev', { tag: "@skipped" }, async({page}) =>{
        console.log('Fix')
    });

      // Advance form of tagging
      test('test login page1', {
        annotation: { type: 'issue', description: 'https://github.com/microsoft/playwright/issues/23180' }
      }, async ({ page }) => {
        console.log("Login page annotation");
      });

    // Advance form of tagging
    test('test login page2', {
        annotation: [
            { type: 'issue', description: 'https://github.com/microsoft/playwright/issues/23180' },
            { type: 'performance', description: 'very slow test!' },
        ]
      }, async ({ page }) => {
        console.log("Login page annotations multiple");
        
      });
});

// npx playwright test --grep "@fast|@slow"
// npx playwright test --grep-invert "@fast|@slow"