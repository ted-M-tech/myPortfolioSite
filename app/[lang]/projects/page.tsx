import { getDictionary } from "@/lib/dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function ProjectsPage({
  params,
}: {
  params: { lang: "ja" | "en" }
}) {
  const dict = getDictionary(params.lang)

  const projects = [
    {
      id: 1,
      title: params.lang === "ja" ? "Eコマースプラットフォーム" : "E-commerce Platform",
      description:
        params.lang === "ja"
          ? "Next.js とStripeを使用したモダンなEコマースサイト。レスポンシブデザインと高速なパフォーマンスを実現。"
          : "Modern e-commerce site built with Next.js and Stripe. Features responsive design and high performance.",
      tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    },
    {
      id: 2,
      title: params.lang === "ja" ? "タスク管理アプリ" : "Task Management App",
      description:
        params.lang === "ja"
          ? "React とNode.jsで構築されたリアルタイムタスク管理アプリケーション。チーム協業機能を搭載。"
          : "Real-time task management application built with React and Node.js. Features team collaboration tools.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    },
    {
      id: 3,
      title: params.lang === "ja" ? "データ可視化ダッシュボード" : "Data Visualization Dashboard",
      description:
        params.lang === "ja"
          ? "D3.jsとReactを使用したインタラクティブなデータ可視化ダッシュボード。リアルタイムデータ更新対応。"
          : "Interactive data visualization dashboard using D3.js and React. Supports real-time data updates.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
    },
    {
      id: 4,
      title: params.lang === "ja" ? "リアルタイムチャットアプリ" : "Real-time Chat App",
      description:
        params.lang === "ja"
          ? "WebSocketを使用したリアルタイムチャットアプリケーション。グループチャットとプライベートメッセージに対応。"
          : "Real-time chat application using WebSocket. Supports group chat and private messaging.",
      tech: ["React", "Socket.io", "Express", "Redis"],
    },
    {
      id: 5,
      title: params.lang === "ja" ? "天気予報アプリ" : "Weather Forecast App",
      description:
        params.lang === "ja"
          ? "OpenWeather APIを使用した天気予報アプリ。位置情報に基づく天気情報と5日間の予報を表示。"
          : "Weather forecast app using OpenWeather API. Shows location-based weather info and 5-day forecast.",
      tech: ["React", "TypeScript", "OpenWeather API", "Geolocation"],
    },
    {
      id: 6,
      title: params.lang === "ja" ? "ポートフォリオサイト" : "Portfolio Website",
      description:
        params.lang === "ja"
          ? "Next.js 15とTailwind CSSで構築されたレスポンシブなポートフォリオサイト。ダークモードと多言語対応。"
          : "Responsive portfolio website built with Next.js 15 and Tailwind CSS. Features dark mode and internationalization.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{dict.projects.title}</h1>
          <p className="text-xl text-muted-foreground">{dict.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={`/abstract-project.png?height=200&width=350&query=project-${project.id}`}
                    alt={project.title}
                    width={350}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
