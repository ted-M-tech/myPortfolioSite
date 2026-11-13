# MaePace site structure

One site, one shared navigation and footer. The brand links to `/` on every page.

- `/`: services, selected work, profile, and entry points to courses, blog and mentoring.
- `/learn`: course catalog. Short page title, categories, search and compact cards.
- `/learn/courses/<slug>`: course overview, outcomes, samples and curriculum.
- `/learn/classroom/<slug>`: lessons with a course-specific table of contents.
- `/learn/blog`: article cards linking to the existing note account.
- `/learn/mentoring`: individual support and pricing.
- `/learn/consult`: consultation booking.

Keep current URLs to preserve existing links. `/learn` is a section of MaePace, not a separate brand or portfolio destination. Navigation and entry copy live in `src/data/profile.ts`; `Nav.astro`, `SiteFooter.astro` and `PageHeading.astro` are shared components. All site pages share Japanese/English controls. Learn translates its UI, lesson prose and diagrams while retaining Japanese teaching assets and external note articles. See `docs/localization.md`.

Reference: https://a-x.inc/blog_category/utilize-ai/ — use its clear page naming and heading → filters → cards hierarchy. Preserve MaePace branding and existing content.
