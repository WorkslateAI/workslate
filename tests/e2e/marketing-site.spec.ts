import { test, expect } from '@playwright/test';

test.describe('Marketing Site E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero section renders with heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Your personal agent/i });
    await expect(heading).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    const links = [
      { label: 'Home', href: '#' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Global', href: '#global' },
    ];

    for (const link of links) {
      const navLink = page.getByRole('link', { name: link.label, exact: true }).first();
      await expect(navLink).toBeVisible();
      const href = await navLink.getAttribute('href');
      expect(href).toBe(link.href);
    }
  });

  test('features button is visible', async ({ page }) => {
    const featuresButton = page.getByRole('button', { name: 'Features' });
    await expect(featuresButton).toBeVisible();
  });

  test('no horizontal overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    const body = page.locator('body');
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    const viewportWidth = await body.evaluate(el => el.clientWidth);
    
    expect(bodyWidth).toBe(viewportWidth);
  });

  test('no horizontal overflow at 1536px', async ({ page }) => {
    await page.setViewportSize({ width: 1536, height: 800 });
    const body = page.locator('body');
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    const viewportWidth = await body.evaluate(el => el.clientWidth);
    
    expect(bodyWidth).toBe(viewportWidth);
  });

  test('feature sections are visible', async ({ page }) => {
    await page.goto('/#features');
    await expect(page.locator('#features')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chain of wallet token movement' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'EVM nodes – your token home' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Single source of truth' })).toBeVisible();
  });

  test('How It Works section has steps', async ({ page }) => {
    await page.goto('/#how-it-works');
    await expect(page.locator('#how-it-works')).toBeVisible();
    await expect(page.getByText('Connect your wallet to the agent.')).toBeVisible();
    await expect(page.getByText('Choose the markets you operate in.')).toBeVisible();
    await expect(page.getByText('The agent moves and tracks every token.')).toBeVisible();
  });

  test('SideSection is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Seamless. Secure. Global.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Seamless', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Secure', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Global', exact: true })).toBeVisible();
  });

  test('keyboard operability for interactive controls', async ({ page }) => {
    const registerButton = page.locator('header').getByRole('button', { name: 'Register for demo' });
    await registerButton.focus();
    await expect(registerButton).toBeFocused();
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
  });
});
