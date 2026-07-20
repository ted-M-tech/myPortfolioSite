# maepace.com

前田哲也（Tetsuya Maeda）のポートフォリオサイト。屋号 **MaePace** の下で運営している。

**Astro 7** の静的ビルドを **Cloudflare Workers の静的アセット**として配信する。
UI フレームワークもアニメーションライブラリも入れていない。

## 開発

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # 型チェック（astro check）
pnpm build      # dist/ を生成
pnpm preview    # ビルドして workerd 上で配信（本番と同じ経路）
```

## 中身を書き換えるとき

**`src/data/profile.ts` だけを触る。** 文言・数値・リンク・料金はすべてここにある。
コンポーネントは形しか持っていないので、コピーを探して回る必要はない。
日本語と英語を持つ項目は `{ ja, en }` で書く。表示側が CSS で出し分ける。

## 構成

```
src/
  data/profile.ts       ← 内容はすべてここ
  layouts/Base.astro    ← head・メタ・JSON-LD・言語の初期化
  components/           ← 各セクション（形だけを持つ）
  scripts/              ← lang / reveal / hero-field
  styles/tokens.css     ← ブランドトークン（色・間隔・動き）
  styles/global.css     ← リセットと共通クラス
```

## 判断の記録

技術選定の理由は、後から「なぜこうなっているのか」を掘り返さずに済むよう残しておく。

- **Astro / フレームワークなし** — 内容がほぼ静的で、対話するのは言語トグルだけ。
  React を積む理由がない。JS は合計 2.5 KB 程度に収まっている。
- **アダプタを使わない** — `@astrojs/cloudflare` は `output: 'server'` にしてしまい、
  全ページに `prerender` を撒くことになる。`wrangler.jsonc` に `main` を書かず、
  `dist/` を静的アセットとして配るだけで足りる。運用する Worker コードがゼロになる。
- **アニメーションライブラリなし** — リビールは IntersectionObserver、
  ヒーローは 2D canvas を自前で書いている。
  CSS の `animation-timeline: view()` も試したが**採用しなかった**:
  `animation-range` の解釈が要素の高さやスクロールコンテナの有無に敏感で、
  条件が揃うと progress が進まず要素が `opacity: 0` のまま残る。実際にセクションが
  丸ごと消える不具合を踏んだ。数 KB を惜しんでデバッグしづらい仕組みを抱えるより、
  全ブラウザで同じ挙動をする IntersectionObserver のほうが結果的に手がかからない。
- **アイコンは自前でインライン** — CDN の lucide を読むと SRI 無しの外部スクリプトに
  なる。十数個のアイコンのためにネットワーク往復を増やす価値もない。
- **案件カードに写真を使わない** — 実際の成果物（工場の制御画面や社内 SaaS）は
  出せないものが多い。汎用のストック画像で埋めると見た目が嘘になるため、
  ロゴの構造を図にした `ProjectPanel.astro` に置き換えている。

### 踏むと痛い箇所

- `body` に `overflow-x: hidden` を書かないこと。body がスクロールコンテナになり、
  スクロール連動の基準がビューポートからずれる。横のはみ出しは、はみ出す当人が切る。
- `pnpm deploy` ではなく **`pnpm run deploy`**。`deploy` は pnpm 組み込みの
  workspace deploy に食われて `ERR_PNPM_CANNOT_DEPLOY` になる。

## デプロイ

`main` への push で **Workers Builds** が自動ビルド・デプロイする。

| 項目 | 値 |
|---|---|
| Build command | `pnpm build` |
| Deploy command | `pnpm exec wrangler deploy` |
| Production branch | `main` |

`www` → apex の 301 は Cloudflare の **Redirect Rule** で処理している。
`main` を持たない（＝ Worker コードがない）構成のため、コード側では扱えない。

## ブランド

ロゴ・命名・使用ルールの正典は [`docs/brand/maepace.md`](docs/brand/maepace.md)。
アセットは `public/brand/`。`fill="currentColor"` なので親の `color` で単色化する。
**傾けない・歪めない・単色のみ・尾を伸ばさない。** 触る前に必ず読むこと。
