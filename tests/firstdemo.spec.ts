// ** Setting up Playwright / Configurations **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Easy one liner: "npm init playwright"
// - When creating the test file, <name>.spec.ts is important! **
// - Never change the name of the config file "playwright.config.ts"
// - Can easily configure which browser we require, e.g. Under Projects -> "Test against branded browser", we can just uncomment what we require.
// - We can define our base url in the config file under "use"; in our test cases, we can just direct to "await page.goto("/");" if the base url is set.
// - We can make use of a .env file by uncommenting lines 7-9 in the config file.
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Useful VS code extensions **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Playwright Test for VSCode by Microsoft (GUI to run playwright tests!)
//		- Can help with testing
//		- 🌟 Can help generate test case based on "Record new"; or "Pick locator" to even find locator etc. 🌟 (Can be done using cl -- codegen as well)
//			- Will help create code & file
// 			- Refer to "test-1.spec.ts" created by the recording~!
//			- Useful as a prototyping tool! & will suggest appropriate front facing locators!
// - REST Client by Huachao Mao
//		- Works similarly to postman!
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Important/useful cl to run tests  **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - "npx playwright test" - will run all test in dir 'tests' as configured in playwright.config.ts -> testDir
// - "--list" to list out list of tests that will be tested (in sequence)
// - "--headed" - Run tests in headed browsers (default: headless)
// - "--workers 1" / "--workers 2" - specifies the number of parallel worker processes to run tests.
//								 - --workers 1: Runs tests sequentially, one at a time.
//								 - --workers 2: Runs tests in parallel with two worker processes.
//								 - If there is only one test cases, playwright on default will only use 1 worker
// - "--project <browser>" (chromium, firefox, webkit) - Runs test only on specific browser (e.g. chromium)
// - "npx playwright test <my.spec.ts>:22" - Runs single test on code line <22> only.
// - "--trace on" - force tracing mode, can be "on", "off", "on-first-retry", "on-all-retries", "retain-on-failure", "retain-on-first-failure".
// - "--ui" - run tests in interactive UI mode.
// - "-g" or "--grep" Only run tests matching this regular expression (default: ".*").
// - "--reporter" Reporter to use, comma-separated, can be "dot", "line", "list", or others (default: "list"). You can also pass a path to a custom reporter file. (e.g. json)
// - 🌟 "npx playwright codegen <your-link>" -> Will open "Playwright inspector" (To record/pick locator/assertions/change source) 🌟 -- Refer to "testing codegen"
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** For locators | to find the elements required on a frontend **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Why not use search by id? Mainly cause it's not user facing -- which may lead to future maintenance. 😢
// - So how are we gonna look for the elements? If possible, use something user facing! 👍 don't use technical! (getByRole would be preferred)
// - Refer to test: "get started link"
// - Must understand that the locators are not the elements itself! We are not using the stale element!!
// - Playwright will always retrieve the 'fresh' locator - never stale
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Challenges of testing **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// 1) Combinatorial explosion -- all devs should collaborate to determine which test cases are actually important.
// 2) Top-down vs Bottom-up --  We do not have a clear approach. Depends on what is the process we use & what are the information we have at hand. Again; need collaboration of the team.
// 3) Can test show absence of bugs? -- Cannot be guaranteed. When test case failed, it can either be due to automation issues (majority of the problem) or the presence of bugs: but not the absence of bugs!
// 									 -- best to write test cases as simple as possible.
// 4) Setup & Maintenance cost -- Inevitable.
// 5) Test automation coverage -- etc. Will include integration, unit, security, E2E.. Need the skill set of a coder. Will need versioning.
// 6) Testing priorities -- Differing priorities from conflicting stakeholders (E.g. architect vs product owner); soft skills will be needed!
// 7) Resource crunch -- more developers than testers! Adding one line of code will require full-coverage testing again, adding to the crunch.
// 8) Flaky & flickering tests -- E.g. if the conditions of the function is passable base on certain circumstances,
//								 -----------------------
//								 || if (weekend)	   ||
//								 ||		give discount  ||
//								 || else			   ||
//								 ||		no discount	   || ❌
//
// 							   -- In order to avoid flaky results, have to create "isWeekEnd()" -> mock interface -> test env -> always returns true
//								 -----------------------
//								 || if (isWeekEnd())   ||
//								 || 	give discount  ||
//								 || else			   ||
//								 || 	no discount    || ✔
//								 -----------------------
// 9) Deciphering why tests fail
// 10) Keeping tests performant - Needs effort
// 								- test1 -> browser interface -> context1 -> page1
// 								- test2 -> existing browser interface -> context2 -> page2
// 11) Tests are not deliverables -- it is a quality assurance tool; Requires a difference approach; want to make sure that we don't over engineer in our test code: not easy!
// 12) How to isolate test? - Example:
// 							- goto: home page
// 							- goto: login
// 							- ❌ goto: pay -> internally -> call third party payment gateway - (if fails, test cases WILL fail)
// 							-- To avoid such failures, mocking will have to be done!
//							- ✔ goto -> pay -> internally -> call mock payment gateway
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** What is "Test"? **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Find bugs in SUT (System under Test)
// - Assess quality from a viewpoint
// - Part of quality assurance
// - What defines as a bug? ❗Expected <> Actual❗ Not including exceptions.
// - Rules for Success: ⭐Tests must pass! & Tests must be purposeful⭐

