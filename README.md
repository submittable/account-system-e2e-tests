# account-system-e2e-tests
Repository housing end-to-end (E2E) tests of the Auth0 Account System. These tests provide us "end user experience" test coverage, that help us guarantee that our UI/UX is what we expect, without us having to manually test the flows ourselves.

(tests crafted with [Playwright](https://playwright.dev/docs/intro) - `npm init playwright@latest`)

## Test Coverage
The following flows/user experiences are covered (included in-the-box):
- [x] Signup flow (email & password)
- [x] Login flow (email & password)

**Candidate flows** (i.e. flows not yet covered)
- [ ] Password reset
- [ ] Account linking
- [ ] Multi-factor authentication (MFA)
- [ ] Block/unblock User account

## Running the Tests
The tests contained in this repoistory are run in 1 of 3 ways, a few of them being automated:

1. Manual triggers - use the "Run Tests" Action to manually kick off test runs against any env of your choice (dev, staging, prod)
2. On pull request - the suite will run as part of the CI pipeline upon opening a PR to the `main` branch
3. **On cron schedule - the suite is run against our Production Auth0 UIs on the hour, daily**. These run automatically in the background on our Submittable self-hosted runners in K8s 

## Troubleshooting
Please use the steps below for resolving common issues with the test suite.

### Common Issues
There are a few main culprits of unexpected test failures, that are not apparent from viewing the failure logs. Please ensure that none of the following are present & retry the failing tests again:


**Problem:**
> Test user accounts are leftover in the Auth0 Tenant and/or test emails are left in test email inboxes

**Solution:** 
1. Run the [cleanup workflow](https://github.com/submittable/account-system-e2e-tests/actions/workflows/run_cleanup.yml) (incl. in repo) in the environment you're experiencing the failures in. 


## Local Development
### Prerequisites
**Whitelist your IP** - In order for this test suite to run successfully, bot detection features from our Auth0 Tenant must be disabled for your IP address. Doing this will prevent things like CAPTCHA challenges from happening during your test runs & blocking the tests from executing as expected. 

To have this done for you, please reach out to the #pd-account-system Slack channel directly with your IP address and we can unblock you. For example:
> "May I please have <IP_ADDRESS> whitelisted in <TARGET_ENV> for running the Account System E2E test suite?"

### Run Tests
1. `npm install` - install all dependencies for project
2. open 1Password, find "ACCOUNT_SYSTEM_E2E_TESTS_ENV" entry > paste contents into a `.env` file in the root of this directory
3. `npm run test`

#### Other available commands
`npm run test:headed` - run tests in "headed" mode (i.e. with browser popups)

`npm run test:ui` - run tests in Playwright's test runner UI

Run specific tests by providing direct path to the test you want (ex. `npx playwright test tests/001-user-signup.spec.js`)
