import { getDictionary } from "@/lib/dictionaries"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function HomePage({
  params,
}: {
  params: { lang: "ja" | "en" }
}) {
  const dict = getDictionary(params.lang)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">{dict.home.name}</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">{dict.home.title}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {dict.home.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <Link href={`/${params.lang}/projects`}>
                {dict.home.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/${params.lang}/contact`}>
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link
              href={`/${params.lang}/about`}
              className="group p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {dict.nav.about}
              </h3>
              <p className="text-muted-foreground text-sm">
                {params.lang === "ja"
                  ? "経歴とスキルセットについて詳しく紹介しています。"
                  : "Learn more about my background and skill set."}
              </p>
            </Link>
            <Link
              href={`/${params.lang}/projects`}
              className="group p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {dict.nav.projects}
              </h3>
              <p className="text-muted-foreground text-sm">
                {params.lang === "ja"
                  ? "これまでに手がけた主要なプロジェクトをご覧ください。"
                  : "Explore the key projects I have worked on."}
              </p>
            </Link>
            <Link
              href={`/${params.lang}/contact`}
              className="group p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {dict.nav.contact}
              </h3>
              <p className="text-muted-foreground text-sm">
                {params.lang === "ja"
                  ? "お仕事のご相談やご質問はこちらからどうぞ。"
                  : "Get in touch for work inquiries or questions."}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