// -- But is it testable? --
// - <Code Design Architecture API Hooks, Team & Process, Management, Project & Customer, Technology Frameworks Libraries, Infrastructure Servers Cloud OS>
// - E.g. captcha? Allow configurations flags to on/off. Increasing, testability.
// - E.g. locators? Using front facing identifiers over 'id' which is back facing.
// - E.g. third party functions? Make sure functions can be easily mocked!
// - Have to take care of testability from the get go...

// -- When tests fails - Observability --
// - <Webpage, Javascript, Ajax, Network, API Endpoint, Auth, App Module, Logic, DB Server, Services, External App>
// - 🌟 LOGGING 🌟 is VERY important

// -- Conclusion? --
// START 📈 Testability
// START 📈 Observability
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Testing - Types **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Static -- ❌ Playwright is not as useful
// - Structural -- E.g. broken links(?) configured/structured wrongly. ✅ Playwright
// - Behavioral -- Can only be used for correctness; for functional -- how a user interact with the system. ✅ Playwright
// - Unit -- Individual coding unit, done by developer (White box testing) ❌ Playwright is not as useful
// - Integration -- Multiple coding units, done by developer (White box testing) ❌ Minimal Playwright Testing
// - System -- 'Whole' system, Tester (Black box testing) ✅ Playwright
// - Acceptance -- Product maturity, (Will buyer pay?), done by customer ✅ May include Playwright!
// - Alpha -- Internal acceptance, done by tester ✅ May include Playwright!
// - Beta -- Acceptance from user subset, done by customer ✅ May include Playwright!
// - Functional -- User's point of view, done by tester ✅ Playwright 🌟
// - Supplementary -- Non-functional, qualitative ❌ Playwright is not as useful; but possible to extend playwright to measure performance
// - System - External functions are mocked ✅
// - API ❌ || End-to-End ✅ External functions are not mocked || User interface ❌ playwright is not as good; better to use browser developer tools ||
// - Web ✅ || Non-Web ❌ || Desktop ❌ ||
// - Supplementary tests
// 		-- Performance ❌ || Load ❌ || Usability ❌ || Accessibility ✅ || Security ❌ Some portion only || Compatibility ❌ Unless used for multi browser testing || Scalability ❌ ||
// - Infrastructure test ❌
// 	- Omni-channels Testing
// 		-- Geography ❌ Unless running the same script in different geography/region || Devices ❌ Maybe in the future || Browser ✅ ||
// - Regression -- Test after change, done by developer & tester ✅
// - Smoke/Sanity -- Subset of key and fast testcases, readiness for further testing ✅ Some test can be run by playwright
// - Active -- With interaction ✅ Already being done with playwright!
// - Passive -- With just observation, no interaction, observability
// - Black-box -- Without knowledge of internals, Focus on "What' ✅ Mostly
// - White-box -- With knowledge of internals, Focus on 'How' ✅ Can do some white-box testing
// - Structured -- Plan as much as possible, easy to automate ✅ Mostly
// - Exploratory -- Monkey/buddy/pair testing, on-the-fly/ad-hoc, not random ✅ After gaining more knowledge, some exploratory testing can be done
// - Prototype -- Proof of concept ✅
// - Data Driven -- Keyword driven, Function, data, UI object, action & assertion, Table driven, all pairs ✅ Doable with playwright -- makes it easy
// - Mutation -- Introduce bugs, Be-bugging, Test test-cases ✅
// - Automated -- More effort to setup and maintain, save costs when repeated, UI/Browser Automation (Page objects, data driven, keyword driven, custom framework) ✅
// - Manual -- Easy to setup and maintain, increases costs when repeated, documentation ❌ but required before being able to automate the tests
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** What to test **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Anything which can fail
// - At least one test case for one functionality
// - Any thing with decision making or processing
// - Focus on intention
// ❗ Maximize testing ROI ❗
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Test Pyramid **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// 🔺 Unit -> Integration -> API -> GUI 🔺
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Test Principles - High Level **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Observability > Understanding
// - Support > Replication
// - Risk > Coverage
// - Testability > Automatability
// - Testing Expertise > Coding Expertise
// - Problem > Tools
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Test Principles - Low Level **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Testing show presence of bugs, NOT absence
// - 100% testing is impossible
// - Testing is contextual
// - Fight Pesticide Paradox by grooming -- using the same pesticide will make insects resistant to it; keep changing pesticide
// - Shifting left is beneficial
// - Bugs usually cluster together
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Guidelines - Test Case **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Simple, small, fast and structured -- we should not do multiple scenarios! (NO IF ELSE!)
// - Executable -- Whatever is needed for the test case is there within the testcase, Independent, Self-contained
// - Consumer's point of view
// - Expectation is known -- Before execution, "Fix the match"
// - Can refer to file "writtenTestcase"
// - 🌟 AAAC (Arrange, Act, Assert, Cleanup) 🌟
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Creating/Structuring test cases **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - When creating our testcase, we should group our testcases in our .specs.ts file.
// - can make use of test.describe("test", () => {}) to group the testcases (See example "Grouping testcases using describe")
// - Group test case based on functionality! (E2E) try not to group too many groups of test cases together.
// - example #1: -- 4 testers can work on it in parallel
// ||	describe - withdraw cash															||
// ||		describe - normal																||
// ||			test - withdrawal for $1000													||
// ||		describe - alternate flows														||
// ||			test - invalid card															||
// ||			test - invalid PIN once														||
// ||			test - invalid PIN more than thrice											||
// ||	 		test - insufficient balance													||
// ||		describe - errors																||
// ||	 		test - network down															||
// ||	 	describe - admin																||
// ||			test - ATM does not have enough balance										||
// ||	 		test - ATM does not have correct denomination								||
// - example #2: -- only 1 tester can work at it on a time
// ||	 describe - withdraw cash															||
// ||	 	test - withdrawal for $1000														||
// ||		describe - alternate flows														||
// ||			test - invalid card															||
// ||			test - invalid PIN once														||
// ||	 		test - invalid PIN more than thrice											||
// ||	 		test - insufficient balance													||
// ||			test - network down															||
// ||			test - ATM does not have enough balance										||
// ||			test - ATM does not have correct denomination								||
// - example #3: -- putting grouped test cases in different files (based on function) -- multiple people can work on it in parallel
// ||	 <tests> folder																		||
// ||	 	withdrawal																		||
// ||			TC001.withdrawal1000.normal.spec.ts 										|| ❌ What if you need to change the amount?
// ||			TC001.withdrawal.normal.spec.ts 											|| ✅ Naming of files should be ❗Functional view point❗
// ||				test('withdraw $100, ...)												||
// ||				test('withdraw $1000, ...)												||
// || 			TC002.withdraw.alternate.spec.ts											||
//
// - There is no truly 'correct' way to group your test; but preference on functionality as it's consumer point of view!
// - Keep grooming the test code!
// - In production, name filing will be different due to the different requirements
// - Don't hardcode values in our code, but make sure that hardcoded values are defined (e.g. const LABEL = "Search")
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Getting selector **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Inspect on browser developer tool -> Copy selector / JS path -> document.querySelector("body > section > div > section > ul > li > div > label")"
// - See example: "testing selector", "testing duckduckgo testing selector"
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** How does Playwright or any other automating libraries work actually? **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - All browser must provide the same api -- using webdriver api, they are all standardize!
// Flow: Test Code (any language) -> Library (for various languages) -> (TCP/IP) -> webdriver API -> browser API -> browser
// - 👎 Performance 📉
// - 👍 test code will not have any language dependency as library supports various languages, no browser limitation
// - E.g. Selenium

