// @ts-check
const { test, expect } = require('@playwright/test');

// begin login tests
test.describe("Log-in flow", () => {
  test("Successfully log in to account", async ({ page, browserName }) => {
    // navigate to Auth0 login page through demo app
    await page.goto('https://account-system-auth0.dev-submittable.com/login');
    await page.getByText('Log in', { exact: true }).click();

    // fill out log-in form & submit
    await page.fill('input[name="username"]', `brad.deibert+e2e_${browserName}@submittable.com`);
    await page.getByText('Continue', { exact: true }).click();

    // set password for account & submit
    await page.fill('input[name="password"]', 'PlaywrightTest123!');
    await page.getByText('Continue', { exact: true }).click();

    // verify logged in state in accounts demo app
    await expect((await page.locator('id=profileDropDown'))).toBeVisible();
  });

  // TODO: delete all test users after all tests have run
  // test.afterAll(async ({ page }) => {
    
  // });
})
// end login tests