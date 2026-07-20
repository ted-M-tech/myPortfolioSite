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
  title: "Tetsuya Maeda — Fullstack Developer",
  description: {
    ja: "前田哲也 / Tetsuya Maeda。バンクーバー拠点のフルスタック開発者。工場自動化・リアルタイムデータ分析・AI を横断して、動くシステムとして届けます。",
    en: "Tetsuya Maeda — a fullstack developer in Vancouver, building factory automation, real-time analytics and AI into systems that actually ship.",
  } satisfies Bilingual,
} as const;

export const person = {
  name: "Tetsuya Maeda",
  nameJa: "前田 哲也",
  /** 普段使っている呼び名 */
  alias: "Ted",
  role: {
    ja: "フルスタック開発者",
    en: "Fullstack Developer",
  } satisfies Bilingual,
  location: {
    ja: "バンクーバー, カナダ",
    en: "Vancouver, Canada",
  } satisfies Bilingual,
  email: "tetsuya.maeda@technomore.ltd",
  /**
   * ヒーローの見出し。<em> で囲んだ箇所がアクセント表示になる。
   * 「前へ進む速度」と「自分のペース」— 屋号の二重の由来をそのまま言葉にしている。
   */
  headline: {
    ja: "現場の課題を、<em>動くシステム</em>にする。",
    en: "Turning shop-floor problems into <em>systems that run</em>.",
  } satisfies Bilingual,
  intro: {
    ja: "工場の自動化から、リアルタイム分析基盤、AI を組み込んだ実運用まで。5年以上、現場で動き続けるものをつくってきました。Scrum Master としてチームの進み方も設計します。",
    en: "Factory automation, real-time analytics platforms, and AI that runs in production. Five-plus years of building things that keep working after launch — and, as a Scrum Master, of shaping how the team gets there.",
  } satisfies Bilingual,
} as const;

export const socials = [
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/" },
  { label: "GitHub", icon: "github", href: "https://github.com/ted-M-tech" },
  { label: "Email", icon: "mail", href: `mailto:${person.email}` },
] as const;

/** 帯を流れる技術キーワード。実際に使うものだけを並べる。 */
export const marquee = [
  "Python", "SQL", "C#", "TypeScript", "Azure", "Docker",
  "Power BI", "SCADA", "PLC", "PostgreSQL", "Snowflake",
  "Swift", "SwiftUI", "React", "Next.js", "Astro", "Scrum",
] as const;

export const stats = [
  { value: 5, suffix: "+", label: { ja: "年の実務経験", en: "Years in the field" } },
  { value: 25, suffix: "%", label: { ja: "運用効率の改善", en: "Operational efficiency gained" } },
  { value: 6, suffix: "", label: { ja: "公開プロジェクト", en: "Projects shipped" } },
  { value: 5, suffix: "", label: { ja: "保有資格", en: "Certifications" } },
] as const;

export type Project = {
  id: string;
  role: Bilingual;
  title: Bilingual;
  description: Bilingual;
  tech: readonly string[];
  href: string;
};

