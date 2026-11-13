// Run against a local server. Supply PLAYWRIGHT_MODULE if Playwright is not installed locally.
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:4323';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      for (const lang of ['ja', 'en']) {
        for (const route of ['/', '/learn/blog', '/learn/mentoring', '/learn/consult', '/works']) {
          await page.goto(`${origin}${route}?lang=${lang}`);
          await page.waitForFunction(l => document.querySelector(`[data-lang-set=${l}]`)?.getAttribute('aria-pressed') === 'true', lang);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width} ${lang} ${route}: overflow`);
          assert.equal(await page.locator('#nav').count(), 1);
          assert.equal(await page.locator('.site-footer').count(), 1);

        }
      }
    }
    assert.deepEqual(errors, []);
    console.log('Bilingual navigation and responsive checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
