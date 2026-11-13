# Instagram運用教材：確認範囲とレビュー

原本は src/content/courses/sns-operations.md と6つのレッスン。確認日：2026-09-11。

## 教材設計
- 受講者：1件の予約→1件の取得→保存→分析→定期実行の順。専門用語に役割を添える。
- 運用者：時差、予約と公開の違い、二重投稿、再実行、認証切れを具体化。
- 分析者：reach分母、欠損、同形式・同時点、広告条件、因果の限界を説明。
- エンジニア：実在するComposioツール名・引数だけを掲載。実装依頼文と実行コードを区別。
- 懐疑的読者：本人申告の実績、架空データ、公式仕様、推奨設計を明示的に区別。

## 根拠
- Metaの予約・投稿ガイド 2223502627919449 / 942827662903020 / 609176706604372
- https://developers.facebook.com/docs/instagram-platform/insights/
- https://developers.facebook.com/docs/instagram-platform/api-reference/instagram-user/insights
- https://docs.composio.dev/toolkits/instagram
- https://docs.composio.dev/reference/api-reference/connected-accounts
- https://docs.composio.dev/reference/api-reference/tool-router
- https://composio.dev/toolkits/instagram/framework/grok-bot
- https://docs.x.ai/grok-bot/skills-routines-and-automations
- https://docs.x.ai/grok-bot/troubleshooting

## 限界と保守
ComposioとMetaの人数・取得条件の記述差を一律条件へ一般化しない。
教材のstatus=publishedは本文完成を意味する。実アカウントのOAuth・予約公開・連続ルーティン実行済みという意味ではない。
verifiedAtを実行検証済みの意味で付けていない。公式UI・ツール変更時に再確認する。
Grok BotはxAI公式製品として扱う。ユーザーが別製品を意味する場合は該当レッスンを変更する。
公式画面の実キャプチャは今回取得していない。再現した偽画面も使用しない。

## 説明用データ
public/learn/resources/sns-insights-example.csv は全行架空。
A=60/1000=6%、B=120/4000=3%、C=80/8000=1%、D=欠損。
カルーセルとリールを保存率の順位だけで評価しない。
