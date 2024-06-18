# account-system-e2e-tests
created using [Playwright](https://playwright.dev/docs/intro) - `npm init playwright@latest`

## Tests (included in the box)
1. Signup flow (email & password) - **WIP**
2. Login flow (email & password) - **WIP**

## Run the tests
1. `npm install` - install all dependencies for project
2. `npx playwright test` - run all tests in headless mode (i.e. no browser popups)
    - add `--headed` option to command to run w/browser popups
    - add `--ui` option to open Playwright test runner UI
    - run specific tests by providing direct path to the test you want (ex. `npx playwright test tests/001-user-signup.spec.js`)
