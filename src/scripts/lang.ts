/**
 * 日本語 / 英語の切り替え。
 *
 * 両言語ともマークアップに存在し、CSS が出し分ける（global.css）。
 * ここがやるのは data-lang の付け替えと保存だけ。
 */
type Lang = "ja" | "en";

const STORAGE_KEY = "mp-lang";

function apply(lang: Lang) {
  const root = document.documentElement;
  root.setAttribute("data-lang", lang);
  root.lang = lang;

  for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-lang-set]")) {
    btn.setAttribute("aria-pressed", String(btn.dataset.langSet === lang));
  }

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // プライベートモード等では保存できない。表示の切り替えは成立するので黙って続行する
  }
}

export function initLang() {
  const current = (document.documentElement.getAttribute("data-lang") as Lang) ?? "ja";
  apply(current);

  for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-lang-set]")) {
    btn.addEventListener("click", () => apply(btn.dataset.langSet as Lang));
  }
}
