import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:4173/';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 360, height: 640 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

const noAnim = process.argv.includes('--no-anim');
const throttle = process.argv.includes('--throttle');

if (throttle) {
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
}

await page.addInitScript((disableAnim) => {
  window.__lcp = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__lcp.push({
        startTime: Math.round(entry.startTime),
        size: entry.size,
        html: entry.element ? entry.element.outerHTML.slice(0, 160) : null,
      });
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  if (disableAnim) {
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
      document.head.appendChild(s);
    });
  }
}, noAnim);

await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(6000);

const lcp = await page.evaluate(() => window.__lcp);
const paints = await page.evaluate(() =>
  performance.getEntriesByType('paint').map((p) => `${p.name}=${Math.round(p.startTime)}`),
);
const imgs = await page.evaluate(() =>
  Array.from(document.querySelectorAll('img')).map((i) => ({
    src: (i.currentSrc || i.src).split('/').pop(),
    complete: i.complete,
    natW: i.naturalWidth,
    rect: i.getBoundingClientRect().toJSON(),
    display: getComputedStyle(i).display,
    visibility: getComputedStyle(i).visibility,
    opacity: getComputedStyle(i).opacity,
  })),
);
const net = await page.evaluate(() =>
  performance.getEntriesByType('resource')
    .filter((r) => /\.(avif|jpeg|webp|woff2)/.test(r.name))
    .map((r) => `${r.name.split('/').pop()} start=${Math.round(r.startTime)} dur=${Math.round(r.duration)}`),
);

console.log(JSON.stringify({ lcp, paints, imgs, net }, null, 1));
await page.screenshot({ path: 'lcp-diag.png' });
await browser.close();
