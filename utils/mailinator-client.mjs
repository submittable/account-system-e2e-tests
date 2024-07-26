import { MailinatorClient, GetInboxRequest, GetMessageRequest, DeleteInboxMessagesRequest } from 'mailinator-client';
import { getEnvVar } from './env-helper.mjs';

const client = new MailinatorClient(getEnvVar('MAILINATOR_API_KEY'));
const mailinatorDomain = getEnvVar('MAILINATOR_PRIVATE_DOMAIN');

// begin GET apis
const getLatestEmailMessage = async (email) => {  
  const inboxName = email.split('@')[0];
  
  return await client.request(new GetInboxRequest(mailinatorDomain, inboxName)).then(response => {  
    if (response.result?.msgs.length === 0)
    {
      console.error(`${inboxName}@${mailinatorDomain}'s inbox is empty!`);
      return null;
    }

    // grab & return first email from inbox
    return response.result?.msgs[0];
  });
}

const getEmailById = async (emailId) => {
  return await client.request(new GetMessageRequest(mailinatorDomain, emailId)).then(response => {
    if (response.statusCode !== 200)
    {
      console.error(`Error occurred fetching email with ID: ${emailId}. StatusCode: ${response.statusCode}`);
      return null;
    }

    return response.result;
  });
}

const getEmailBody = (email) => email.parts[0]?.body;
// end GET apis

// begin DELETE apis
const deleteEmailsByInbox = async (inboxName) => {
  return await client.request(new DeleteInboxMessagesRequest(mailinatorDomain, inboxName)).then(response => {  
    if (response.statusCode !== 200)
    {
      console.error(`Error occurred deleting emails for inbox: ${inboxName}@${mailinatorDomain}. StatusCode: ${response.statusCode}`);
      return null;
    }

    return response.result;
  });
}
// end DELETE apis

export { getLatestEmailMessage, getEmailById, getEmailBody, deleteEmailsByInbox, mailinatorDomain };