// Flow: Library -> server (work outside the browser) (works on any OS) -> browser -> inject lib/test code into browser -> test code (js) runs within browser
// - 👎 Stuck with javascript, runs in single thread, may have browser limitations
// - 👍 Performance 📈
// - E.g. Cypress

// Flow: Test Code (any language) -> Library -> devtools API -> browser
// - 👍 Performance 📈, test code will not have any language dependency as library supports various languages, no browser limitation
// - E.g. Playwright
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** What if you require repeated functions **
// --------------------------------------------------------------------------------------------------------------------------------------------------------\
// - Example:
// || test1																				||
// ||	login(page)																		||
// ||	search product																	||
// || test2																				||
// ||	login(page)																		||
// ||	add product to cart																||
// ||	view cart																		||
// || test3																				||
// ||	login(page)																		||
// ||	view profile
// - Repeated login(page) required for multiple testcase
// - Refer to section "Testing beforeAll / beforeEach / afterEach / afterAll hooks"
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ** Flaky tests **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Why your test may fail sometimes
// - Example:
// || let title = await page.title();
// || ❌ expect(title).toBe('funny - Google Search) 								  	   || 👎 No waiting, no re-try - may result in consistent results
// || ❌ if (title === 'funny - Google Search') { ... }  						  	   || 👎 No waiting, no re-try - may result in consistent results
// || ✅await expect(page).toHaveTitle('funny - Google Search', {timeout: 7000});  	   || 👍 Have re-try & waiting
// --------------------------------------------------------------------------------------------------------------------------------------------------------

