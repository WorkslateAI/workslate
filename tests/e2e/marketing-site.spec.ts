import { test, expect } from '@playwright/test';

test.describe('Marketing Site E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero section renders with exact heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'From Market to Market. Your Token. Everywhere.' });
    await expect(heading).toBeVisible();
  });

  test('all in-page navigation links work', async ({ page }) => {
    const links = [
      { label: 'Home', href: '#home' },
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Docs', href: '#docs' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Sign In', href: '#sign-in' },
      { label: 'Get Started', href: '#get-started' },
    ];

    for (const link of links) {
      const navLink = page.getByRole('link', { name: link.label }).first();
      await expect(navLink).toHaveAttribute('href', link.href);
    }
  });

  test('dashboard section has simulated data notice', async ({ page }) => {
    const dashboardSection = page.locator('#dashboard-demo');
    await expect(dashboardSection).toBeVisible();
    
    const simulatedBadge = page.getByText('Simulated Data');
    await expect(simulatedBadge).toBeVisible();
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

  test('hero network diagram is visible', async ({ page }) => {
    const heroNetwork = page.locator('svg[aria-label="Market network diagram"]');
    await expect(heroNetwork).toBeVisible();
  });

  test('feature sections are visible', async ({ page }) => {
    await expect(page.locator('#features')).toBeVisible();
    await expect(page.getByText('Seamless Money Movement')).toBeVisible();
    await expect(page.getByText('EVM Nodes')).toBeVisible();
    await expect(page.getByText('Single Source of Truth')).toBeVisible();
  });

  test('How It Works section has ordered P2P steps', async ({ page }) => {
    await expect(page.locator('#how-it-works')).toBeVisible();
    await expect(page.getByText('Connect Your Wallet')).toBeVisible();
    await expect(page.getByText('Select Source & Destination')).toBeVisible();
    await expect(page.getByText('Execute P2P Transfer')).toBeVisible();
  });

  test('Developers section states Web3j is planned, not currently supported', async ({ page }) => {
    await expect(page.locator('#docs')).toBeVisible();
    await expect(page.getByText('Web3j Java Integration')).toBeVisible();
    await expect(page.getByText(/Planned/i)).toBeVisible();
    await expect(page.getByText(/Not currently supported/i)).toBeVisible();
    await expect(page.getByText(/currently available/i)).not.toBeVisible();
  });

  test('all navigation and CTA controls have valid destinations', async ({ page }) => {
    const navLinks = page.locator('header a');
    const navCount = await navLinks.count();
    
    for (let i = 0; i < navCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href?.startsWith('#')).toBeTruthy();
    }
  });

  test('keyboard operability for interactive controls', async ({ page }) => {
    const getStartedButton = page.getByRole('button', { name: /Get Started/i });
    await getStartedButton.focus();
    await expect(getStartedButton).toBeFocused();
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
  });
});
