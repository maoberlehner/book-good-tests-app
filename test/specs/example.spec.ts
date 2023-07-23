import { test, expect } from '@playwright/test';

test('works', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('You did it!')).toBeVisible();
});