//	** Other useful search tools/patterns/functions **
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// - Example: getAttribute
// || let value = await searchBox.getAttribute("value");								||
// || console.log(value);																||
// - Example: Regex for assertions / locators
// || const locator = page.getByRole("button").filter({ hasText: /Log (in|out)/ }); 	||
// -- Matches "Log in" or "Log out" buttons
// - Example: Running test cases with the same page -- refer to section "Testing running only one page with multiple tests"
//	||  let page: Page																	||
//	||  let context: BrowserContext;													||
//	||  test.beforeAll(async ({browser}) => {											||
//	||  	context = await browser.newContext();										||
//	||  	page = await context.newPage();												||
//	||  	await page.goto("...");														||
//	|| 	});																				||
// --------------------------------------------------------------------------------------------------------------------------------------------------------

import { test, expect, BrowserContext, Page } from "@playwright/test";

// Successful simple tests
// *****************************************************************
test.skip("testing google search page", async ({ page }) => {
	// playwright will provide the (page) -- new instance of a browser
	// await page.goto("/");
	await page.goto("http://google.com");
	await expect(page).toHaveTitle("Google");
});

test.skip("testing bing search page", async ({ page }) => {
	await page.goto("https://bing.com");
	await expect(page).toHaveTitle("Search - Microsoft Bing");
});

test.skip("testing youtube page", async ({ page }) => {
	await page.goto("https://youtube.com");
	await expect(page).toHaveTitle("YouTube");
});
// *****************************************************************

// Failed testcase of searching textarea by label
// This use case will fail as Google is detecting automation; requiring input from user.
// *****************************************************************
test.skip("testing google search page for india", async ({ page }) => {
	// goto will return the response completely. No need to manually wait.
	// Other testing libraries may require adding the manual wait.
	await page.goto("https://google.com");

	// another way of writing -- await expect(page.title()).resolves.toBe("Google");
	await expect(page).toHaveTitle("Google");

	// We have direct access to jQuery
	// We do not need await here as it is not returning a promise, but a Locator
	let searchBox = page.getByLabel("Search", { exact: true }); // this is also an assertion (test will fail if unable to find)
	await searchBox.fill("India");

	// we can use the searchBox directly
	// instead of -- await page.keyboard.press("Enter");
	await searchBox.press("Enter");

	await expect(page).toHaveTitle("India - Google Search");
});
// *****************************************************************

// Successful testcase of searching the form by id/class/data-h attribute and submitting the form.
// Modified to make this testcase work
// *****************************************************************
test.skip("testing bing search page for india", async ({ page }) => {
	await page.goto("https://bing.com");
	await expect(page).toHaveTitle("Search - Microsoft Bing");

	// ** Using direct of searching of textarea via label
	// let searchBox = page.getByLabel("characters"); // this is also an assertion (test will fail if unable to find)
	// const searchBox = page.locator("#sb_form_q");
	// await searchBox.fill("India");
	// await searchBox.click();

	// ** Search by data-h attribute
	// const form = page.locator('form[data-h="ID=HpApp,21474.1"]');

	// ** Search by id
	const form = page.locator("#sb_form");

	// ** Instead of searching textarea by itself, can use the already located form to get from
	form.getByLabel("characters").fill("India");

	// ** Search by class
	// const form = await page.locator('.sb_form');

	// Submit the form
	await form.evaluate((form: HTMLFormElement) => {
		const htmlForm = form;
		htmlForm.submit(); // Submit the form
	});

	await expect(page).toHaveTitle("India - Search", { timeout: 1000 });
});
// *****************************************************************

