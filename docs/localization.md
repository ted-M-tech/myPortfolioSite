# Japanese and English

## Reader experience

- A shared JP / EN control appears in the portfolio and all Learn pages.
- `?lang=ja` or `?lang=en` takes precedence over the saved `mp-lang` preference. On a first visit, the browser language selects Japanese or English.
- Switching updates the same page, preserves the lesson query parameter. Preference persists across navigation and reloads.
- Images, video audio and downloadable Japanese practice assets retain their original language. Japanese expressions remain as teaching examples. External note articles retain their original text with an English language notice.
- Prices retain their original JPY values; changing the display language does not change the offer or currency.
- External booking/payment interfaces are owned by their providers; this implementation translates the surrounding site, not cross-origin iframe contents.

## Content ownership

Japanese lesson sources remain in `src/content/`. Reviewed English prose and UI labels are in `src/data/i18n/en.json`, keyed by their Japanese source text. Multiple-line practice prompts are in `examples.en.json`. These are checked-in translations, not a visitor-time translation API.

`src/lib/localize-html.ts` renders both languages into the initial HTML at build time using parse5 (server/build only). Critical language CSS and the saved preference are applied at the start of the head, before body markup. No loading veil or blank-screen timeout is used. `src/scripts/translate.ts` handles dynamic text and accessibility attributes without rebuilding interactive components. It retains original values for the return to Japanese and translates dynamic UI states such as completion and checkout messages. Example prompts have distinct Japanese and English code blocks in the initial HTML; source code and Japanese data fixtures are preserved. The existing bilingual `.ja` / `.en` portfolio content remains managed by CSS.

`LanguageBootstrap.astro` and `src/scripts/lang.ts` own preference handling. Avoid page-specific language listeners that reset lesson selection or duplicate event handlers.

## Editing and checking

1. Edit the Japanese source and its corresponding English catalog entry. Keep translations faithful to claims, limitations and prices.
2. Do not translate identifiers, command names, API parameters or asset paths.
3. Add translations for any new dynamic status messages. Keep retained original-language external content explicitly marked `translate="no"`.
4. Run `pnpm check`, `pnpm build`, `pnpm check:i18n` and `pnpm check:publication`.
5. Run `tests/i18n.browser.cjs` against the dev server with Playwright available. Set `PLAYWRIGHT_MODULE` to an installed module path if needed, and optionally `TEST_ORIGIN`.

The catalog check reads generated HTML and fails on unregistered Japanese site copy, including metadata and accessibility labels. It excludes code and explicitly original-language content. Browser tests cover language changes, current lesson, translated prompts, search and layouts at 360/768/1440px.

## Delivery boundary

The site stays static. The small inline head script selects the saved language; English text does not depend on client-module loading. Without JavaScript, the default Japanese Learn page remains readable. English-specific indexed URLs and hreflang pages have not been introduced. No translation service or client framework is used. parse5 is a declared build dependency and is not shipped to the browser.

`tests/language-first-paint.cjs` blocks all external scripts and samples rendered frames to catch the opposite language becoming visible on home, catalog and classroom pages. Run it with the same Playwright setup as the other browser test.
