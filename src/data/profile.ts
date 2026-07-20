/**
 * サイトの内容はすべてここに集約する。
 *
 * コンポーネントは形だけを持ち、文言・数値・リンクは一切持たない。
 * 内容を直すときに触るファイルが常に1つで済むようにするための約束事なので、
 * 「このセクションだけ」と例外を作らないこと。
 *
 * 日本語と英語を両方持つ項目は { ja, en } で書く。表示側で切り替える。
 */

export type Bilingual = { ja: string; en: string };

export const site = {
  domain: "maepace.com",
  url: "https://maepace.com",
  /** 屋号。表記は CamelCase 固定（docs/brand/maepace.md） */
  brand: "MaePace",
  brandJa: "マエペース",
  title: "Tetsuya Maeda — AI Driven Full Stack Developer",
  description: {
    ja: "前田哲也 / Tetsuya Maeda。AIを開発プロセスの中核に据え、フロントエンド、バックエンド、クラウドまで一気通貫で構築するAI Driven Full Stack Developer。",
    en: "Tetsuya Maeda is an AI Driven Full Stack Developer building production-ready products across frontend, backend, cloud and AI.",
  } satisfies Bilingual,
} as const;

export const person = {
  name: "Tetsuya Maeda",
  nameJa: "前田 哲也",
  /** 普段使っている呼び名 */
  alias: "Ted",
  role: {
    ja: "AI Driven Full Stack Developer",
    en: "AI Driven Full Stack Developer",
  } satisfies Bilingual,
  location: {
    ja: "バンクーバー, カナダ",
    en: "Vancouver, Canada",
  } satisfies Bilingual,
  email: "tetsuya.maeda.mail@gmail.com",
  /**
   * ヒーローの見出し。<em> で囲んだ箇所がアクセント表示になる。
   * 「前へ進む速度」と「自分のペース」— 屋号の二重の由来をそのまま言葉にしている。
   */
  headline: {
    ja: "AIで、構想を<br /><em>プロダクトへ。</em>",
    en: "Ideas into<br /><em>working products.</em>",
  } satisfies Bilingual,
  intro: {
    ja: "AIを開発の中核に。UI、API、データ、クラウドまで、一気通貫で設計・実装します。",
    en: "AI at the core of development. I design and build across UI, APIs, data and cloud.",
  } satisfies Bilingual,
} as const;

export const socials = [
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/" },
  { label: "GitHub", icon: "github", href: "https://github.com/ted-M-tech" },
  { label: "Email", icon: "mail", href: `mailto:${person.email}` },
] as const;

/** 帯を流れる技術キーワード。実際に使うものだけを並べる。 */
export const marquee = [
  "AI Driven Development", "Full Stack", "Generative AI", "TypeScript", "React",
  "Next.js", "Astro", "Python", "C#", "SwiftUI", "API Design", "Real-time Data",
  "Cloud Architecture", "Rapid Prototyping", "DevOps",
] as const;

/**
 * AI駆動の設計・開発・運用で日常的に横断するツール。
 *
 * ヒーローはロゴだけを浮かべ、名前を出さない。名前で補えない以上、
 * 「再配布できる公式マークが実在するもの」だけを載せる。
 *
 * アイコンは配布されたまま置き、こちらで色を付けない。
 * Simple Icons 由来（Claude/Cursor/Gemini/Miro/n8n）は仕様として全部単色、
 * Devicon 由来（Docker/Figma/Notion/Slack/VS Code/Xcode）はフルカラー。
 * 見た目は揃わないが、揃えようとすると存在しない配色を作ることになる。
 * Simple Icons が各ブランドに添えている hex は「ブランドの primary color」で
 * あって「ロゴの色」ではない（Miro の #050038 は紺だが、ロゴは黄色）。
 * 一度それでロゴを塗って間違えたので、二度とやらないこと。
 *
 * 載せていないもの: Codex / Microsoft Teams / Higgsfield / Sakana AI。
 * 再配布可能なアイコン集に公式マークが無い。特に Microsoft は Simple Icons が
 * ブランドポリシーを理由に収録対象外としているため、代替を自作しない。
 */
