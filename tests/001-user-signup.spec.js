import { test, expect } from '@playwright/test'
import { getLatestEmailMessage, getEmailById, getEmailBody, mailinatorDomain } from '../utils/mailinator-client.mjs'
import { cleanup } from '../utils/cleanup.mjs';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from '../utils/constants.mjs';

const demoAppUrl = process.env.ACCOUNTS_DEMO_APP_URL;

test.describe("Sign-up flow", () => {
  test("Successfully sign up for account", async ({ page, browserName }, testInfo) => {
    // clear out test user state if retry
    if (testInfo.retry) {
      const deleteCount = await cleanup();
      console.info(`Cleanup complete - deleted ${deleteCount} test users from Auth0 tenant.`);
    }

    // navigate to Auth0 signup page through demo app
    await page.goto(demoAppUrl);
    const signUpBtn = page.getByText('Sign Up', { exact: true });
    await signUpBtn.click();

    // fill out sign-up form & submit
    const testEmail = TEST_USER_EMAIL(browserName, mailinatorDomain);
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="ulp-first-name"]', 'E2E');
    await page.fill('input[name="ulp-last-name"]', 'Tests');
    await page.fill('input[name="ulp-display-name"]', 'E2E Test Account');

    const continueBtn1 = page.getByText('Continue', { exact: true });
    await continueBtn1.click();

    // set password for account & submit
    await page.fill('input[name="password"]', TEST_USER_PASSWORD);
    const continueBtn2 = page.getByText('Continue', { exact: true });
    await continueBtn2.click();

    // send email verification code
    const emailVerifBtn = page.getByText('Send verification code', { exact: true });
    await emailVerifBtn.click();

    // get verification email from inbox (max 3 tries)
    var emailMsg = null;
    var iter = 0;
    var mult = 1;
    while (emailMsg === null && iter < 2)
    {
      await (new Promise(r => setTimeout(r, 1000 * mult)));
      emailMsg = await getLatestEmailMessage(testEmail);
      
      iter += 1;
      mult * 2;
    }

    if (emailMsg === null)
    {
      throw new Error('No verification code email found - max retries exceeded (3)');
    }

    const { id } = emailMsg;
    const email = await getEmailById(id);
    const { subject } = email;

    // find verification code
    const emailBody = getEmailBody(email);
    var verifCodeRegex = emailBody.match(/<strong style="text-align:center;">([0-9]{4})<\/strong>/);
    var verifCode = verifCodeRegex[1];

    // fill out verification code form & submit
    await page.fill('input[name="verification_code"]', verifCode);
    const continueBtn3 = page.getByText('Continue', { exact: true });
    await continueBtn3.click();
    
    // assertions (email subject line, body content & logged in state in demo app)
    expect(subject).toContain('Your verification code');
    await expect((await page.locator('id=profileDropDown'))).toBeVisible();
  });
})