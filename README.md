# account-system-e2e-tests
crafted with [Playwright](https://playwright.dev/docs/intro) - `npm init playwright@latest`

## Tests (included in the box)
1. Signup flow (email & password)
2. Login flow (email & password)

## Run the tests
### Prerequisites
**Whitelist your IP** - In order for this test suite to run successfully, bot detection features from our Auth0 Tenant must be disabled for your IP address. Doing this will prevent things like CAPTCHA challenges from happening during your test runs & blocking the tests from executing as expected. 

To have this done for you, please reach out to the #pd-account-system Slack channel directly with your IP address and we can unblock you. For example:
> "May I please have <IP_ADDRESS> whitelisted in <TARGET_ENV> for running the Account System E2E test suite?"

### Steps
1. `npm install` - install all dependencies for project
2. open 1Password, find "ACCOUNT_SYSTEM_E2E_TESTS_ENV" entry > paste contents into a `.env` file in the root of this directory
3. `npx playwright test` - run all tests in headless mode (i.e. no browser popups)
    - add `--headed` option to command to run w/browser popups
    - add `--ui` option to open Playwright test runner UI
    - run specific tests by providing direct path to the test you want (ex. `npx playwright test tests/001-user-signup.spec.js`)
