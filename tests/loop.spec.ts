import { test, expect } from '@playwright/test';
import { LoginTest } from './loop.model';
import data from './loop.data.json';


// import test cases, and exit if none are found
const testCases = data["tests"] as LoginTest[];
if (!testCases || testCases.length === 0) {
  throw new Error('No test cases found in loop.data.json');
}

// load required environment variables, and exist if none are set
if (!process.env.APP_USERNAME || !process.env.APP_PASSWORD) {
  throw new Error('APP_USERNAME and APP_PASSWORD environment variables must be set');
}
const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;


// login before each test, and confirm the login was successful 
// by confirming that the "logout" button is visible on the page 
test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Password').fill(PASSWORD);

  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForSelector('button:has-text("Logout")');
});

// dynamically create/run the login automation tests as defined
// in the provided "loop.data.json" file by confirming that the
// relevant task resides within the correct column, and that the
// tag(s) expected to be associated with that task are also present
test.describe('Login Automation', () => {
  for (const data of testCases) {
    const task = data.task;
    const column = data.column;
    const tags = data.tags;
    const platform = data.platform;

    test(`${platform} ${task}`, async ({ page }) => {
      await page.getByRole('button', { name: platform }).click();
      await page.waitForSelector(`header:has-text("${platform}")`);

      // locate all elements within the status column for the current test
      const colElem = await page.getByRole('heading', { name: column }).locator('..');
      // locate the specific task card within the previously selected status column 
      const cardElem = await colElem.getByRole('heading', { name: task });
      await expect(cardElem).toBeVisible();

      // for each tag expected to be associated with the given task,
      // confirm that the tag is present within the selected task card 
      for (const tag of tags) {
        await expect(cardElem.locator('..')).toContainText(tag);
      }
    });
  }
});