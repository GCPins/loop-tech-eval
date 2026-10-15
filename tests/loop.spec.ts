import { test, expect } from '@playwright/test';
import { LoginTest } from './loop.model';
import data from './loop.data.json';

const testCases = data["tests"] as LoginTest[];

if (!process.env.APP_USERNAME || !process.env.APP_PASSWORD) {
  throw new Error('APP_USERNAME and APP_PASSWORD environment variables must be set');
}

const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;


test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Password').fill(PASSWORD);

  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForSelector('button:has-text("Logout")');
});

test.describe('Login Automation', () => {
  for (const data of testCases) {
    const task = data.task;
    const column = data.column;
    const tags = data.tags;
    const platform = data.platform;

    test(`${platform} ${task}`, async ({ page }) => {
      await page.getByRole('button', { name: platform }).click();
      await page.waitForSelector(`header:has-text("${platform}")`);

      const colElem = await page.getByRole('heading', { name: column }).locator('..');
      const cardElem = await colElem.getByRole('heading', { name: task });
      await expect(cardElem).toBeVisible();

      for (const tag of tags) {
        await expect(cardElem.locator('..')).toContainText(tag);
      }
    });
  }
});