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

    test('all sections are accessible', async ({ page }) => {
      await page.goto('/');
      
      const sections = ['#home', '#features', '#how-it-works', '#docs', '#pricing', '#sign-in', '#get-started', '#dashboard-demo', '#faq', '#footer'];
      
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

test.describe('Asset and Performance Verification', () => {
  test('hashed assets are used', async ({ page }) => {
    await page.goto('/');
    
    const scripts = await page.locator('script[src]').all();
    for (const script of scripts) {
      const src = await script.getAttribute('src');
      if (src) {
        // Hashed assets should have content hash in filename
        expect(src).toMatch(/\.[a-f0-9]{8,}\./);
      }
    }
  });

  test('font preload is present', async ({ page }) => {
    await page.goto('/');
    
    const fontPreload = await page.locator('link[rel="preload"][as="font"]').count();
    expect(fontPreload).toBeGreaterThan(0);
  });

  test('reduced motion is respected', async ({ page }) => {
    await page.goto('/');
    
    // Check for reduced-motion media query in styles
    const styles = await page.locator('style').all();
    let hasReducedMotion = false;
    
    for (const style of styles) {
      const content = await style.textContent();
      if (content?.includes('prefers-reduced-motion')) {
        hasReducedMotion = true;
        break;
      }
    }
    
    expect(hasReducedMotion).toBeTruthy();
  });
});
