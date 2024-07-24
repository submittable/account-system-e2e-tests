import { deleteEmailsByInbox } from './mailinator-client.mjs'
import { getUsersQuery, deleteUserById } from './auth0-mgmt-api-client.mjs'

export const cleanup = async () => {
  // delete emails from test user inboxes
  var deleteEmailsResult = await deleteEmailsByInbox(`e2e_test*`);
  console.info(`Deleted ${deleteEmailsResult.count} emails with inbox name: e2e_test*`);

  // delete test users from Auth0 tenant
  const testUsers = await getUsersQuery('email:e2e_test*');
  const deleteResults = [];
  for (const user of testUsers)
  {
    var deleteResult = await deleteUserById(user.user_id);
    deleteResults.push(deleteResult);
  }

  return deleteResults.reduce((count, current) => Boolean(current) ? count += 1 : count, 0);
}

const deletedCount = await cleanup();
console.info(`Cleanup complete - deleted ${deletedCount} test users from Auth0 tenant.`);