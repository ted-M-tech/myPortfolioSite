import translations from '../data/i18n/en.json';
const dictionary: Record<string, string> = translations;
const ignored = 'title,script,style,code,pre,[translate="no"],.ja,.en';
const attributes = ['aria-label', 'title', 'alt', 'placeholder'] as const;
const textSources = new WeakMap<Text, { source: string; displayed: string }>();
const attributeSources = new WeakMap<Element, Map<string, { source: string; displayed: string }>>();
export function english(source: string): string {
  const key = source.trim();
  let result = dictionary[key];
  if (result === undefined) {
    if (/^\d+講座$/.test(key)) result = key.replace('講座', ' courses');
    else if (/^全\d+講座・教材$/.test(key)) result = key.replace(/^全(\d+)講座・教材$/, '$1 courses and resources');
    else if (/^\d+章$/.test(key)) result = key.replace('章', ' chapters');
    else if (/^テスト価格 /.test(key)) result = key.replace('テスト価格 ', 'Test price ').replace(' ／ 実際の請求・受講権の付与はありません。', ' / No real charge or course access.');
    else if (/^更新：/.test(key)) result = key.replace('更新：', 'Updated: ').replace('検証：', 'Verified: ');
  }
  return result === undefined ? source : source.replace(key, () => result);
}
function changeText(node: Text, lang: string) {
  if (!node.parentElement || node.parentElement.closest(ignored)) return;
  const current = node.data;
  let entry = textSources.get(node);
  if (!entry || entry.displayed !== current) entry = { source: current, displayed: current };
  const value = lang === 'en' ? english(entry.source) : entry.source;
  // Japanese often omits spaces around inline links and emphasis.
  const display = lang === 'en' && value !== entry.source && !/^[.,:;!?]/.test(value.trimStart()) ? ` ${value.trim()} ` : value;
  if (current !== display) node.data = display;
  entry.displayed = display;
  textSources.set(node, entry);
}
function changeAttributes(element: Element, lang: string) {
  if (element.closest(ignored)) return;
  const stored = attributeSources.get(element) ?? new Map();
  for (const name of attributes) {
    const current = element.getAttribute(name);
    if (current === null) continue;
    let entry = stored.get(name);
    if (!entry || entry.displayed !== current) entry = { source: current, displayed: current };
    const value = lang === 'en' ? english(entry.source) : entry.source;
    if (current !== value) element.setAttribute(name, value);
    stored.set(name, { source: entry.source, displayed: value });
  }
  attributeSources.set(element, stored);
}
function translate(root: Node, lang: string) {
  if (root instanceof Text) { changeText(root, lang); return; }
  if (!(root instanceof Element || root instanceof Document)) return;
  if (root instanceof Element && root.closest(ignored)) return;
  if (root instanceof Element) changeAttributes(root, lang);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) changeText(walker.currentNode as Text, lang);
  root.querySelectorAll('[aria-label],[title],[alt],[placeholder]').forEach(el => changeAttributes(el, lang));
}
export function initTranslation() {
  const metadata = [...document.querySelectorAll<HTMLMetaElement>('meta[name="description"],meta[property="og:title"],meta[property="og:description"]')].map(el => ({ el, source: el.content }));
  const observer = new MutationObserver(records => {
    observer.disconnect();
    const lang = document.documentElement.dataset.lang ?? 'ja';
    for (const record of records) {
      if (record.type === 'characterData') translate(record.target, lang);
      else if (record.type === 'attributes') changeAttributes(record.target as Element, lang);
      else record.addedNodes.forEach(node => translate(node, lang));
    }
    observe();
  });
  function observe() { observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...attributes] }); }
  function update() {
    observer.disconnect();
    const lang = document.documentElement.dataset.lang ?? 'ja';
    const title = document.querySelector('title');
    if (title?.dataset[lang]) title.textContent = title.dataset[lang]!;
    translate(document, lang);
    metadata.forEach(({el, source}) => el.content = lang === 'en' ? english(source) : source);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'en' ? 'en_US' : 'ja_JP');
    observe();
  }
  document.addEventListener('maepace:language', update);
  update();
}
