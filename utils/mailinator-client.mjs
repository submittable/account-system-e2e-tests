import 'dotenv/config';
import { MailinatorClient, GetInboxRequest, GetMessageRequest, DeleteInboxMessagesRequest } from 'mailinator-client';

const mailinatorClient = new MailinatorClient(process.env.MAILINATOR_API_KEY);
const mailinatorDomain = process.env.MAILINATOR_PRIVATE_DOMAIN;

// begin GET apis
const getLatestEmailMessage = async (inboxName) => {  
  return await mailinatorClient.request(new GetInboxRequest(mailinatorDomain, inboxName)).then(response => {  
    if (response.result?.msgs.length === 0)
    {
      console.log(`${inboxName}@${mailinatorDomain}'s inbox is empty!`);
      return null;
    }

    // grab & return first email from inbox
    return response.result?.msgs[0];
  });
}

const getEmailById = async (emailId) => {
  return await mailinatorClient.request(new GetMessageRequest(mailinatorDomain, emailId)).then(response => {
    if (response.statusCode !== 200)
    {
      console.log(`Error occurred fetching email with ID: ${emailId}. StatusCode: ${response.statusCode}`);
      return null;
    }

    return response.result;
  });
}

const getEmailBody = (email) => email.parts[0]?.body;
// end GET apis

// begin DELETE apis
const deleteEmailsByInbox = async (inboxName) => {
  return await mailinatorClient.request(new DeleteInboxMessagesRequest(mailinatorDomain, inboxName)).then(response => {  
    if (response.statusCode !== 200)
    {
      console.log(`Error occurred deleting emails for inbox: ${inboxName}@${mailinatorDomain}. StatusCode: ${response.statusCode}`);
      return null;
    }
  });
}
// end DELETE apis

export { getLatestEmailMessage, getEmailById, getEmailBody, deleteEmailsByInbox, mailinatorDomain };