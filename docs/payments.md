# 講座の決済

## 現在の実装範囲

Stripe Checkoutの**サンドボックス限定**の接続口。講座ページ → Stripe決済 → 支払い結果の確認。
接続キー／Price IDが未設定なら販売準備中を表示する。MCPへの接続はサイトの実行時認証にはならない。
本番キーは明示的に拒否する。価格は仮定して作成しない。

- `server/payments.mjs`: Workers API、Stripe SDK。ページは引き続きAstroの静的配信。
- `src/components/CourseCheckout.astro`: 価格表示と購入導線。
- `/learn/payment-result`: Stripe側で支払い状態を再取得して表示。
- `/learn/purchase-preview/*`: 従来のUIデモ。受講権の証明には使わない。

## 接続方法

1. `.dev.vars.example`を`.dev.vars`へコピーする（Git対象外）。
2. 同じStripeサンドボックスの制限付きキーを `STRIPE_RESTRICTED_KEY` に保存する。キーをチャット・コードに貼らない。
3. キーにはPrices読み取り、Checkout Sessions作成・読み取りに必要な権限を付与する。
4. サンドボックスで買い切りPriceを作成し、`STRIPE_COURSE_PRICES`へ講座slugとPrice IDのJSON対応表を設定する。
   例：`{"codex":"price_...","claude-code":"price_..."}`。`price_...`は実際のPrice IDに置換する。
5. `pnpm build`後、`pnpm dev:payments`。Astro開発サーバーの`/api/payments`は8787へプロキシする。
6. `pnpm test:payments`で検証。実Stripeを使うE2Eはキー設定後に実行する。

公開環境への設定は秘密情報ストアを使用する。未デプロイ。

## 保護範囲

金額／Priceをブラウザーから受け取らず、サーバー側の対応表から決定する。
POSTのOriginを確認する。結果照会はHttpOnly CookieとStripe metadataのハッシュを照合し、
決済を始めたブラウザーに限定する。これは会員認証ではない。
未払い・本番セッション・不一致を成功扱いしない。Stripeエラーの詳細を外部に返さない。

## 本番販売前に残っている実装

- 永続的なユーザー認証と受講権DB（端末変更・再ログイン後も復元）。
- 署名検証したWebhookによる購入権付与、イベント重複排除、非同期決済、返金・紛争時の扱い。
- 有料本文／動画を静的出力から取り除き、受講権を確認するAPI／署名付き動画配信へ移す。
- 有料教材、正式価格、販売国、販売条件、税務設定の確定。
- 実サンドボックス決済で成功・中断・遅延決済・Webhook再送・不正閲覧の検証。

現在の`src/content`と学習画面は公開サンプル。**有料原稿や限定動画URLを入れない。**
支払い完了ページだけでレッスンを解放しない。本番は上記を実装してから別変更で有効化する。

## メンタリングのサンドボックス商品

キー設定後、`pnpm stripe:setup-mentoring`で1か月10,000円の買い切りテスト商品を作成し、既存商品があれば再利用する。Products／Pricesの読み書き権限が必要。決済用の通常実行キーとは分離可能。実行すると`.dev.vars`の価格対応表だけを更新する。自動更新のサブスクリプションは作成しない。
