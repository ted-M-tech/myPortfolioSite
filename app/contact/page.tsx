import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Contact</h1>
          <p className="text-xl text-muted-foreground">Feel free to get in touch</p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <a
                  href="mailto:tetsuya.maeda.mail@gmail.com"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span className="break-all">tetsuya.maeda.mail@gmail.com</span>
                </a>
                <a
                  href="https://github.com/ted-M-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5 flex-shrink-0" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/tetsuya-maeda-629b70294/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5 flex-shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
