import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Gamepad2, Palette, Music, Camera, BookOpen } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function OtherPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Others" subtitle="Hobby Projects & Creative Works" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>About This Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section showcases hobby projects and creative works that are separate from my professional work.
                Here you'll find technical experiments and projects created purely for fun and learning.
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
                More content will be added here in the future. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