// Successful testcase of searching textarea by label
// *****************************************************************
test.skip("testing duckduckgo search page for india", async ({ page }) => {
	await page.goto("https://duckduckgo.com");
	await expect(page).toHaveTitle(
		"DuckDuckGo - Protection. Privacy. Peace of mind.",
	);
	let searchBox = page.getByLabel("Search with DuckDuckGo", { exact: true }); // this is also an assertion (test will fail if unable to find)

	await searchBox.fill("India");
	await searchBox.press("Enter");

	// Can set timeout here as a param
	await expect(page).toHaveTitle("India at DuckDuckGo", { timeout: 5000 });
});
// *****************************************************************

// Finding element by id (but this test case fails -- detected bot, can't confirm results)
// *****************************************************************
test.skip("searching klook", async ({ page }) => {
	await page.goto("https://www.klook.com/");

	// Wait for search box to be visible
	await page.waitForSelector("#banner-search");

	// Fill the search box
	await page.locator("#banner-search").fill("shanghai");

	// // Press Enter to trigger search (if required)
	await page.keyboard.press("Enter");

	// Wait for results to load
	await page.waitForSelector('text=Results for "shanghai"');

	// Assert that the search results are displayed
	await expect(page.getByText('Results for "shanghai"')).toBeVisible();
});
// *****************************************************************

// Expect a title to "contain" a substring.
// Not strict assertion -- might be better for better maintenance
// Key takeaway: toBeVisible();
// *****************************************************************
test.skip("get started link", async ({ page }) => {
	await page.goto("http://playwright.dev/");

	await expect(page).toHaveTitle(/Playwright/);
	// if title is "Test PlayWright" -- it will pass

	await page.getByRole("link", { name: "Get started" }).click();

	await expect(
		page.getByRole("heading", { name: "Installation" }),
	).toBeVisible();
});
// *****************************************************************

// Grouping testcases using describe
// Using describe, you'll be able to run the grouped tests at one go. e.g. "npx playwright test demo:<line of where test.describe is> --project chromium"
// Reports will indicate clearly the grouping and the specific test case being tested
// We can skip the group test by adding: "test.describe.skip(...)"
// *****************************************************************
test.describe.skip("Group google search home page", () => {
	const url = "http://google.com";
	test("go to google", async ({ page }) => {
		await page.goto(url);
		await expect(page).toHaveTitle("Google");
	});

	test("go to google #2", async ({ page }) => {
		await page.goto(url);
		await expect(page).toHaveTitle("Google");
	});
});
// *****************************************************************

// Testing selectors #1
// *****************************************************************
test.skip("testing selector", async ({ page }) => {
	const LABEL = "Search";
	await page.goto("http://google.com");
	// playwright will provide the (page) -- new instance of a browser
	await expect(page).toHaveTitle("Google");

	// let searchBox = page.getByLabel(LABEL, { exact: true})
	// let searchBox = await page.locator("#APjFqb")

	// It is not necessarily that we always use labels, we can also make use of the locator id which will be likely to change less.
	// In the end, its really based on our judgement on which locators we should use.
	// However, the name of our variable is very important to give more context on which exact component/element are we pointing to
	let searchBox = page.locator("#APjFqb");

	await searchBox.clear();
	await searchBox.fill("funny");
	await searchBox.press("Enter");
	await expect(page).toHaveTitle("funny - Google Search", { timeout: 7000 });
});
// *****************************************************************

