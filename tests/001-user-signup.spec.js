// @ts-check
const { test, expect } = require('@playwright/test');

// begin signup tests
test.describe("Sign-up flow", () => {
  test("Successfully sign up for account", async ({ page }) => {
    // navigate to Auth0 login page through demo app
    await page.goto('https://account-system-auth0.dev-submittable.com/login');
    await page.getByText('Sign Up', { exact: true }).click();

    // fill out sign-up form & submit
    await page.fill('input[name="email"]', 'brad.deibert+e2e@submittable.com');
    await page.fill('input[name="ulp-first-name"]', 'E2E');
    await page.fill('input[name="ulp-last-name"]', 'Tests');
    await page.fill('input[name="ulp-display-name"]', 'E2E Test Account');
    await page.getByText('Continue', { exact: true }).click();

    // set password for account & submit
    await page.fill('input[name="password"]', 'PlaywrightTest123!');
    await page.getByText('Continue', { exact: true }).click();

    // assert verify email screen
    await expect(page.getByText('Send verification code')).toBeVisible();
  });
})
// end signup tests