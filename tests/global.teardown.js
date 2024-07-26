import { test as teardown, expect } from '@playwright/test'
import { cleanup } from '../utils/cleanup.mjs';

teardown.describe("Teardown", () => {
  teardown("Clear test users from Auth0 tenant & clear test inboxes", async () => {
    var deleteCount = await cleanup();

    // assertions
    expect(deleteCount).toBeGreaterThan(0);
  });
})