// Testing selectors #2
// *****************************************************************
test.skip("testing duckduckgo testing selector", async ({ page }) => {
	await page.goto("https://duckduckgo.com");
	await expect(page).toHaveTitle(
		"DuckDuckGo - Protection. Privacy. Peace of mind.",
	);

	// ⭐ Examples below are locators looking for the 'Find' search box ⭐
	// Search locator by xpath
	let searchBox = page.locator('xpath=//*[@id="searchbox_input"]');

	// Search locator by css
	// let searchBox = page.locator('#searchbox_input');

	// Search locator by css selector (by indicating "css="")
	// let searchBox = page.locator('css=#searchbox_input');

	await searchBox.fill("India");
	// await searchBox.press("Enter");

	// ⭐ Examples below are locators looking for the 'Find' submit button after keying in your query in duckduckgo ⭐

	// -- Using GetByLabel --
	// if aria-label is "search"
	// --------------------------------------------------------------
	// 📃 TRY:
	// await page.getByLabel("Search").click();
	// 👎 WILL LEAD TO ERROR:
	// || Error: locator.click: Error: strict mode violation: getByLabel('Search') resolved to 5 elements:
	// || 1) <form action="/" method="GET" role="search" aria-label="Searchbox" id="searchbox_homepage" class="searchbox_form__QGHIz">…</form> aka getByRole('search', { name: 'Searchbox' })
	// || 2) <input name="q" type="text" required="" minlength="1" value="India" role="combobox" autocorrect="off" autocomplete="off" aria-expanded="true" id="searchbox_input" autocapitalize="none" aria-haspopup="listbox" data-state="suggesting" aria-autocomplete="both" data-reach-combobox-input="" aria-controls="listbox--:r9:" class="searchbox_input__rnFzM" aria-label="Search with DuckDuckGo" placeholder="Search without being tracked"/> aka getByRole('combobox', { name: 'Search with DuckDuckGo' })
	// || 3) <button type="reset" aria-label="Clear search input" class="iconButton_button__A_Uiu searchbox_clearButton__e_I1X">…</button> aka getByRole('button', { name: 'Clear search input' })
	// || 4) <button type="submit" aria-label="Search" class="iconButton_button__A_Uiu searchbox_searchButton__LxebD">…</button> aka getByRole('button', { name: 'Search', exact: true })
	// || 5) <div hidden="" role="region" id="panel--:r8:--7" data-state="collapsed" data-reach-accordion-panel="" aria-labelledby="button--:r8:--7" class="accordion_accordionContent__k7eWV">…</div> aka getByLabel('How do DuckDuckGo Search')
	// - More than one element having "search" as part of their substring/string
	// 👍 SOLUTION:
	// await page.getByLabel("Search", { exact: true }).click();
	// - Need to add { exact: true } to get the exact match
	// --------------------------------------------------------------

	// -- Using CSS --
	// if copied JS Path is "document.querySelector("#searchbox_homepage > div > div > div > button")"
	// OR if selector is "#searchbox_homepage > div > div > div > button"
	// --------------------------------------------------------------
	// 📃 TRY:
	// await page.locator("#searchbox_homepage > div > div > div > button").click();
	// 👎 WILL LEAD TO ERROR:
	// Error: locator.click: Error: strict mode violation: locator('#searchbox_homepage > div > div > div > button') resolved to 2 elements:
	//     1) <button type="reset" aria-label="Clear search input" class="iconButton_button__A_Uiu searchbox_clearButton__e_I1X">…</button> aka getByRole('button', { name: 'Clear search input' })
	//     2) <button type="submit" aria-label="Search" class="iconButton_button__A_Uiu searchbox_searchButton__LxebD">…</button> aka getByRole('button', { name: 'Search', exact: true })
	// 👍 SOLUTION:
	// await page.locator('#searchbox_homepage > div > div > div > button[type="submit"]').click();
	// - OR if button has a 🌟 UNIQUE 🌟 class:
	// await page.locator(".iconButton_button__A_Uiu ").click() OR await page.locator('.iconButton_button__A_Uiu[type="submit"]').click();
	// - OR
	// await page.locator('#searchbox_homepage button[type="submit"]').click();
	// --------------------------------------------------------------
	// - Need to add type="submit" since there is also a reset button!
	// --------------------------------------------------------------

	// -- Using Get By Role --
	// --------------------------------------------------------------
	// await page.getByRole('button', { name: 'Search', exact: true }).click();
	// --------------------------------------------------------------

	// --------------------------------------------------------------
	// -- Using XPath --
	// if copied is: //*[@id="searchbox_homepage"]/div/div/div/button
	// 📃 TRY:
	// await page.locator('xpath=//*[@id="searchbox_homepage"]/div/div/div/button').click();
	// 👎 WILL LEAD TO ERROR:
	// || Error: locator.click: Error: strict mode violation: locator('//*[@id="searchbox_homepage"]/div/div/div/button') resolved to 2 elements:
	// || 1) <button type="reset" aria-label="Clear search input" class="iconButton_button__A_Uiu searchbox_clearButton__e_I1X">…</button> aka getByRole('button', { name: 'Clear search input' })
	// || 2) <button type="submit" aria-label="Search" class="iconButton_button__A_Uiu searchbox_searchButton__LxebD">…</button> aka getByRole('button', { name: 'Search', exact: true })
	// - More than one button with the same id.
	// 👍 SOLUTION:
	// await page
	// 	.locator('//*[@id="searchbox_homepage"]/div/div/div/button[@type="submit"]')
	// 	.click();
	// - Need to add @type="submit" since there is type reset and type submit!
	// --------------------------------------------------------------

	await expect(page).toHaveTitle("India at DuckDuckGo", { timeout: 5000 });
});
// *****************************************************************

