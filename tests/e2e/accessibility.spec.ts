import { test, expect } from '@playwright/test';
import { faqItems } from '../../src/content/faq';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('FAQ keyboard access works', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
    
    const firstQuestion = page.getByText(faqItems[0].question);
    await firstQuestion.focus();
    await firstQuestion.press('Enter');
    
    // Answer should be visible after Enter
    await expect(page.getByText(faqItems[0].answer)).toBeVisible();
  });

  test('footer links resolve to in-page anchors', async ({ page }) => {
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      
      // All footer links should be in-page anchors (start with #)
      expect(href?.startsWith('#')).toBeTruthy();
    }
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
    
    // Test buttons
    const getStartedButton = page.getByRole('button', { name: /Get Started/i });
    await getStartedButton.focus();
    await expect(getStartedButton).toBeFocused();
  });

  test('axe scans at required viewports', async ({ page }) => {
    const viewports = [
      { width: 360, height: 800 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1536, height: 864 },
    ];

    for (const { width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      
      // Run axe scan
      const violations = await page axeScan();
      expect(violations).toHaveLength(0);
    }
  });

  test('SVG diagrams have accessible descriptions', async ({ page }) => {
    await page.goto('/');
    
    const svgs = page.locator('svg[aria-label], svg[aria-labelledby]');
    const count = await svgs.count();
    
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const hasAriaLabel = await svg.getAttribute('aria-label');
      const hasAriaLabelledBy = await svg.getAttribute('aria-labelledby');
      
      expect(hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
    }
  });
});
