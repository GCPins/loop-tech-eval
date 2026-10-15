import { test, expect } from '@playwright/test';
import type { LoginTest } from './loop.model';
import data from './loop.data.json';


// import test cases, and exit if none are found
const testCases: readonly LoginTest[] = data.tests;
if (testCases.length === 0) {
  throw new Error('No test cases found in loop.data.json');
}

// load required environment variables, and exist if none are set
const { APP_USERNAME, APP_PASSWORD } = process.env;
if (!APP_USERNAME || !APP_PASSWORD) {
  throw new Error('APP_USERNAME and APP_PASSWORD environment variables must be set');
}


// login before each test, and confirm the login was successful 
// by confirming that the "logout" button is visible on the page 
test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Username').fill(APP_USERNAME);
  await page.getByLabel('Password').fill(APP_PASSWORD);

  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForSelector('button:has-text("Logout")');
});

// dynamically create/run the login automation tests as defined
// in the provided "loop.data.json" file by confirming that the
// relevant task resides within the correct column, and that the
// tag(s) expected to be associated with that task are also present
test.describe('Login Automation', () => {
  for (const { task, column, tags, platform } of testCases) {
    test(`${platform} - ${task}`, async ({ page }) => {
      // navigate to the correct platform page and wait for it to load
      await page.getByRole('button', { name: platform }).click();
      await expect(page.locator('header')).toContainText(platform);

      // locate the status column for the current task (used to locate the corrsponding task card)
      const colElem = page.getByRole('heading', { name: column }).locator('..');
      
      // locate the (root) card element for the current task
      const cardElem = colElem.getByRole('heading', { name: task, exact: true }).locator('..');
      await expect(cardElem).toBeVisible();

      // ensure there are not more (or less) tags than expected
      const tagElems = cardElem.locator(':scope > div > span');
      await expect(tagElems).toHaveCount(tags.length);

      // for each tag expected to be associated with the given task,
      // confirm that the tag is present within the selected task card 
      for (const tag of tags) {
        await expect(tagElems.and(cardElem.getByText(tag, { exact: true }))).toBeVisible();
      }
    });
  }
});
