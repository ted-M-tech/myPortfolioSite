/** Build both languages into the static HTML; never wait for client JS to translate the first view. */
import {parseFragment, serialize, serializeOuter, type DefaultTreeAdapterMap} from 'parse5';
import translations from '../data/i18n/en.json';
import examples from '../data/i18n/examples.en.json';
type Node = DefaultTreeAdapterMap['node'];
type Parent = DefaultTreeAdapterMap['parentNode'];
type Element = DefaultTreeAdapterMap['element'];
const dictionary: Record<string,string> = translations;
const prompts: Record<string,string> = examples;
const escape = (value: string) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function attr(node: Element, name: string) { return node.attrs.find(a => a.name === name)?.value ?? ''; }
function text(node: Node): string { return 'value' in node ? node.value : 'childNodes' in node ? node.childNodes.map(text).join('') : ''; }
function addClass(node: Element, name: string) {
  const existing = node.attrs.find(a => a.name === 'class');
  if (existing) existing.value += ` ${name}`; else node.attrs.push({name:'class',value:name});
}
export function localizeHtml(html: string): string {
  const fragment = parseFragment(html);
  function visit(parent: Parent) {
    parent.childNodes = parent.childNodes.flatMap(node => {
      if (node.nodeName === '#text' && 'value' in node) {
        const value = node.value;
        const translation = dictionary[value.trim()];
        if (translation === undefined) return [node];
        // Spaces at inline boundaries are necessary in English, unlike Japanese.
        const en = /^[.,:;!?]/.test(translation) ? translation : ` ${translation} `;
        return parseFragment(`<span class="ja" lang="ja">${escape(value)}</span><span class="en" lang="en">${escape(en)}</span>`).childNodes;
      }
      if (!('tagName' in node)) return [node];
      if (attr(node,'translate') === 'no' || /(?:^|\s)(?:ja|en)(?:\s|$)/.test(attr(node,'class'))) return [node];
      if (node.tagName === 'pre') {
        const translated = prompts[text(node)];
        if (translated === undefined) return [node];
        const english = parseFragment(serializeOuter(node)).childNodes[0] as Element;
        // Prompt code has no interactive state. Preserve identifiers and remove duplicate IDs.
        function removeIds(el: Element) { el.attrs = el.attrs.filter(a => a.name !== 'id'); el.childNodes.forEach(n => {if ('tagName' in n) removeIds(n);}); }
        removeIds(english);
        english.childNodes = parseFragment(`<code>${escape(translated)}</code>`).childNodes;
        addClass(node,'ja'); addClass(english,'en');
        node.attrs.push({name:'translate',value:'no'}); english.attrs.push({name:'translate',value:'no'});
        return [node,english];
      }
      if (['script','style','code','textarea','title'].includes(node.tagName)) return [node];
      visit(node);
      return [node];
    });
  }
  visit(fragment);
  return serialize(fragment);
}