// Testing codegen recording
// *****************************************************************
test.skip("testing codegen", async ({ page }) => {
	await page.goto("https://www.youtube.com/");
	await page.getByRole("combobox", { name: "Search" }).click();
	await page
		.getByRole("combobox", { name: "Search" })
		.fill("mickey mouse clubhouse song");
	await page.getByRole("combobox", { name: "Search" }).press("Enter");
	await expect(page.locator("ytd-item-section-renderer")).toMatchAriaSnapshot(
		`- text: Mickey Mouse Clubhouse | Hot Dog Dance 🎶 | Disney Junior UK`,
	);
	await expect(
		page.getByRole("link", { name: "Mickey Mouse Clubhouse | Hot" }),
	).toBeVisible();
	await page
		.getByRole("link", { name: "Mickey Mouse Clubhouse | Hot" })
		.click();
	await expect(page.locator("video")).toBeVisible();
});

// Testing writing manual test script vs recording test script
// *****************************************************************
test.describe.skip("testing manual vs recording", async () => {
	test("testing manual demo", async ({ page }) => {
		await page.goto("https://demo.chetanpanchal.com/");
		await page
			.getByRole("button", { name: "Load Content", exact: true })
			.click();

		// await expect(page.locator('#dataPartialContent > ol > li:nth-child(1)')).toBeVisible();
		await expect(page.getByText("Data1")).toBeVisible();
	});

	test("testing recording demo", async ({ page }) => {
		await page.goto("https://demo.chetanpanchal.com/");
		await page
			.getByRole("button", { name: "Load Content", exact: true })
			.click();
		await expect(page.locator("#dataPartialContent")).toContainText("Data1");
	});
});
// *****************************************************************

// 🌟 Testing beforeAll / beforeEach / afterEach / afterAll hooks (sequence) 🌟
// *****************************************************************
// 🔻 --- Uncomment from here to try ---- 🔻
// test.beforeAll("Before all", async ({}, testInfo) => {
// 	console.log("Before all - all groups/tests, ", "test title:", testInfo.title);
// });

// test.beforeEach("Before each", async ({}, testInfo) => {
// 	// setup
// 	console.log(
// 		"Before each - all groups/tests, ",
// 		"test title:",
// 		testInfo.title,
// 	);
// });

// test.describe("group test 1", async () => {
// 	test.beforeAll("Before all", async ({}, testInfo) => {
// 		console.log("Before all 'Group test 1'", testInfo.title);
// 	});

// 	test.beforeEach("Before each", async ({}, testInfo) => {
// 		// setup
// 		console.log("Before each 'Group test 1'", testInfo.title);
// 	});

// 	test("test 1 with hooks", async ({}, testInfo) => {
// 		// setup
// 		console.log("Test title: ", testInfo.title);
// 	});

// 	test("test 2 with hooks", async ({}, testInfo) => {
// 		// setup
// 		console.log("Test title: ", testInfo.title);
// 	});

// 	test.afterEach("After each", async ({}, testInfo) => {
// 		// setup
// 		console.log("After each 'Group test 1'", testInfo.title);
// 	});

// 	test.afterAll("After all", async ({}, testInfo) => {
// 		console.log("After all 'Group test 1'", testInfo.title);
// 	});
// });

// test.describe("group test 2", async () => {
// 	test("test 1 without hook", async ({}, testInfo) => {
// 		// setup
// 		console.log("Test title: ", testInfo.title);
// 	});

// 	test("test 2 without hook", async ({}, testInfo) => {
// 		// setup
// 		console.log("Test title: ", testInfo.title);
// 	});
// });

// test.afterEach("After each", async ({}, testInfo) => {
// 	// clean up
// 	console.log("After each - all groups/tests, ", "test title:", testInfo.title);
// });

