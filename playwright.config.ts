import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests one time */
  retries: 1,
  //retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: 1,
  // workers: process.env.CI ? 1 : undefined, 

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml', includeProjectInTestName: true }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      categories: [
        {
          name: 'Smoke tests',
          matchedStatuses: ['passed']
        },
        // {
        //   name: 'Regression tests',
        //   matchedStatuses: ['passed']
        // }
      ],
      environmentInfo: {
        framework: 'Playwright',
        node_version: process.version,
        os: process.platform
      }
    }],
    //['./console-reporter.ts'],
    ['list']
  ],

  /* Maximum time one test can run */
  timeout: 300 * 1000,

  /* Maximum time for the entire test suite */
  globalTimeout: 3600 * 1000,

  /* Maximum time for expect() assertions */
  expect: {
    timeout: 10 * 1000
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Video recording for all tests */
    video: 'on',

    /* Screenshot on failure */
    screenshot: 'on',

    /* Maximum time for each action (click, fill, etc.) */
    actionTimeout: 30 * 1000,

    /* Maximum time for navigation actions */
    navigationTimeout: 60 * 1000,

    headless: false,

    // launchOptions:{

    // slowMo:800,

    //  }

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],

});

