import { test, expect } from '@playwright/test'
import { mailinatorDomain } from '../utils/mailinator-client.mjs'

const demoAppUrl = process.env.ACCOUNTS_DEMO_APP_URL;

test.describe("Log-in flow", () => {
  test("Successfully log in to account", async ({ page, browserName }) => {
    // navigate to Auth0 login page through demo app
    await page.goto(demoAppUrl);
    const loginBtn = page.getByText('Log in', { exact: true });
    expect(await loginBtn).toBeVisible();
    loginBtn.click();

    // fill out log-in form & submit
    const testEmail = `e2e_test_${browserName}@${mailinatorDomain}`;
    await page.fill('input[name="username"]', testEmail);
    const continueBtn1 = page.getByText('Continue', { exact: true });
    expect(await continueBtn1).toBeVisible();
    continueBtn1.click();

    // set password for account & submit
    await page.fill('input[name="password"]', 'PlaywrightTest12345!');
    const continueBtn2 = page.getByText('Continue', { exact: true });
    expect(await continueBtn2).toBeVisible();
    continueBtn2.click();

    // verify logged in state in accounts demo app
    await expect((await page.locator('id=profileDropDown'))).toBeVisible();
  });
})