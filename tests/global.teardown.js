import { test as teardown } from '@playwright/test'
import { deleteEmailsByInbox } from '../utils/mailinator-client.mjs'

teardown("Teardown", () => {
  test("Successfully sign up for account", async ({ page, browserName }) => {
    // delete all emails for test accounts
    await deleteEmailsByInbox(`e2e_test*`);

    // TODO: delete all test accounts from Tenant
    // deleteTestUsers();
  });
})