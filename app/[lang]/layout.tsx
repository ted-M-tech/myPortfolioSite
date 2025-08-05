import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { getDictionary } from "@/lib/dictionaries"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" })

export function generateStaticParams() {
  return [{ lang: "ja" }, { lang: "en" }]
}

export function generateMetadata({
  params,
}: {
  params: { lang: "ja" | "en" }
}): Metadata {
  const dict = getDictionary(params.lang)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: params.lang === "ja" ? "ja_JP" : "en_US",
    },
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: "ja" | "en" }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            <Navigation lang={params.lang} />
            <main className="pt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
