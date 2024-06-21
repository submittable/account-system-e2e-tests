import 'dotenv/config';
import { ManagementClient } from 'auth0';
import { get } from 'http';

const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0ClientId = process.env.AUTH0_CLIENT_ID;
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;

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
    console.log({ response });

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