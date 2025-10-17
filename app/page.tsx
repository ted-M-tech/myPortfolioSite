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
    languages: ["Python", "SQL", "C#", "TypeScript", "HTML/CSS"],
    frameworks: ["React", "Next.js", "Node.js"],
    tools: [
      "Microsoft Azure",
      "Git",
      "Docker",
      "Power BI",
      "Miro",
      "Figma",
      "Azure DevOps",
      "PostgreSQL",
      "Snowflake",
    ],
  };

  // Certifications data
  const certifications = [
    {
      name: "Microsoft Certified: DevOps Engineer Expert",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      date: "2025",
    },
    {
      name: "Microsoft Certified: Azure AI Engineer Associate",
      issuer: "Microsoft",
      date: "2025",
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
      title: "AI-Powered Factory Automation System",
      description:
        "Developing factory automation systems integrating real-time data analytics and AI-powered engines for industrial process optimization and predictive maintenance. Delivering end-to-end AI solutions from data preprocessing to production deployment.",
      tech: ["Python", "Azure", "AI/ML", "Real-time Analytics", "Docker"],
      link: "https://www.linkedin.com/in/tetsuya-maeda-629b70294/",
      image: "/saas_development.png",
    },
    {
      id: 2,
      title: "Data Visualization & Remote Control Systems",
      description:
        "Collaborated directly with clients to design and implement enhanced data visualization and remote control systems for factory and building automation, leading to 25% improvement in operational efficiency and faster response time to system alerts.",
      tech: ["C#", "SQL", "Power BI", "Azure", "SCADA"],
      link: "https://www.mitsubishielectric.co.jp/fa/products/software/visualisation/genesis64/index.html",
      image: "/scada_develop.png",
    },
    {
      id: 3,
      title: "Agile Cloud SaaS Platform Development",
      description:
        "Led Agile practices as Scrum Master in cloud SaaS development for manufacturing. Reduced software release cycle from monthly to weekly, enabling 4x increase in delivery frequency. Improved team productivity by 20% measured by cycle time.",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "Azure",
        "Snowflake",
        "DevOps",
        "Scrum",
        "Miro",
      ],
      link: "https://www.mitsubishielectric.co.jp/fa/about-us/fa-digitalsolution/index.html",
      image: "/scada_system.png",
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
                <span>Fullstack Developer</span>
              </div>
            </div>

            <div className="animate-slide-up-delay-1">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed backdrop-blur-md bg-background/70 p-6 rounded-lg border border-border/60 shadow-xl shadow-primary/10">
                Data-focused software engineer with a strong background in developing AI-powered systems and data analytics
                pipelines. Proven experience in delivering end-to-end AI solutions and transforming customer requirements into
                tangible system features. Using a unique blend of software engineering, AI, and data analysis skills to build
                innovative solutions.
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
                    Tetsuya Maeda
                    <br />
                    <br />
                    Currently working as a Full Stack Developer (Contract) at TECHNOMORe Inc.,
                    developing factory automation systems that integrate real-time data analytics
                    and AI-powered engines for industrial process optimization and predictive maintenance.
                    <br />
                    <br />
                    Previously worked as a Software Developer at Mitsubishi Electric Corporation (April 2020 – September 2025),
                    where I collaborated directly with clients to design and implement data visualization and
                    remote control systems for factory and building automation. Led Agile practices as a Scrum Master,
                    improving team productivity by 20% and reducing software release cycles from monthly to weekly—
                    enabling a 4x increase in delivery frequency.
                    <br />
                    <br />
                    Currently pursuing a Data Science diploma at Cornerstone International Community College
                    in Vancouver to deepen expertise in machine learning and data-driven solutions.
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
