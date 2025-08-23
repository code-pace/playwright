import { test, expect } from '@playwright/test';

test.describe('Login Tests',()=> {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php?route=account/login');
  });

  test('Login with valid credentials', async ({page}) => {
    expect(page.getByText('Returning Customer')).toBeTruthy();
    await page.fill('input[name="email"]', 'canyika@yopmail.com');
    await page.fill('input[name="password"]', 'Newuser2025@@');
    await page.click('input[value="Login"]');
    await expect(page).toHaveURL('/index.php?route=account/account');
  });

  test('Login with invalid credentials', async ({ page }) => {
    expect(page.getByText('Returning Customer')).toBeTruthy();
    await page.fill('input[name="email"]', 'canyika@yopmail.com');
    await page.fill('input[name="password"]', 'WrongPassword2025@@');
    await page.click('input[value="Login"]');
    await expect(page.locator('div.alert-danger')).toContainText('Warning: No match for E-Mail Address and/or Password.');
    await expect(page).toHaveURL('/index.php?route=account/login');
  });

  test.skip('Login with empty fields', async ({ page }) => {
    expect(page.getByText('Returning Customer')).toBeTruthy();
    await page.click('input[value="Login"]');
    await expect(page.locator('div.alert-danger')).toContainText('Warning: No match for E-Mail Address and/or Password.');
    await expect(page).toHaveURL('/index.php?route=account/login');
  });
})