export const projects: readonly Project[] = [
  {
    id: "factory-ai",
    role: { ja: "フルスタック · AI", en: "Fullstack · AI" },
    title: {
      ja: "製造業向け AI 分析システム",
      en: "AI Analytics for Manufacturing",
    },
    description: {
      ja: "リアルタイムのデータ分析と AI エンジンを組み込んだ工場自動化システム。前処理から本番デプロイまで一気通貫で構築し、工程最適化と予知保全を実現しています。",
      en: "Factory automation with real-time analytics and AI engines built in — from data preprocessing through to production deployment, for process optimization and predictive maintenance.",
    },
    tech: ["Python", "Azure", "AI/ML", "Real-time Analytics", "Docker"],
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
  },
  {
    id: "annoscene",
    role: { ja: "個人開発 · iOS", en: "Solo · iOS" },
    title: { ja: "AnnoScene", en: "AnnoScene" },
    description: {
      ja: "旅の移動そのものを主役にする iOS アプリ。走った経路が地図上に自分で描かれ、写真や短い動画がそれぞれの場所と時刻に現れます。訪れた国を貯める Atlas 付き。写真の位置情報は端末内だけで処理します。",
      en: "An iOS app that makes the journey itself the subject. The route draws itself across the map while photos and clips surface at the place and moment they were taken, alongside an Atlas of countries visited. Photo location data never leaves the device.",
    },
    tech: ["Swift", "SwiftUI", "MapKit", "PhotosUI", "AVFoundation"],
    href: "https://annoscene.maepace.com",
  },
  {
    id: "helpkansai",
    role: { ja: "個人開発 · iOS", en: "Solo · iOS" },
    title: { ja: "Help Kansai", en: "Help Kansai" },
    description: {
      ja: "いまの関西弁を、標準語と並べて学ぶ iOS アプリ。ネイティブ音声での発話練習と間隔反復を組み合わせ、教科書には出てこない自然な言い回しを扱います。",
      en: "An iOS app for learning modern Kansai Japanese by comparing it against standard Japanese — native-audio practice plus spaced repetition, covering the phrasing textbooks leave out.",
    },
    tech: ["Swift", "SwiftUI", "AVFoundation", "SRS"],
    href: "https://helpkansai.maepace.com",
  },
  {
    id: "wellnesspet",
    role: { ja: "個人開発 · iOS", en: "Solo · iOS" },
    title: { ja: "Wellness Pet", en: "Wellness Pet" },
    description: {
      ja: "歩数と睡眠、夜のひと押しの気分記録が、一匹のピクセルの犬の様子に変わる iOS アプリ。点数をつける道具ではなく、そばにいるものとして設計しています。",
      en: "An iOS companion where steps, sleep and a one-tap evening mood check turn into small changes in a single pixel dog. Designed to sit beside you rather than score you.",
    },
    tech: ["Swift", "SwiftUI", "HealthKit", "WidgetKit"],
    href: "https://wellnesspet.maepace.com",
  },
  {
    id: "scada-viz",
    role: { ja: "開発 · 顧客折衝", en: "Engineering · Client-facing" },
    title: {
      ja: "データ可視化・遠隔制御システム",
      en: "Data Visualization & Remote Control",
    },
    description: {
      ja: "顧客と直接設計を詰めながら、工場・ビル自動化向けの可視化と遠隔制御を実装。運用効率を25%改善し、アラート対応までの時間を短縮しました。",
      en: "Designed and shipped visualization and remote control for factory and building automation, working directly with clients. Operational efficiency up 25%, with faster response to system alerts.",
    },
    tech: ["C#", "SQL Server", "Azure", "SCADA", "PLC"],
    href: "https://www.mitsubishielectric.co.jp/fa/products/software/visualisation/genesis64/index.html",
  },
  {
    id: "saas-scrum",
    role: { ja: "Scrum Master · フルスタック", en: "Scrum Master · Fullstack" },
    title: {
      ja: "製造業向け SaaS の開発",
      en: "Manufacturing SaaS Platform",
    },
    description: {
      ja: "クラウド SaaS 開発で Scrum Master を務め、リリースサイクルを月次から週次へ短縮。デリバリー頻度4倍、サイクルタイム基準でチーム生産性を20%改善しました。",
      en: "Led Agile practice as Scrum Master on a cloud SaaS product — release cycle from monthly to weekly, 4x delivery frequency, and a 20% lift in team productivity measured by cycle time.",
    },
    tech: ["React", "Next.js", "TypeScript", "Azure", "Snowflake", "Scrum"],
    href: "https://www.mitsubishielectric.co.jp/fa/about-us/fa-digitalsolution/index.html",
  },
] as const;

/** 屋号の由来そのものを言葉にしたセクション。 */
export const ethos = {
  heading: { ja: "前へ、自分のペースで。", en: "Forward, at my own pace." },
  values: [
    { ja: "現場から", en: "Grounded" },
    { ja: "速く出す", en: "Ship fast" },
    { ja: "動き続ける", en: "Keeps running" },
    { ja: "測って直す", en: "Measured" },
    { ja: "チームで", en: "With the team" },
    { ja: "次の一歩", en: "Next step" },
  ],
  caption: {
    ja: "ぜんぶが繋がって、<em>前へ進む速度</em>になる。",
    en: "It all connects — and becomes <em>momentum</em>.",
  },
} as const;