export const toolchain = [
  { name: "ChatGPT", icon: "/brand/tools/chatgpt.svg" },
  { name: "Claude", icon: "/brand/tools/claude.svg" },
  { name: "Cursor", icon: "/brand/tools/cursor.svg" },
  { name: "Gemini", icon: "/brand/tools/gemini.svg" },
  { name: "VS Code", icon: "/brand/tools/vscode.svg" },
  { name: "Xcode", icon: "/brand/tools/xcode.svg" },
  { name: "Figma", icon: "/brand/tools/figma.svg" },
  { name: "Notion", icon: "/brand/tools/notion.svg" },
  { name: "Miro", icon: "/brand/tools/miro.svg" },
  { name: "n8n", icon: "/brand/tools/n8n.svg" },
  { name: "Slack", icon: "/brand/tools/slack.svg" },
  { name: "Docker", icon: "/brand/tools/docker.svg" },
] as const;

export const stats = [
  { value: 6, suffix: "+", label: { ja: "年のプロダクト開発", en: "Years shipping products" } },
  { value: 4, suffix: "×", label: { ja: "リリース頻度を向上", en: "Faster release cadence" } },
  { value: 25, suffix: "%", label: { ja: "運用効率を改善", en: "Operational efficiency gained" } },
  { value: 6, suffix: "", label: { ja: "領域横断のプロダクト", en: "Cross-domain products" } },
] as const;

export type Project = {
  id: string;
  role: Bilingual;
  title: Bilingual;
  description: Bilingual;
  tech: readonly string[];
  href: string;
  image: string;
  imageAlt: Bilingual;
};

