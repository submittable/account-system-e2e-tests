import { test as teardown, expect } from '@playwright/test'
import { deleteEmailsByInbox } from '../utils/mailinator-client.mjs'
import { getUsersQuery, deleteUserById } from '../utils/auth0-mgmt-api-client.mjs'

teardown.describe("Teardown", () => {
  teardown("Clear test user email inboxes", async () => {
    var deleteEmailsResult = await deleteEmailsByInbox(`e2e_test*`);

    // assertions
    expect(deleteEmailsResult.count).toBeGreaterThan(0);
  });

  teardown("Delete test users from Auth0 tenant", async () => {
    const testUsers = await getUsersQuery('email:e2e_test*');
    const deleteResults = [];
    for (const user of testUsers)
    {
      var deleteResult = await deleteUserById(user.user_id);
      deleteResults.push(deleteResult);
    }

    // assertions
    expect(deleteResults.every(r => r === true)).toBe(true);
  }); 
})