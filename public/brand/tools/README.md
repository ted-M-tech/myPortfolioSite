# ツールのマーク

ヒーロー（`components/ToolUniverse.astro`）に浮かべている各社のマーク。

## 決めごと

**配布されたまま置く。色を付け直さない。**

出どころが2つあるので、単色とフルカラーが混在する。これは不揃いに見えるが、
揃えようとすると存在しない配色を自作することになるので、混在のまま受け入れる。

- **Simple Icons** ([CC0-1.0](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md))
  — 仕様として全ロゴを単色で配布する。`viewBox="0 0 24 24"` と `<title>` が目印。
- **Devicon** ([MIT](https://github.com/devicons/devicon/blob/master/LICENSE))
  — フルカラー。`viewBox="0 0 128 128"` が目印。

### Simple Icons の hex を「ロゴの色」として使わないこと

Simple Icons は各ブランドに hex を添えているが、あれは
**「そのブランドの primary color」**であって**「ロゴの色」ではない**。

2026-07-20 にこれを取り違えて Claude / Gemini / Miro の単色シルエットを塗り、
間違えた。Miro の `#050038` は "Stratos" というパレット内の紺で、
実際のロゴは黄色（`#FFD02F` Sunglow）。Gemini はそもそもグラデーションで、
Google は単一の固定 hex を公開していない。塗り直した時点で公式ではなくなる。

## 収録しているもの

| ファイル | 出どころ | 表示 |
|---|---|---|
| `chatgpt.svg` | OpenAI のマーク（`viewBox 0 0 41 41`） | 単色（公式が単色黒） |
| `claude.svg` | **Anthropic 公式プレスキット** (`ClaudeIcon-Rounded.svg`) | 公式アプリアイコン（角丸タイル） |
| `cursor-app-icon.png` | **Cursor 公式ブランドアセット** (`APP_ICON_2D_DARK.png`) | 公式アプリアイコン。等倍縮小のみ |
| `miro.svg` | Simple Icons | 単色 |
| `n8n.svg` | Simple Icons | 単色 |
| `docker.svg` | Devicon | フルカラー |
| `figma.svg` | Devicon | フルカラー |
| `notion.svg` | Devicon | フルカラー |
| `slack.svg` | Devicon | フルカラー |
| `vscode.svg` | Devicon | フルカラー |
| `git.svg` | Devicon | フルカラー（現在ヒーロー未使用） |

## 収録していないもの

再配布できる公式マークが存在しないため、代替を自作せず載せない。

| ツール | 理由 |
|---|---|
| Codex | Simple Icons・Devicon のどちらにも無い |
| Microsoft Teams | Microsoft は Simple Icons が[ブランドポリシーを理由に収録対象外](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md)としている |
| Higgsfield | どちらにも無い |
| Sakana AI | どちらにも無い |
| **Xcode** | Apple がウェブサイトでの自社アイコン使用を名指しで禁じている（2026-07-20 に削除） |
| **Gemini** | 実際のマークはグラデーションで固定色が存在しない。単色版は Simple Icons による改変であり公式の見た目ではない。正規版は Google の承認申請が必要（2026-07-20 に削除） |

以前はここに lucide の汎用アイコン（`<>` / 人型 / カメラ / 脳）を当てていたが、
名前を併記しなくなった時点で何のことか伝わらなくなったため外した。

## アプリアイコンを配布しているのは2社だけ

Dock に並ぶような「地色つきの角丸タイル」を**公式に配布しているのは Anthropic と
Cursor だけ**。他10社は素のロゴマークしか出しておらず、しかも複数社はタイル化そのものを
禁じている（VS Code のブランドページは角丸square を「誤った例」として図示、
Microsoft は "should not be contained within a box, circle, or other shapes"）。

したがって形式は揃わない。揃えるには存在しないタイルを自作することになる。

Cursor のアセットは角が立った正方形で配布されている。丸めるのは OS の役目という
前提なので、表示側で `border-radius` を当てている（`.is-app-icon`）。

## 各社ガイドラインの調査結果（2026-07-20）

一次情報を当たった結果。**素のロゴマークでも問題のあるものが含まれる。**

| ツール | 判定 | 根拠 |
|---|---|---|
| Cursor | 問題なし | ブランドページに制限文言が一切ない |
| Claude | 概ね可 | 公式アプリアイコンあり。ただし「事前承認した材料でのみ」条項あり |
| n8n / Figma / Docker | 概ね可 | 参照目的の使用を明示的に許容 |
| ChatGPT | グレー | 「OpenAIのサービスに直接関係する場合のみ」。着色・改変は禁止。公式が単色黒なので見た目は正しい |
| Miro | 不明 | ガイドライン非公開。問い合わせベースの運用 |
| Notion | 禁止文言あり | "Do not use icons, logos, graphics, or images from www.notion.com to promote your app." |
| Slack | 禁止文言あり | "Don't distribute or otherwise make available our logos, marks or assets" |
| VS Code | 明確に不可 | 「自分の製品・サービス・ブログ等の識別／宣伝にアイコンを使う」を Not OK に明記 |
| **Xcode** | **最も明確に不可** | "You may not use the Apple Logo or any other Apple-owned graphic symbol, logo, or icon on or in connection with **web sites**... except pursuant to an express written trademark license from Apple" |

違法という意味ではなく（商標法の指名的フェアユースの範囲内で、免責表記もある）、
各社が公表しているガイドラインに照らすと上記、という整理。Apple と Microsoft に
ついては、はっきり許可されていない。判断の上で載せていることを記録しておく。

## 商標について

各社の名称とマークは各社に帰属する。ここでの使用は「実際に使っている道具を
事実として示す」目的に限る。提携や推奨を示唆しない旨はヒーロー内に明記している
（`ToolUniverse.astro` の `.marks-note`）。
