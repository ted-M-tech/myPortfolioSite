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
| `claude.svg` | Simple Icons | 単色 |
| `cursor.svg` | Simple Icons | 単色（公式も黒） |
| `gemini.svg` | Simple Icons | 単色 |
| `miro.svg` | Simple Icons | 単色 |
| `n8n.svg` | Simple Icons | 単色 |
| `docker.svg` | Devicon | フルカラー |
| `figma.svg` | Devicon | フルカラー |
| `notion.svg` | Devicon | フルカラー |
| `slack.svg` | Devicon | フルカラー |
| `vscode.svg` | Devicon | フルカラー |
| `xcode.svg` | Devicon | フルカラー |
| `git.svg` | Devicon | フルカラー（現在ヒーロー未使用） |

## 収録していないもの

再配布できる公式マークが存在しないため、代替を自作せず載せない。

| ツール | 理由 |
|---|---|
| Codex | Simple Icons・Devicon のどちらにも無い |
| Microsoft Teams | Microsoft は Simple Icons が[ブランドポリシーを理由に収録対象外](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md)としている |
| Higgsfield | どちらにも無い |
| Sakana AI | どちらにも無い |

以前はここに lucide の汎用アイコン（`<>` / 人型 / カメラ / 脳）を当てていたが、
名前を併記しなくなった時点で何のことか伝わらなくなったため外した。

## 商標について

各社の名称とマークは各社に帰属する。ここでの使用は「実際に使っている道具を
事実として示す」目的に限る。提携や推奨を示唆しない旨はヒーロー内に明記している
（`ToolUniverse.astro` の `.marks-note`）。
