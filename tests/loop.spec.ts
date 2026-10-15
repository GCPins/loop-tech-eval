import { test, expect } from '@playwright/test';
import { data } from './loop.data.json';


const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;


test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Password').fill(PASSWORD);

  await page.getByRole('button', { name: 'Sign in' }).click();
});


test('web app to-do column two tags', async ({ page }) => {
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test('web app to-do column bug tag', async ({ page }) => {
  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('web app in-progress column', async ({ page }) => {
  // await page.getByRole('button', { name: 'Search' }).click();

  // await expect(page.getByRole('link', { name: 'Powered by' })).toBeVisible();
});

test('mobile app to-do column', async ({ page }) => {
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test('mobile app in-progress column', async ({ page }) => {
  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('mobile app done column', async ({ page }) => {
  // await page.getByRole('button', { name: 'Search' }).click();

  // await expect(page.getByRole('link', { name: 'Powered by' })).toBeVisible();
});
