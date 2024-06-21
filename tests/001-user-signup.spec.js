import { test, expect } from '@playwright/test'
import { getLatestEmailMessage, getEmailById, getEmailBody, mailinatorDomain } from '../utils/mailinator-client.mjs'

test.describe("Sign-up flow", () => {
  test("Successfully sign up for account", async ({ page, browserName }) => {
    // navigate to Auth0 signup page through demo app
    await page.goto('https://account-system-auth0.dev-submittable.com/login');
    await page.getByText('Sign Up', { exact: true }).click();

    // fill out sign-up form & submit
    const testEmailPrefix = `e2e_test_${browserName}`;
    const testEmail = `${testEmailPrefix}@${mailinatorDomain}`;
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="ulp-first-name"]', 'E2E');
    await page.fill('input[name="ulp-last-name"]', 'Tests');
    await page.fill('input[name="ulp-display-name"]', 'E2E Test Account');
    await page.getByText('Continue', { exact: true }).click();

    // set password for account & submit
    await page.fill('input[name="password"]', 'PlaywrightTest123!');
    await page.getByText('Continue', { exact: true }).click();

    // send email verification code
    await page.getByText('Send verification code').click();

    // wait for email to be sent
    await (new Promise(r => setTimeout(r, 5000)));

    // get verification email from inbox
    const emailMsg = (await getLatestEmailMessage(testEmailPrefix));
    const { id } = emailMsg;

    const email = await getEmailById(id);
    const { subject } = email;

    // find verification code
    const emailBody = getEmailBody(email);
    var verifCodeRegex = emailBody.match(/<strong style="text-align:center;">([0-9]{4})<\/strong>/);
    var verifCode = verifCodeRegex[1];

    // fill out verification code form & submit
    await page.fill('input[name="verification_code"]', verifCode);
    await page.getByText('Continue', { exact: true }).click();
    
    // assertions (email subject line, body content & logged in state in demo app)
    expect(subject).toContain('Your verification code');
    await expect((await page.locator('id=profileDropDown'))).toBeVisible();
  });
})