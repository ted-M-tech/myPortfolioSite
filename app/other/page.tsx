import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Gamepad2, Palette, Music, Camera, BookOpen } from "lucide-react"

export default function OtherPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Others</h1>
          <p className="text-xl text-muted-foreground">Hobby Projects & Creative Works</p>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
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
        </div>
      </div>
    </div>
  )
}
