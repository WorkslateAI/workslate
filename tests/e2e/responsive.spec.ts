import { test, expect } from '@playwright/test';

const viewports = [
  { width: 360, height: 800, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1024, height: 768, name: 'laptop' },
  { width: 1536, height: 864, name: 'desktop' },
];

viewports.forEach(({ width, height, name }) => {
  test.describe(`Responsive tests at ${name} (${width}px)`, () => {
    test.use({ viewport: { width, height } });

    test('no horizontal overflow', async ({ page }) => {
      await page.goto('/');
      const body = page.locator('body');
      const bodyWidth = await body.evaluate(el => el.scrollWidth);
      const viewportWidth = await body.evaluate(el => el.clientWidth);
      
      expect(bodyWidth).toBe(viewportWidth);
    });

    test('main sections are accessible', async ({ page }) => {
      await page.goto('/');
      
      const sections = ['#home', '#how-it-works', '#features', '#global'];
      
      for (const sectionId of sections) {
        const section = page.locator(sectionId);
        await expect(section).toBeVisible();
      }
    });

    test('text is readable', async ({ page }) => {
      await page.goto('/');
      const body = page.locator('body');
      
      // Check that body has readable font size
      const fontSize = await body.evaluate(el => window.getComputedStyle(el).fontSize);
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14);
    });
  });
});

test.describe('Asset Verification', () => {
  test('images load successfully', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        await expect(img).toBeVisible();
      }
    }
  });
});