export const projects: readonly Project[] = [
  {
    id: "factory-ai",
    role: { ja: "AI開発 · フルスタック", en: "AI Engineering · Full Stack" },
    title: {
      ja: "製造業向け AI 分析システム",
      en: "AI Analytics for Manufacturing",
    },
    description: {
      ja: "リアルタイム分析と AI を組み込んだ工場自動化システム。前処理から本番運用まで一気通貫で構築。",
      en: "Factory automation with real-time analytics and AI, built from data preparation through production.",
    },
    tech: ["Python", "Azure", "AI/ML", "Real-time Analytics", "Docker"],
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
    image: "/work/industrial-ops-case.webp",
    imageAlt: {
      ja: "製造設備とAIインサイトを表示する運用画面のコンセプト",
      en: "Concept view of an operations interface with equipment and AI insights",
    },
  },
  {
    id: "annoscene",
    role: { ja: "iOS開発 · MapKit", en: "iOS Engineering · MapKit" },
    title: { ja: "AnnoScene", en: "AnnoScene" },
    description: {
      ja: "旅の経路と、その場所で撮った写真や動画が一本の記憶になる iOS アプリ。位置情報は端末内で処理。",
      en: "An iOS app that turns routes, photos and clips into one travel memory, with location data kept on device.",
    },
    tech: ["Swift", "SwiftUI", "MapKit", "PhotosUI", "AVFoundation"],
    href: "https://annoscene.maepace.com",
    image: "/work/annoscene-screen.webp",
    imageAlt: {
      ja: "AnnoSceneで旅を再生する実際のiPhone画面",
      en: "Actual iPhone screen for replaying a journey in AnnoScene",
    },
  },
  {
    id: "helpkansai",
    role: { ja: "iOS開発 · 音声学習", en: "iOS Engineering · Voice Learning" },
    title: { ja: "Help Kansai", en: "Help Kansai" },
    description: {
      ja: "いまの関西弁を標準語と並べて学ぶ iOS アプリ。ネイティブ音声と間隔反復で、自然な言い回しを身につける。",
      en: "An iOS app for learning modern Kansai Japanese through native audio, comparison and spaced repetition.",
    },
    tech: ["Swift", "SwiftUI", "AVFoundation", "SRS"],
    href: "https://helpkansai.maepace.com",
    image: "/work/help-kansai-case-v2.webp",
    imageAlt: {
      ja: "Help Kansaiの音声学習画面を表示したiPhoneのコンセプト",
      en: "Concept iPhone view of Help Kansai's voice lesson",
    },
  },
  {
    id: "wellnesspet",
    role: { ja: "iOS開発 · HealthKit", en: "iOS Engineering · HealthKit" },
    title: { ja: "Wellness Pet", en: "Wellness Pet" },
    description: {
      ja: "Apple Watchと連携し、活動・睡眠・気分を一匹のピクセル犬へ反映する iOS アプリ。評価せず、そっと寄り添う設計。",
      en: "An iOS and Apple Watch companion where activity, sleep and mood shape a pixel dog—supportive, never judgmental.",
    },
    tech: ["Swift", "SwiftUI", "HealthKit", "watchOS", "WidgetKit"],
    href: "https://wellnesspet.maepace.com",
    image: "/work/wellness-pet-case-v2.webp",
    imageAlt: {
      ja: "Apple Watchから活動・睡眠・気分を同期するWellness Petの画面イメージ",
      en: "Wellness Pet concept syncing activity, sleep and mood from Apple Watch",
    },
  },
  {
    id: "scada-viz",
    role: { ja: "フルスタック開発 · 制御システム", en: "Full Stack Engineering · Control Systems" },
    title: {
      ja: "データ可視化・遠隔制御システム",
      en: "Data Visualization & Remote Control",
    },
    description: {
      ja: "顧客と設計を詰めながら、工場・ビル自動化向けの可視化と遠隔制御を実装。運用効率を25%改善。",
      en: "Designed and shipped visualization and remote control for factory and building automation, improving operational efficiency by 25%.",
    },
    tech: ["C#", "SQL Server", "Azure", "SCADA", "PLC"],
    href: "https://www.mitsubishielectric.co.jp/fa/products/software/visualisation/genesis64/index.html",
    image: "/work/scada-edge-case.webp",
    imageAlt: {
      ja: "PLCとセンサーのデータをPCとiPadで可視化・遠隔制御する画面イメージ",
      en: "Concept showing PLC and sensor data visualized and controlled from desktop and tablet",
    },
  },
  {
    id: "saas-scrum",
    role: { ja: "フルスタック開発 · Scrum", en: "Full Stack Engineering · Scrum" },
    title: {
      ja: "製造業向け SaaS の開発",
      en: "Manufacturing SaaS Platform",
    },
    description: {
      ja: "SIM経由の現場データをクラウドSaaSへ。Scrum Masterとして月次リリースを週次へ改善。",
      en: "Brought field data into a cloud SaaS over cellular connectivity and led Agile delivery from monthly to weekly releases.",
    },
    tech: ["React", "Next.js", "TypeScript", "Azure", "Snowflake", "Scrum"],
    href: "https://www.mitsubishielectric.co.jp/fa/about-us/fa-digitalsolution/index.html",
    image: "/work/manufacturing-saas-case-v2.webp",
    imageAlt: {
      ja: "SIM経由の設備データとScrum開発をつなぐ製造業向けSaaSの画面イメージ",
      en: "Concept connecting cellular equipment data with Scrum delivery in a manufacturing SaaS",
    },
  },
  {
    id: "canada-community",
    role: { ja: "ボランティア · Web開発", en: "Volunteer · Web Development" },
    title: {
      ja: "カナダのコミュニティ Web 開発",
      en: "Community Website in Canada",
    },
    description: {
      ja: "地域の情報と参加への導線を、誰でも使いやすいレスポンシブ Web サイトとして設計・実装。",
      en: "Designed and built an accessible responsive website connecting a Canadian community with information and ways to participate.",
    },
    tech: ["Web Design", "Frontend", "Responsive", "Accessibility"],
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
    image: "/work/canada-community-case.webp",
    imageAlt: {
      ja: "カナダのコミュニティサイトをデスクトップとスマートフォンで表示したコンセプト",
      en: "Concept desktop and mobile views of a Canadian community website",
    },
  },
] as const;

