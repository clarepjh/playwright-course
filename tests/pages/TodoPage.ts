import { Page, Locator } from "@playwright/test";

export class ToDoPage {
	private readonly inputBox: Locator;
	private readonly todoItem: Locator;

	constructor(public readonly page: Page) {
		// name of the tag
		this.inputBox = this.page.locator("input.new-todo");
		this.todoItem = this.page.getByTestId("todo-item");
	}

	async goto() {
		console.log("navigating to demo.playwrite.dev/todomvc");
		await this.page.goto("http://demo.playwright.dev/todomvc/");
	}

	async addToDo(text: string) {
		console.log(`Adding to do ${text}`);
		await this.inputBox.fill(text);
		await this.inputBox.press("Enter");
	}

	async remove(text: string) {
		console.log(`Removing to do ${text}`);
		const todo = this.todoItem.filter({ hasText: text });
		await todo.hover();
		await todo.getByLabel("Delete").click();
		// await todo.
	}

	async removeAll() {
		console.log(`Removing all`);
		while ((await this.todoItem.count()) > 0) {
			await this.todoItem.first().first().hover();
			await this.todoItem.getByLabel("Delete").first().click();
		}
	}
}
