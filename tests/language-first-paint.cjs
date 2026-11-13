const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:4323';
(async () => {
  const browser = await chromium.launch();
  try {
    for (const lang of ['ja','en']) {
      for (const route of ['/','/learn/blog','/learn/consult']) {
        const page = await browser.newPage();
        await page.addInitScript(language => {
          localStorage.setItem('mp-lang', language);
          window.languageFlashes = [];
          function sample() {
            const opposite = language === 'en' ? 'ja' : 'en';
            const visible = [...document.querySelectorAll(`main .${opposite}`)].some(el => el.getClientRects().length > 0);
            if (visible) window.languageFlashes.push(performance.now());
            requestAnimationFrame(sample);
          }
          requestAnimationFrame(sample);
        }, lang);
        // Client modules must not be needed to display the selected language.
        await page.route('**/*', request => request.request().resourceType() === 'script' ? request.abort() : request.continue());
        await page.goto(origin + route, {waitUntil:'domcontentloaded'});
        await page.waitForTimeout(200);
        assert.equal(await page.locator('html').getAttribute('lang'), lang);
        assert.equal(await page.locator('main').isVisible(), true);
        assert.deepEqual(await page.evaluate(() => window.languageFlashes), [], `${route}: wrong-language frame`);
        if (route.includes('classroom')) assert.match(await page.locator('.lesson-panel:not([hidden]) h1').innerText(), lang === 'en' ? /Claude vs\. Claude Code/ : /ClaudeとClaude Code/);
        await page.close();
      }
    }
    console.log('No wrong-language frames on home, courses or classroom with client modules blocked.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error); process.exitCode=1;});
