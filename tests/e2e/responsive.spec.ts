import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 800, name: 'small-mobile' },
  { width: 375, height: 800, name: 'mobile' },
  { width: 425, height: 800, name: 'large-mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1024, height: 768, name: 'small-laptop' },
  { width: 1440, height: 900, name: 'desktop' },
  { width: 1920, height: 1080, name: 'large-desktop' },
];

const routes = [
  { path: '/', name: 'home', heading: /Reconcile First/i },
  { path: '/#/docs', name: 'docs', heading: /Orchestrating value across/i },
];

viewports.forEach(({ width, height, name }) => {
  test.describe(`Responsive tests at ${name} (${width}px)`, () => {
    test.use({ viewport: { width, height } });

    routes.forEach(({ path, name: routeName, heading }) => {
      test(`no horizontal overflow on ${routeName}`, async ({ page }) => {
        await page.goto(path);
        // Wait until the target route is rendered so measurements are not
        // taken mid-mount or during a route swap.
        await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
        // Read both widths in one evaluate: a vertical scrollbar appearing
        // between two separate reads otherwise produces a false mismatch.
        const { bodyWidth, viewportWidth } = await page.locator('body').evaluate((el) => ({
          bodyWidth: el.scrollWidth,
          viewportWidth: el.clientWidth,
        }));

        expect(bodyWidth).toBe(viewportWidth);

        // No element may extend beyond the document bounds
        const overflowing = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const offenders: string[] = [];
          document.querySelectorAll('*').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && (rect.left < -1 || rect.right > docWidth + 1)) {
              offenders.push(
                `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''} (right:${Math.round(rect.right)})`,
              );
            }
          });
          return offenders.slice(0, 10);
        });
        expect(overflowing).toEqual([]);
      });
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
        // Lazy-loaded images must be scrolled into view before they render
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
      }
    }
  });
});
