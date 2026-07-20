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
  email: "tetsuya.maeda@technomore.ltd",
  /**
   * ヒーローの見出し。<em> で囲んだ箇所がアクセント表示になる。
   * 「前へ進む速度」と「自分のペース」— 屋号の二重の由来をそのまま言葉にしている。
   */
  headline: {
    ja: "AIで、構想を<em>動くプロダクト</em>へ。",
    en: "AI-driven ideas, <em>built end to end.</em>",
  } satisfies Bilingual,
  intro: {
    ja: "生成AIを、飾りではなく開発の推進力に。5年以上の実務経験をもとに、アイデア検証からUI、API、データ、クラウド、本番運用まで一気通貫で設計・実装します。",
    en: "I use generative AI as an engineering multiplier, not decoration. With five-plus years of product experience, I take ideas from validation through UI, APIs, data, cloud and production.",
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

export const stats = [
  { value: 5, suffix: "+", label: { ja: "年のプロダクト開発", en: "Years shipping products" } },
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
      ja: "リアルタイムのデータ分析と AI エンジンを組み込んだ工場自動化システム。前処理から本番デプロイまで一気通貫で構築し、工程最適化と予知保全を実現しています。",
      en: "Factory automation with real-time analytics and AI engines built in — from data preprocessing through to production deployment, for process optimization and predictive maintenance.",
    },
    tech: ["Python", "Azure", "AI/ML", "Real-time Analytics", "Docker"],
    href: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
  },
  {
    id: "annoscene",
    role: { ja: "iOS開発 · MapKit", en: "iOS Engineering · MapKit" },
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
    role: { ja: "iOS開発 · 音声学習", en: "iOS Engineering · Voice Learning" },
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
    role: { ja: "iOS開発 · HealthKit", en: "iOS Engineering · HealthKit" },
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
    role: { ja: "フルスタック開発 · 制御システム", en: "Full Stack Engineering · Control Systems" },
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
    role: { ja: "フルスタック開発 · Scrum", en: "Full Stack Engineering · Scrum" },
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
 * tone はバッジの色。原典はカードごとに色を変えて種類を示していた。
 *
 * 価格の考え方: バンクーバー在住・Azure 系 Expert 資格3つ・実務5年以上という
 * 前提での相場に寄せている。単発の相談は「試しやすさ」を優先して低く、
 * 継続と受託は実際に時間を使う分だけ取る。安く見せるための嘘の割引はしない。
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
    price: { ja: "¥15,000", en: "CA$150" },
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
    subtitle: { ja: "1〜3週間", en: "1–3 weeks" },
    price: { ja: "¥300,000", en: "CA$3,000" },
    unit: { ja: "〜", en: "+" },
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
    price: { ja: "応相談", en: "Let's talk" },
    unit: { ja: "", en: "" },
    points: [
      { ja: "アイデア段階からの技術検証", en: "Technical validation from day one" },
      { ja: "AI・データを中核にした設計", en: "AI and data at the product core" },
      { ja: "継続改善できるチームと基盤", en: "A team and system built to evolve" },
    ],
    cta: { ja: "話をする", en: "Start a conversation" },
  },
] as const;

export const servicesNote = {
  ja: "初回30分は無料です。まだ企画書がなくても大丈夫。課題と「こうなったら最高」を聞かせてください。日本語 / English どちらでも。",
  en: "The first 30 minutes are free. No polished brief needed — bring the problem and your best-case vision. Japanese or English.",
} satisfies Bilingual;

export const contact = {
  heading: { ja: "次の「すごい」を、<em>一緒に</em>。", en: "Let's make the next <em>unmissable</em> thing." },
  note: {
    ja: "AIプロトタイプ、Webアプリ、業務システム、まだ名前のない企画でも。返信は2営業日以内に。",
    en: "An AI prototype, web app, business system, or an idea without a name yet. I reply within two business days.",
  },
} as const;