export const skills = [
  {
    group: { ja: "言語", en: "Languages" },
    items: ["Python", "SQL", "C#", "TypeScript", "HTML/CSS"],
  },
  {
    group: { ja: "フレームワーク", en: "Frameworks" },
    items: ["React", "Next.js", "Astro", "Node.js"],
  },
  {
    group: { ja: "基盤・ツール", en: "Platform & Tools" },
    items: [
      "Microsoft Azure", "Docker", "Git", "Azure DevOps",
      "PostgreSQL", "Snowflake", "Power BI", "Figma", "Miro",
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
    org: "Fullstack Developer (Contract)",
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
    period: "2019 — 2024",
  },
] as const;

/**
 * 「仕事のそと」のタイル。
 *
 * size は 6 列グリッド上での占有幅（原典のベントー配置）。
 * lg = 3列×2行、md = 3列、wide = 4列、sm = 2列。
 * 6列がちょうど埋まる組み合わせにしてある（行末に穴を残さない）。
 * image は後から差し込む。null の間はブランド面で埋める。
 */
export const play = [
  {
    id: "hiking",
    size: "lg",
    icon: "mountain",
    name: { ja: "山を歩く", en: "Hiking" },
    note: { ja: "考えが詰まったら、とりあえず登る", en: "When thinking stalls, go up a mountain" },
    image: null as string | null,
  },
  {
    id: "photo",
    size: "md",
    icon: "camera",
    name: { ja: "写真", en: "Photography" },
    note: { ja: "風景と街。技術と表現が交わるところ", en: "Landscapes and cities" },
    image: null as string | null,
  },
  {
    id: "coffee",
    size: "md",
    icon: "coffee",
    name: { ja: "珈琲", en: "Coffee" },
    note: { ja: "ハンドドリップ", en: "Hand-drip" },
    image: null as string | null,
  },
  {
    id: "reading",
    size: "sm",
    icon: "book-open",
    name: { ja: "読書", en: "Reading" },
    note: { ja: "技術書からSFまで", en: "Technical books to sci-fi" },
    image: null as string | null,
  },
  {
    id: "vancouver",
    size: "wide",
    icon: "mountain",
    name: { ja: "バンクーバー", en: "Vancouver" },
    note: { ja: "海と山が近い街に住んでいます", en: "Living where the sea meets the mountains" },
    image: null as string | null,
  },
] as const;

/**
 * 提供メニュー。
 *
 * 価格の考え方: バンクーバー在住・Azure 系 Expert 資格3つ・実務5年以上という
 * 前提での相場に寄せている。単発の相談は「試しやすさ」を優先して低く、
 * 継続と受託は実際に時間を使う分だけ取る。安く見せるための嘘の割引はしない。
 */
export const services = [
  {
    id: "consult",
    featured: true,
    badge: { ja: "まずはここから", en: "Start here" },
    title: { ja: "技術相談", en: "Technical consult" },
    subtitle: { ja: "オンライン · 60分", en: "Online · 60 min" },
    price: { ja: "¥15,000", en: "CA$150" },
    unit: { ja: "/ 回", en: "/ session" },
    points: [
      { ja: "AI・データ活用の壁打ち", en: "Sparring on AI and data initiatives" },
      { ja: "技術選定とアーキテクチャの相談", en: "Tech selection and architecture" },
      { ja: "検証から本番までの進め方", en: "How to get from prototype to production" },
    ],
    cta: { ja: "相談を申し込む", en: "Book a session" },
  },
  {
    id: "advisory",
    featured: false,
    badge: { ja: "継続", en: "Ongoing" },
    title: { ja: "技術顧問", en: "Technical advisory" },
    subtitle: { ja: "月次 · 継続伴走", en: "Monthly · ongoing" },
    price: { ja: "¥120,000", en: "CA$1,200" },
    unit: { ja: "/ 月", en: "/ mo" },
    points: [
      { ja: "月2回の定例（各90分）", en: "Two 90-min sessions each month" },
      { ja: "設計レビュー・コードレビュー", en: "Design and code review" },
      { ja: "チャットでの随時相談", en: "Async questions in between" },
    ],
    cta: { ja: "内容を相談する", en: "Talk it through" },
  },
  {
    id: "build",
    featured: false,
    badge: { ja: "受託開発", en: "Build" },
    title: { ja: "開発のご依頼", en: "Development" },
    subtitle: { ja: "PoC · 4〜8週間", en: "PoC · 4–8 weeks" },
    price: { ja: "¥800,000", en: "CA$8,000" },
    unit: { ja: "〜 / 件", en: "+ / project" },
    points: [
      { ja: "要件整理から本番稼働まで", en: "From scoping through to production" },
      { ja: "データ基盤・可視化・AI 組み込み", en: "Data platforms, visualization, embedded AI" },
      { ja: "引き継ぎドキュメント込み", en: "Handover documentation included" },
    ],
    cta: { ja: "見積もりを相談する", en: "Request a quote" },
  },
  {
    id: "partner",
    featured: false,
    badge: { ja: "パートナー", en: "Partner" },
    title: { ja: "共同開発", en: "Partnership" },
    subtitle: { ja: "事業として一緒に", en: "Building it together" },
    price: { ja: "応相談", en: "Let's talk" },
    unit: { ja: "", en: "" },
    points: [
      { ja: "アイデア段階からの技術検証", en: "Technical validation from the idea stage" },
      { ja: "技術パートナーとして継続的に", en: "Your ongoing technical partner" },
      { ja: "契約形態は個別に設計", en: "Engagement structured case by case" },
    ],
    cta: { ja: "話をする", en: "Start a conversation" },
  },
] as const;

export const servicesNote = {
  ja: "初回のご相談は内容の確認を含めて無料です。お見積もり・請求書払いに対応します。日本語/ English どちらでも。",
  en: "The first intro call is free while we scope things out. Quotes and invoicing available. Japanese or English.",
} satisfies Bilingual;

export const contact = {
  heading: { ja: "次は、<em>一緒に</em>。", en: "Let's build <em>something</em>." },
  note: {
    ja: "お仕事のご相談、技術的な壁打ち、雑談でも。返信は2営業日以内に。",
    en: "Work, a technical problem, or just a conversation. I reply within two business days.",
  },
} as const;
