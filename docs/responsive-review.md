# Responsive review

## Coverage

`tests/responsive.browser.cjs` enumerates all 41 site routes in `dist` (excluding standalone teaching artifacts). It checks Japanese and English at 320, 390, 768, 1024 and 1440 CSS pixels: 410 page/viewport/language combinations. Each page must have one navigation, footer and AI shortcut section, no document-level horizontal overflow, and no JavaScript exceptions.

External network requests are blocked in this sweep to isolate site layout. It does not certify Cal.com or AI providers. Existing booking and AI shortcut checks cover their integration separately. Chromium browser emulation is used; native Safari/iOS verification remains outstanding because the WebKit executable is not installed.

`tests/i18n.browser.cjs` also visits every lesson in the Claude Code and SNS operations courses, tests translated search, language switching and preference retention. `tests/classroom-navigation.cjs` checks that lesson switches reveal the heading below the navigation. `tests/ask-ai.cjs` checks current-lesson context, copy and four visible providers.

## Ownership and cleanup

- `CourseGrid.astro` owns the shared course-card layout and breakpoints; removed stale competing rules from `learn.css`.
- `Nav.astro` participates in document layout; removed obsolete body top-padding overrides used by the previous fixed header.
- Removed unused learning-library, note-list and completion-button styles.
- `AskAI.astro` aligns provider icons at the top even when Gemini has an extra instruction line.

Run the browser tests against the local site using `PLAYWRIGHT_MODULE` when Playwright is supplied by the host runtime. Build before the full-route sweep so new pages are included.
