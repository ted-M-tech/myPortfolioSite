import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code,
  Sparkles,
  Camera,
  Music,
  Gamepad2,
  BookOpen,
  Mountain,
  Coffee,
} from "lucide-react";
import Link from "next/link";
import { ParticleBackground } from "@/components/particle-background";
import { PageHeader } from "@/components/page-header";
import { OptimizedImage } from "@/components/optimized-image";

export default function HomePage() {
  // Skills data
  const skills = {
    languages: ["SQL", "Python(Basic)", "C#(Basic)", "TypeScript(Basic)"],
    frameworks: ["React", "Next.js"],
    tools: [
      "Docker",
      "Azure",
      "Azure DevOps",
      "PostgreSQL",
      "Snowflake",
      "Git",
      "Figma",
      "Miro",
      "Cursor",
      "MS Excel",
      "MS Powerpoint",
      "MS Word",
      "MS Teams",
      "MS Outlook",
      "MS OneDrive",
    ],
  };

  // Certifications data
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
  ];

  // Hobbies data
  const hobbies = [
    {
      icon: Camera,
      name: "Photography",
      description:
        "I enjoy capturing landscapes and cityscapes. I'm fascinated by the fusion of technology and art.",
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
      description:
        "Walking in nature helps me refresh and gain new ideas for my projects.",
    },
    {
      icon: Coffee,
      name: "Coffee",
      description:
        "Exploring specialty coffee and hand-drip brewing is my daily routine. It's my source of focus.",
    },
  ];

  // Projects data
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
      description:
        "Engaged in the development of a new cloud SaaS business for manufacturing, utilizing Scrum as an agile methodology and serving as a Scrum Master to promote data utilization solutions.",
      tech: [
        "Azure",
        "React",
        "Next.js",
        "Snowflake",
        "IoT",
        "Scrum",
        "DevOps",
        "Miro",
        "Figma",
      ],
      link: "https://www.mitsubishielectric.co.jp/fa/about-us/fa-digitalsolution/index.html",
      image: "/saas_development.png",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      {/* Hero Section */}
      <section
        id="home"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main content with staggered animation */}
          <div className="text-center space-y-6">
            <div className="animate-slide-up">
              <h1 className="text-lg sm:text-xl font-medium text-muted-foreground mb-3">
                Hello World, I'm
              </h1>
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient drop-shadow-lg mb-4">
                  Ted - Tetsuya Maeda
                </h2>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur-lg opacity-40 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl text-muted-foreground">
                <Code className="w-5 h-5 text-primary animate-bounce drop-shadow-md" />
                <span>Data Engineer / Software Developer</span>
              </div>
            </div>

            <div className="animate-slide-up-delay-1">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed backdrop-blur-md bg-background/70 p-6 rounded-lg border border-border/60 shadow-xl shadow-primary/10">
                I am a data engineer and software developer with a passion for
                creating innovative solutions. My background includes experience
                in web development, construct SCADA system, and data analysis.
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
                    <a
                      href="https://github.com/ted-M-tech"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 transition-transform backdrop-blur-md bg-background/70 border-border/60 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/tetsuya-maeda-629b70294/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 transition-transform backdrop-blur-md bg-background/70 border-border/60 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <a href="mailto:tetsuya.maeda.mail@gmail.com">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="animate-slide-up-delay-3 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <a
                  href="#about"
                  className="group p-6 bg-background/80 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/60 hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    About
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Learn more about my background and skill set.
                  </p>
                </a>
                <a
                  href="#projects"
                  className="group p-6 bg-background/80 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/60 hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Projects
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Explore the key projects I have worked on.
                  </p>
                </a>
                <a
                  href="#other"
                  className="group p-6 bg-background/80 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/60 hover:border-primary/30"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Others
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Explore my hobby projects and creative works.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <PageHeader title="About Me" subtitle="Experience and Skills" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Ted - Tetsuya Maeda
                    <br />
                    <br />
                    I obtained my Master's degree in Electronic Information
                    Science from Kanazawa University Graduate School in 2020 and
                    joined Mitsubishi Electric Corporation.
                    <br />
                    <br />
                    From July 2020 to March 2023, I was engaged in the
                    development and support of SCADA (Supervisory Control And
                    Data Acquisition) GENESIS64, as well as system construction.
                    <br />
                    <br />
                    From April 2023 to July 2025, I worked as a Scrum Master in
                    the development of new cloud SaaS business for manufacturing
                    industry.
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
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg border"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {cert.issuer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cert.date}
                        </p>
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
                    const IconComponent = hobby.icon;
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
                          <h4 className="font-medium text-sm mb-2">
                            {hobby.name}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {hobby.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Projects"
            subtitle="Key projects I have worked on"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="flex-shrink-0">
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        width={350}
                        height={200}
                        className="w-full h-full object-cover"
                        priority={project.id === 1}
                      />
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Other Section */}
      <section
        id="other"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Others"
            subtitle="Hobby Projects & Creative Works"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>About This Section</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This section showcases hobby projects and creative works that
                  are separate from my professional work. Here you'll find
                  technical experiments and projects created purely for fun and
                  learning.
                </p>
                <p className="text-sm text-muted-foreground">
                  Currently under development. Please check back soon.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  More content will be added here in the future. Stay tuned for
                  updates!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
