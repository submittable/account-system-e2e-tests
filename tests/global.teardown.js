import { test as teardown, expect } from '@playwright/test'
import { deleteEmailsByInbox } from '../utils/mailinator-client.mjs'

teardown("Teardown", async () => {
  // delete all emails for test accounts
  var deleteEmailsResult = await deleteEmailsByInbox(`e2e_test*`);

  // TODO: delete all test accounts from Tenant
  // deleteTestUsers();

  // assertions
  expect(deleteEmailsResult.count).toBeGreaterThan(0);
})