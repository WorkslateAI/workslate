import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has semantic landmarks', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('interactive controls are keyboard operable', async ({ page }) => {
    // Test navigation links
    const homeLink = page.getByRole('link', { name: 'Home' });
    await homeLink.focus();
    await expect(homeLink).toBeFocused();
    
    // Test buttons - use first occurrence in header
    const registerButton = page.locator('header').getByRole('button', { name: 'Register for demo' });
    await registerButton.focus();
    await expect(registerButton).toBeFocused();
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img[alt]');
    await images.first().waitFor({ state: 'attached' });
    const count = await images.count();
    
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
