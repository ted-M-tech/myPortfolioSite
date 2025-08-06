import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Code, Sparkles } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Main content with staggered animation */}
          <div className="text-center space-y-6">
            <div className="animate-slide-up">
              <h1 className="text-lg sm:text-xl font-medium text-muted-foreground mb-3">Hello World, I'm</h1>
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient drop-shadow-lg mb-4">
                  Ted - Tetsuya Maeda
                </h2>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur-lg opacity-40 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl text-muted-foreground">
                <Code className="w-5 h-5 text-primary animate-bounce drop-shadow-md" />
                <span>Software Developer</span>
              </div>
            </div>

            <div className="animate-slide-up-delay-1">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed backdrop-blur-md bg-background/70 p-6 rounded-lg border border-border/60 shadow-xl shadow-primary/10">
                I am a software developer with a passion for creating innovative solutions. My background includes
                experience in web development, mobile applications, and data analysis.
              </p>
            </div>

            <div className="animate-slide-up-delay-2">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 transition-transform backdrop-blur-md bg-background/70 border-border/60 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <a href="https://github.com/ted-M-tech" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 transition-transform backdrop-blur-md bg-background/70 border-border/60 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/tetsuya-maeda-629b70294/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 transition-transform backdrop-blur-md bg-background/70 border-border/60 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <Link href="mailto:tetsuya.maeda.mail@gmail.com">
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-slide-up-delay-3 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Link
                  href="/about"
                  className="group p-6 bg-background/80 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/60 hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">About</h3>
                  <p className="text-muted-foreground text-sm">Learn more about my background and skill set.</p>
                </Link>
                <Link
                  href="/projects"
                  className="group p-6 bg-background/80 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/60 hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Projects</h3>
                  <p className="text-muted-foreground text-sm">Explore the key projects I have worked on.</p>
                </Link>
                <Link
                  href="/contact"
                  className="group p-6 bg-background/80 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/60 hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Contact</h3>
                  <p className="text-muted-foreground text-sm">Get in touch for work inquiries or questions.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
