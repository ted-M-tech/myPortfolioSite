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
    ja: "前田哲哉 / Tetsuya Maeda。AIを開発プロセスの中核に据え、フロントエンド、バックエンド、クラウドまで一気通貫で構築するAI Driven Full Stack Developer。",
    en: "Tetsuya Maeda is an AI Driven Full Stack Developer building production-ready products across frontend, backend, cloud and AI.",
  } satisfies Bilingual,
} as const;

export const person = {
  name: "Tetsuya Maeda",
  nameJa: "前田 哲哉",
  /** 普段使っている呼び名 */
  alias: "Ted",
  role: {
    ja: "AI Driven Full Stack Developer",
    en: "AI Driven Full Stack Developer",
  } satisfies Bilingual,
  /** 都市名は出さない。移動しても古びないし、リモート前提なら都市の情報量は低い */
  location: {
    ja: "カナダ / 日本",
    en: "Canada / Japan",
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
  /** ヒーロー直下の自己紹介。人が一度も出てこないサイトにしないための一枚 */
  photo: "/profile-photo.webp",
  bio: {
    ja: "AIを開発の中核に置き、UIUXから開発・デプロイまで一人で通して形にします。新しい技術が出たら、まず試す。常に最新の情報をキャッチし、スピード・効率を重視した開発を実施します。",
    en: "Putting AI at the core of my workflow, I independently handle everything from UI/UX design to development and deployment. I embrace new technologies early, stay on top of the latest trends, and focus on fast, high-efficiency development.",
  } satisfies Bilingual,
} as const;

export const socials = [
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
  },
  { label: "GitHub", icon: "github", href: "https://github.com/ted-M-tech" },
  { label: "Email", icon: "mail", href: `mailto:${person.email}` },
] as const;

/** 帯を流れる技術キーワード。実際に使うものだけを並べる。 */
export const marquee = [
  "AI Driven Development",
  "Full Stack",
  "Generative AI",
  "TypeScript",
  "React",
  "Next.js",
  "Astro",
  "Python",
  "C#",
  "SwiftUI",
  "API Design",
  "Real-time Data",
  "Cloud Architecture",
  "Rapid Prototyping",
  "DevOps",
] as const;

/**
 * AI駆動の設計・開発・運用で日常的に横断するツール。
 *
 * ヒーローはロゴだけを浮かべ、名前を出さない。名前で補えない以上、
 * 「再配布できる公式マークが実在するもの」だけを載せる。
 *
 * アイコンは配布されたまま置き、こちらで色を付けない。
 * appIcon: true は、そのベンダーが「アプリアイコン」として配布している
 * タイル状のアセット（地色つき）。Claude と Cursor だけが公式に配布している。
 * 残り10社は素のロゴマークしか配布しておらず、複数社はタイル化自体を禁じている
 * （VS Code は角丸squareを「誤った例」として図示、Microsoft は "should not be
 * contained within a box, circle, or other shapes"）。だから形式は揃わない。
 * Simple Icons 由来（Claude/Cursor/Gemini/Miro/n8n）は仕様として全部単色、
 * Devicon 由来（Docker/Figma/Notion/Slack/VS Code/Xcode）はフルカラー。
 * 見た目は揃わないが、揃えようとすると存在しない配色を作ることになる。
 * Simple Icons が各ブランドに添えている hex は「ブランドの primary color」で
 * あって「ロゴの色」ではない（Miro の #050038 は紺だが、ロゴは黄色）。
 * 一度それでロゴを塗って間違えたので、二度とやらないこと。
 *
 * 載せていないもの:
 * - Codex / Microsoft Teams / Higgsfield / Sakana AI
 *   再配布可能なアイコン集に公式マークが無い。特に Microsoft は Simple Icons が
 *   ブランドポリシーを理由に収録対象外としているため、代替を自作しない。
 * - Xcode
 *   Apple はウェブサイトでの自社アイコン使用を名指しで禁じており、文字での
 *   言及しか認めていない。他社と違って例外規定が無いので、正しい表示が存在しない。
 * - Canva
 *   Canva 自身の PDF が Apple と同一構造で禁じている。「ウェブサイト上での
 *   ロゴ・アイコン使用は書面ライセンスなしには不可」。許されているのは非営利の
 *   情報提供サイトでのワードマーク（文字）のみ。
 * - Gemini
 *   実際のマークはグラデーションで、Google は単一の固定色を公開していない。
 *   単色版は Simple Icons による改変で、公式の見た目ではない。正規版の入手には
 *   Partner Marketing Hub での承認申請が要る。正しく出せないので載せない。
 *   詳細は public/brand/tools/README.md。
 */
