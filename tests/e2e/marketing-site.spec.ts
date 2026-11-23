import { test, expect } from '@playwright/test';

test.describe('Marketing Site E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero section renders with heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Reconcile First/i });
    await expect(heading).toBeVisible();
  });

  test('hero prompt chip and AI status line render on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const hero = page.locator('#home');
    await expect(hero.getByText('+ Prompt')).toBeVisible();

    // Typewriter text completes, then the status line becomes visible
    await expect(
      hero.getByText('How do I reconcile my business ledger and move tokens with confidence?'),
    ).toBeVisible({ timeout: 15000 });
    await expect(
      hero.getByText('Workslate AI is generating a response'),
    ).toBeVisible();
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
    await expect(page.getByRole('heading', { name: 'Multi-Party Ledger Reconciliation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Corporate Wallet Orchestration' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Programmable Settlement Rules' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'End-to-End Transaction Traceability' })).toBeVisible();
  });

  test('How It Works section has steps', async ({ page }) => {
    await page.goto('/#how-it-works');
    await expect(page.locator('#how-it-works')).toBeVisible();
    await expect(page.getByText('Connect Your Business Records')).toBeVisible();
    await expect(page.getByText('Reconcile Before You Move')).toBeVisible();
    await expect(page.getByText('Validate. Approve. Authorize.')).toBeVisible();
    await expect(page.getByText('Execute. Verify. Settle.')).toBeVisible();
  });

  test('How It Works video plays on click', async ({ page }) => {
    await page.goto('/#how-it-works');

    const playButton = page.getByRole('button', { name: 'Watch how it works video' });
    await expect(playButton).toBeVisible();
    await playButton.click();

    const video = page.locator('#how-it-works video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('src', '/assets/videos/tokens_at_the_speed_of_rules.mp4');

    // Placeholder button is replaced by the video
    await expect(playButton).not.toBeVisible();
  });

  test('Hero Watch video button triggers How It Works video', async ({ page }) => {
    await page.goto('/');

    const watchButton = page.getByRole('button', { name: 'Watch video' });
    await expect(watchButton).toBeVisible();
    await watchButton.click();

    // Page scrolls to the How It Works section
    await expect(page.locator('#how-it-works')).toBeInViewport();

    // Video replaces the placeholder and starts playing
    const video = page.locator('#how-it-works video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('src', '/assets/videos/tokens_at_the_speed_of_rules.mp4');
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

  test('Docs link navigates to docs page', async ({ page }) => {
    const docsLink = page.locator('header').getByRole('link', { name: 'Docs' });
    await docsLink.click();
    await expect(page).toHaveURL(/#\/docs/);
  });

  test('Docs page renders with heading', async ({ page }) => {
    await page.goto('/#/docs');
    const heading = page.getByRole('heading', { name: /Orchestrating value across/i });
    await expect(heading).toBeVisible();
  });

  test('Docs page renders architectural building blocks', async ({ page }) => {
    await page.goto('/#/docs');
    await expect(page.getByRole('heading', { name: 'Web3j', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'BPMN orchestration' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'EVM + consensus' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'State + storage' })).toBeVisible();
  });

  test('Docs page terminology filter buttons work', async ({ page }) => {
    await page.goto('/#/docs');
    const allButton = page.getByRole('button', { name: 'All terms' });
    const workflowButton = page.getByRole('button', { name: 'Workflow' });
    
    await expect(allButton).toBeVisible();
    await expect(workflowButton).toBeVisible();
    
    await workflowButton.click();
    // Verify filter was clicked (button should remain visible)
    await expect(workflowButton).toBeVisible();
  });

  test('Docs page code copy button is visible', async ({ page }) => {
    await page.goto('/#/docs');
    const copyButton = page.getByRole('button', { name: 'Copy example' });
    await expect(copyButton).toBeVisible();
  });

  test('Search trigger button is visible on docs page', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await expect(searchTrigger).toBeVisible();
  });

  test('Search dialog opens when trigger is clicked', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const dialog = page.getByRole('dialog', { name: /search docs/i });
    await expect(dialog).toBeVisible();
  });

  test('Search dialog closes with Escape', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const dialog = page.getByRole('dialog', { name: /search docs/i });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(dialog).not.toBeVisible();
  });

  test('Search input accepts text', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const searchInput = page.getByPlaceholder('Search docs...');
    await searchInput.fill('web3j');

    await expect(searchInput).toHaveValue('web3j');
  });

  test('Search results are displayed for valid query', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const searchInput = page.getByPlaceholder('Search docs...');
    await searchInput.fill('web3j');

    // Wait for results to load
    await page.waitForTimeout(200);

    const resultsList = page.getByRole('listbox');
    await expect(resultsList).toBeVisible();
  });

  test('Keyboard navigation works in search results', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const searchInput = page.getByPlaceholder('Search docs...');
    await searchInput.fill('consensus');

    // Wait for results before navigating
    const resultsList = page.getByRole('listbox');
    await expect(resultsList).toBeVisible();

    // Test arrow keys are handled (no error thrown)
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    
    // Verify results are still visible after navigation
    await expect(resultsList).toBeVisible();
  });

  test('Search result can be selected with Enter', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const searchInput = page.getByPlaceholder('Search docs...');
    await searchInput.fill('evm');

    // Wait for results — Enter is a no-op until they render
    const resultsList = page.getByRole('listbox');
    await expect(resultsList).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Dialog should close after selection
    const dialog = page.getByRole('dialog', { name: /search docs/i });
    await expect(dialog).not.toBeVisible();
  });

  test('Clear button resets search query', async ({ page }) => {
    await page.goto('/#/docs');
    const searchTrigger = page.getByRole('button', { name: /search docs/i });
    await searchTrigger.click();

    const searchInput = page.getByPlaceholder('Search docs...');
    await searchInput.fill('test query');

    const clearButton = page.getByRole('button', { name: /clear search/i });
    await clearButton.click();

    await expect(searchInput).toHaveValue('');
  });
});