export const enablement = [
  {
    id: "notion",
    mark: "N",
    title: { ja: "Notion 全社一元管理", en: "Company-wide Notion operations" },
    description: {
      ja: "散在する情報と業務を、チームが使い続けられる一つの運用基盤へ。",
      en: "Bring scattered information and workflows into one maintainable operating system.",
    },
  },
  {
    id: "claude",
    mark: "AI",
    title: { ja: "Claude 企業導入支援", en: "Claude adoption support" },
    description: {
      ja: "導入だけで終わらせず、実務に定着する使い方とルールまで設計。",
      en: "Design practical usage and guardrails so adoption becomes part of real work.",
    },
  },
  {
    id: "git",
    mark: "GIT",
    title: { ja: "Git 導入・運用支援", en: "Git enablement" },
    description: {
      ja: "チームの開発フローに合わせ、履歴・レビュー・リリースの型を整備。",
      en: "Shape versioning, review and release practices around the way the team works.",
    },
  },
] as const;

/** 屋号の由来そのものを言葉にしたセクション。 */
export const ethos = {
  heading: { ja: "すべてを繋ぎ、まだない傑作へ。", en: "Connect everything. Make what doesn't exist." },
  values: [
    { ja: "現場から", en: "Grounded" },
    { ja: "速く出す", en: "Ship fast" },
    { ja: "動き続ける", en: "Keeps running" },
    { ja: "測って直す", en: "Measured" },
    { ja: "チームで", en: "With the team" },
    { ja: "次の一歩", en: "Next step" },
  ],
  caption: {
    ja: "大量の経験とデータを、<em>自分のコンセプト</em>で編み直し、まだ見ぬ最高傑作へ。",
    en: "Reweave experience and data through <em>a distinct point of view</em> — into the next masterpiece.",
  },
} as const;

export const skills = [
  {
    group: { ja: "AI駆動開発", en: "AI Driven Development" },
    items: ["Generative AI", "AI-assisted Engineering", "Rapid Prototyping", "RAG", "AI/ML Integration"],
  },
  {
    group: { ja: "フルスタック", en: "Full Stack" },
    items: ["TypeScript", "React", "Next.js", "Astro", "Python", "C#", "SwiftUI", "REST APIs"],
  },
  {
    group: { ja: "クラウド・データ", en: "Cloud & Data" },
    items: [
      "Microsoft Azure", "Docker", "PostgreSQL", "SQL Server",
      "Snowflake", "Power BI", "DevOps", "Git",
    ],
  },
] as const;

