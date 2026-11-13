/** Shared language preference. Course position and progress are independent of language. */
export type Lang = 'ja' | 'en';
export function applyLanguage(lang: Lang, updateUrl = false) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLButtonElement>('[data-lang-set]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.langSet === lang));
  });
  try { localStorage.setItem('mp-lang', lang); } catch { /* Storage is optional. */ }
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  }
  document.dispatchEvent(new CustomEvent('maepace:language', { detail: lang }));
}
export function initLang() {
  applyLanguage(document.documentElement.dataset.lang === 'ja' ? 'ja' : 'en');
  document.querySelectorAll<HTMLButtonElement>('[data-lang-set]').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.langSet as Lang, true));
  });
}
