// @ts-check
import { defineConfig } from "astro/config";

// 静的ビルド。Cloudflare アダプタは使わない — このサイトにサーバー処理は無く、
// アダプタを入れると output:'server' になって全ページに prerender を撒くことになる。
// dist/ を Workers の静的アセットとして配信する（wrangler.jsonc 参照）。
export default defineConfig({
  site: "https://maepace.com",
  trailingSlash: "never",
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: false,
  },
});
