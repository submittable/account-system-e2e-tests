# account-system-e2e-tests
crafted with [Playwright](https://playwright.dev/docs/intro) - `npm init playwright@latest`

## Tests (included in the box)
1. Signup flow (email & password)
2. Login flow (email & password)

## Run the tests
1. `npm install` - install all dependencies for project
2. open 1Password, find "ACCOUNT_SYSTEM_E2E_TESTS_ENV" entry > paste contents into a `.env` file in the root of this directory
3. `npx playwright test` - run all tests in headless mode (i.e. no browser popups)
    - add `--headed` option to command to run w/browser popups
    - add `--ui` option to open Playwright test runner UI
    - run specific tests by providing direct path to the test you want (ex. `npx playwright test tests/001-user-signup.spec.js`)
