import { defineConfig, devices } from '@playwright/test';
import { config } from "dotenv";
import moment from "moment";
import os from "os";
import path, { resolve } from "path"
config();

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  name: "Automated Playwright Tests",

  globalSetup: resolve("./global-setup.ts"),
  globalTeardown: resolve("./global-teardown.ts"),

  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
  timeout: process.env.CI ? 5 * 60 * 1000 : undefined,
  reportSlowTests: {
    max: 5,
    threshold: 300
  },
  preserveOutput: "always",
  // Look for test files in the "tests" directory, relative to this configuration file.̥
  testDir: './src/tests',
  testIgnore: '**\/test-assets/**',
  testMatch: `**\/*.@(spec|test).?(c|m)[jt]s?(x)`,

  snapshotDir: './snapshots',
  updateSnapshots: "missing",
  ignoreSnapshots: false,
  outputDir: "./output",

  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: process.env.CI ? 5 : undefined,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['dot'],
    ['line', { printSteps: true }],
    ['list'],
    // [
    //   "allure-playwright",
    //   {
    //     detail: true,
    //     outputFolder: "my-allure-results",
    //     suiteTitle: false,
    //   },
    // ],
    ['html', { outputFile: 'report.html', outputFolder: './test-results', open: false }],
    ['junit', { outputFile: 'junit.xml', outputFolder: './test-results' }],
    ['json', { outputFile: 'test-results.json', outputFolder: './test-results' }]
  ],
  quiet: false,
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      animations: 'allow',
      maxDiffPixels: 10,
    },
    toMatchSnapshot: {
      maxDiffPixels: 10,
    },
  },
  use: {
    browserName: 'chromium',
    channel: "chrome",
    baseURL: 'https://google.co.in/',
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    bypassCSP: false,
    javaScriptEnabled: true,
    headless: false,
    permissions: ['geolocation'],
      // 'downloads',
      // 'geolocation',
      // 'history',
      // 'management',
      // 'notifications',
      // 'background',
      // 'bookmarks',
      // 'clipboardRead',
      // 'clipboardWrite',
      // 'storage',
      // 'tabs'
    screenshot: 'only-on-failure',
    video: "retain-on-failure",
    trace: 'retain-on-failure',

    viewport: {
      width: 1920,
      height: 1080
    }, 

    launchOptions: {
      args: [
        '--window-size=1080,1920',
        '--window-position=-5,-5',
        '--start-maximized',
        // `--user-data-dir=${resolve('./dir')}`,
        // '--disable-extensions',
        // '--incognito',
        // '--disable-gpu',
        '--disable-infobars',
        // '--disable-notifications',
        // '--disable-popup-blocking',
        // '--disable-translate',
        // '--no-sandbox',
        // '--disable-web-security',
        // '--disable-features=ClickToCall,PasswordExport,PasswordImport,GooglePasswordManager,FileSystemApi,SafetyTipUI,SaveCardMigration',
        // '--disable-software-draw-without-gpu'
      ],
      downloadsPath: resolve('./downloads'),
      slowMo: 100,
      timeout: 30 * 1000,
      // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      logger: {
        isEnabled: (name, severity) => name === 'browser',
        log: (name, severity, message, args) => console.log(`${name} ${message}`)
      }
    },
    contextOptions: {
      acceptDownloads: true,
      locale: 'en-US',
      // recordHar: {
      //   path: resolve(`./output/HAR_${Date.now()}.zip`),
      //   content: "embed",
      //   mode: 'full'
      // },
      recordVideo: {
        dir: './output/',
        size: {
          height: 1080,
          width: 1920
        }
      },
      screen: {
        height: 1080,
        width: 1920
      },
      strictSelectors: false,
      timezoneId: 'America/New_York',
      
      // geolocation: {
      //   latitude: 40.367474,
      //   longitude: -82.996216
      // }
    },

    // connectOptions: {
    //   wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
    //     osVersion: "13.0",
    //     deviceName: "Samsung Galaxy S23", // "Samsung Galaxy S22 Ultra", "Google Pixel 7 Pro", "OnePlus 9", etc.
    //     browserName: "chrome",
    //     realMobile: "true",
    //     name: "My android playwright test",
    //     build: "playwright-build-1",
    //     "browserstack.username": process.env.BROWSERSTACK_USERNAME || "<USERNAME>",
    //     "browserstack.accessKey":
    //       process.env.BROWSERSTACK_ACCESS_KEY || "<ACCESS_KEY>",
    //     "browserstack.local": process.env.BROWSERSTACK_LOCAL || false,
    //   }
    //   ))}`
    // }
  },

  metadata: {
    "browserName": "chrome",
    "time": moment().format('DD/MM/YYYY HH:mm:ss'),
    "machine": os.machine(),
    "platform": os.platform(),
    "arch": os.arch()
  },

  /* Configure projects for major browsers */
  // projects: [

  //   {
  //     name: 'setup',
  //     testMatch: /set-up.spec\.ts/,
  //   },
  //   {
  //     name: 'logged in chromium',
  //     use: {
  //     ...devices['Desktop Chrome'],
  //     storageState: STORAGE_STATE
  //     },
  //     dependencies: ['setup'],
  //     testMatch: '**/*.loggedin.spec.ts',
  //     retries: 1
  //   },
  //   {
  //     name: 'logged out chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //     testIgnore: ['**/*loggedin.spec.ts']
  //   },

  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});
