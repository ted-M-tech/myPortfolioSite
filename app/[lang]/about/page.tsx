import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Music, Gamepad2, BookOpen, Mountain, Coffee } from "lucide-react"

export default function AboutPage() {
  const skills = {
    languages: ["JavaScript", "TypeScript", "Python", "Go", "Java"],
    frameworks: ["React", "Next.js", "Vue.js", "Node.js", "Express", "FastAPI"],
    tools: ["Docker", "AWS", "PostgreSQL", "MongoDB", "Git", "Figma"],
  }

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2022",
    },
    {
      name: "Fundamental Information Technology Engineer Examination",
      issuer: "Information-technology Promotion Agency (IPA)",
      date: "2020",
    },
    {
      name: "TOEIC Score 850",
      issuer: "Educational Testing Service",
      date: "2021",
    },
  ]

  const hobbies = [
    {
      icon: Camera,
      name: "Photography",
      description: "I enjoy capturing landscapes and cityscapes. I'm fascinated by the fusion of technology and art.",
    },
    {
      icon: Music,
      name: "Music & Production",
      description:
        "I love listening to jazz and electronica, and enjoy creating music with digital audio workstations.",
    },
    {
      icon: Gamepad2,
      name: "Game Development",
      description: "I'm exploring indie game development with Unity. It's a field that stimulates my creativity.",
    },
    {
      icon: BookOpen,
      name: "Reading",
      description:
        "I read everything from technical books to sci-fi novels. I love gaining new perspectives and knowledge.",
    },
    {
      icon: Mountain,
      name: "Hiking",
      description: "Walking in nature helps me refresh and gain new ideas for my projects.",
    },
    {
      icon: Coffee,
      name: "Coffee",
      description: "Exploring specialty coffee and hand-drip brewing is my daily routine. It's my source of focus.",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground">Learn more about my background and skills.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  I am a software engineer with 5+ years of experience in developing web and mobile applications. I am
                  passionate about building scalable and maintainable systems that solve real-world problems.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <p className="text-muted-foreground">Years of Development</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
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
              <CardTitle>Frameworks</CardTitle>
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
              <CardTitle>Tools</CardTitle>
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
              <CardTitle>Certifications</CardTitle>
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
              <CardTitle>Hobbies & Interests</CardTitle>
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