// test.afterAll("After all", async ({}, testInfo) => {
// 	console.log("After all - all groups/tests, ", "test title:", testInfo.title);
// });
// 🔺 ---- Uncomment stops here ---- 🔺

// 🔀 --- Input Command Line: --- 🔀
// 		npx playwright test firstdemo --project chromium --workers 1
// 🔯 ---  Resulting Output:  --- 🔯
// 		[chromium] › tests\firstdemo.spec.ts:613:6 › group test 1 › test 1 with hooks
//		Before all - all groups/tests,  test title: test 1 with hooks
//		Before all 'Group test 1' test 1 with hooks
//		Before each - all groups/tests,  test title: test 1 with hooks
//		Before each 'Group test 1' test 1 with hooks
//		Test title:  test 1 with hooks
//		After each 'Group test 1' test 1 with hooks
//		After each - all groups/tests,  test title: test 1 with hooks
//		[chromium] › tests\firstdemo.spec.ts:618:6 › group test 1 › test 2 with hooks
//		Before each - all groups/tests,  test title: test 2 with hooks
//		Before each 'Group test 1' test 2 with hooks
//		Test title:  test 2 with hooks
//		After each 'Group test 1' test 2 with hooks
//		After each - all groups/tests,  test title: test 2 with hooks
//		After all 'Group test 1' test 2 with hooks
//		[chromium] › tests\firstdemo.spec.ts:634:6 › group test 2 › test 1 without hook
//		Before each - all groups/tests,  test title: test 1 without hook
//		Test title:  test 1 without hook
//		After each - all groups/tests,  test title: test 1 without hook
//		[chromium] › tests\firstdemo.spec.ts:639:6 › group test 2 › test 2 without hook
//		Before each - all groups/tests,  test title: test 2 without hook
//		Test title:  test 2 without hook
//		After each - all groups/tests,  test title: test 2 without hook
//		After all - all groups/tests,  test title: test 2 without hook
// 🔯 --------------------------- 🔯

// - If there are more workers, while tests will carry out faster, it may lead to some issues.
// - Example:
// || worker1: beforeEach -> reset db
// || 	test 1 -> login, add product to cart, assert value of cart
// || worker2: beforeEach -> reset db
// || 	test 2 -> login, add 2 products to cart, assert value of cart
// ❌ Problem: if worker1 is faster than worker2, test 2 will have a total of 3 products; failing assertion.

// ✅ Solution: login to different accounts
// || worker1: beforeEach -> reset db
// || 	test 1 -> login elephant, add product to cart, assert value of cart
// || worker2: beforeEach -> reset db
// || 	test 2 -> login mickey, add 2 products to cart, assert value of cart

// ❗ Need to make sure there is complete independence of sequence ❗
// *****************************************************************

// Manual way - Without automation of Playwright
// *****************************************************************
// (async () => {
// 	// Launch Microsoft Edge
// 	const browser = await chromium.launch({
// 	  channel: 'msedge', // Specify Edge as the browser
// 	  headless: false // Set to true if you want headless mode
// 	});

// 	// Create a new browser context
// 	const context = await browser.newContext();

// 	// Open a new page
// 	const page = await context.newPage();

// 	// Navigate to your React app
// 	await page.goto('http://google.com'); // Change this to your app URL

// 	// Close the browser
// 	await browser.close();
//   })();
// *****************************************************************

// Testing running only one page with multiple tests
// *****************************************************************
test.describe.skip("1 page multiple test", async () => {
	let page: Page;
	let context: BrowserContext;
	test.beforeAll(async ({ browser }) => {
		context = await browser.newContext();
		page = await context.newPage();
		await page.goto("http://demo.chetanpanchal.com");
		console.log("new page");
	});

	test.afterAll(async ({ browser }) => {
		await page.close();
		await context.close();
		console.log("close page");
	});

	test("header1 test", async () => {
		const name = await page.innerText("h1");
		expect(name).toContain("Display");
	});

	test("header2 test", async () => {
		const name = await page.innerText("h2");
		expect(name).toContain("2nd level");
	});
});

// 🔀 --- Input Command Line: --- 🔀
// 		npx playwright test -g "1 page multiple" --project chromium --workers 1
// 🔯 ---  Resulting Output:  --- 🔯
// 		[chromium] › tests\firstdemo.spec.ts:769:6 › 1 page multiple test › header1 test
// 		new page
// 		[chromium] › tests\firstdemo.spec.ts:774:6 › 1 page multiple test › header2 test
// 		close page
// 🔯 --------------------------- 🔯
// *****************************************************************
