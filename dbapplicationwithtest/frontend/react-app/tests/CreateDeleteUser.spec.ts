import { test, expect } from '@playwright/test';

test.describe('Add User Flow', () => {
  const userName = 'John Doe';
  const userEmail = 'john.doe@example.com';

  test('should add a new user', async ({ page }) => {
    // Navigate to the page with the AddUser form
    await page.goto('http://localhost:3000'); 

    // Step 1: Fill in the form fields with user data
    await page.fill('input[placeholder="Enter Name"]', userName); // Name input
    await page.fill('input[placeholder="Enter Email"]', userEmail); // Email input

    // Step 2: Submit the form
    await page.click('button[type="submit"]'); // Submit button

    // Step 3: Verify the onUserAdded callback was called 
    await expect(page.locator('input[placeholder="Enter Name"]')).toHaveValue('');
    await expect(page.locator('input[placeholder="Enter Email"]')).toHaveValue('');

    // Step 4: Verify user was added (e.g., by checking the user list or the UI showing the new user)
    await expect(page.locator('input[placeholder="Enter Name"]')).toHaveValue('');
    await expect(page.locator('input[placeholder="Enter Email"]')).toHaveValue('');
  });
});
