# maepace.com

前田哲也（Tetsuya Maeda）のポートフォリオサイト。屋号 **MaePace** の下で運営している。

Next.js 15 (App Router) / React 19 / TypeScript / Tailwind CSS v4 / shadcn/ui で構築し、
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) 経由で Cloudflare Workers 上で動かしている。

## 開発

```sh
pnpm install
pnpm dev        # http://localhost:3000
```

`pnpm dev` は Node の開発サーバーなので、Workers ランタイム固有の制約は再現されない。
デプロイ前に必ず実ランタイム（workerd）で確認する:

```sh
pnpm preview    # ビルドして workerd 上で起動
```

その他のコマンド:

```sh
pnpm build      # Next のプロダクションビルド
pnpm lint
pnpm deploy     # 手動デプロイ（通常は不要）
pnpm cf-typegen # Cloudflare バインディングの型を再生成
```

## デプロイ

push すると Cloudflare の **Workers Builds** が自動でビルド・デプロイする。

- `wrangler.jsonc` — Worker 設定。`.open-next/worker.js` をエントリに、静的アセットは `.open-next/assets` から配信。
- `open-next.config.ts` — アダプタ設定。
- `.open-next/` と `.wrangler/` はビルド生成物。コミットしない。

## 画像について

**Cloudflare Workers では `next/image` の実行時最適化が効かない**（`sharp` が workerd で動かないため、
`/_next/image` は原本をそのまま返す）。そのため `next.config.mjs` で `images.unoptimized: true` にしてある。

画像は **コミット前に自分で最適化する**。実際に表示される最大サイズまで縮めて WebP にすること。

```sh
magick source.png -resize 1024x1024 -quality 82 -define webp:method=6 public/name.webp
```

## ブランド

ロゴ・命名・使用ルールの正典は [`docs/brand/maepace.md`](docs/brand/maepace.md)。
アセットは `public/brand/`（`currentColor` 指定なので親の `color` で単色化する）。
ブランド関連をいじる前に必ず読むこと。

## 補足

このリポジトリは以前 v0.dev と同期し Vercel にデプロイしていたが、いずれも廃止した。
パッケージマネージャは `pnpm`（`pnpm-lock.yaml` が唯一のロックファイル）。
