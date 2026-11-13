# Claude Code入門：公式調査と教材設計

確認日：2026-09-11。対象はターミナルCLI。Desktop・VS Codeは入口の比較のみ。
公式公開文書・Academyの公開シラバスを参照。Academyの全動画を受講・視聴したという意味ではない。

## 調査した一次資料と反映

| 資料 | 教材へ反映したこと |
| --- | --- |
| https://academy.claude.com/courses/claude-code-101 | 仕組み→最初の依頼→日常の作業→カスタマイズという学習順序 |
| https://academy.claude.com/courses/claude-code-in-action | 長い自律実行・自動化は入門後の学習に分離 |
| https://code.claude.com/docs/en/overview | 読む・編集する・コマンドを実行する道具。複数のUIを区別 |
| https://code.claude.com/docs/en/quickstart | 公式ネイティブ導入、起動、認証、最初の質問 |
| https://code.claude.com/docs/en/setup | 対応環境、Windows CLIでのGitの現在の扱い、診断 |
| https://code.claude.com/docs/en/desktop | CodeタブとChat/Coworkの区別。Windows固有要件 |
| https://code.claude.com/docs/en/vs-code | GUIの代替入口。ターミナル手順と混同しない |
| https://code.claude.com/docs/en/how-claude-code-works | 作業フォルダー、ツールを使った反復、コンテキスト |
| https://code.claude.com/docs/en/permission-modes | Plan・通常確認・自動編集の違い。モード表示で確認 |
| https://code.claude.com/docs/en/permissions | 自然言語でのお願いとアクセス設定の区別 |
| https://code.claude.com/docs/en/best-practices | 材料・範囲・完成条件、探索と計画、結果の検証 |
| https://code.claude.com/docs/en/checkpointing | Rewindの対象と、シェル変更・外部操作の限界 |
| https://code.claude.com/docs/en/memory | CLAUDE.mdと自動メモリ。ルールは強制設定ではない |
| https://code.claude.com/docs/en/commands | help・context・compact・clear・resume・plan |
| https://code.claude.com/docs/en/costs | プランとAPIの課金を分ける。固定料金・無制限を約束しない |
| https://code.claude.com/docs/en/skills | 繰り返す手順を必要になってからまとめる |
| https://code.claude.com/docs/en/mcp | 外部接続の役割と認証。入門演習には導入不要 |

取得はagent-reachのExa検索とJina Reader。公式ページ直接取得の403はReaderで補完。
公式ドキュメントは変化が早い。GUIのラベルや課金、インストール、復元の範囲は改訂時に優先再確認する。

## 独自教材としての設計

11レッスン・5章、HTMLの概念図・比較図・用途一覧22点。公式教材の翻訳転載ではない。
題材は架空サービス「旅の日本語」の1ファイル紹介ページ。
難易度を下げるため、パッケージ追加・外部API・サーバー・決済・公開は演習から除外。
練習用ZIPに要件、完成参考ZIPにHTML/CSSを含める。
完成例は独自に作成した参考実装で、Claude Codeを実行して収録した結果とは表記しない。
図はHTMLの文字・番号・カードで構成し、画面画像の模倣はしない。

## レビュー観点

- 初心者：用語を先に説明。MacとWindowsを分離。フォルダー移動と入力場所を具体化。
- 実務：依頼→計画→実装→確認→引継ぎが完結。実績や料金の捏造を防ぐ完成条件。
- 技術：Planを「コマンドが一切動かない」と説明しない。Rewindを完全バックアップと説明しない。
- 教育：1回の作業で紹介ページを作り、1点修正する。専門機能の暗記や点数評価は不要。
- 費用：APIキーの新規作成を一律に要求しない。価格や利用枠は公式・本人の画面へ誘導。
- UI：図解は可変幅のテキスト。スクリーンリーダーで順序が伝わるfigure/figcaption/olを使用。

## 検証範囲

教材のリンク・ファイル、完成参考HTMLのページ内移動、390/768/1440幅の横はみ出し、11レッスンの選択を確認。
Claude Codeのインストーラーや有料セッションは実行していない。利用者の認証・OSごとの導入実測も未実施。
status=publishedは本文が読める状態を表す。Anthropic公式の認定や実行検証済みを意味しない。

## Skills・Hooksの追加確認

- https://code.claude.com/docs/en/hooks-guide
- https://code.claude.com/docs/en/hooks
- https://github.com/anthropics/skills （READMEの導入コマンド）
- 同リポジトリのfrontend-design / webapp-testing / skill-creator / pptx / docx / xlsx / pdfのSKILL.mdの用途を確認。

標準ChatでもArtifacts・文書作成・Skills等があるため、「回答だけ／ファイル操作不可」と説明しない。
Codeはターミナルだけでなく複数環境があるので「常に手元PCを操作」と一般化しない。

教材独自のpage-reviewとprotect_brief.pyをZIPで提供。実ユーザーの設定は変更していない。
HookはEdit/Writeの直接編集だけを対象とする狭い教育例。シェル等の変更を防ぐセキュリティ境界ではない。
Python単体で相対/絶対パスの拒否、index.html・別ディレクトリー・Bashを対象外とする5ケースを確認。ZIPとJSONも検証。
Claude CodeでのSkill呼出し・Hook発火は未検証。
