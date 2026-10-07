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
   * ヒーローの見出し。<em> の中は Hero.astro が字幅で強調する（色は変えない）。
   * 連絡先の <em> はアクセント色だが、ここは無彩色のまま。
   *
   * 速さは売りの中心なので見出しで言う。ただし「構想を速くプロダクトへ」のように
   * 係る動詞のない副詞を置かないこと（日本語として壊れる）。
   */
  headline: {
    ja: "人とAIの協調で、<br /><em>高速開発。</em>",
    en: "People and AI together,<br /><em>building fast.</em>",
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
    value: 10,
    /* 制作7件 + 組織支援3件。後者はプロダクトではないので「案件」で数える */
    suffix: "",
    label: { ja: "領域横断の案件", en: "Cross-domain projects" },
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
  /**
   * 動画で見せる案件だけ持つ。image はポスター兼、帯（WorkStrip）用の静止画。
   * 音声は載せていない（無音ループ前提。自動再生に音は要らないし、その分軽い）。
   */
  video?: { src: string; poster: string } | null;
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
    id: "ai-video",
    role: { ja: "生成AI · マーケティング", en: "Generative AI · Marketing" },
    title: {
      ja: "AI動画生成によるマーケティング支援",
      en: "AI Video for Marketing",
    },
    description: {
      ja: "撮影せずに、プロダクトの世界観を映像に。生成AIでつくり、SNS向けに仕上げます。",
      en: "A product's world on film, without a shoot. Generated with AI, finished for social.",
    },
    tech: ["Generative Video", "Higgsfield", "Motion Design", "Short-form"],
    href: "https://annoscene.maepace.com",
    image: "/work/ai-video-promo-poster.webp",
    imageAlt: {
      ja: "生成AIでつくった縦型のプロモーション動画",
      en: "A vertical promotional film generated with AI",
    },
    video: {
      src: "/work/ai-video-promo.mp4",
      poster: "/work/ai-video-promo-poster.webp",
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
    href: "https://misss.ca/",
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
/**
 * 各社マークの帰属表示。ページ最下部に置く。
 *
 * ヒーローに出していたが、帯ごと外した時に一緒に消えていた。
 * 掲載しているマークのうち VS Code・Slack・Notion・AWS・Azure は、
 * 各社のガイドライン上「参照目的」に限って許される（public/brand/tools/README.md）。
 * この一文が、参照であって提携ではないと明示する唯一の要素なので、
 * 目立たない場所でよいが、無くさないこと。
 */
export const marksNote = {
  ja: "各社の製品名およびロゴは、それぞれの権利者に帰属します。提携・推奨関係を示すものではありません。",
  en: "Product names and marks belong to their respective owners. No affiliation or endorsement implied.",
} satisfies Bilingual;

export const contact = {} as const;


// Public creative works. Actual artifacts, separate from private client projects.
export const openWorks = {
 overviewTypes:'WEB / FILM / DESIGN',
 title:{ja:'作品集',en:'Creative works'},
 heading:{ja:'これを、つくってみたい。',en:'Find your next thing to make.'},
 description:{ja:'LP、映像、LINEスタンプ。完成した作品から選んで、つくり方まで。',en:'Landing pages, films and LINE stickers. Start with the finished work, then explore how it was made.'},
 action:{ja:'すべての作品を見る',en:'Explore all works'},href:'/works',
 all:{ja:'すべて',en:'All'},lp:{ja:'LP・Web',en:'LP / Web'},film:{ja:'映像',en:'Film'},slides:{ja:'スライド',en:'Slides'},
 future:{ja:'スライド作品は、これから。',en:'Slide projects are coming next.'},
 back:{ja:'作品集に戻る',en:'Back to all works'},
 view:{ja:'完成作品を見る',en:'View the finished work'},make:{ja:'この作品のつくり方',en:'How to make this'},
 notes:{ja:'作り方をひらく',en:'Open the making of'},
 source:{ja:'制作ノート・ソースを開く',en:'Open notes & source'},
 decisions:{ja:'デザインの判断',en:'Design decisions'},
 skills:{ja:'制作技術・スキル',en:'Techniques & skills'},prompts:{ja:'プロンプト',en:'Prompts'},credits:{ja:'素材・出典',en:'Credits'},
 promptNote:{ja:'制作後に整理した再制作向けの指示です。一度の入力で完成したという意味ではありません。',en:'This recipe was reconstructed after production. It is not a claim that one prompt created the result.'},
 copy:{ja:'プロンプトをコピー',en:'Copy prompt'},copied:{ja:'コピーしました',en:'Copied'},
 copyError:{ja:'コピーできませんでした。本文を選択してコピーしてください。',en:'Copy failed. Select and copy the text instead.'},
 items:[
  {id:'lanclo-lp',kind:'LP',title:{ja:'Lanclo — 自分の声を、お手本に。',en:'Lanclo — Your voice becomes the model'},description:{ja:'3ステップの図解と、動きで伝える英語学習アプリのLP。',en:'An English-learning landing page with three illustrated steps and purposeful motion.'},image:'/works/lanclo-web.webp',href:'/works/lanclo-lp',tags:['React','Motion','Impeccable'],live:'https://voice.maepace.com/lp',source:'https://github.com/ted-M-tech/tetsuya-creative-motions/tree/open-works-v1/projects/lanclo-lp',skills:['Impeccable','Taste Skill'],summary:{ja:'自分の声を登録し、お手本を聴いて、発音する。仕組みは文章を増やすより、読む順に並べたイラストで伝えました。ニュースは写真、練習はunDrawで役割を分けています。',en:'Record, listen to your own-voice model, then speak. Sequential illustrations explain the mechanism. News uses photography; practice uses unDraw.'},prompt:{ja:'検証済みの機能と承認済みブランドを使い、英語学習アプリのLPを作る。最初に「自分の声がお手本になる」という変化を伝える。録音→自声のお手本→発音を3つのイラストで表現。練習はunDraw、ニュースは実写で統一。補足の重複を削り、320px・390px・1440pxで改行と比較表を確認する。研究の数値は何を測ったかを併記し、製品の効果検証と混同させない。',en:'Build a landing page for an English-learning app using verified capabilities and approved branding. Lead with the change: your voice becomes the model. Show record → own-voice model → speak in three illustrations. Use unDraw for practice and real photos for news. Remove repeated supporting copy. Check wrapping and comparison tables at 320, 390 and 1440px. Scope research figures to what was actually measured, not product efficacy.'},note:{ja:'約1.3倍は外部研究の得点上昇幅の比較で、Lanclo自体の効果検証ではありません。',en:'About 1.3× compares score gains in an external study, not Lanclo efficacy.'}},
  {id:'lanclo-film',kind:'FILM',title:{ja:'Lanclo — 自分の声で、毎日の英語を。',en:'Lanclo — Your voice. Your daily English.'},description:{ja:'声のお手本から毎日の習慣へ。69秒のプロダクト映像。',en:'From an own-voice model to an everyday habit. A 69-second product film.'},image:'/works/lanclo-film.jpg',href:'/works/lanclo-film',tags:['HTML / SVG','HyperFrames','Gemini TTS'],live:'https://videos.maepace.com/media/lanclo-daily-r26.mp4',source:'https://github.com/ted-M-tech/tetsuya-creative-motions/tree/open-works-v1/films/lanclo',skills:['Creative Motions','HyperFrames'],summary:{ja:'シャドーイングの悩みから、自分の声のお手本、個別レッスン、ニュースへ。図解・声・テンポを組み合わせ、使う場面が浮かぶ映像にしました。HTML / SVGとGSAPで組み、HyperFramesで書き出しています。',en:'From shadowing frustration to an own-voice model, personal lessons and news. Illustration, narration and pacing show the experience. Built with HTML / SVG and GSAP, rendered with HyperFrames.'},prompt:{ja:'英語学習アプリのプロダクト映像をHTML / SVGで制作する。冒頭にシャドーイングの悩みを置き、自分の声がお手本になる驚きへつなぐ。録音→お手本→発音→分析→次の練習を、説明文を増やさず図解と動きで伝える。unDrawで画風を統一。個別練習からニュース教材へ自然につなぎ、台本・音声指示・タイミング・素材の出典をソースと一緒に残す。',en:'Create a code-based product film for an English-learning app. Open with shadowing frustration, then reveal an own-voice model. Show recording, listening, speaking, analysis and the next practice through diagrams and motion. Use one unDraw illustration family. Bridge personal practice into news material. Keep the script, voice directions, timing and asset credits with the source.'},note:{ja:'当時の訴求を記録した映像作品です。問題数やニュース配信の演出は、現在の製品仕様を保証するものではありません。',en:'This film records a creative concept at the time of production. Question counts and news-delivery scenes are not a guarantee of current product capabilities.'}},
  {"id": "tako-talk", "title": {"ja": "Tako Talk — 会話を、明日の習慣へ。", "en": "Tako Talk — A conversation worth returning to"}, "description": {"ja": "会話・振り返り・漢字スタンプを、実際のアプリ画面で伝えるLP。", "en": "A landing page showing conversation, review and kanji stamps through actual app screens."}, "live": "https://helpkansai.maepace.com/", "tags": ["HTML / CSS", "JavaScript", "Rive"], "skills": ["HTML / CSS", "JavaScript", "Rive"], "summary": {"ja": "「日本語は知っている。でも話せない」から始まり、最初の5分でできることを見せる。会話の直後に振り返り、漢字スタンプを残す流れを、端末画面と短い動きでつなぎました。", "en": "Start with knowing Japanese but struggling to speak, then show the first five minutes. Actual phone screens and short motion connect conversation, immediate review and a daily kanji stamp."}, "note": {"ja": "LPの復元記録と更新履歴から整理。制作時の会話ログ全体や使用スキルは確認できていないため、以下は再構成した指示です。", "en": "Documented from the recovered LP source and revision history. The full original conversation and authoring skill records were not available; the recipe below is reconstructed."}, "decisions": [{"ja": "機能の列挙より、会話→振り返り→スタンプの体験順で見せる。", "en": "Show conversation → review → stamp in experience order, rather than listing features."}, {"ja": "実際のアプリ画面を主役にし、Takoのキャラクターで親しみを添える。", "en": "Lead with actual app screens; use Tako’s character to add warmth."}, {"ja": "標準語での練習と、近日予定の関西弁を区別する。", "en": "Distinguish available standard-Japanese practice from the upcoming Kansai mode."}], "prompt": {"ja": "日本語学習アプリのLPを作る。対象は単語を知っていても会話になると言葉が出ない学習者。冒頭でその悩みに触れ、最初の5分を「話す→すぐ振り返る→漢字スタンプを残す」で見せる。承認済みキャラクターと実機画面を使い、説明は1場面1メッセージ。英語を主に日本語切替を用意。近日予定の機能と利用できる機能を明確に分け、320・390・768・1440pxで画面、改行、CTA、言語切替を確認する。", "en": "Create a Japanese-learning app landing page for people who know words but freeze in conversation. Show the first five minutes as talk → review immediately → keep a kanji stamp. Use approved characters and real app screens, with one message per scene. Support English and Japanese. Separate upcoming from available features. Verify screens, text wrapping, CTAs and language switching at 320, 390, 768 and 1440px."}, "kind": "LP", "image": "/works/tako-talk-web.jpg", "href": "/works/tako-talk", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/projects/tako-talk"},
  {"id": "maepace-web", "title": {"ja": "MaePace — 好奇心を、前へ進む力に。", "en": "MaePace — Curiosity, put in motion"}, "description": {"ja": "開発実績・作品・学びを、ひとつのブランドでつなぐWebサイト。", "en": "One website connecting development projects, creative work and learning."}, "live": "https://maepace.com/", "tags": ["Astro", "TypeScript", "Canvas"], "skills": ["Astro", "TypeScript", "Canvas / CSS"], "summary": {"ja": "ツール群が動くヒーローから、人物・開発実績・完成作品へ。仕事のプロジェクトと見て試せる成果物を分けつつ、共通のヘッダーと言語設定で行き来できる構成にしました。", "en": "A moving tool universe leads into the person, development projects and completed creative work. Projects and finished artifacts remain distinct, joined by a shared header and language preference."}, "note": {"ja": "ブランド資料・実装・Git履歴を根拠に整理。公開ノートは再現用の設計資料で、サイト全体のソース一式ではありません。", "en": "Based on brand documentation, implementation and Git history. The public notes are reproduction guidance, not a full source distribution of the site."}, "decisions": [{"ja": "プロジェクト集の下に作品集を置き、完成物の一覧から制作方法へ進める。", "en": "Place creative works below projects, with finished previews leading into making-of notes."}, {"ja": "コピーを日英のデータとして分離し、同じ部品で両言語を表示する。", "en": "Separate bilingual copy from layout and use the same components for both languages."}, {"ja": "動きはCanvas・CSS・IntersectionObserverで実装し、表示外では不要な描画を止める。", "en": "Use Canvas, CSS and IntersectionObserver; avoid unnecessary rendering off screen."}], "prompt": {"ja": "個人開発者の実績と創作物を伝えるMaePaceのWebサイトをAstroで作る。承認済みロゴと単色のブランドを維持。ツール群が動くヒーロー、人物紹介、開発プロジェクト、完成作品、相談導線へつなぐ。作品はLPひとつ・動画ひとつの単位にし、クリック後に完成物、制作ノート、再現プロンプトを置く。日英コピーはデータで管理。ヘッダー・フッターは共通化。Canvasの描画ループ重複を防ぎ、スマホの改行、キーボード操作、動きを減らす設定でも確認する。", "en": "Build an Astro website for a developer’s projects and creative work. Preserve the approved MaePace mark and monochrome identity. Connect a moving tool-universe hero to the person, projects, completed works and contact. Count one LP or film as one artifact; its detail page shows the result, making-of and reproduction prompts. Manage bilingual copy as data and share the header and footer. Prevent duplicate Canvas animation loops and check mobile wrapping, keyboard navigation and reduced motion."}, "kind": "LP", "image": "/works/maepace-web.jpg", "href": "/works/maepace-web", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/projects/maepace-web"},
  {"id": "annoscene", "title": {"ja": "AnnoScene — 旅の記憶を、静かな地図に。", "en": "AnnoScene — Your world, drawn over time"}, "description": {"ja": "風景とAtlasの操作デモで、旅の記録を見せるiPhoneアプリのLP。", "en": "An iPhone app landing page pairing a quiet landscape with an Atlas interaction demo."}, "live": "https://annoscene.maepace.com/", "tags": ["HTML / CSS", "JavaScript", "Product demo"], "skills": ["HTML / CSS", "JavaScript", "動画・実機画面"], "summary": {"ja": "霧の山並みから、自分のAtlasを開く体験へ。世界→国→地域と進む操作デモと、年を選ぶ画面に絞り、説明を増やさず製品の静けさを伝えました。", "en": "Move from misty mountains into a personal Atlas. A world → country → region demo and a year-view screen convey the quiet product without adding long explanations."}, "note": {"ja": "現行のAtlas版LPを対象に記録。過去の位置情報・写真・旅程リプレイ中心の製品説明は、この作品の再現指示に含めていません。", "en": "These notes cover the current Atlas landing page. Earlier location, photo and journey-replay concepts are not part of this reproduction brief."}, "decisions": [{"ja": "最初に旅の気配を見せ、続いて実際のAtlas操作で機能を説明する。", "en": "Lead with the feeling of travel, then explain function through actual Atlas interactions."}, {"ja": "世界・国・地域・年という地図の文脈を崩さず、画面を見せる。", "en": "Keep the map’s world, country, region and year context intact in the demo."}, {"ja": "プライバシーとApp Storeへの導線を短くまとめ、機能を詰め込みすぎない。", "en": "Keep privacy and the App Store path concise rather than overloading the page."}], "prompt": {"ja": "旅の記録を自分のAtlasとして残すiPhoneアプリのLPを作る。現行の仕様と承認済み画面だけを使う。霧の山並みを大きく置き、「Your world, drawn over time.」を軸に静かな余白で構成する。世界→国→地域へ進む短い操作デモ、その国の記録、年別表示へつなぐ。写真の取り込みや位置情報記録など旧仕様を混ぜない。説明は短く、App Store導線を明確にする。画像サイズ、動画ポスター、読み込み失敗時、390pxと1440pxでの表示を検証する。", "en": "Create a landing page for an iPhone app that records places in a personal Atlas. Use only current product facts and approved screens. Lead with misty mountains and “Your world, drawn over time.” Use quiet space, a short world → country → region demo, country context and year view. Do not introduce retired photo-import or location-tracking features. Keep copy brief and the App Store path clear. Check image sizes, video posters, loading fallbacks and layouts at 390 and 1440px."}, "kind": "LP", "image": "/works/annoscene-web.jpg", "href": "/works/annoscene", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/projects/annoscene"},
{"id": "tako-stickers", "title": {"ja": "たこ先生 — 動く関西弁。", "en": "Tako Sensei — Animated Kansai Reactions"}, "description": {"ja": "13のリアクションが一斉に動く、4秒のループポスター。", "en": "A four-second living poster with 13 animated reactions."}, "summary": {"ja": "承認済みLINEスタンプを、音がなくても伝わる一枚のポスターに。中央のタイトルに余白を残し、周囲のリアクションを同時に動かしています。", "en": "Approved LINE stickers become a sound-off living poster. A clear central title leaves room for simultaneous reactions around it."}, "prompt": {"ja": "承認済みのアニメーションスタンプを使い、1080×1920の4秒ループポスターを構成する。中央に日英タイトルとストア導線、周囲に13のリアクション。すべて0秒から同時に動かす。暖かい紙色、紺の文字、既存キャラクターの赤で統一し、音楽や装飾を足さない。重要な文字はSNSの安全領域内へ。", "en": "Build a 1080×1920 four-second looping poster from approved animated stickers. Place a bilingual title and store CTA centrally, surrounded by 13 reactions starting together at zero. Use warm paper, navy text and existing red artwork; no music or additional ornament. Keep important text in social safe areas."}, "note": {"ja": "無音の完成版。キャラクターとLINEロゴの権利は各権利者に帰属します。", "en": "The completed silent edition. Character and LINE mark rights remain with their respective owners."}, "kind": "FILM", "image": "/works/tako-stickers.jpg", "href": "/works/tako-stickers", "live": "https://videos.maepace.com/media/tako-stickers.mp4", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/films/tako-stickers", "tags": ["HyperFrames", "APNG / VP9", "HTML / CSS"], "skills": ["HyperFrames", "APNG / VP9", "HTML / CSS"], "portrait": true},
{"id": "tako-4280", "kind": "FILM", "title": {"ja": "4,280円 — 言える？標準語のアクセント。", "en": "¥4,280 — An accent challenge"}, "description": {"ja": "二人の自然な掛け合いを、キャラクターと字幕で見せる74秒。", "en": "A 74-second accent challenge built around a natural two-person exchange."}, "summary": {"ja": "提供された会話を切り詰めず、言い直しや間も含めて演出。発話に合わせて日英字幕と話者の表情を切り替え、最後に短い導線を添えました。", "en": "Preserve the supplied conversation, including pauses and retries. Match bilingual captions and character reactions to the speakers, then add a short ending."}, "portrait": true, "image": "/works/tako-4280.jpg", "href": "/works/tako-4280", "live": "https://videos.maepace.com/media/tako-4280.mp4", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/films/tako-4280", "tags": ["Natural voice", "Bilingual captions"], "skills": ["音声タイミング設計", "字幕・キャラクター演出"], "prompt": {"ja": "縦型の日本語学習動画を制作する。提供された会話を切り詰めず、言い直しや間も含めて演出。発話に合わせて日英字幕と話者の表情を切り替え、最後に短い導線を添えました。 音声を先に確定し、発話単位のタイムコードを採る。 話者ごとに吹き出しとキャラクターを対応させる。 会話の間を残し、BGMを足さず声を主役にする。 承認済みの自作キャラクターと利用可能な背景を用意。実音声の長さを測り、字幕・話者・余白をスマホで確認して書き出す。", "en": "Create a vertical Japanese-learning film. Preserve the supplied conversation, including pauses and retries. Match bilingual captions and character reactions to the speakers, then add a short ending. Use authorized character art and background assets. Measure the original audio, align each caption to speech, and check mobile readability before rendering."}, "note": {"ja": "公開プロンプトは完成映像・残存資料から再構成した制作指示です。元の会話音声・キャラクター素材を自由配布するものではありません。", "en": "The public prompt is reconstructed from the finished film and surviving records. Original voices and character assets are not freely licensed."}},
{"id": "tokyo-osaka", "kind": "FILM", "title": {"ja": "Tokyo vs Osaka — あいさつの音を比べる。", "en": "Tokyo vs Osaka — Hear the difference"}, "description": {"ja": "東京と大阪、5つのあいさつを15秒で聞き比べる。", "en": "Five greetings, two accents, in 15 seconds."}, "summary": {"ja": "左右の都市、紺と赤、声に合わせた明暗。音の違いを聞きながら、同じ言葉のアクセントを線で追える比較動画です。", "en": "Two cities, navy and red, and speaker-led dimming. Compare the same words by listening while following their pitch contours."}, "portrait": true, "image": "/works/tokyo-osaka.jpg", "href": "/works/tokyo-osaka", "live": "https://videos.maepace.com/media/tokyo-osaka.mp4", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/films/tokyo-osaka", "tags": ["Natural voice", "Bilingual captions"], "skills": ["音声タイミング設計", "字幕・キャラクター演出"], "prompt": {"ja": "縦型の日本語学習動画を制作する。左右の都市、紺と赤、声に合わせた明暗。音の違いを聞きながら、同じ言葉のアクセントを線で追える比較動画です。 東京→大阪の順で、各ペアの自然音声を配置する。 こんにちは・おはよう・ありがとう・おかえり・ただいまを比較する。 発話中の側を明るくし、承認済みのピッチ線を固定表示する。 承認済みの自作キャラクターと利用可能な背景を用意。実音声の長さを測り、字幕・話者・余白をスマホで確認して書き出す。", "en": "Create a vertical Japanese-learning film. Two cities, navy and red, and speaker-led dimming. Compare the same words by listening while following their pitch contours. Use authorized character art and background assets. Measure the original audio, align each caption to speech, and check mobile readability before rendering."}, "note": {"ja": "公開プロンプトは完成映像・残存資料から再構成した制作指示です。元の会話音声・キャラクター素材を自由配布するものではありません。", "en": "The public prompt is reconstructed from the finished film and surviving records. Original voices and character assets are not freely licensed."}},
{"id": "kansai-talk", "kind": "FILM", "title": {"ja": "中の人トーク — 関西人2人のリアルな会話。", "en": "Kansai Listening — A real conversation"}, "description": {"ja": "まずは字幕なしで。中の人の会話を使った28秒の聞き取り動画。", "en": "A 28-second listening challenge featuring the people behind the characters."}, "summary": {"ja": "作り込んだ例文ではなく、二人の会話を聞き取る体験に。最初に挑戦のルールを短く示し、キャラクターと大阪の風景で世界観をつなぎます。", "en": "A listening experience centered on a real exchange. Brief instructions introduce the challenge; characters and an Osaka backdrop keep the series coherent."}, "portrait": true, "image": "/works/kansai-talk.jpg", "href": "/works/kansai-talk", "live": "https://videos.maepace.com/media/kansai-talk.mp4", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/films/kansai-talk", "tags": ["Natural voice", "Bilingual captions"], "skills": ["音声タイミング設計", "字幕・キャラクター演出"], "prompt": {"ja": "縦型の日本語学習動画を制作する。作り込んだ例文ではなく、二人の会話を聞き取る体験に。最初に挑戦のルールを短く示し、キャラクターと大阪の風景で世界観をつなぎます。 聞き取りの挑戦を冒頭で一言で伝える。 人の会話を素材にし、音声を無理に速めない。 同じシリーズの背景・キャラクター・字幕の体系を使う。 承認済みの自作キャラクターと利用可能な背景を用意。実音声の長さを測り、字幕・話者・余白をスマホで確認して書き出す。", "en": "Create a vertical Japanese-learning film. A listening experience centered on a real exchange. Brief instructions introduce the challenge; characters and an Osaka backdrop keep the series coherent. Use authorized character art and background assets. Measure the original audio, align each caption to speech, and check mobile readability before rendering."}, "note": {"ja": "公開プロンプトは完成映像・残存資料から再構成した制作指示です。元の会話音声・キャラクター素材を自由配布するものではありません。", "en": "The public prompt is reconstructed from the finished film and surviving records. Original voices and character assets are not freely licensed."}},
{"id": "tako-line-stickers", "kind": "STICKERS", "title": {"ja": "たこ先生 — 毎日つかえる、動く関西弁。", "en": "Tako Sensei — Everyday Kansai stickers"}, "description": {"ja": "挨拶もツッコミも。24個でひとつのLINEスタンプ作品。", "en": "Greetings and playful reactions, in one 24-piece LINE sticker set."}, "summary": {"ja": "用途とセリフを先に決め、キャラクターの統一感と送った瞬間の伝わりやすさを優先。絵・動き・文字を分けて仕上げた、毎日の会話のためのセットです。", "en": "Start with conversational intent and phrases, then keep the character consistent. Artwork, motion and lettering are finished separately as one everyday set."}, "image": "/works/tako-line-stickers.jpg", "href": "/works/tako-line-stickers", "live": "https://store.line.me/stickershop/product/36261176/ja", "source": "https://github.com/ted-M-tech/tetsuya-creative-motions/tree/main/projects/tako-line-stickers", "tags": ["24 stickers", "APNG", "Character design"], "skills": ["用途・セリフ設計", "アニメーション", "透過・文字合成"], "prompt": {"ja": "日常会話で使う24個の動くスタンプを設計する。まず用途・セリフ・感情・動作を表にする。承認済みの自作キャラクターの顔・体型・色を固定し、1枚1動作で予備動作→主動作→余韻を作る。日本語文字は生成映像に任せず後から合成。APNG化し、明暗両背景で透過の縁、内部の白抜け、文字の読みやすさを検証する。提出時点のLINE仕様に合わせて容量・フレーム・ループを確認し、メイン画像・タブ画像・並び順を整える。", "en": "Design 24 animated stickers for everyday conversation. Map intent, phrase, emotion and action first. Preserve your approved character, with one main action per sticker. Add Japanese lettering after animation. Export APNG and inspect alpha edges and lettering on light and dark backgrounds. Validate against LINE’s submission requirements at release time, then prepare the main image, tab and display order."}, "note": {"ja": "商品画像は作品紹介のためのプレビューです。制作方法を公開していますが、スタンプ商品の素材・キャラクターの再配布を許諾するものではありません。", "en": "Product artwork is shown as a portfolio preview. The making-of does not grant redistribution rights to the sticker assets or character."}}
 ]
};
