// @ts-check
const { test, expect } = require('@playwright/test');

// begin login tests
test.describe("Log-in flow", () => {
  test("Successfully log in to account", async ({ page }) => {
    // TODO: implement login test
    expect(true).toBe(true);
  });

  // TODO: delete all test users after all tests have run
  test.afterAll(async ({ page }) => {
    
  });
})
// end login tests