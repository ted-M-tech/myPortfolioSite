import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" })

export function generateMetadata(): Metadata {
  return {
    title: "Static Title",
    description: "Static Description",
    openGraph: {
      title: "Static Title",
      description: "Static Description",
      type: "website",
      locale: "en_US",
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
