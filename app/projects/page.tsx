import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "SCADA GENESIS64 function development",
      description:
        "Developed features for SCADA targeting both Factory Automation and Process Automation.",
      tech: ["SCADA", "C#", "WPF", "GX Works", "PLC"],
      link: "https://www.mitsubishielectric.co.jp/fa/products/software/visualisation/genesis64/index.html",
      image: "/scada_develop.png",
    },
    {
      id: 2,
      title: "SCADA System Construction and Support",
      description:
        "Supported and assisted in building customer systems for Factory Automation and Building Automation using SCADA GENESIS64.",
      tech: ["SCADA", "PLC", "SQL", "SQL Serever", "BI Tools"],
      link: "https://www.mitsubishielectric.co.jp/fa/products/software/visualisation/genesis64/our-stories.html",
      image: "/scada_system.png",
    },
    {
      id: 3,
      title: "Data Visualization and Analysis SaaS development",
      description: "Engaged in the development of a new cloud SaaS business for manufacturing, utilizing Scrum as an agile methodology and serving as a Scrum Master to promote data utilization solutions.",
      tech: ["Azure", "React", "Next.js", "Snowflake", "IoT", "Scrum", "DevOps", "Miro", "Figma"],
      link: "https://www.mitsubishielectric.co.jp/fa/about-us/fa-digitalsolution/index.html",
      image: "/saas_development.png",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground">Key projects I have worked on</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">
              <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="flex-shrink-0">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={project.image}
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
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
