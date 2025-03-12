import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
	await page.goto("https://www.youtube.com/");
	await page.getByRole("combobox", { name: "Search" }).click();
	await page
		.getByRole("combobox", { name: "Search" })
		.fill("mickey mouse clubhouse song");
	await page.getByRole("combobox", { name: "Search" }).press("Enter");
	await page
		.getByRole("link", { name: "Mickey Mouse Clubhouse | Hot" })
		.click();
	await expect(page.locator("video")).toBeVisible();
});
