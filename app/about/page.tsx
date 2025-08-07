import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Music, Gamepad2, BookOpen, Mountain, Coffee } from "lucide-react"

export default function AboutPage() {
  const skills = {
    languages: ["SQL", "Python(Basic)", "C#(Basic)", "TypeScript(Basic)"],
    frameworks: ["React", "Next.js"],
    tools: ["Docker", "Azure", "Azure DevOps", "PostgreSQL", "Snowflake", "Git", "Figma", "Miro", "Cursor", "MS Excel", "MS Powerpoint", "MS Word", "MS Teams", "MS Outlook", "MS OneDrive"],
  }

  const certifications = [
    {
      name: "Azure Solutions Architect Expert",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "DevOps Engineer Expert",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "Azure AI Engineer Associate",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "Azure Administrator Associate",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "Azure Developer Associate",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "Azure Fundamentals",
      issuer: "Microsoft",
      date: "2024",
    },
    {
      name: "Registered Product Owner",
      issuer: "Agile Education by Scrum Inc",
      date: "2024",
    },
    {
      name: "Registered Scrum Master",
      issuer: "Agile Education by Scrum Inc",
      date: "2024",
    },
    {
      name: "JDLA Deep Learning for GENERAL",
      issuer: "JDLA",
      date: "2023",
    },
    {
      name: "TOEIC Score 860",
      issuer: "Educational Testing Service",
      date: "2025",
    },
  ]

  const hobbies = [
    {
      icon: Camera,
      name: "Photography",
      description: "I enjoy capturing landscapes and cityscapes. I'm fascinated by the fusion of technology and art.",
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
          <p className="text-xl text-muted-foreground">Experience and Skills</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ted - Tetsuya Maeda<br/><br/>
                  I obtained my Master's degree in Electronic Information Science from Kanazawa University Graduate School in 2020 and joined Mitsubishi Electric Corporation.<br/><br/>
                  From July 2020 to March 2023, I was engaged in the development and support of SCADA (Supervisory Control And Data Acquisition) GENESIS64, as well as system construction.<br/><br/>
                  From April 2023 to July 2025, I worked as a Scrum Master in the development of new cloud SaaS business for manufacturing industry.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full flex flex-col p-0 overflow-hidden">
              <CardContent className="flex-1 flex justify-center items-center p-0">
                <div className="relative w-full h-full">
                  <img
                    src="/profile-photo.jpg"
                    alt="Ted - Tetsuya Maeda"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-40"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Programming Languages</CardTitle>
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
              <CardTitle>Tools & Others</CardTitle>
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
