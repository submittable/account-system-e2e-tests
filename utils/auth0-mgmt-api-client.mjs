import { ManagementClient } from 'auth0';
import { getEnvVar } from './env-helper.mjs';

const auth0Domain = getEnvVar('AUTH0_DOMAIN');
const auth0ClientId = getEnvVar('AUTH0_E2E_CLIENT_ID');
const auth0ClientSecret = getEnvVar('AUTH0_E2E_CLIENT_SECRET');

var client = new ManagementClient({
  domain: auth0Domain,
  clientId: auth0ClientId,
  clientSecret: auth0ClientSecret
});

// begin GET apis
const getUsersQuery = async (query) => {
  return await client.users.getAll({ q: query }).then(response => {
    if (response.status !== 200)
    {
      console.error(`Error occurred fetching users with query: q=${query}. StatusCode: ${response.statusCode}`);
      return null;
    }

    return response.data;
  });
}
// end GET apis

// begin DELETE apis
const deleteUserById = async (userId) => {
  return await client.users.delete({ id: userId }).then(response => {
    if (response.status !== 204)
    {
      console.error(`Error occurred deleting user with ID: ${userId}. StatusCode: ${response.statusCode}`);
      return null;
    }

    return true;
  });
}
// end DELETE apis

export { getUsersQuery, deleteUserById };