export const toolchain = [
  { name: "ChatGPT", icon: "/brand/tools/chatgpt.svg", appIcon: false },
  { name: "Claude", icon: "/brand/tools/claude.svg", appIcon: true },
  { name: "Cursor", icon: "/brand/tools/cursor-app-icon.png", appIcon: true },
  { name: "VS Code", icon: "/brand/tools/vscode.svg", appIcon: false },
  { name: "Perplexity", icon: "/brand/tools/perplexity.svg", appIcon: false },
  { name: "GitHub", icon: "/brand/tools/github.svg", appIcon: false },
  { name: "Azure", icon: "/brand/tools/azure.svg", appIcon: false },
  { name: "AWS", icon: "/brand/tools/aws.svg", appIcon: false },
  { name: "Figma", icon: "/brand/tools/figma.svg", appIcon: false },
  { name: "Notion", icon: "/brand/tools/notion.svg", appIcon: false },
  { name: "Miro", icon: "/brand/tools/miro.svg", appIcon: false },
  { name: "n8n", icon: "/brand/tools/n8n.svg", appIcon: false },
  { name: "Slack", icon: "/brand/tools/slack.svg", appIcon: false },
  { name: "Docker", icon: "/brand/tools/docker.svg", appIcon: false },
] as const;

export const stats = [
  {
    value: 6,
    suffix: "+",
    label: { ja: "年のプロダクト開発", en: "Years shipping products" },
  },
  {
    value: 4,
    suffix: "×",
    label: { ja: "リリース頻度を向上", en: "Faster release cadence" },
  },
  {
    value: 25,
    suffix: "%",
    label: { ja: "運用効率を改善", en: "Operational efficiency gained" },
  },
  {
    value: 6,
    suffix: "",
    label: { ja: "領域横断のプロダクト", en: "Cross-domain products" },
  },
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
    id: "saas-scrum",
    role: {
      ja: "フルスタック開発 · Scrum",
      en: "Full Stack Engineering · Scrum",
    },
    title: {
      ja: "製造業向け SaaS の開発",
      en: "Manufacturing SaaS Platform",
    },
    description: {
      ja: "ファウンディングエンジニアとして立ち上げ。100を超えるAPIとダッシュボード、日次17万件の設備データを受けるクラウド基盤まで。",
      en: "Built from zero as founding engineer — 100+ APIs, a dashboard, and cloud infrastructure ingesting 170,000 device data points a day.",
    },
    tech: ["Python", "FastAPI", "React", "AWS", "Terraform", "IoT"],
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
    image: "/work/manufacturing-saas-case-v2.webp",
    imageAlt: {
      ja: "SIM経由の設備データとScrum開発をつなぐ製造業向けSaaSの画面イメージ",
      en: "Concept connecting cellular equipment data with Scrum delivery in a manufacturing SaaS",
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
    role: {
      ja: "フルスタック開発 · 制御システム",
      en: "Full Stack Engineering · Control Systems",
    },
    title: {
      ja: "データ可視化・遠隔制御システム",
      en: "Data Visualization & Remote Control",
    },
    description: {
      ja: "顧客と設計を詰めながら、可視化と遠隔制御を10以上の拠点へ。Scrum Masterとして月次リリースを週次へ改善し、運用効率を25%改善。",
      en: "Designed and shipped visualization and remote control across 10+ sites. As Scrum Master, moved releases from monthly to weekly and improved operational efficiency by 25%.",
    },
    tech: ["C#", ".NET", "Azure", "SCADA", "Scrum"],
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
    image: "/work/scada-edge-case.webp",
    imageAlt: {
      ja: "PLCとセンサーのデータをPCとiPadで可視化・遠隔制御する画面イメージ",
      en: "Concept showing PLC and sensor data visualized and controlled from desktop and tablet",
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

/**
 * 知識・失敗・現場・対話をぜんぶ材料にして、実際に必要なものをつくる、という節。
 *
 * 以前は「まだない傑作へ」「まだ見ぬ最高傑作」と書いていたが、言い過ぎだった。
 * 何をつくるかを宣言する場所ではなく、どう materials を扱うかを示す場所なので、
 * 誇張のない言い方に戻してある。飾った言い換えを持ち込まないこと。
 */
export const ethos = {
  heading: {
    ja: "本当に必要なものを、つくる。",
    en: "Build what's actually needed.",
  },
  values: [
    { ja: "現場から", en: "Grounded" },
    { ja: "速く出す", en: "Ship fast" },
    { ja: "動き続ける", en: "Keeps running" },
    { ja: "測って直す", en: "Measured" },
    { ja: "チームで", en: "With the team" },
    { ja: "次の一歩", en: "Next step" },
  ],
} as const;

export const skills = [
  {
    group: { ja: "AI駆動開発", en: "AI Driven Development" },
    items: [
      "Generative AI",
      "AI-assisted Engineering",
      "Rapid Prototyping",
      "RAG",
      "AI/ML Integration",
    ],
  },
  {
    group: { ja: "フルスタック", en: "Full Stack" },
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Astro",
      "Python",
      "C#",
      "SwiftUI",
      "REST APIs",
    ],
  },
  {
    group: { ja: "クラウド・データ", en: "Cloud & Data" },
    items: [
      "AWS",
      "Microsoft Azure",
      "Terraform",
      "Docker",
      "PostgreSQL",
      "Snowflake",
      "Power BI",
      "DevOps",
      "Git",
    ],
  },
] as const;

export const certifications = [
  {
    name: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    year: "2025",
  },
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    issuer: "Microsoft",
    year: "2025",
  },
  {
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    year: "2025",
  },
  {
    name: "Registered Product Owner",
    issuer: "Agile Education by Scrum Inc",
    year: "2024",
  },
  {
    name: "Registered Scrum Master",
    issuer: "Agile Education by Scrum Inc",
    year: "2024",
  },
] as const;

/**
 * 経歴。会社名は出さず、職名と担当内容だけを並べる。
 * 推薦者の所属を伏せている以上、自分の勤務先だけ出すのは筋が通らない。
 * 期間は履歴書（Tetsuya Maeda - AI Engineer Resume）に合わせてある。
 */
export const timeline = [
  {
    title: "AI Engineer / Full Stack Developer",
    focus: {
      ja: "LLMエージェント、評価基盤、IoT SaaS の立ち上げ",
      en: "LLM agents, evaluation harnesses, and an IoT SaaS built from zero",
    },
    period: "2025 — Now",
  },
  {
    title: "Software Developer",
    focus: {
      ja: "SCADA・ビル自動化システムの開発 / Scrum Master",
      en: "SCADA and building automation systems / Scrum Master",
    },
    period: "2020 — 2025",
  },
] as const;

/**
 * 実際に一緒に働いた方からの推薦（出典は LinkedIn の公開推薦）。
 *
 * 推薦者は伏せる。フルネームではなくイニシャルにし、勤務先も出さない。
 * 本人の許諾を取らずに他人の氏名と所属を自分の営業面に並べない、という判断。
 * 引用文からも社名を外してあるが、役割・内容は原文の意味を変えていない。
 */
export const recommendations = [
  {
    initials: "H.N.",
    title: {
      ja: "技術と事業をつなぐ、グローバルな推進力",
      en: "Technical leadership across global teams",
    },
    context: {
      ja: "製造業向け SaaS プロジェクト",
      en: "Manufacturing SaaS project",
    },
    quote: {
      ja: "製造業向けSaaSプロジェクトで、Scrum Master・Product Ownerを含む複数の役割を担い、アーキテクチャと事業目標をつなぎながらMVP・PoCを推進。デプロイの改善、顧客との要件整理、文化や時差を越えたグローバルチームの協働まで、一貫して成果へ導いた点を評価いただきました。",
      en: "On our SaaS project, Maeda-san led the Scrum team across Scrum Master and Product Owner responsibilities. He reviewed architecture, aligned technical design with business goals, streamlined deployment, and guided successful MVP and PoC delivery. He connected customer requirements with implementation and kept global teams working smoothly across cultures and time zones.",
    },
  },
  {
    initials: "V.V.",
    title: {
      ja: "顧客対話からMVPまでを率いるフルスタック力",
      en: "From customer needs to working MVPs",
    },
    context: {
      ja: "次世代 SaaS プラットフォーム",
      en: "Next-generation SaaS platform",
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
    note: null,
    image: "/play/hiking.webp",
  },
  {
    id: "running",
    size: "md",
    name: { ja: "走る", en: "Running" },
    note: null,
    image: "/play/running.webp",
  },
  {
    id: "cafe",
    size: "md",
    name: { ja: "カフェ", en: "Café" },
    note: null,
    image: "/play/cafe.webp",
  },
  {
    id: "sports",
    size: "sm",
    name: { ja: "スポーツ", en: "Sports" },
    /** 何をやるかは名前だけでは伝わらないので、ここだけ残す */
    note: { ja: "バスケ・野球・テニス", en: "Basketball, baseball, tennis" },
    image: "/play/sports.webp",
  },
  {
    id: "travel",
    size: "wide",
    name: { ja: "旅", en: "Travel" },
    note: null,
    image: "/play/travel.webp",
  },
] as const;

/**
 * 提供メニュー。
 *
 * tone はバッジの色。原典はカードごとに色を変えて種類を示していた。
 *
 * 価格の考え方: Azure 系 Expert 資格3つ・2020年からの実務経験という
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
      {
        ja: "課題とAI活用ポイントを整理",
        en: "Map the problem and its AI opportunities",
      },
      {
        ja: "技術構成と実現性を検討",
        en: "Assess architecture and feasibility",
      },
      {
        ja: "開発ロードマップを具体化",
        en: "Leave with a practical build roadmap",
      },
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
      {
        ja: "アイデアから触れる検証版へ",
        en: "From idea to something you can touch",
      },
      {
        ja: "生成AI・データ連携を実装",
        en: "Generative AI and data integration",
      },
      {
        ja: "本開発へ進める判断材料を提供",
        en: "Evidence for the next investment",
      },
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
    subtitle: {
      ja: "設計＋実装 · 4〜8週間",
      en: "Architecture + build · 4–8 weeks",
    },
    originalPrice: null,
    price: { ja: "¥800,000", en: "CA$8,000" },
    unit: { ja: "〜 / 件", en: "+ / project" },
    points: [
      {
        ja: "フロントエンド・API・DBを一貫構築",
        en: "Frontend, APIs and database as one system",
      },
      {
        ja: "AI・外部サービス・データ連携",
        en: "AI, external services and data integration",
      },
      {
        ja: "クラウド公開・計測・改善まで",
        en: "Cloud launch, measurement and iteration",
      },
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
      {
        ja: "アイデア段階からの技術検証",
        en: "Technical validation from day one",
      },
      {
        ja: "AI・データを中核にした設計",
        en: "AI and data at the product core",
      },
      {
        ja: "お客様のチームに馴染む運用基盤",
        en: "A maintainable system that fits your team",
      },
    ],
    cta: { ja: "話をする", en: "Start a conversation" },
  },
] as const;

/**
 * 連絡先。ここは連絡が取れれば十分な場所なので、見出しも説明文も置かない。
 * 以前は大見出しと補足文があったが、読ませたい情報ではなかった。
 */
export const contact = {} as const;
