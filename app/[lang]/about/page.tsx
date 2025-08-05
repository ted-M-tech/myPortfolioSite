import { getDictionary } from "@/lib/dictionaries"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Music, Gamepad2, BookOpen, Mountain, Coffee } from "lucide-react"

export default function AboutPage({
  params,
}: {
  params: { lang: "ja" | "en" }
}) {
  const dict = getDictionary(params.lang)

  const skills = {
    languages: ["JavaScript", "TypeScript", "Python", "Go", "Java"],
    frameworks: ["React", "Next.js", "Vue.js", "Node.js", "Express", "FastAPI"],
    tools: ["Docker", "AWS", "PostgreSQL", "MongoDB", "Git", "Figma"],
  }

  const certifications = [
    {
      name: params.lang === "ja" ? "AWS認定ソリューションアーキテクト" : "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name:
        params.lang === "ja"
          ? "Google Cloud Professional Cloud Architect"
          : "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2022",
    },
    {
      name: params.lang === "ja" ? "基本情報技術者試験" : "Fundamental Information Technology Engineer Examination",
      issuer: params.lang === "ja" ? "情報処理推進機構（IPA）" : "Information-technology Promotion Agency (IPA)",
      date: "2020",
    },
    {
      name: params.lang === "ja" ? "TOEIC 850点" : "TOEIC Score 850",
      issuer: "Educational Testing Service",
      date: "2021",
    },
  ]

  const hobbies = [
    {
      icon: Camera,
      name: params.lang === "ja" ? "写真撮影" : "Photography",
      description:
        params.lang === "ja"
          ? "風景や街並みの撮影が好きです。技術と芸術の融合に魅力を感じています。"
          : "I enjoy capturing landscapes and cityscapes. I'm fascinated by the fusion of technology and art.",
    },
    {
      icon: Music,
      name: params.lang === "ja" ? "音楽鑑賞・制作" : "Music & Production",
      description:
        params.lang === "ja"
          ? "ジャズやエレクトロニカを聴くのが好きで、DTMでの楽曲制作も趣味です。"
          : "I love listening to jazz and electronica, and enjoy creating music with digital audio workstations.",
    },
    {
      icon: Gamepad2,
      name: params.lang === "ja" ? "ゲーム開発" : "Game Development",
      description:
        params.lang === "ja"
          ? "Unityを使ったインディーゲーム開発に挑戦しています。創造性を刺激される分野です。"
          : "I'm exploring indie game development with Unity. It's a field that stimulates my creativity.",
    },
    {
      icon: BookOpen,
      name: params.lang === "ja" ? "読書" : "Reading",
      description:
        params.lang === "ja"
          ? "技術書からSF小説まで幅広く読みます。新しい視点や知識を得ることが好きです。"
          : "I read everything from technical books to sci-fi novels. I love gaining new perspectives and knowledge.",
    },
    {
      icon: Mountain,
      name: params.lang === "ja" ? "ハイキング" : "Hiking",
      description:
        params.lang === "ja"
          ? "自然の中を歩くことでリフレッシュし、新しいアイデアを得ています。"
          : "Walking in nature helps me refresh and gain new ideas for my projects.",
    },
    {
      icon: Coffee,
      name: params.lang === "ja" ? "コーヒー" : "Coffee",
      description:
        params.lang === "ja"
          ? "スペシャルティコーヒーの探求とハンドドリップが日課です。集中力の源です。"
          : "Exploring specialty coffee and hand-drip brewing is my daily routine. It's my source of focus.",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{dict.about.title}</h1>
          <p className="text-xl text-muted-foreground">{dict.about.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{params.lang === "ja" ? "自己紹介" : "About Me"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{dict.about.bio}</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{params.lang === "ja" ? "経験年数" : "Experience"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <p className="text-muted-foreground">
                  {params.lang === "ja" ? "年間の開発経験" : "Years of Development"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{dict.about.skills.languages}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dict.about.skills.frameworks}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dict.about.skills.tools}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{params.lang === "ja" ? "資格・認定" : "Certifications"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{cert.name}</h4>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{params.lang === "ja" ? "趣味・興味" : "Hobbies & Interests"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hobbies.map((hobby, index) => {
                  const IconComponent = hobby.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-2">{hobby.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{hobby.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
