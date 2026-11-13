"""Check built Learn copy against the English catalog (Python standard library only)."""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
catalog = json.loads((ROOT / 'src/data/i18n/en.json').read_text())
JAPANESE = re.compile(r'[ぁ-んァ-ヶ一-龯]')
VOID = {'meta', 'link', 'img', 'input', 'br', 'hr', 'source', 'wbr', 'area', 'base', 'embed', 'param', 'track', 'col'}

class CopyParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.missing = set()
    def check(self, value):
        value = value.strip()
        if JAPANESE.search(value) and value not in catalog:
            self.missing.add(value)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        skip = (self.stack and self.stack[-1][1]) or tag in {'script', 'style', 'code', 'pre'} or attrs.get('translate') == 'no' or bool({'ja', 'en'} & set(attrs.get('class', '').split()))
        if not skip:
            for key in ('aria-label', 'title', 'alt', 'placeholder'):
                if key in attrs: self.check(attrs[key])
            if tag == 'meta' and (attrs.get('name') == 'description' or attrs.get('property') in {'og:title', 'og:description'}):
                self.check(attrs.get('content', ''))
        if tag not in VOID: self.stack.append((tag, skip))
    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                self.stack = self.stack[:index]
                break
    def handle_data(self, text):
        if not self.stack or not self.stack[-1][1]: self.check(text)

errors = []
pages = list((ROOT / 'dist/learn').rglob('*.html'))
if not pages: sys.exit('Run pnpm build before checking translations.')
for page in pages:
    # Downloadable practice artifacts retain Japanese as teaching source material.
    if 'examples' in page.relative_to(ROOT / 'dist/learn').parts: continue
    parser = CopyParser()
    parser.feed(page.read_text())
    for value in sorted(parser.missing): errors.append(f'{page.relative_to(ROOT)}: {value}')
print(f'{len(pages)} Learn HTML files inspected; {len(errors)} missing translations.')
if errors:
    print('\n'.join(errors))
    sys.exit(1)
