import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only  */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		// doesnt work..
		// person: "Test person 3",
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Filter tests by glob patterns or regular expressions.
	// // Glob patterns or regular expressions to ignore test files.
	// testIgnore: "*test-assets",
	// // Glob patterns or regular expressions that match test files.
	// testMatch: "*todo-tests/*.spec.ts",
	
	/* Advanced Configuration
	// // Folder for test artifacts such as screenshots, videos, traces, etc.
	// outputDir: "test-results",
	// // path to the global setup files.
	// globalSetup: require.resolve("./global-setup"),
	// // path to the global teardown files.
	// globalTeardown: require.resolve("./global-teardown"),
	// // Each test is given 30 seconds.
	// timeout: 30000, // test.setTime(30000)

	/* Configuration for the expect assertion library.
	// expect: {
	// 	// Maximum time expect() should wait for the condition to be met.
	// 	timeout: 5000,
	// 	toHaveScreenshot: {
	// 	  // An acceptable amount of pixels that could be different, unset by default.
	// 	  maxDiffPixels: 10,
	// 	},
	// 	toMatchSnapshot: {
	// 	  // An acceptable ratio of pixels that are different to the
	// 	  // total amount of pixels, between 0 and 1.
	// 	  maxDiffPixelRatio: 0.1,
	// 	},
	//   },

	/* Configure projects for major browsers */
	// Projects are custom configuration!
	// devices -> DeviceDescriptor -> (userAgent) User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>
	// We can easily add our own device as well!
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

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
		// 	name: "Microsoft Edge",
		// 	use: { ...devices["Desktop Edge"], channel: "msedge" },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