export const certifications = [
  { name: "Microsoft Certified: DevOps Engineer Expert", issuer: "Microsoft", year: "2025" },
  { name: "Microsoft Certified: Azure Solutions Architect Expert", issuer: "Microsoft", year: "2025" },
  { name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", year: "2025" },
  { name: "Registered Product Owner", issuer: "Agile Education by Scrum Inc", year: "2024" },
  { name: "Registered Scrum Master", issuer: "Agile Education by Scrum Inc", year: "2024" },
] as const;

export const timeline = [
  {
    org: "AI Driven Full Stack Developer (Contract)",
    role: {
      ja: "工場自動化 × リアルタイム分析 × AI",
      en: "Factory automation · real-time analytics · AI",
    },
    period: "2024 — Now",
  },
  {
    org: "Cornerstone International Community College",
    role: {
      ja: "Data Science ディプロマ（在学中・バンクーバー）",
      en: "Data Science diploma, in progress — Vancouver",
    },
    period: "2024 — Now",
  },
  {
    org: "Mitsubishi Electric — FA Systems",
    role: {
      ja: "SCADA・可視化基盤の開発 / Scrum Master",
      en: "SCADA & visualization platforms / Scrum Master",
    },
    period: "2020 — 2024",
  },
] as const;

/** LinkedInに公開されている、実際に一緒に働いた方からの推薦。 */
export const recommendations = [
  {
    name: "Hemant Navarkar",
    title: {
      ja: "技術と事業をつなぐ、グローバルな推進力",
      en: "Technical leadership across global teams",
    },
    context: {
      ja: "Mitsubishi Electric · SaaS プロジェクト",
      en: "Mitsubishi Electric · SaaS project",
    },
    quote: {
      ja: "三菱電機のSaaSプロジェクトで、Scrum Master・Product Ownerを含む複数の役割を担い、アーキテクチャと事業目標をつなぎながらMVP・PoCを推進。デプロイの改善、顧客との要件整理、文化や時差を越えたグローバルチームの協働まで、一貫して成果へ導いた点を評価いただきました。",
      en: "On our SaaS project at Mitsubishi Electric, Maeda-san led the Scrum team across Scrum Master and Product Owner responsibilities. He reviewed architecture, aligned technical design with business goals, streamlined deployment, and guided successful MVP and PoC delivery. He connected customer requirements with implementation and kept global teams working smoothly across cultures and time zones.",
    },
  },
  {
    name: "Vishwa Ved",
    title: {
      ja: "顧客対話からMVPまでを率いるフルスタック力",
      en: "From customer needs to working MVPs",
    },
    context: {
      ja: "Mitsubishi Electric · 次世代 SaaS",
      en: "Mitsubishi Electric · Next-generation SaaS",
    },
    quote: {
      ja: "次世代SaaSの開発でScrumチームを率い、顧客対話から要件定義、プロダクト方針の整理までを主導。グローバルチームへAgileを導入し、PoC・MVPを形にしました。事業視点とフルスタックの技術力を両立し、MVPのアーキテクチャと設計を前へ進めた点を評価いただきました。",
      en: "For the next-generation SaaS platform, Mr. Maeda led the Scrum team from customer conversations and requirements definition through product direction. He introduced Agile ways of working across a globally diverse team and helped turn PoCs and MVPs into reality. His business perspective and full-stack expertise were central to the architecture and design of the MVPs.",
    },
  },
] as const;

/**
 * 「仕事のそと」のタイル。
 *
 * size は 6 列グリッド上での占有幅（原典のベントー配置）。
 * lg = 3列×2行、md = 3列、wide = 4列、sm = 2列。
 * 6列がちょうど埋まる組み合わせにしてある（行末に穴を残さない）。
 *
 * 写真のない項目は image を null にし、代わりに motif を線画で描く。
 * それらしいストック写真を当てるより、描いていないことを認めたほうが誠実で、
 * 面の変化がベントー全体の単調さも同時に解いてくれる。
 */
export const play = [
  {
    id: "hiking",
    size: "lg",
    name: { ja: "山を歩く", en: "Hiking" },
    note: { ja: "考えが詰まったら、とりあえず登る", en: "When thinking stalls, go up a mountain" },
    image: "/play/hiking.webp",
    motif: null,
  },
  {
    id: "running",
    size: "md",
    name: { ja: "走る", en: "Running" },
    note: { ja: "速さより、続く歩幅で", en: "Not fast — just a stride that lasts" },
    image: null,
    motif: "pace",
  },
  {
    id: "cafe",
    size: "md",
    name: { ja: "カフェ", en: "Café" },
    note: { ja: "一杯ぶんの時間で考えを整える", en: "One cup, one idea sorted out" },
    image: "/play/cafe.webp",
    motif: null,
  },
  {
    id: "sports",
    size: "sm",
    name: { ja: "スポーツ", en: "Sports" },
    note: { ja: "バスケ・野球・テニス", en: "Basketball, baseball, tennis" },
    image: null,
    motif: "ball",
  },
  {
    id: "travel",
    size: "wide",
    name: { ja: "旅", en: "Travel" },
    note: { ja: "知らない街を、ただ歩く", en: "Walking a city I don't know yet" },
    image: "/play/travel.webp",
    motif: null,
  },
] as const;

/**
 * 提供メニュー。
 *
 * tone はバッジの色。原典はカードごとに色を変えて種類を示していた。
 *
 * 価格の考え方: バンクーバー在住・Azure 系 Expert 資格3つ・2020年からの実務経験という
 * 前提での相場に寄せている。単発の相談は「試しやすさ」を優先して低く、
 * 継続と受託は実際に時間を使う分だけ取る。
 *
 * originalPrice は、実際に値下げしている項目にだけ置く。
 * 見せかけの二重価格を作らないため、置いた分は必ず本当に下げた額にする。
 */
export const services = [
  {
    id: "direction",
    /** バッジの色。0 は無彩色、1〜4 は --pastel-N */
    tone: 1,
    featured: false,
    badge: { ja: "まずはここから", en: "Start here" },
    title: { ja: "AI・技術相談", en: "AI & technical consultation" },
    subtitle: { ja: "オンライン · 60分", en: "Online · 60 min" },
    /** 実際に下げている元の価格。表示は打ち消し線 */
    originalPrice: { ja: "¥10,000", en: "CA$100" },
    price: { ja: "¥5,000", en: "CA$50" },
    unit: { ja: "/ 回", en: "/ session" },
    points: [
      { ja: "課題とAI活用ポイントを整理", en: "Map the problem and its AI opportunities" },
      { ja: "技術構成と実現性を検討", en: "Assess architecture and feasibility" },
      { ja: "開発ロードマップを具体化", en: "Leave with a practical build roadmap" },
    ],
    cta: { ja: "相談を申し込む", en: "Book a session" },
  },
  {
    id: "prototype",
    /** バッジの色。0 は無彩色、1〜4 は --pastel-N */
    tone: 3,
    featured: false,
    badge: { ja: "短期検証", en: "Fast validation" },
    title: { ja: "AIプロトタイプ", en: "AI prototype" },
    subtitle: { ja: "月ぎめで並走", en: "Monthly engagement" },
    originalPrice: null,
    price: { ja: "月30万円", en: "CA$3,000" },
    unit: { ja: "から〜", en: "+ / month" },
    points: [
      { ja: "アイデアから触れる検証版へ", en: "From idea to something you can touch" },
      { ja: "生成AI・データ連携を実装", en: "Generative AI and data integration" },
      { ja: "本開発へ進める判断材料を提供", en: "Evidence for the next investment" },
    ],
    cta: { ja: "検証を相談する", en: "Discuss a prototype" },
  },
  {
    id: "experience",
    /** バッジの色。0 は無彩色、1〜4 は --pastel-N */
    tone: 0,
    featured: true,
    badge: { ja: "フラッグシップ", en: "Flagship" },
    title: { ja: "フルスタック開発", en: "Full stack product build" },
    subtitle: { ja: "設計＋実装 · 4〜8週間", en: "Architecture + build · 4–8 weeks" },
    originalPrice: null,
    price: { ja: "¥800,000", en: "CA$8,000" },
    unit: { ja: "〜 / 件", en: "+ / project" },
    points: [
      { ja: "フロントエンド・API・DBを一貫構築", en: "Frontend, APIs and database as one system" },
      { ja: "AI・外部サービス・データ連携", en: "AI, external services and data integration" },
      { ja: "クラウド公開・計測・改善まで", en: "Cloud launch, measurement and iteration" },
    ],
    cta: { ja: "見積もりを相談する", en: "Request a quote" },
  },
  {
    id: "product",
    /** バッジの色。0 は無彩色、1〜4 は --pastel-N */
    tone: 2,
    featured: false,
    badge: { ja: "プロダクト", en: "Product" },
    title: { ja: "プロダクト共同開発", en: "Product partnership" },
    subtitle: { ja: "設計から運用まで", en: "From design to operation" },
    originalPrice: null,
    price: { ja: "応相談", en: "Let's talk" },
    unit: { ja: "", en: "" },
    points: [
      { ja: "アイデア段階からの技術検証", en: "Technical validation from day one" },
      { ja: "AI・データを中核にした設計", en: "AI and data at the product core" },
      { ja: "お客様のチームに馴染む運用基盤", en: "A maintainable system that fits your team" },
    ],
    cta: { ja: "話をする", en: "Start a conversation" },
  },
] as const;

export const servicesNote = {
  ja: "MaePaceは前田哲也が個人で運営する開発事業です。初回30分は無料。まだ企画書がなくても大丈夫です。日本語 / English どちらでも。",
  en: "MaePace is an independent development practice run by Tetsuya Maeda. The first 30 minutes are free; no polished brief needed. Japanese or English.",
} satisfies Bilingual;

export const contact = {
  heading: { ja: "次の「すごい」を、<em>一緒に</em>。", en: "Let's make the next <em>unmissable</em> thing." },
  note: {
    ja: "AIプロトタイプ、Webアプリ、業務システム、まだ名前のない企画でも。返信は2営業日以内に。",
    en: "An AI prototype, web app, business system, or an idea without a name yet. I reply within two business days.",
  },
} as const;
