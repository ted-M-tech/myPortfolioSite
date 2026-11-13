# ブログと個別相談の管理

講座一覧・講座詳細・教材・学習画面・購入デモは公開しません。`src/content/` は記事のみを管理します。

- noteの記事一覧：`src/components/NoteArticles.astro` と `src/data/integrations.ts`。
- サイト内の記事：`src/content/articles/`。`status`、`updatedAt`、`verifiedAt` で公開状態と確認日を管理します。
- 個別相談：`src/pages/learn/consult.astro` と `src/data/integrations.ts`。
- 個別サポート：`src/data/mentoring.ts`。決済APIは `mentoring-campaign` のテスト申込だけを受け付けます。
- 表示文言：`src/data/profile.ts`。英訳：`src/data/i18n/en.json`。

変更後は `npm run build`、`npm run check`、`npm run check:publication`、`npm run check:i18n` を実行します。決済変更時は `npm run test:payments` も実行します。
