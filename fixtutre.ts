import { test as base } from '@playwright/test';
import { SettingsPage } from './src/pages/settings-page';
import { TodoPage } from './src/pages/todo-page';
import fs from 'fs';
// Fixtures encapsulate setup and teardown in the same place so it is easier to write.
// Fixtures are reusable between test files - you can define them once and use in all your tests.
//  That's how Playwright's built-in page fixture works.
// Fixtures are on-demand - you can define as many fixtures as you'd like,
//  and Playwright Test will setup only the ones needed by your test and nothing else.
// Fixtures are composable - they can depend on each other to provide complex behaviors.
// Fixtures are flexible. Tests can use any combinations of the fixtures to tailor precise environment they need,
//  without affecting other tests.
// Fixtures simplify grouping. You no longer need to wrap tests in describes that set up environment,
//  and are free to group your tests by their meaning instead.

// Declare the types of your fixtures.
type MyFixtures = {
  todoPage: TodoPage;
  settingsPage: SettingsPage;
  person: string;
  slowFixture: string;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures, {
  workerFixture: string,
  autoWorkerFixture: string,
}>({
  todoPage: async ({ page }, use, testInfo) => {
    const logs = [];
    // Set up the fixture.
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');

    // Use the fixture value in the test.
    await use(todoPage);

    // Clean up the fixture.
    await todoPage.removeAll();

    // After the test we can check whether the test passed or failed.
    if (testInfo.status !== testInfo.expectedStatus) {
      // outputPath() API guarantees a unique file name.
      const logFile = testInfo.outputPath('logs.txt');
      await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
      testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
    }
  },

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },

  slowFixture: [async ({}, use) => {
    // ... perform a slow operation ...
    await use('hello');
  }, { timeout: 60000 }],

  workerFixture: [async ({ browser }, use) => {
    // workerFixture setup...
    await use('workerFixture');
    // workerFixture teardown...
  }, { scope: 'worker' }],

  autoWorkerFixture: [async ({ browser }, use) => {
    // autoWorkerFixture setup...
    await use('autoWorkerFixture');
    // autoWorkerFixture teardown...
  }, { scope: 'worker', auto: true }],

  person: ['John', { option: true }],
});
export { expect } from '@playwright/test';