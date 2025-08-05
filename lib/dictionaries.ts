// Static dictionaries to avoid promise issues
export const dictionaries = {
  ja: {
    meta: {
      title: "前田哲哉 - フルスタックエンジニア",
      description: "フルスタックエンジニアの前田哲哉のポートフォリオサイトです。",
    },
    nav: {
      home: "ホーム",
      about: "プロフィール",
      projects: "プロジェクト",
      contact: "お問い合わせ",
    },
    home: {
      name: "前田哲哉",
      title: "フルスタックエンジニア",
      description:
        "モダンなWebアプリケーションの設計・開発を得意とするフルスタックエンジニアです。React、Next.js、Node.jsを中心とした技術スタックで、ユーザー体験を重視したプロダクト開発に取り組んでいます。",
      cta: "プロジェクトを見る",
    },
    about: {
      title: "プロフィール",
      subtitle: "経歴とスキルセット",
      bio: "5年以上のWeb開発経験を持つフルスタックエンジニアです。スタートアップから大企業まで様々な規模のプロジェクトに携わり、フロントエンドからバックエンド、インフラまで幅広い技術領域をカバーしています。",
      skills: {
        languages: "プログラミング言語",
        frameworks: "フレームワーク",
        tools: "ツール・その他",
      },
    },
    projects: {
      title: "プロジェクト",
      subtitle: "これまでに手がけた主要なプロジェクト",
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "お気軽にご連絡ください",
      form: {
        name: "お名前",
        email: "メールアドレス",
        message: "メッセージ",
        send: "送信する",
      },
      social: "SNS・リンク",
    },
  },
  en: {
    meta: {
      title: "Tetsuya Maeda - Full Stack Engineer",
      description: "Portfolio website of Tetsuya Maeda, a full stack engineer.",
    },
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    home: {
      name: "Tetsuya Maeda",
      title: "Full Stack Engineer",
      description:
        "A full stack engineer specializing in designing and developing modern web applications. I focus on creating user-centric products using a tech stack centered around React, Next.js, and Node.js.",
      cta: "View Projects",
    },
    about: {
      title: "About Me",
      subtitle: "Experience and Skills",
      bio: "A full stack engineer with over 5 years of web development experience. I have worked on projects of various scales from startups to large enterprises, covering a wide range of technical areas from frontend to backend and infrastructure.",
      skills: {
        languages: "Programming Languages",
        frameworks: "Frameworks",
        tools: "Tools & Others",
      },
    },
    projects: {
      title: "Projects",
      subtitle: "Key projects I have worked on",
    },
    contact: {
      title: "Contact",
      subtitle: "Feel free to get in touch",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
      },
      social: "Social Links",
    },
  },
} as const

export function getDictionary(locale: "ja" | "en") {
  return dictionaries[locale]
}
