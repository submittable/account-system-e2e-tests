import { cleanup } from "../utils/cleanup.mjs";

const deleteCount = await cleanup();
console.info(`Cleanup complete - deleted ${deleteCount} test users from Auth0 tenant.`);