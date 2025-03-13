import { test as base } from "@playwright/test";

export type TestOptions = {
	person: string;
};

export const test = base.extend<TestOptions>({
	person: ["Default", { option: true }],

	// Override default "page fixture"
	// page: async ({ page, person }, use) => {
	// 	await page.goto("http://youtube.com/?q=" + person);
	// 	// Each test will get a "page" that was already defined
	// 	await use(page);
	// 	// no clean up required.
	// },
});

export { expect } from "@playwright/test"; // Export `expect` so it can be used
