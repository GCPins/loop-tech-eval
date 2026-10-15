import { test, expect } from '@playwright/test';
import type { TaskTestCase } from './loop.model';
import testData from './loop.data.json';

const testCases: readonly TaskTestCase[] = testData.tests;
if (testCases.length === 0) {
  throw new Error('No test cases found in loop.data.json');
}

const { APP_USERNAME, APP_PASSWORD } = process.env;
if (!APP_USERNAME || !APP_PASSWORD) {
  throw new Error('APP_USERNAME and APP_PASSWORD environment variables must be set');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Username').fill(APP_USERNAME);
  await page.getByLabel('Password').fill(APP_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test.describe('Task board', () => {
  for (const { task, column, tags, platform } of testCases) {
    test(`${platform}: ${task} is in ${column}`, async ({ page }) => {
      await page.getByRole('button', { name: platform }).click();
      await expect(page.locator('header')).toContainText(platform);

      const statusColumn = page.getByRole('heading', { name: column }).locator('..');
      const taskCard = statusColumn.getByRole('heading', { name: task, exact: true }).locator('..');
      await expect(taskCard).toBeVisible();

      const tagElements = taskCard.locator(':scope > div > span');
      await expect(tagElements).toHaveCount(tags.length);
      expect((await tagElements.allTextContents()).sort()).toEqual([...tags].sort());
    });
  }
});
