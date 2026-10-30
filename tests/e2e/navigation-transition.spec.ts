import { test, expect } from '@playwright/test';

test.describe('Navigation transitions', () => {
  test('navigating to Docs is client-side with no full reload', async ({ page }) => {
    await page.goto('/');
    // Marker proves the JS context was not reloaded
    await page.evaluate(() => {
      (window as unknown as { __navMarker: boolean }).__navMarker = true;
    });

    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    await expect(page).toHaveURL(/#\/docs/);
    await expect(
      page.getByRole('heading', { name: /Orchestrating value across/i }),
    ).toBeVisible();

    const marker = await page.evaluate(
      () => (window as unknown as { __navMarker?: boolean }).__navMarker,
    );
    expect(marker).toBe(true);
  });

  test('page transition classes are applied during navigation', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main').first();
    // On initial load the entry page fades in
    await expect(main).toHaveClass(/page-fade-in/);

    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    // During fade-out the main element carries page-fade-out
    await expect(main).toHaveClass(/page-fade-out/);
    // After the swap completes the new page fades back in
    await expect(main).toHaveClass(/page-fade-in/);
    await expect(
      page.getByRole('heading', { name: /Orchestrating value across/i }),
    ).toBeVisible();
  });

  test('header persists across the docs transition', async ({ page }) => {
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('page heading receives focus after navigation', async ({ page }) => {
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    await expect(page.locator('#page-heading')).toBeFocused();
  });

  test('back and forward navigation transitions smoothly', async ({ page }) => {
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    await expect(
      page.getByRole('heading', { name: /Orchestrating value across/i }),
    ).toBeVisible();

    await page.goBack();
    await expect(
      page.getByRole('heading', { name: /Your personal agent/i }),
    ).toBeVisible();

    await page.goForward();
    await expect(
      page.getByRole('heading', { name: /Orchestrating value across/i }),
    ).toBeVisible();
  });

  test('scroll position resets on route change', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    await expect(
      page.getByRole('heading', { name: /Orchestrating value across/i }),
    ).toBeVisible();
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test('reduced motion swaps routes without fade classes', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Docs' }).first().click();
    await expect(
      page.getByRole('heading', { name: /Orchestrating value across/i }),
    ).toBeVisible();
    const mainClass = await page.locator('main').first().getAttribute('class');
    expect(mainClass).not.toContain('page-fade-out');
  });

  test('footer Docs link uses the client-side route', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      (window as unknown as { __navMarker: boolean }).__navMarker = true;
    });
    await page.locator('footer').getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/#\/docs/);
    const marker = await page.evaluate(
      () => (window as unknown as { __navMarker?: boolean }).__navMarker,
    );
    expect(marker).toBe(true); // no reload happened
  });

  test('static privacy page loads with transition script and fades in', async ({ page }) => {
    await page.goto('/');
    await Promise.all([
      page.waitForURL(/privacy\.html/),
      page.locator('footer').getByRole('link', { name: 'Privacy Policy' }).click(),
    ]);
    await expect(page.locator('html')).toHaveClass(/pt-ready/);
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('back link from privacy page returns to the SPA', async ({ page }) => {
    await page.goto('/privacy.html');
    await Promise.all([
      page.waitForURL((url) => url.pathname === '/' || url.pathname === '/index.html'),
      page.getByRole('link', { name: /Back to Home/ }).click(),
    ]);
    await expect(
      page.getByRole('heading', { name: /Your personal agent/i }),
    ).toBeVisible();
  });

  test('static terms page loads with transition script and fades in', async ({ page }) => {
    await page.goto('/terms.html');
    await expect(page.locator('html')).toHaveClass(/pt-ready/);
    await expect(page.getByRole('heading', { name: 'Terms of Service' })).toBeVisible();
  });
});
